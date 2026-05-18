import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginModal({ onClose }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await fetch(
        "http://localhost:5000/api/users/login",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      const data = await res.json();

      if (res.ok) {
        // SAVE TOKEN
        localStorage.setItem(
          "token",
          data.token
        );

        // SAVE EMAIL
        localStorage.setItem(
          "email",
          email
        );

        alert("Login Successful");

        window.location.reload();
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.log(error);
      alert("Login Failed");
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background:
          "rgba(0,0,0,0.6)",
        display: "flex",
        justifyContent:
          "center",
        alignItems: "center",
        zIndex: 9999,
      }}
    >
      <div
        style={{
          background: "#fff",
          padding: "20px",
          borderRadius: "10px",
          width: "300px",
          textAlign: "center",
        }}
      >
        <h2>Login Required</h2>

        <input
          style={{
            width: "100%",
            marginBottom: "10px",
          }}
          placeholder="Email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
        />

        <input
          style={{
            width: "100%",
            marginBottom: "10px",
          }}
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
        />

        <button
          style={{
            width: "100%",
            padding: "8px",
            marginBottom: "10px",
          }}
          onClick={handleLogin}
        >
          Login
        </button>

        <button
          style={{
            width: "100%",
            padding: "8px",
            marginBottom: "10px",
            background: "#4CAF50",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
          onClick={() => {
            onClose();
            navigate("/register");
          }}
        >
          Register
        </button>

        <button
          style={{
            width: "100%",
            padding: "8px",
            background: "#ccc",
          }}
          onClick={onClose}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}