import { useState } from "react";
import axios from "axios";

function Register() {

  const [name, setName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [showPopup, setShowPopup] =
    useState(false);

  const [popupMessage, setPopupMessage] =
    useState("");

  const [isSuccess, setIsSuccess] =
    useState(true);

  const handleRegister = async (e) => {

    e.preventDefault();

    try {

      const res = await axios.post(
        "http://localhost:5000/api/users/register",
        {
          name,
          email,
          password,
        }
      );

      console.log(res.data);

      // success popup
      setIsSuccess(true);

      setPopupMessage(
        res.data.message ||
        "Registered Successfully"
      );

      setShowPopup(true);

      // clear inputs
      setName("");
      setEmail("");
      setPassword("");

      // hide popup
      setTimeout(() => {
        setShowPopup(false);
      }, 2000);

    } catch (err) {

      console.log(err);

      // failed popup
      setIsSuccess(false);

      setPopupMessage(
        err.response?.data?.message ||
        "Registration Failed"
      );

      setShowPopup(true);

      // hide popup
      setTimeout(() => {
        setShowPopup(false);
      }, 2000);
    }
  };

  return (

    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#4b0000",
        position: "relative",
      }}
    >

      {/* Popup */}
      {showPopup && (
        <div
          style={{
            position: "fixed",
            top: "30px",
            left: "50%",
            transform:
              "translateX(-50%)",
            background: "white",
            padding: "18px 25px",
            borderRadius: "15px",
            boxShadow:
              "0 8px 20px rgba(0,0,0,0.25)",
            zIndex: "1000",
            minWidth: "320px",
            textAlign: "center",
          }}
        >

          <h3
            style={{
              color: isSuccess
                ? "green"
                : "red",
              marginBottom: "8px",
            }}
          >
            {isSuccess
              ? "✅ Success"
              : "❌ Failed"}
          </h3>

          <p
            style={{
              color: "#555",
              margin: 0,
            }}
          >
            {popupMessage}
          </p>

        </div>
      )}

      <div
        style={{
          background:
            "rgba(255,255,255,0.1)",
          padding: "40px",
          borderRadius: "20px",
          width: "300px",
          textAlign: "center",
          backdropFilter:
            "blur(10px)",
        }}
      >

        <h2
          style={{
            color: "white",
          }}
        >
          Register
        </h2>

        <form
          onSubmit={handleRegister}
        >

          <input
            type="text"
            placeholder="Enter Name"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
            required
            style={{
              width: "100%",
              padding: "10px",
              marginTop: "15px",
              borderRadius: "10px",
              border: "none",
              outline: "none",
            }}
          />

          <br /><br />

          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            required
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "10px",
              border: "none",
              outline: "none",
            }}
          />

          <br /><br />

          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            required
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "10px",
              border: "none",
              outline: "none",
            }}
          />

          <br /><br />

          <button
            type="submit"
            style={{
              width: "100%",
              padding: "10px",
              border: "none",
              borderRadius: "10px",
              background:
                "#ff4d4d",
              color: "white",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            Register
          </button>

        </form>

      </div>

    </div>
  );
}

export default Register;