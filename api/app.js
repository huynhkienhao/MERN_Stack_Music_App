import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

// Định nghĩa __dirname cho ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Import các module do bạn tự viết
import User from "./models/AdminUser.js";
import Favorites from "./models/Favorites.js";
import Song from "./models/Song.js";
import Category from "./models/Category.js";
import adminRouter from "./routes/auth.js";
import categoryRouter from "./routes/category.js";
import songRouter from "./routes/song.js";
import favoriteRouter from "./routes/favorite.js";
import playListRouter from "./routes/PlaylistRoutes.js";

// Nạp biến môi trường
dotenv.config();

// Khởi tạo ứng dụng Express
const app = express();

// Cấu hình middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use("/uploads", express.static(__dirname + "/uploads"));

// Kết nối MongoDB
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection.on("connected", () => {
  console.log("Connected to MongoDB");
});

// Định nghĩa route API
app.get("/api/getAdminProfile", async (req, res) => {
  try {
    const adminProfile = await User.findOne();
    if (adminProfile) {
      res.json({
        AdminProfile: adminProfile,
        successMsg: "Retrieved successfully",
      });
    } else {
      res.status(500).json({ errorMsg: "Failed to retrieve admin profile" });
    }
  } catch (error) {
    res.status(500).json({ errorMsg: "Error retrieving admin profile" });
  }
});

const suggestedSongs = [
  {
    songName: "Song 1",
    artist: "Artist 1",
    song: "song1.mp3",
    imgSrc: "song1.jpg",
  },
  {
    songName: "Song 2",
    artist: "Artist 2",
    song: "song2.mp3",
    imgSrc: "song2.jpg",
  },
  {
    songName: "Song 3",
    artist: "Artist 3",
    song: "song3.mp3",
    imgSrc: "song3.jpg",
  },
];

// Tạo API cho danh sách gợi ý
app.get("/api/suggested-songs", (req, res) => {
  res.json(suggestedSongs);
});

// Thêm các router
app.use("/api", adminRouter);
app.use("/api", songRouter);
app.use("/api", categoryRouter);
app.use("/api", favoriteRouter);
app.use("/api", playListRouter);

// Khởi động server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;
