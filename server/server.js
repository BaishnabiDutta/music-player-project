const express = require("express");
const cors = require("cors");

const app = express(); // IMPORTANT

app.use(cors());
app.use(express.json());

const PORT = 5000;

// Home route
app.get("/", (req, res) => {
  res.send("Server is working!");
});

// Songs route
app.get("/songs", (req, res) => {
  const songs = [
    {
      id: 1,
      title: "Song 1",
      artist: "Artist 1",
      url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    },
    {
      id: 2,
      title: "Song 2",
      artist: "Artist 2",
      url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    },
    {
      id: 3,
      title: "Song 3",
      artist: "Artist 3",
      url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
    },
  ];

  res.json(songs);
});

// Start server
app.listen(PORT, () => {
  console.log("Server running on port 5000");
});
