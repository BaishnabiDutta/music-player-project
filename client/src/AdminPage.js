import {
  useEffect,
  useState,
} from "react";

import {
  useNavigate,
} from "react-router-dom";

import "./AdminPage.css";

export default function AdminPage() {
  const navigate =
    useNavigate();

  // FORM STATES
  const [title, setTitle] =
    useState("");

  const [artist, setArtist] =
    useState("");

  const [genre, setGenre] =
    useState("");

  const [file, setFile] =
    useState(null);

  // SONGS
  const [songs, setSongs] =
    useState([]);

  // EDIT MODE
  const [editId, setEditId] =
    useState(null);

  // PROTECT ROUTE
  useEffect(() => {
    const isAdmin =
      localStorage.getItem(
        "isAdmin"
      );

    if (
      isAdmin !==
      "true"
    ) {
      alert(
        "Access Denied"
      );

      navigate("/");
      return;
    }

    fetchSongs();
  }, [navigate]);

  // FETCH SONGS
  const fetchSongs =
    async () => {
      try {
        const res =
          await fetch(
            "http://localhost:5000/songs"
          );

        const data =
          await res.json();

        setSongs(data);
      } catch (
        error
      ) {
        console.log(
          error
        );
      }
    };

  // DELETE SONG
  const handleDelete =
    async (id) => {
      try {
        const res =
          await fetch(
            `http://localhost:5000/api/songs/${id}`,
            {
              method:
                "DELETE",
            }
          );

        const data =
          await res.json();

        alert(
          data.message
        );

        fetchSongs();
      } catch (
        error
      ) {
        console.log(
          error
        );

        alert(
          "Delete Failed"
        );
      }
    };

  // EDIT SONG
  const handleEdit =
    (song) => {
      setTitle(
        song.title
      );

      setArtist(
        song.artist
      );

      setGenre(
        song.genre
      );

      setEditId(
        song._id
      );
    };

  // SUBMIT BUTTON
  const handleSubmit =
    async () => {
      try {
        // EDIT MODE
        if (
          editId
        ) {
          const res =
            await fetch(
              `http://localhost:5000/api/songs/${editId}`,
              {
                method:
                  "PUT",

                headers:
                  {
                    "Content-Type":
                      "application/json",
                  },

                body:
                  JSON.stringify(
                    {
                      title,
                      artist,
                      genre,
                    }
                  ),
              }
            );

          const data =
            await res.json();

          alert(
            data.message
          );

          // REFRESH TABLE
          fetchSongs();

          // RESET FORM
          setEditId(
            null
          );

          setTitle(
            ""
          );

          setArtist(
            ""
          );

          setGenre(
            ""
          );

          setFile(
            null
          );

          return;
        }

        // ADD SONG MODE
        const formData =
          new FormData();

        formData.append(
          "title",
          title
        );

        formData.append(
          "artist",
          artist
        );

        formData.append(
          "genre",
          genre
        );

        formData.append(
          "song",
          file
        );

        const res =
          await fetch(
            "http://localhost:5000/api/songs/upload",
            {
              method:
                "POST",

              body:
                formData,
            }
          );

        const data =
          await res.json();

        alert(
          data.message
        );

        // REFRESH TABLE
        fetchSongs();

        // RESET FORM
        setTitle("");

        setArtist("");

        setGenre("");

        setFile(
          null
        );
      } catch (
        error
      ) {
        console.log(
          "ERROR:",
          error
        );

        alert(
          "Upload Failed"
        );
      }
    };

  return (
    <div className="admin-page">
      {/* LEFT SIDE */}
      <div className="admin-left">
        <h2>
          Add New Song
        </h2>

        {/* TITLE */}
        <input
          placeholder="Song Title"
          value={
            title
          }
          onChange={(
            e
          ) =>
            setTitle(
              e
                .target
                .value
            )
          }
        />

        {/* ARTIST */}
        <input
          placeholder="Artist"
          value={
            artist
          }
          onChange={(
            e
          ) =>
            setArtist(
              e
                .target
                .value
            )
          }
        />

        {/* GENRE */}
        <input
          placeholder="Genre"
          value={
            genre
          }
          onChange={(
            e
          ) =>
            setGenre(
              e
                .target
                .value
            )
          }
        />

        {/* FILE */}
        <input
          type="file"
          accept=".mp3,.wav,.m4a"
          onChange={(
            e
          ) =>
            setFile(
              e
                .target
                .files[0]
            )
          }
        />

        {/* BUTTON */}
        <button
          onClick={
            handleSubmit
          }
        >
          {editId
            ? "Update Song"
            : "Submit"}
        </button>
      </div>

      {/* RIGHT SIDE */}
      <div className="admin-right">
        <h2>
          Existing Songs
        </h2>

        <table>
          <thead>
            <tr>
              <th>
                Title
              </th>

              <th>
                Artist
              </th>

              <th>
                Genre
              </th>

              <th>
                Action
              </th>
            </tr>
          </thead>

          <tbody>
            {songs.map(
              (
                song
              ) => (
                <tr
                  key={
                    song._id
                  }
                >
                  <td>
                    {
                      song.title
                    }
                  </td>

                  <td>
                    {
                      song.artist
                    }
                  </td>

                  <td>
                    {
                      song.genre
                    }
                  </td>

                  <td>
                    <button
                      onClick={() =>
                        handleEdit(
                          song
                        )
                      }
                    >
                      Edit
                    </button>

                    <button
                      onClick={() =>
                        handleDelete(
                          song._id
                        )
                      }
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}