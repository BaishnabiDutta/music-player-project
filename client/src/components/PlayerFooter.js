import React, { useState } from "react";
import "./PlayerFooter.css";

import {
  FaPlay,
  FaPause,
  FaStepBackward,
  FaStepForward,
} from "react-icons/fa";

import {
  MdShuffle,
  MdOutlineRepeat,
} from "react-icons/md";

function PlayerFooter({
  currentSong,
  audioRef,
  nextSong,
  prevSong,
  setIsPlaying,
  isPlaying,
  currentTime,
  setCurrentTime,
  duration,
  setDuration,
  isShuffle,
  setIsShuffle,
  repeatMode,
  setRepeatMode,
}) {
  const [volume, setVolume] =
    useState(1);

  // PLAY / PAUSE

  const togglePlay = () => {
    if (
      audioRef.current.paused
    ) {
      audioRef.current.play();
      setIsPlaying(true);
    } else {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  // VOLUME

  const changeVolume = (e) => {
    const value =
      e.target.value;

    setVolume(value);
    audioRef.current.volume =
      value;
  };

  return (
    <div className="player-footer">

      {/* LEFT */}

      <div className="player-song-info">
        <div
          className={`vinyl-disc ${
            isPlaying
              ? "spin"
              : ""
          }`}
        >
          <div className="vinyl-inner"></div>
        </div>

        <div>
          <h3>
            {currentSong.title}
          </h3>

          <p>
            {currentSong.artist}
          </p>
        </div>
      </div>

      {/* CENTER */}

      <div className="player-center">

        {/* CONTROLS */}

        <div className="player-controls">

          {/* SHUFFLE */}

          <button
            className={`icon-btn ${
              isShuffle
                ? "active-icon"
                : ""
            }`}
            onClick={() =>
              setIsShuffle(
                !isShuffle
              )
            }
          >
            <MdShuffle />
          </button>

          {/* PREVIOUS */}

          <button
            className="icon-btn"
            onClick={prevSong}
          >
            <FaStepBackward />
          </button>

          {/* PLAY */}

          <button
            className="play-btn"
            onClick={togglePlay}
          >
            {isPlaying ? (
              <FaPause />
            ) : (
              <FaPlay />
            )}
          </button>

          {/* NEXT */}

          <button
            className="icon-btn"
            onClick={nextSong}
          >
            <FaStepForward />
          </button>

          {/* REPEAT */}

          <button
            className={`icon-btn ${
              repeatMode !==
              "off"
                ? "active-icon"
                : ""
            }`}
            onClick={() => {
              if (
                repeatMode ===
                "off"
              ) {
                setRepeatMode(
                  "all"
                );
              } else if (
                repeatMode ===
                "all"
              ) {
                setRepeatMode(
                  "one"
                );
              } else {
                setRepeatMode(
                  "off"
                );
              }
            }}
          >
            <>
  <MdOutlineRepeat />
  {repeatMode === "one" && (
    <span className="repeat-one">
      1
    </span>
  )}
</>
          </button>

        </div>

        {/* PROGRESS BAR */}

        <div className="progress-container">
          <span>
            {Math.floor(
              currentTime / 60
            )}
            :
            {String(
              Math.floor(
                currentTime %
                  60
              )
            ).padStart(2, "0")}
          </span>

          <input
            type="range"
            min="0"
            max={
              duration || 0
            }
            value={currentTime}
            className="progress-bar"
            onChange={(
              e
            ) => {
              audioRef.current.currentTime =
                e.target.value;

              setCurrentTime(
                e.target.value
              );
            }}
          />

          <span>
            {Math.floor(
              duration / 60
            )}
            :
            {String(
              Math.floor(
                duration % 60
              )
            ).padStart(2, "0")}
          </span>
        </div>
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
          onChange={
            changeVolume
          }
        />
      </div>

      {/* AUDIO */}

      <audio
        ref={audioRef}
        src={currentSong.url}
        autoPlay
        onLoadedMetadata={() =>
          setDuration(
            audioRef.current
              .duration
          )
        }
        onTimeUpdate={() =>
          setCurrentTime(
            audioRef.current
              .currentTime
          )
        }
        onPlay={() =>
          setIsPlaying(true)
        }
        onPause={() =>
          setIsPlaying(false)
        }
        onEnded={() => {
          // REPEAT ONE
          if (
            repeatMode ===
            "one"
          ) {
            audioRef.current.currentTime = 0;
            audioRef.current.play();
            return;
          }

          // NORMAL / REPEAT ALL
          nextSong();
        }}
      />
    </div>
  );
}

export default PlayerFooter;