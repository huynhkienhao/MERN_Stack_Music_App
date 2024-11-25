import express from "express";
import playlistRouter from "./PlaylistRoutes.js";

const router = express.Router();

// Kết hợp các route
router.use("/playlists", playlistRouter);

export default router;
