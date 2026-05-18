const mongoose = require("mongoose");

const favoriteSchema =
  new mongoose.Schema(
    {
      title: String,
      artist: String,
      genre: String,
      url: String,
    },
    {
      _id: false,
    }
  );

const userSchema =
  new mongoose.Schema({
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },

    // NEW FIELD
    isAdmin: {
      type: Boolean,
      default: false,
    },

    favorites: [
      favoriteSchema,
    ],
  });

module.exports =
  mongoose.model(
    "User",
    userSchema
  );