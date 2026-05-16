import React, { useState } from "react";

import "./PlayerFooter.css";

function PlayerFooter({
  currentSong,
  audioRef,
  nextSong,
  prevSong,
  setIsPlaying,
  isPlaying,
}) {
  const [volume, setVolume] = useState(1);

  // PLAY / PAUSE

  const togglePlay = () => {
    if (audioRef.current.paused) {
      audioRef.current.play();

      setIsPlaying(true);
    } else {
      audioRef.current.pause();

      setIsPlaying(false);
    }
  };

  // VOLUME

  const changeVolume = (e) => {
    const value = e.target.value;

    setVolume(value);

    audioRef.current.volume = value;
  };

  return (
    <div className="player-footer">
      {/* SONG INFO */}

      <div className="player-song-info">
        <img
          src="https://images.unsplash.com/photo-1501386761578-eac5c94b800a"
          alt="cover"
        />

        <div>
          <h3>{currentSong.title}</h3>

          <p>{currentSong.artist}</p>
        </div>
      </div>

      {/* CONTROLS */}

      <div className="player-controls">
        <button onClick={prevSong}>⏮</button>

        <button className="play-btn" onClick={togglePlay}>
          {isPlaying ? "⏸" : "▶"}
        </button>

        <button onClick={nextSong}>⏭</button>
      </div>

      {/* VOLUME */}

      <div className="volume-section">
        🔊
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={changeVolume}
        />
      </div>

      {/* AUDIO */}

      <audio
        ref={audioRef}
        src={currentSong.url}
        autoPlay
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onEnded={nextSong}
      />
    </div>
  );
}

export default PlayerFooter;
