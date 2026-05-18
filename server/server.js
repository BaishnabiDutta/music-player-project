const userRoutes = require("./routes/userRoutes");
const express = require("express");
const cors = require("cors");
const path = require("path");
const mongoose = require("mongoose");
const Song = require("./models/Song");
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/users", userRoutes);

// CONNECT MONGODB
mongoose.connect(
  "mongodb://taiprachi1_db_user:u7yodFXZJCKXTq9v@ac-v71oqvk-shard-00-00.wksowcp.mongodb.net:27017,ac-v71oqvk-shard-00-01.wksowcp.mongodb.net:27017,ac-v71oqvk-shard-00-02.wksowcp.mongodb.net:27017/musicDB?ssl=true&replicaSet=atlas-tdi57f-shard-0&authSource=admin&retryWrites=true&w=majority&tls=true",
  {
    serverSelectionTimeoutMS: 60000,
    socketTimeoutMS: 60000
  }
)

.then(() => console.log("MongoDB Connected"))
.catch((err) => console.log("MongoDB Error:", err));


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
app.get("/songs", async (req, res) => {
  try {
    const songs = await Song.find();
    res.json(songs);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching songs",
      error,
    });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});