import React, { useState, useEffect } from "react";

function AddToPlaylist({ songId }) {
  const [playlists, setPlaylists] = useState([]);
  const userId = JSON.parse(localStorage.getItem("user")).id;

  useEffect(() => {
    const fetchPlaylists = async () => {
      try {
        const response = await fetch(
          `http://localhost:4000/api/playlists/${userId}`
        );
        const data = await response.json();
        setPlaylists(data);
      } catch (error) {
        console.error("Lỗi khi lấy playlist:", error);
      }
    };
    fetchPlaylists();
  }, [userId]);

  const addToPlaylist = async (playlistId) => {
    try {
      await fetch("http://localhost:4000/api/playlist/add-song", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ playlistId, songId }),
      });
      alert("Đã thêm bài hát vào playlist");
    } catch (error) {
      console.error("Lỗi khi thêm bài hát vào playlist:", error);
    }
  };

  return (
    <div>
      <h3>Thêm vào Playlist</h3>
      <ul>
        {playlists.map((playlist) => (
          <li key={playlist._id}>
            {playlist.name}
            <button onClick={() => addToPlaylist(playlist._id)}>Thêm</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AddToPlaylist;
