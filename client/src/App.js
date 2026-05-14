import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [songs, setSongs] = useState([]);
  const [currentSong, setCurrentSong] = useState(null);
  const [search, setSearch] = useState("");
  const [likedSongs, setLikedSongs] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("All");

  useEffect(() => {
    fetch("http://localhost:5000/songs")
      .then((res) => res.json())
      .then((data) => setSongs(data))
      .catch((err) => console.log(err));
  }, []);

  // ▶ Play Song
  const playSong = (song) => {
    setCurrentSong(song);
  };

  // ❤️ Like Song
  const toggleLike = (id) => {
    setLikedSongs((prev) =>
      prev.includes(id)
        ? prev.filter((songId) => songId !== id)
        : [...prev, id]
    );
  };

  // ⏭ Next Song
  const nextSong = () => {
    if (!currentSong) return;

    const currentSongIndex = songs.findIndex(
      (song) => song.id === currentSong.id
    );

    const nextIndex =
      currentSongIndex === songs.length - 1
        ? 0
        : currentSongIndex + 1;

    setCurrentSong(songs[nextIndex]);
  };

  // ⏮ Previous Song
  const prevSong = () => {
    if (!currentSong) return;

    const currentSongIndex = songs.findIndex(
      (song) => song.id === currentSong.id
    );

    const prevIndex =
      currentSongIndex === 0
        ? songs.length - 1
        : currentSongIndex - 1;

    setCurrentSong(songs[prevIndex]);
  };

  // 🔍 Filter Songs
  const filteredSongs = songs.filter((song) => {
    const matchesSearch = song.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesGenre =
      selectedGenre === "All" || song.genre === selectedGenre;

    return matchesSearch && matchesGenre;
  });

  return (
    <div className="app">
      <h1>🎧 Algorythm</h1>
      <p className="tagline">Where code meets rhythm</p>

      <div className="container">
        {/* 🔍 Search Bar */}
        <input
          type="text"
          placeholder="Search songs..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search"
        />

        {/* 🎼 Genre Buttons */}
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
                selectedGenre === genre ? "active-genre" : ""
              }
              onClick={() => setSelectedGenre(genre)}
            >
              {genre}
            </button>
          ))}
        </div>

        {/* 🎵 Song List */}
        <ul className="song-list">
          {filteredSongs.map((song) => (
            <li
              key={song.id}
              className={`song-item ${
                currentSong?.id === song.id ? "active" : ""
              }`}
            >
              <span>
                {song.title} - {song.artist}
              </span>

              <div>
                <button onClick={() => playSong(song)}>
                  ▶
                </button>

                <button onClick={() => toggleLike(song.id)}>
                  {likedSongs.includes(song.id) ? "❤️" : "🤍"}
                </button>
              </div>
            </li>
          ))}
        </ul>

        {/* 🎧 Player */}
        {currentSong && (
          <div className="player">
            <h3>Now Playing: {currentSong.title}</h3>

            <audio
              controls
              src={currentSong.url}
              autoPlay
              onEnded={nextSong}
            />

            <div className="controls">
              <button onClick={prevSong}>⏮</button>
              <button onClick={nextSong}>⏭</button>
            </div>
          </div>
        )}

        <footer className="footer">
          © 2026 Algorythm Music Player
        </footer>
      </div>
    </div>
  );
}

export default App;