const mongoose =
  require("mongoose");

const songSchema =
  new mongoose.Schema(
    {
      title: {
        type: String,
        required: true,
      },

      artist: {
        type: String,
        required: true,
      },

      genre: {
        type: String,
        required: true,
      },

      url: {
        type: String,
        required: true,
      },

      mimeType: {
        type: String,
      },
    },
    {
      timestamps: true,
    }
  );

module.exports =
  mongoose.model(
    "Song",
    songSchema
  );