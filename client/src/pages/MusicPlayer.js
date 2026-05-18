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
  // SONGS
  const [songs, setSongs] = useState([]);

  // CURRENT SONG
  const [currentSong, setCurrentSong] = useState(null);

  // SEARCH
  const [search, setSearch] = useState("");

  // FAVORITES
  const [likedSongs, setLikedSongs] = useState([]);

  // GENRES
  const [selectedGenre, setSelectedGenre] = useState("All");

  // SIDEBAR SECTION
  const [activeSection, setActiveSection] = useState("home");

  // PLAYLISTS
  const [playlists, setPlaylists] = useState([]);

  // OPENED PLAYLIST
  const [openedPlaylist, setOpenedPlaylist] = useState(null);

  // CREATE PLAYLIST MODAL
  const [showPlaylistModal, setShowPlaylistModal] = useState(false);

  const [playlistName, setPlaylistName] = useState("");

  // ADD TO PLAYLIST MODAL
  const [showAddToPlaylistModal, setShowAddToPlaylistModal] = useState(false);

  const [selectedPlaylist, setSelectedPlaylist] = useState("");

  const [selectedSong, setSelectedSong] = useState(null);

  // LOGIN STATE
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [showLogin, setShowLogin] = useState(false);

  // AUDIO REF
  const audioRef = useRef(null);

  // PLAY STATE
  const [isPlaying, setIsPlaying] = useState(false);

  const [currentTime, setCurrentTime] = useState(0);

  const [duration, setDuration] = useState(0);

  const [isShuffle, setIsShuffle] = useState(false);

  const [repeatMode, setRepeatMode] = useState("off");

  // FETCH SONGS

  useEffect(() => {
    fetch("http://localhost:5000/songs")
      .then((res) => res.json())
      .then((data) => setSongs(data))
      .catch((err) => console.log(err));
  }, []);

  // CHECK LOGIN

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  // LOAD FAVORITES

  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem("likedSongs")) || [];

    setLikedSongs(savedFavorites);
  }, []);

  // PLAY SONG

  const playSong = (song) => {
    if (currentSong?.id === song.id && audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();

        setIsPlaying(false);
      } else {
        audioRef.current.play();

        setIsPlaying(true);
      }

      return;
    }

    setCurrentSong(song);

    setIsPlaying(true);
  };

  // ADD TO FAVORITES

  const addToFavorites = async (song) => {
    const email = localStorage.getItem("email");

    if (!email) {
      setShowLogin(true);

      return;
    }

    try {
      await fetch("http://localhost:5000/api/users/favorite", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          email,
          song,
        }),
      });
    } catch (error) {
      console.log(error);
    }
  };

  // TOGGLE LIKE

  const toggleLike = async (song) => {
    if (!isLoggedIn) {
      setShowLogin(true);

      return;
    }

    const songId = song._id || song.id;

    let updatedLikes = [];

    setLikedSongs((prev) => {
      const alreadyLiked = prev.includes(songId);

      updatedLikes = alreadyLiked
        ? prev.filter((id) => id !== songId)
        : [...prev, songId];

      localStorage.setItem("likedSongs", JSON.stringify(updatedLikes));

      return updatedLikes;
    });

    if (!likedSongs.includes(songId)) {
      await addToFavorites(song);
    }
  };

  // CREATE PLAYLIST

  const createPlaylist = () => {
    if (!playlistName.trim()) {
      toast.error("Enter playlist name");

      return;
    }

    const newPlaylist = {
      id: Date.now(),

      name: playlistName,

      songs: [],
    };

    setPlaylists((prev) => [...prev, newPlaylist]);

    toast.success("Playlist Created 🎶");

    setPlaylistName("");

    setShowPlaylistModal(false);
  };

  // ADD TO PLAYLIST

  const addToPlaylist = (song) => {
    if (playlists.length === 0) {
      toast.info("Create a playlist first 🎵");

      return;
    }

    setSelectedSong(song);

    setShowAddToPlaylistModal(true);
  };

  // CONFIRM ADD TO PLAYLIST

  const confirmAddToPlaylist = () => {
    if (!selectedPlaylist) {
      toast.error("Select a playlist");

      return;
    }

    const playlist = playlists.find((p) => p.name === selectedPlaylist);

    if (!playlist) {
      toast.error("Playlist not found");

      return;
    }

    const updatedPlaylists = playlists.map((p) => {
      if (p.name === selectedPlaylist) {
        return {
          ...p,

          songs: [...p.songs, selectedSong],
        };
      }

      return p;
    });

    setPlaylists(updatedPlaylists);

    // LIVE UPDATE

    if (openedPlaylist && openedPlaylist.name === selectedPlaylist) {
      setOpenedPlaylist({
        ...playlist,

        songs: [...playlist.songs, selectedSong],
      });
    }

    toast.success("Song added to playlist 🎶");

    setSelectedPlaylist("");

    setSelectedSong(null);

    setShowAddToPlaylistModal(false);
  };

  // NEXT SONG

  const nextSong = () => {
    if (!currentSong) return;

    if (isShuffle) {
      let randomIndex;

      do {
        randomIndex = Math.floor(Math.random() * songs.length);
      } while (songs[randomIndex].id === currentSong.id && songs.length > 1);

      setCurrentSong(songs[randomIndex]);

      setIsPlaying(true);

      return;
    }

    const currentSongIndex = songs.findIndex(
      (song) => song.id === currentSong.id,
    );

    const nextIndex =
      currentSongIndex === songs.length - 1 ? 0 : currentSongIndex + 1;

    setCurrentSong(songs[nextIndex]);

    setIsPlaying(true);
  };

  // PREVIOUS SONG

  const prevSong = () => {
    if (!currentSong) return;

    const currentSongIndex = songs.findIndex(
      (song) => song.id === currentSong.id,
    );

    const prevIndex =
      currentSongIndex === 0 ? songs.length - 1 : currentSongIndex - 1;

    setCurrentSong(songs[prevIndex]);

    setIsPlaying(true);
  };

  // FILTER SONGS

  const filteredSongs = songs.filter((song) => {
    const matchesSearch = song.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesGenre =
      selectedGenre === "All" || song.genre === selectedGenre;

    return matchesSearch && matchesGenre;
  });

  return (
    <div
      className={`music-player-container ${
        currentSong?.genre?.toLowerCase().replace(" ", "-") || ""
      }`}
    >
      {/* SIDEBAR */}

      <Sidebar
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />

      {/* MAIN CONTENT */}

      <div className="main-content">
        {/* TOPBAR */}

        <Topbar
          search={search}
          setSearch={setSearch}
          isLoggedIn={isLoggedIn}
          setIsLoggedIn={setIsLoggedIn}
        />

        {/* HOME + FAVORITES */}

        {(activeSection === "home" || activeSection === "favorites") && (
          <>
            {/* GENRES */}

            <div className="genres">
              {["All", "Pop", "Hip-Hop", "EDM", "Lo-fi", "K-Pop", "R&B"].map(
                (genre) => (
                  <button
                    key={genre}
                    className={selectedGenre === genre ? "active-genre" : ""}
                    onClick={() => setSelectedGenre(genre)}
                  >
                    {genre}
                  </button>
                ),
              )}
            </div>

            {/* SECTION TITLE */}

            <div className="section-header">
              <h2>
                {activeSection === "favorites"
                  ? "Favorite Songs"
                  : "Trending Songs"}
              </h2>
            </div>

            {/* SONGS */}

            <div className="songs-list">
              {(activeSection === "favorites"
                ? filteredSongs.filter((song) =>
                    likedSongs.includes(song._id || song.id),
                  )
                : filteredSongs
              ).map((song) => (
                <SongRow
                  key={song._id || song.id}
                  song={song}
                  onPlay={playSong}
                  currentSong={currentSong}
                  isPlaying={isPlaying}
                  likedSongs={likedSongs}
                  toggleLike={toggleLike}
                  addToPlaylist={addToPlaylist}
                />
              ))}
            </div>
          </>
        )}

        {/* PLAYLISTS */}

        {activeSection === "playlists" && (
          <>
            {openedPlaylist ? (
              <>
                <div className="playlist-top">
                  <button
                    className="back-btn"
                    onClick={() => setOpenedPlaylist(null)}
                  >
                    ← Back
                  </button>

                  <h2>{openedPlaylist.name}</h2>
                </div>

                <div className="songs-list">
                  {openedPlaylist.songs.length === 0 ? (
                    <p className="empty-playlist">No songs added</p>
                  ) : (
                    openedPlaylist.songs.map((song) => (
                      <SongRow
                        key={song.id}
                        song={song}
                        onPlay={playSong}
                        currentSong={currentSong}
                        isPlaying={isPlaying}
                        likedSongs={likedSongs}
                        toggleLike={toggleLike}
                        addToPlaylist={addToPlaylist}
                      />
                    ))
                  )}
                </div>
              </>
            ) : (
              <>
                <div className="playlist-header">
                  <h2>Your Playlists</h2>

                  <button
                    className="create-playlist-btn"
                    onClick={() => setShowPlaylistModal(true)}
                  >
                    + Create Playlist
                  </button>
                </div>

                {playlists.length === 0 ? (
                  <p className="empty-playlist">No playlists yet</p>
                ) : (
                  <div className="songs-grid">
                    {playlists.map((playlist) => (
                      <PlaylistCard
                        key={playlist.id}
                        playlist={playlist}
                        setOpenedPlaylist={setOpenedPlaylist}
                      />
                    ))}
                  </div>
                )}
              </>
            )}
          </>
        )}

        {/* CREATE PLAYLIST MODAL */}

        {showPlaylistModal && (
          <div className="playlist-modal-overlay">
            <div className="playlist-modal">
              <h2>Create Playlist</h2>

              <input
                type="text"
                placeholder="Playlist name"
                value={playlistName}
                onChange={(e) => setPlaylistName(e.target.value)}
              />

              <div className="playlist-modal-buttons">
                <button
                  className="playlist-create-btn"
                  onClick={createPlaylist}
                >
                  Create
                </button>

                <button
                  className="playlist-cancel-btn"
                  onClick={() => {
                    setShowPlaylistModal(false);

                    setPlaylistName("");
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ADD TO PLAYLIST MODAL */}

        {showAddToPlaylistModal && (
          <div className="playlist-modal-overlay">
            <div className="playlist-modal">
              <h2>Add To Playlist</h2>

              <select
                value={selectedPlaylist}
                onChange={(e) => setSelectedPlaylist(e.target.value)}
              >
                <option value="">Select Playlist</option>

                {playlists.map((playlist) => (
                  <option key={playlist.id} value={playlist.name}>
                    {playlist.name}
                  </option>
                ))}
              </select>

              <div className="playlist-modal-buttons">
                <button
                  className="playlist-create-btn"
                  onClick={confirmAddToPlaylist}
                >
                  Add
                </button>

                <button
                  className="playlist-cancel-btn"
                  onClick={() => {
                    setShowAddToPlaylistModal(false);

                    setSelectedPlaylist("");

                    setSelectedSong(null);
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* COPYRIGHT */}

        <div className="copyright">@Algorythm 2026</div>
      </div>

      {/* PLAYER */}

      {currentSong && (
        <PlayerFooter
          currentSong={currentSong}
          audioRef={audioRef}
          nextSong={nextSong}
          prevSong={prevSong}
          setIsPlaying={setIsPlaying}
          isPlaying={isPlaying}
          currentTime={currentTime}
          setCurrentTime={setCurrentTime}
          duration={duration}
          setDuration={setDuration}
          isShuffle={isShuffle}
          setIsShuffle={setIsShuffle}
          repeatMode={repeatMode}
          setRepeatMode={setRepeatMode}
        />
      )}

      {/* LOGIN MODAL */}

      {showLogin && (
        <LoginModal
          onClose={() => {
            setShowLogin(false);

            const token = localStorage.getItem("token");

            if (token) {
              setIsLoggedIn(true);
            }
          }}
        />
      )}
    </div>
  );
}

export default MusicPlayer;