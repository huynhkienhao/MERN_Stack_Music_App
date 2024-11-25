import express from "express";
import {
    getSongs,
    getSongDetails,
    createSongs,
    addOrUpdateRating,
    addComment,
} from "../controllers/SongController.js";

const router = express.Router();

// Routes for song-related actions
router.get("/songs", getSongs);
router.get("/getsongs/:id", getSongDetails);
router.post("/song", createSongs);
router.post("/song/:songId/rating", addOrUpdateRating);
router.post("/song/:songId/comment", addComment);

export default router;
