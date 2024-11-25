import express from "express";
import jwt from "jsonwebtoken";
import User from "../models/AdminUser.js";

const router = express.Router();

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Email hoặc mật khẩu không đúng!" });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: "Email hoặc mật khẩu không đúng!" });
    }

    const token = jwt.sign(
      { userId: user._id, role: user.role },
      "secretKey",
      { expiresIn: "1h" }
    );

    res.json({
      token,
      role: user.role,
      message: user.role === "admin" ? "Đăng nhập admin thành công!" : "Đăng nhập người dùng thành công!",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Lỗi máy chủ" });
  }
});

export default router;
