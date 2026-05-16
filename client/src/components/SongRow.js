import React from "react";

import "./SongRow.css";

function SongRow({
  song,
  onPlay,
  currentSong,
  isPlaying,
  likedSongs,
  toggleLike,
  addToPlaylist,
}) {
  return (
    <div className="song-row">
      {/* LEFT */}

      <div className="song-left">
        <img
          src="https://images.unsplash.com/photo-1501386761578-eac5c94b800a"
          alt="cover"
        />

        <div>
          <h3>{song.title}</h3>

          <p>{song.artist}</p>
        </div>
      </div>

      {/* RIGHT */}

      <div className="song-right">
        <span>{song.genre}</span>

        {/* PLAY */}

        <button onClick={() => onPlay(song)}>
          {currentSong?.id === song.id && isPlaying ? "⏸" : "▶"}
        </button>

        {/* LIKE */}

        <button onClick={() => toggleLike(song.id)}>
          {likedSongs.includes(song.id) ? "❤️" : "🤍"}
        </button>

        {/* ADD TO PLAYLIST */}

        <button onClick={() => addToPlaylist(song)}>➕</button>
      </div>
    </div>
  );
}

export default SongRow;
