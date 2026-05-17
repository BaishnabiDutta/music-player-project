import React from "react";

import "./PlaylistCard.css";

function PlaylistCard({ playlist, setOpenedPlaylist }) {
  return (
    <div className="playlist-card" onClick={() => setOpenedPlaylist(playlist)}>
      <div className="playlist-music-icon">
  🎵
</div>

      <h3>{playlist.name}</h3>

      <p>{playlist.songs.length} songs</p>

      <div className="playlist-song-preview">
        {playlist.songs.slice(0, 3).map((song) => (
          <div key={song.id}>🎵 {song.title}</div>
        ))}
      </div>
    </div>
  );
}

export default PlaylistCard;
