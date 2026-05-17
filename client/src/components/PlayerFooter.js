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
      {/* LEFT */}

      <div className="player-song-info">
        <div className={`vinyl-disc ${isPlaying ? "spin" : ""}`}>
          <div className="vinyl-inner"></div>
        </div>

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

      {/* WAVEFORM */}

      <div className="waveform">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
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
