import jwt from "jsonwebtoken";
import User from "../models/AdminUser.js";
import bcrypt from "bcrypt";
import multer from "multer";

const upload = multer();

const generateToken = (user) => {
  const payload = {
    userId: user._id,
    username: user.username,
  };
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });
};

// Đăng nhập
export const login = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username }).populate({
      path: "listeningHistory.song",
      select: "songName artist",
    });

    if (!user) {
      return res
        .status(401)
        .json({ msg: "Incorrect Username or Password", status: false });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res
        .status(401)
        .json({ msg: "Incorrect Username or Password", status: false });
    }

    const token = generateToken(user);
    const userData = {
      _id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
      listenedSongs: user.listenedSongs,
      favoriteSongs: user.favoriteSongs,
      listeningHistory: user.listeningHistory,
      genreCounts: user.genreCounts,
    };

    res.json({ status: true, user: userData, token });
  } catch (error) {
    next(error);
  }
};

// Đăng ký
export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res
        .status(400)
        .json({ message: "Username, Email and Password are required" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      username,
      email,
      password: hashedPassword,
    });

    await user.save();
    res.status(201).json({ message: "User registered successfully", user });
  } catch (error) {
    console.error("Error in registration:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Đăng xuất
export const logOut = (req, res, next) => {
  try {
    res.clearCookie("token").json("Logged out");
  } catch (ex) {
    next(ex);
  }
};

// Lấy thông tin Admin
export const getAdminProfile = async (req, res, next) => {
  try {
    const adminProfile = await User.findOne();

    if (adminProfile) {
      res.json({
        AdminProfile: adminProfile,
        successMsg: "Admin profile retrieved successfully",
      });
    } else {
      res.status(500).json({ errorMsg: "Failed to retrieve admin profile" });
    }
  } catch (error) {
    console.error("Error retrieving admin profile:", error);
    res.status(500).json({ errorMsg: "Error retrieving admin profile" });
  }
};

// Lấy danh sách người dùng
export const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find({ _id: { $ne: req.params.id } }).select([
      "email",
      "username",
      "avatarImage",
      "_id",
    ]);
    return res.json(users);
  } catch (ex) {
    next(ex);
  }
};

// Đặt avatar cho người dùng
export const setAvatar = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const avatarImage = req.body.image;
    const userData = await User.findByIdAndUpdate(
      userId,
      {
        isAvatarImageSet: true,
        avatarImage,
      },
      { new: true }
    );
    return res.json({
      isSet: userData.isAvatarImageSet,
      image: userData.avatarImage,
    });
  } catch (ex) {
    next(ex);
  }
};
