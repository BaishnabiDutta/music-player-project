const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();

app.use(cors());
app.use(express.json());

// Serve MP3 files
app.use(
  "/songs",
  express.static(path.join(__dirname, "../client/public/songs"))
);

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
      url: "http://localhost:5000/songs/blindinglights.mp3",
    },
    {
      id: 2,
      title: "Espresso",
      artist: "Sabrina Carpenter",
      genre: "Pop",
      url: "http://localhost:5000/songs/espresso.mp3",
    },
    {
      id: 3,
      title: "God's Plan",
      artist: "Drake",
      genre: "Hip-Hop",
      url: "http://localhost:5000/songs/godsplan.mp3",
    },
    {
      id: 4,
      title: "SICKO MODE",
      artist: "Travis Scott",
      genre: "Hip-Hop",
      url: "http://localhost:5000/songs/sickomode.mp3",
    },
    {
      id: 5,
      title: "Animals",
      artist: "Martin Garrix",
      genre: "EDM",
      url: "http://localhost:5000/songs/animals.mp3",
    },
    {
      id: 6,
      title: "Titanium",
      artist: "David Guetta ft. Sia",
      genre: "EDM",
      url: "http://localhost:5000/songs/titanium.mp3",
    },
    {
      id: 7,
      title: "Snowman",
      artist: "WYS",
      genre: "Lo-fi",
      url: "http://localhost:5000/songs/snowman.mp3",
    },
    {
      id: 8,
      title: "Night Drive",
      artist: "Lo-fi Dreams",
      genre: "Lo-fi",
      url: "http://localhost:5000/songs/nightdrive.mp3",
    },
    {
      id: 9,
      title: "Bite Me",
      artist: "ENHYPEN",
      genre: "K-Pop",
      url: "http://localhost:5000/songs/biteme.mp3",
    },
    {
      id: 10,
      title: "DASH",
      artist: "NMIXX",
      genre: "K-Pop",
      url: "http://localhost:5000/songs/dash.mp3",
    },
    {
      id: 11,
      title: "The Chase",
      artist: "Hearts2Hearts",
      genre: "K-Pop",
      url: "http://localhost:5000/songs/thechase.mp3",
    },
    {
      id: 12,
      title: "I DO ME",
      artist: "KiiiKiii",
      genre: "K-Pop",
      url: "http://localhost:5000/songs/idome.mp3",
    },
    {
      id: 13,
      title: "Get You",
      artist: "Daniel Caesar ft. Kali Uchis",
      genre: "R&B",
      url: "http://localhost:5000/songs/getyou.mp3",
    },
    {
      id: 14,
      title: "Best Part",
      artist: "Daniel Caesar ft. H.E.R.",
      genre: "R&B",
      url: "http://localhost:5000/songs/bestpart.mp3",
    },
    {
      id: 15,
      title: "Snooze",
      artist: "SZA",
      genre: "R&B",
      url: "http://localhost:5000/songs/snooze.mp3",
    },
    {
      id: 16,
      title: "Saturn",
      artist: "SZA",
      genre: "R&B",
      url: "http://localhost:5000/songs/saturn.mp3",
    },
  ];

  res.json(songs);
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});