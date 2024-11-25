import express from "express";
import {
    createPlaylist,
    getUserPlaylists,
    getSongsByCategory,
    searchSongs,
    addSongToPlaylist,
    getPlaylistSongs,
    removeSongFromPlaylist,
} from "../controllers/PlaylistController.js";

const router = express.Router();

router.post("/playlist", createPlaylist);
router.get("/playlists/:userId", getUserPlaylists);
router.get("/songs/:category", getSongsByCategory);
router.get("/songs/search", searchSongs);
router.post("/playlist/add-song", addSongToPlaylist);
router.get("/playlists/:playlistId/songs", getPlaylistSongs);
router.post("/playlist/remove-song", removeSongFromPlaylist);

export default router;
