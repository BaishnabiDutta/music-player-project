import { toast } from "react-toastify";
import React, { useEffect, useState, useRef } from "react";

import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import SongRow from "../components/SongRow";
import PlaylistCard from "../components/PlaylistCard";
import PlayerFooter from "../components/PlayerFooter";
import LoginModal from "../components/LoginModal";

import "./MusicPlayer.css";


function MusicPlayer() {
  const [songs, setSongs] = useState([]);
  const [currentSong, setCurrentSong] = useState(null);

  const [search, setSearch] = useState("");
  const [likedSongs, setLikedSongs] = useState([]);

  const [selectedGenre, setSelectedGenre] = useState("All");

  const [activeSection, setActiveSection] = useState("home");

  const [playlists, setPlaylists] = useState([]);
  const [openedPlaylist, setOpenedPlaylist] = useState(null);

  

  const [showAddToPlaylistModal, setShowAddToPlaylistModal] =
    useState(false);

    const [showCreatePlaylistModal,
  setShowCreatePlaylistModal] =
  useState(false);

const [playlistName,
  setPlaylistName] =
  useState("");

  const [selectedPlaylist, setSelectedPlaylist] =
    useState("");

  const [selectedSong, setSelectedSong] =
    useState(null);

  const [isLoggedIn, setIsLoggedIn] =
    useState(false);

  const [showLogin, setShowLogin] =
    useState(false);

  const audioRef = useRef(null);

  const [isPlaying, setIsPlaying] =
    useState(false);

  const [currentTime, setCurrentTime] =
    useState(0);

  const [duration, setDuration] =
    useState(0);

  const [isShuffle, setIsShuffle] =
    useState(false);

  const [repeatMode, setRepeatMode] =
    useState("off");

  // FETCH SONGS
  useEffect(() => {
    fetch("http://localhost:5000/api/songs")
      .then((res) => res.json())
      .then((data) => setSongs(data))
      .catch((err) => console.log(err));
  }, []);

  // LOGIN CHECK
  useEffect(() => {
    const token =
      localStorage.getItem("token");

    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  // FAVORITES
  useEffect(() => {
    const savedFavorites =
      JSON.parse(
        localStorage.getItem(
          "likedSongs"
        )
      ) || [];

    setLikedSongs(savedFavorites);
  }, []);

  // PLAY SONG
  const playSong = (song) => {
  const songId =
    song._id || song.id;

  const currentSongId =
    currentSong?._id ||
    currentSong?.id;

  // SAME SONG = TOGGLE
  if (
    currentSongId ===
      songId &&
    audioRef.current
  ) {
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }

    return;
  }

  // NEW SONG
  setCurrentSong(song);
};

  // AUTO PLAY WHEN SONG CHANGES
  useEffect(() => {
  if (
    currentSong &&
    audioRef.current
  ) {
    audioRef.current.pause();

    audioRef.current.src =
      `http://localhost:5000/uploads/${currentSong.url}`;

    audioRef.current.load();

    audioRef.current
      .play()
      .then(() => {
        setIsPlaying(true);
      })
      .catch((err) =>
        console.log(err)
      );
  }
}, [currentSong]);

  // FAVORITES API
  const addToFavorites =
    async (song) => {
      const email =
        localStorage.getItem(
          "email"
        );

      if (!email) {
        setShowLogin(true);
        return;
      }

      try {
        await fetch(
          "http://localhost:5000/api/users/favorite",
          {
            method: "POST",
            headers: {
              "Content-Type":
                "application/json",
            },
            body: JSON.stringify({
              email,
              song,
            }),
          }
        );
      } catch (error) {
        console.log(error);
      }
    };

  // TOGGLE LIKE
  const toggleLike =
    async (song) => {
      if (!isLoggedIn) {
        setShowLogin(true);
        return;
      }

      const songId =
        song._id || song.id;

      let updatedLikes = [];

      setLikedSongs((prev) => {
        const alreadyLiked =
          prev.includes(songId);

        updatedLikes =
          alreadyLiked
            ? prev.filter(
                (id) =>
                  id !== songId
              )
            : [
                ...prev,
                songId,
              ];

        localStorage.setItem(
          "likedSongs",
          JSON.stringify(
            updatedLikes
          )
        );

        return updatedLikes;
      });

      if (
        !likedSongs.includes(songId)
      ) {
        await addToFavorites(song);
      }
    };

  

  // ADD TO PLAYLIST
  const addToPlaylist = (
    song
  ) => {
    if (
      playlists.length === 0
    ) {
      toast.info(
        "Create a playlist first 🎵"
      );
      return;
    }

    setSelectedSong(song);
    setShowAddToPlaylistModal(
      true
    );
  };

  // CONFIRM PLAYLIST
  const confirmAddToPlaylist =
    () => {
      if (
        !selectedPlaylist
      ) {
        toast.error(
          "Select a playlist"
        );
        return;
      }

      const updatedPlaylists =
        playlists.map((p) => {
          if (
            p.name ===
            selectedPlaylist
          ) {
            return {
              ...p,
              songs: [
                ...p.songs,
                selectedSong,
              ],
            };
          }

          return p;
        });

      setPlaylists(
        updatedPlaylists
      );

      toast.success(
        "Song added to playlist 🎶"
      );

      setSelectedPlaylist("");
      setSelectedSong(null);
      setShowAddToPlaylistModal(
        false
      );
    };


    // CREATE PLAYLIST
const createPlaylist =
  () => {
    if (
      !playlistName.trim()
    ) {
      toast.error(
        "Enter playlist name"
      );
      return;
    }

    const newPlaylist = {
      id: Date.now(),
      name:
        playlistName.trim(),
      songs: [],
    };

    setPlaylists(
      (prev) => [
        ...prev,
        newPlaylist,
      ]
    );

    toast.success(
      "Playlist Created 🎶"
    );

    setPlaylistName("");
    setShowCreatePlaylistModal(
      false
    );
  };
  // NEXT SONG
  const nextSong = () => {
  if (!currentSong)
    return;

  const currentIndex =
    songs.findIndex(
      (song) =>
        (song._id ||
          song.id) ===
        (currentSong._id ||
          currentSong.id)
    );

  const nextIndex =
    currentIndex ===
    songs.length - 1
      ? 0
      : currentIndex + 1;

  setCurrentSong(
    songs[nextIndex]
  );
};
  // PREVIOUS SONG
  const prevSong = () => {
  if (!currentSong)
    return;

  const currentIndex =
    songs.findIndex(
      (song) =>
        (song._id ||
          song.id) ===
        (currentSong._id ||
          currentSong.id)
    );

  const prevIndex =
    currentIndex === 0
      ? songs.length - 1
      : currentIndex - 1;

  setCurrentSong(
    songs[prevIndex]
  );
};

  // FILTER SONGS
  const filteredSongs =
    songs.filter((song) => {
      const matchesSearch =
        song.title
          .toLowerCase()
          .includes(
            search.toLowerCase()
          );

      const matchesGenre =
        selectedGenre ===
          "All" ||
        song.genre ===
          selectedGenre;

      return (
        matchesSearch &&
        matchesGenre
      );
    });

  return (
  <div className="music-player-container">
    <Sidebar
      activeSection={activeSection}
      setActiveSection={setActiveSection}
    />

    <div className="main-content">
      <Topbar
        search={search}
        setSearch={setSearch}
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
      />

      {/* GENRES */}

      {(activeSection === "home" ||
        activeSection === "favorites") && (
        <>
          <div className="genres">
            {[
              "All",
              "Pop",
              "Hip-Hop",
              "EDM",
              "Lo-fi",
              "K-Pop",
              "R&B",
            ].map((genre) => (
              <button
                key={genre}
                className={
                  selectedGenre ===
                  genre
                    ? "active-genre"
                    : ""
                }
                onClick={() =>
                  setSelectedGenre(
                    genre
                  )
                }
              >
                {genre}
              </button>
            ))}
          </div>

          {/* TITLE */}

          <div className="section-header">
            <h2>
              {activeSection ===
              "favorites"
                ? "Favorite Songs"
                : "Trending Songs"}
            </h2>
          </div>

          {/* SONGS */}

          <div className="songs-list">
            {(activeSection ===
            "favorites"
              ? filteredSongs.filter(
                  (song) =>
                    likedSongs.includes(
                      song._id ||
                        song.id
                    )
                )
              : filteredSongs
            ).map((song) => (
              <SongRow
                key={
                  song._id ||
                  song.id
                }
                song={song}
                onPlay={playSong}
                currentSong={
                  currentSong
                }
                isPlaying={
                  isPlaying
                }
                likedSongs={
                  likedSongs
                }
                toggleLike={
                  toggleLike
                }
                addToPlaylist={
                  addToPlaylist
                }
              />
            ))}
          </div>
        </>
      )}

      {/* PLAYLISTS */}

{activeSection === "playlists" && (
  <div style={{ width: "100%" }}>
    {!openedPlaylist ? (
      <>
        <div className="playlist-header">
          <h2>
            Your Playlists
          </h2>

          <button
  className="create-playlist-btn"
  onClick={() =>
    setShowCreatePlaylistModal(
      true
    )
  }
>
  + Create Playlist
</button>
        </div>

        {playlists.length ===
        0 ? (
          <p className="empty-playlist">
            No playlists yet
          </p>
        ) : (
          <div className="songs-grid">
            {playlists.map(
              (
                playlist
              ) => (
                <PlaylistCard
                  key={
                    playlist.id
                  }
                  playlist={
                    playlist
                  }
                  setOpenedPlaylist={
                    setOpenedPlaylist
                  }
                />
              )
            )}
          </div>
        )}
      </>
    ) : (
      <>
        <div className="playlist-top">
          <button
            className="back-btn"
            onClick={() =>
              setOpenedPlaylist(
                null
              )
            }
          >
            ← Back
          </button>

          <div>
            <h2>
              {
                openedPlaylist.name
              }
            </h2>

            <p className="playlist-count">
              {
                openedPlaylist
                  .songs.length
              }{" "}
              songs
            </p>
          </div>
        </div>

        <div className="songs-list">
          {openedPlaylist
            .songs.length ===
          0 ? (
            <p className="empty-playlist">
              No songs added
            </p>
          ) : (
            openedPlaylist.songs.map(
              (song) => (
                <SongRow
                  key={
                    song._id ||
                    song.id
                  }
                  song={song}
                  onPlay={
                    playSong
                  }
                  currentSong={
                    currentSong
                  }
                  isPlaying={
                    isPlaying
                  }
                  likedSongs={
                    likedSongs
                  }
                  toggleLike={
                    toggleLike
                  }
                  addToPlaylist={
                    addToPlaylist
                  }
                />
              )
            )
          )}
        </div>
      </>
    )}
  </div>
)}
<p className="copyright">
  © Algorythm 2026
</p>
</div>

{/* ADD TO PLAYLIST MODAL */}

{showAddToPlaylistModal && (
  <div className="playlist-modal-overlay">
    <div className="playlist-modal">
      <h2>
        Add To Playlist
      </h2>

      <select
        value={
          selectedPlaylist
        }
        onChange={(e) =>
          setSelectedPlaylist(
            e.target.value
          )
        }
      >
        <option value="">
          Select Playlist
        </option>

        {playlists.map(
          (
            playlist
          ) => (
            <option
              key={
                playlist.id
              }
              value={
                playlist.name
              }
            >
              {playlist.name}
            </option>
          )
        )}
      </select>

      <div className="playlist-modal-buttons">
        <button
          className="playlist-create-btn"
          onClick={
            confirmAddToPlaylist
          }
        >
          Add
        </button>

        <button
          className="playlist-cancel-btn"
          onClick={() => {
            setShowAddToPlaylistModal(
              false
            );
            setSelectedPlaylist(
              ""
            );
            setSelectedSong(
              null
            );
          }}
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
)}
{/* CREATE PLAYLIST MODAL */}

{showCreatePlaylistModal && (
  <div className="playlist-modal-overlay">
    <div className="playlist-modal">

      <h2>
        Create Playlist
      </h2>

      <input
        type="text"
        placeholder="Enter playlist name"
        value={
          playlistName
        }
        onChange={(e) =>
          setPlaylistName(
            e.target.value
          )
        }
      />

      <div className="playlist-modal-buttons">

        <button
          className="playlist-create-btn"
          onClick={
            createPlaylist
          }
        >
          Create
        </button>

        <button
          className="playlist-cancel-btn"
          onClick={() => {
            setShowCreatePlaylistModal(
              false
            );

            setPlaylistName(
              ""
            );
          }}
        >
          Cancel
        </button>

      </div>
    </div>
  </div>
)}
    {/* PLAYER */}

    {currentSong && (
      <PlayerFooter
        key={
          currentSong?._id
        }
        currentSong={
          currentSong
        }
        audioRef={
          audioRef
        }
        nextSong={
          nextSong
        }
        prevSong={
          prevSong
        }
        setIsPlaying={
          setIsPlaying
        }
        isPlaying={
          isPlaying
        }
        currentTime={
          currentTime
        }
        setCurrentTime={
          setCurrentTime
        }
        duration={
          duration
        }
        setDuration={
          setDuration
        }
        isShuffle={
          isShuffle
        }
        setIsShuffle={
          setIsShuffle
        }
        repeatMode={
          repeatMode
        }
        setRepeatMode={
          setRepeatMode
        }
      />
    )}

    {/* LOGIN MODAL */}

    {showLogin && (
      <LoginModal
        onClose={() =>
          setShowLogin(false)
        }
      />
    )}
  </div>
);
}

export default MusicPlayer;