import Playlist from "../models/Playlist.js";
import Song from "../models/Song.js"; // Assuming you have a Song model

// Tạo mới một playlist
export const createPlaylist = async (req, res) => {
  try {
    const { userId, name } = req.body;
    const playlist = new Playlist({ userId, name });
    const savedPlaylist = await playlist.save();
    res.status(201).json(savedPlaylist);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Lấy tất cả playlist của người dùng
export const getUserPlaylists = async (req, res) => {
  try {
    const { userId } = req.params;
    const playlists = await Playlist.find({ userId }).populate("songs");
    res.status(200).json(playlists);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Lấy tất cả bài hát theo thể loại
export const getSongsByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const songs = await Song.find({ category });
    res.status(200).json(songs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Lấy danh sách các bài hát trong một playlist cụ thể
export const getPlaylistSongs = async (req, res) => {
  try {
    const { playlistId } = req.params;
    const playlist = await Playlist.findById(playlistId).populate("songs");
    if (!playlist) {
      return res.status(404).json({ message: "Playlist không tồn tại" });
    }
    res.status(200).json(playlist.songs);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Lỗi khi lấy danh sách bài hát từ playlist" });
  }
};

// Xóa bài hát khỏi playlist
export const removeSongFromPlaylist = async (req, res) => {
  const { playlistId, songId } = req.body;

  try {
    const playlist = await Playlist.findById(playlistId);
    if (!playlist) {
      return res.status(404).json({ message: "Playlist không tồn tại" });
    }

    playlist.songs = playlist.songs.filter(
      (song) => song.toString() !== songId
    );
    await playlist.save();
    res.status(200).json(playlist);
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi xóa bài hát khỏi playlist" });
  }
};

// Tìm kiếm bài hát
export const searchSongs = async (req, res) => {
  try {
    const { query } = req.query;
    const songs = await Song.find({ title: { $regex: query, $options: "i" } });
    res.status(200).json(songs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Thêm bài hát vào playlist
export const addSongToPlaylist = async (req, res) => {
  const { playlistId, songId } = req.body;

  try {
    const playlist = await Playlist.findById(playlistId);
    if (!playlist) {
      return res.status(404).json({ message: "Playlist không tồn tại" });
    }

    if (playlist.songs.includes(songId)) {
      return res
        .status(400)
        .json({ message: "Bài hát đã tồn tại trong playlist" });
    }

    playlist.songs.push(songId);
    await playlist.save();
    res.status(200).json(playlist);
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi thêm bài hát vào playlist" });
  }
};
