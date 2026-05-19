const express =
  require("express");

const cors =
  require("cors");

const path =
  require("path");

const mongoose =
  require("mongoose");

const userRoutes =
  require("./routes/userRoutes");

const songRoutes =
  require("./routes/songRoutes");

const app = express();


// MIDDLEWARE
app.use(cors());

app.use(
  express.json()
);


// SERVE UPLOADED MP3 FILES
app.use(
  "/uploads",
  express.static(
    path.join(
      __dirname,
      "uploads"
    )
  )
);


// API ROUTES
app.use(
  "/api/users",
  userRoutes
);

app.use(
  "/api/songs",
  songRoutes
);


// CONNECT MONGODB
mongoose
  .connect(
    "mongodb://taiprachi1_db_user:u7yodFXZJCKXTq9v@ac-v71oqvk-shard-00-00.wksowcp.mongodb.net:27017,ac-v71oqvk-shard-00-01.wksowcp.mongodb.net:27017,ac-v71oqvk-shard-00-02.wksowcp.mongodb.net:27017/musicDB?ssl=true&replicaSet=atlas-tdi57f-shard-0&authSource=admin&retryWrites=true&w=majority&tls=true",
    {
      serverSelectionTimeoutMS:
        60000,

      socketTimeoutMS:
        60000,
    }
  )
  .then(() =>
    console.log(
      "MongoDB Connected"
    )
  )
  .catch((err) =>
    console.log(
      "MongoDB Error:",
      err
    )
  );


// HOME ROUTE
app.get("/", (req, res) => {
  res.send(
    "Server is working!"
  );
});


const PORT = 5000;


// START SERVER
app.listen(PORT, () => {
  console.log(
    `Server running on port ${PORT}`
  );
});