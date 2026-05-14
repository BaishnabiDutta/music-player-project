const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const PORT = 5000;

// Home Route
app.get("/", (req, res) => {
  res.send("Server is working!");
});

// Songs Route
app.get("/songs", (req, res) => {

  const songs = [
    {
      id: 1,
      title: "Blinding Lights",
      artist: "The Weeknd",
      genre: "Pop",
      url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    },
    {
      id: 2,
      title: "Espresso",
      artist: "Sabrina Carpenter",
      genre: "Pop",
      url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    },
    {
      id: 3,
      title: "God's Plan",
      artist: "Drake",
      genre: "Hip-Hop",
      url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
    },
    {
      id: 4,
      title: "SICKO MODE",
      artist: "Travis Scott",
      genre: "Hip-Hop",
      url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
    },
    {
      id: 5,
      title: "Animals",
      artist: "Martin Garrix",
      genre: "EDM",
      url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3",
    },
    {
      id: 6,
      title: "Titanium",
      artist: "David Guetta ft. Sia",
      genre: "EDM",
      url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3",
    },
    {
      id: 7,
      title: "Snowman",
      artist: "WYS",
      genre: "Lo-fi",
      url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3",
    },
    {
      id: 8,
      title: "Night Drive",
      artist: "Lo-fi Dreams",
      genre: "Lo-fi",
      url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3",
    },
    {
      id: 9,
      title: "Bite Me",
      artist: "ENHYPEN",
      genre: "K-Pop",
      url: "/songs/biteme.mp3",
    },
    {
      id: 10,
      title: "DASH",
      artist: "NMIXX",
      genre: "K-Pop",
      url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3",
    },
    {
      id: 11,
      title: "The Chase",
      artist: "Hearts2Hearts",
      genre: "K-Pop",
      url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-11.mp3",
    },
    {
      id: 12,
      title: "I DO ME",
      artist: "KiiiKiii",
      genre: "K-Pop",
      url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-12.mp3",
    },
    {
      id: 13,
      title: "Get You",
      artist: "Daniel Caesar ft. Kali Uchis",
      genre: "R&B",
      url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-13.mp3",
    },
    {
      id: 14,
      title: "Best Part",
      artist: "Daniel Caesar ft. H.E.R.",
      genre: "R&B",
      url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-14.mp3",
    },
    {
      id: 15,
      title: "Snooze",
      artist: "SZA",
      genre: "R&B",
      url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-15.mp3",
    },
    {
      id: 16,
      title: "Saturn",
      artist: "SZA",
      genre: "R&B",
      url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-16.mp3",
    },
  ];

  res.json(songs);
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});