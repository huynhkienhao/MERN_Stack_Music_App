import express from "express";
import AdminUser from "../models/AdminUser.js";
import verifyToken from "../middleware/verifyToken.js";

const router = express.Router();

router.get("/listening-history", verifyToken, async (req, res) => {
    try {
        const userId = req.user._id;
        const admin = await AdminUser.findById(userId).populate("listeningHistory.song");

        if (!admin) {
            return res.status(404).json({ error: "Không tìm thấy người dùng" });
        }

        res.status(200).json({ listeningHistory: admin.listeningHistory });
    } catch (error) {
        console.error("Lỗi khi lấy lịch sử nghe nhạc:", error);
        res.status(500).json({ error: "Lỗi máy chủ" });
    }
});

export default router;
