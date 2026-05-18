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
  const songId =
    song._id || song.id;

  return (
    <div className="song-row">
      {/* LEFT */}
      <div className="song-left">
        {/* MUSIC ICON */}
        <div className="music-icon">
          🎵
        </div>

        <div>
          <h3>
            {song.title}
          </h3>

          <p>
            {song.artist}
          </p>
        </div>
      </div>

      {/* RIGHT */}
      <div className="song-right">
        <span>
          {song.genre}
        </span>

        {/* PLAY */}
        <button
          onClick={() =>
            onPlay(song)
          }
        >
          {(
            currentSong?._id ||
            currentSong?.id
          ) === songId &&
          isPlaying
            ? "⏸"
            : "▶"}
        </button>

        {/* LIKE */}
        <button
          onClick={() =>
            toggleLike(song)
          }
        >
          {likedSongs.includes(
            songId
          )
            ? "❤️"
            : "🤍"}
        </button>

        {/* ADD TO PLAYLIST */}
        <button
          onClick={() =>
            addToPlaylist(
              song
            )
          }
        >
          ➕
        </button>
      </div>
    </div>
  );
}

export default SongRow;