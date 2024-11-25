import express from "express";
import jwt from "jsonwebtoken";
import AdminUser from "../models/AdminUser.js";
import adminController from "../controllers/AdminController.js";

const router = express.Router();

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await AdminUser.findOne({ username }).populate("listeningHistory.song");

    if (!user || user.password !== password) {
      return res.status(401).json({ message: "Sai tài khoản hoặc mật khẩu" });
    }

    const token = jwt.sign({ userId: user._id }, "secret_key");
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

    return res.json({ token, user: userData });
  } catch (error) {
    return res.status(500).json({ message: "Đã xảy ra lỗi" });
  }
});

export default router;
