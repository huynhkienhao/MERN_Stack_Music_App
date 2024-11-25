import Song from "../models/Song.js";
import AdminUser from "../models/AdminUser.js";
import Rating from "../models/Rating.js";
import Comment from "../models/Comment.js";
import mongoose from "mongoose";
import multer from "multer";
import fs from "fs";

// Multer configuration for handling file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Ensure the directory exists and is writable by the server
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname); // Add a unique identifier
  },
});

const uploadStorage = multer({ storage: storage });

// Fetch all songs
export const getSongs = async (req, res) => {
  try {
    const songs = await Song.find();
    res.json(songs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Fetch song details
export const getSongDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const song = await Song.findById(id);
    if (!song) {
      return res.status(404).json({ error: "Song not found" });
    }
    res.status(200).json(song);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create a new song
export const createSongs = async (req, res) => {
  try {
    uploadStorage.fields([
      { name: "song", maxCount: 1 },
      { name: "imgSrc", maxCount: 1 },
    ])(req, res, async (err) => {
      if (err) {
        return res.status(400).json({ error: err.message });
      }

      const { favourite, category, type, songName, artist, color } = req.body;
      if (!req.files) {
        return res.status(400).json({ error: "No files uploaded" });
      }

      const songFilePath = req.files["song"][0].path;
      const imgFilePath = req.files["imgSrc"][0].path;

      const song = new Song({
        favourite,
        category,
        type,
        songName,
        artist,
        song: songFilePath,
        imgSrc: imgFilePath,
        color,
      });

      const savedSong = await song.save();
      res.status(201).json(savedSong);
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Add or update a rating
export const addOrUpdateRating = async (req, res) => {
  try {
    const { userId, score } = req.body;
    const songId = req.params.songId;

    const userObjectId = new mongoose.Types.ObjectId(userId);
    const songObjectId = new mongoose.Types.ObjectId(songId);

    const existingRating = await Rating.findOne({
      user: userObjectId,
      song: songObjectId,
    });

    if (existingRating) {
      existingRating.score = score;
      await existingRating.save();
    } else {
      const newRating = new Rating({
        user: userObjectId,
        song: songObjectId,
        score,
      });
      await newRating.save();
    }

    res.status(201).json({ message: "Rating updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Add a comment
export const addComment = async (req, res) => {
  try {
    const { userId, content } = req.body;
    const songId = req.params.songId;

    const newComment = new Comment({
      user: userId,
      song: songId,
      content,
    });

    const savedComment = await newComment.save();
    res.status(201).json({ comment: savedComment });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
