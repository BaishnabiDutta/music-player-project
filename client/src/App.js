import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [songs, setSongs] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(null);
  const [search, setSearch] = useState("");
  const [likedSongs, setLikedSongs] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/songs")
      .then((res) => res.json())
      .then((data) => setSongs(data))
      .catch((err) => console.log(err));
  }, []);

  const playSong = (index) => {
    setCurrentIndex(index);
  };

  const nextSong = () => {
    setCurrentIndex((prev) =>
      prev === null || prev === songs.length - 1 ? 0 : prev + 1,
    );
  };

  const prevSong = () => {
    setCurrentIndex((prev) =>
      prev === null || prev === 0 ? songs.length - 1 : prev - 1,
    );
  };

  const toggleLike = (id) => {
    setLikedSongs((prev) =>
      prev.includes(id)
        ? prev.filter((songId) => songId !== id)
        : [...prev, id],
    );
  };

  // 🔍 Filter songs
  const filteredSongs = songs.filter((song) =>
    song.title.toLowerCase().includes(search.toLowerCase()),
  );

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

        {/* 🎵 Song List */}
        <ul className="song-list">
          {filteredSongs.map((song, index) => (
            <li
              key={song.id}
              className={`song-item ${
                songs.indexOf(song) === currentIndex ? "active" : ""
              }`}
            >
              <span>
                {song.title} - {song.artist}
              </span>

              <div>
                <button onClick={() => playSong(songs.indexOf(song))}>▶</button>

                <button onClick={() => toggleLike(song.id)}>
                  {likedSongs.includes(song.id) ? "❤️" : "🤍"}
                </button>
              </div>
            </li>
          ))}
        </ul>

        {/* 🎧 Player */}
        {currentIndex !== null && (
          <div className="player">
            <h3>Now Playing: {songs[currentIndex].title}</h3>

            <audio controls src={songs[currentIndex].url} autoPlay />

            <div className="controls">
              <button onClick={prevSong}>⏮</button>
              <button onClick={nextSong}>⏭</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
