import React, { useState } from "react";

import "./PlayerFooter.css";

import {
  FaPlay,
  FaPause,
  FaStepBackward,
  FaStepForward,
  FaVolumeUp,
  FaVolumeMute,
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

  const [previousVolume, setPreviousVolume] =
    useState(1);

  const [isMuted, setIsMuted] =
    useState(false);

  // PLAY / PAUSE

  const togglePlay = () => {
    if (!audioRef.current) return;

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

  const changeVolume = (
    e
  ) => {
    const value =
      parseFloat(
        e.target.value
      );

    setVolume(value);

    if (
      audioRef.current
    ) {
      audioRef.current.volume =
        value;
    }

    if (value > 0) {
      setPreviousVolume(
        value
      );

      setIsMuted(false);
    } else {
      setIsMuted(true);
    }
  };

  // MUTE / UNMUTE

  const toggleMute = () => {
    if (
      !audioRef.current
    )
      return;

    if (isMuted) {
      audioRef.current.volume =
        previousVolume;

      setVolume(
        previousVolume
      );

      setIsMuted(false);
    } else {
      setPreviousVolume(
        volume
      );

      audioRef.current.volume =
        0;

      setVolume(0);

      setIsMuted(true);
    }
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
            {currentSong?.title ||
              "No song selected"}
          </h3>

          <p>
            {currentSong?.artist ||
              "Unknown artist"}
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
            onClick={
              togglePlay
            }
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

              {repeatMode ===
                "one" && (
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
            ).padStart(
              2,
              "0"
            )}
          </span>

          <input
            type="range"
            min="0"
            max={
              duration || 0
            }
            value={
              currentTime
            }
            className="progress-bar"
            onChange={(
              e
            ) => {
              if (
                audioRef.current
              ) {
                audioRef.current.currentTime =
                  e.target.value;
              }

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
                duration %
                  60
              )
            ).padStart(
              2,
              "0"
            )}
          </span>
        </div>
      </div>

      {/* VOLUME */}

      <div className="volume-section">
        <button
          className="volume-btn"
          onClick={
            toggleMute
          }
        >
          {isMuted ? (
            <FaVolumeMute />
          ) : (
            <FaVolumeUp />
          )}
        </button>

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
        src={
  currentSong?.url
    ? `http://localhost:5000/uploads/${currentSong.url}`: ""
  }
        autoPlay
        onLoadedMetadata={() => {
          if (
            audioRef.current
          ) {
            setDuration(
              audioRef.current
                .duration
            );
          }
        }}
        onTimeUpdate={() => {
          if (
            audioRef.current
          ) {
            setCurrentTime(
              audioRef.current
                .currentTime
            );
          }
        }}
        onPlay={() =>
          setIsPlaying(
            true
          )
        }
        onPause={() =>
          setIsPlaying(
            false
          )
        }
        onEnded={() => {
          if (
            repeatMode ===
            "one"
          ) {
            if (
              audioRef.current
            ) {
              audioRef.current.currentTime =
                0;

              audioRef.current.play();
            }

            return;
          }

          nextSong();
        }}
      />
    </div>
  );
}

export default PlayerFooter;