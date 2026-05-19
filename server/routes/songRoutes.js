const express =
  require("express");

const multer =
  require("multer");

const path =
  require("path");

const fs =
  require("fs");

const Song =
  require("../models/Song");

const router =
  express.Router();


// STORAGE CONFIG
const storage =
  multer.diskStorage({
    destination:
      function (
        req,
        file,
        cb
      ) {
        cb(
          null,
          "uploads/"
        );
      },

    filename:
      function (
        req,
        file,
        cb
      ) {
        cb(
          null,
          Date.now() +
            path.extname(
              file.originalname
            )
        );
      },
  });


// MIME VALIDATION
const fileFilter = (
  req,
  file,
  cb
) => {
  const allowedTypes =
    [
      "audio/mpeg",
      "audio/wav",
      "audio/x-wav",
      "audio/mp4",
    ];

  if (
    allowedTypes.includes(
      file.mimetype
    )
  ) {
    cb(null, true);
  } else {
    cb(
      new Error(
        "Invalid audio format"
      ),
      false
    );
  }
};


const upload =
  multer({
    storage,
    fileFilter,
  });


// TEST ROUTE
router.get(
  "/test",
  (req, res) => {
    res.json({
      message:
        "Song route working",
    });
  }
);


// GET ALL SONGS
router.get(
  "/",
  async (
    req,
    res
  ) => {
    try {
      const songs =
        await Song.find();

      res.json(songs);

    } catch (
      error
    ) {
      console.log(
        "FETCH ERROR:",
        error
      );

      res.status(500).json({
        message:
          "Error fetching songs",
      });
    }
  }
);


// ADD SONG
router.post(
  "/upload",
  upload.single(
    "song"
  ),
  async (
    req,
    res
  ) => {
    try {
      const {
        title,
        artist,
        genre,
      } = req.body;

      // CHECK FILE
      if (
        !req.file
      ) {
        return res
          .status(400)
          .json({
            message:
              "Please select an audio file",
          });
      }

      const song =
        new Song({
          title,
          artist,
          genre,

          url:
            req.file
              .filename,

          mimeType:
            req.file
              .mimetype,
        });

      await song.save();

      res.json({
        message:
          "Song uploaded successfully",
      });

    } catch (
      error
    ) {
      console.log(
        "UPLOAD ERROR:",
        error
      );

      res.status(500).json({
        message:
          error.message,
      });
    }
  }
);


// UPDATE SONG
router.put(
  "/:id",
  async (
    req,
    res
  ) => {
    try {
      const {
        title,
        artist,
        genre,
      } = req.body;

      const updatedSong =
        await Song.findByIdAndUpdate(
          req.params.id,
          {
            title,
            artist,
            genre,
          },
          {
            new: true,
          }
        );

      if (
        !updatedSong
      ) {
        return res
          .status(404)
          .json({
            message:
              "Song not found",
          });
      }

      res.json({
        message:
          "Song updated successfully",
      });

    } catch (
      error
    ) {
      console.log(
        "UPDATE ERROR:",
        error
      );

      res.status(500).json({
        message:
          error.message,
      });
    }
  }
);


// DELETE SONG
router.delete(
  "/:id",
  async (
    req,
    res
  ) => {
    try {
      const song =
        await Song.findById(
          req.params.id
        );

      if (
        !song
      ) {
        return res
          .status(404)
          .json({
            message:
              "Song not found",
          });
      }

      // FILE PATH
      const filePath =
        path.resolve(
          "uploads",
          song.url
        );

      // DELETE FILE
      if (
        fs.existsSync(
          filePath
        )
      ) {
        fs.unlinkSync(
          filePath
        );

        console.log(
          "File deleted"
        );
      }

      // DELETE FROM DB
      await Song.findByIdAndDelete(
        req.params.id
      );

      res.json({
        message:
          "Song deleted successfully",
      });

    } catch (
      error
    ) {
      console.log(
        "DELETE ERROR:",
        error
      );

      res.status(500).json({
        message:
          error.message,
      });
    }
  }
);


module.exports =
  router;