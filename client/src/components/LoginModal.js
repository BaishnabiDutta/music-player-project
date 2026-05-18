import { useState } from "react";

import { useNavigate } from "react-router-dom";

import { toast } from "react-toastify";

export default function LoginModal({ onClose }) {
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/users/login", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data =
        await res.json();

      if (res.ok) {
        // SAVE TOKEN

        localStorage.setItem("token", data.token);

        // SAVE EMAIL
<<<<<<< HEAD
        localStorage.setItem(
          "email",
          data.user.email
        );

        // SAVE ADMIN STATUS
        localStorage.setItem(
          "isAdmin",
          data.user.isAdmin
        );

        alert(
          "Login Successful"
        );
=======

        localStorage.setItem("email", email);
>>>>>>> ee701d131c9db7a3fe6fa9f12d5c1276e07be2bb

        // SUCCESS TOAST

        toast.success("Login Successful 🎵");

        setTimeout(() => {
          window.location.reload();
        }, 1500);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);

      toast.error("Login Failed");
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

        background: "rgba(0,0,0,0.72)",

        display: "flex",

        justifyContent: "center",

        alignItems: "center",

        zIndex: 9999,

        backdropFilter: "blur(10px)",
      }}
    >
      <div
        style={{
          width: "360px",

          padding: "30px",

          borderRadius: "24px",

          background: "rgba(20,20,20,0.95)",

          border: "1px solid rgba(255,255,255,0.08)",

          boxShadow: "0 0 30px rgba(0,0,0,0.4)",

          color: "white",

          textAlign: "center",
        }}
      >
<<<<<<< HEAD
        <h2>
          Login Required
        </h2>
=======
        <h2
          style={{
            marginBottom: "25px",
          }}
        >
          Login Required
        </h2>

        {/* EMAIL */}
>>>>>>> ee701d131c9db7a3fe6fa9f12d5c1276e07be2bb

        <input
          style={{
            width: "100%",
<<<<<<< HEAD
            marginBottom:
              "10px",
          }}
          placeholder="Email"
          value={email}
          onChange={(e) =>
            setEmail(
              e.target.value
            )
          }
=======

            padding: "14px",

            marginBottom: "15px",

            borderRadius: "12px",

            border: "none",

            outline: "none",

            background: "rgba(255,255,255,0.08)",

            color: "white",

            boxSizing: "border-box",
          }}
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
>>>>>>> ee701d131c9db7a3fe6fa9f12d5c1276e07be2bb
        />

        {/* PASSWORD */}

        <input
          style={{
            width: "100%",
<<<<<<< HEAD
            marginBottom:
              "10px",
=======

            padding: "14px",

            marginBottom: "20px",

            borderRadius: "12px",

            border: "none",

            outline: "none",

            background: "rgba(255,255,255,0.08)",

            color: "white",

            boxSizing: "border-box",
>>>>>>> ee701d131c9db7a3fe6fa9f12d5c1276e07be2bb
          }}
          type="password"
          placeholder="Password"
          value={password}
<<<<<<< HEAD
          onChange={(e) =>
            setPassword(
              e.target.value
            )
          }
=======
          onChange={(e) => setPassword(e.target.value)}
>>>>>>> ee701d131c9db7a3fe6fa9f12d5c1276e07be2bb
        />

        {/* LOGIN BUTTON */}

        <button
          style={{
            width: "100%",
<<<<<<< HEAD
            padding: "8px",
            marginBottom:
              "10px",
=======

            padding: "14px",

            marginBottom: "14px",

            border: "none",

            borderRadius: "14px",

            background: "linear-gradient(135deg,#5c0011,#8b0000)",

            color: "white",

            fontSize: "1rem",

            cursor: "pointer",

            transition: "0.2s ease",
>>>>>>> ee701d131c9db7a3fe6fa9f12d5c1276e07be2bb
          }}
          onClick={
            handleLogin
          }
        >
          Login
        </button>

        {/* REGISTER BUTTON */}

        <button
          style={{
            width: "100%",
<<<<<<< HEAD
            padding: "8px",
            marginBottom:
              "10px",
            background:
              "#4CAF50",
            color: "white",
            border: "none",
            borderRadius:
              "5px",
            cursor:
              "pointer",
          }}
          onClick={() => {
            onClose();
            navigate(
              "/register"
            );
=======

            padding: "14px",

            marginBottom: "14px",

            border: "none",

            borderRadius: "14px",

            background: "#00aa55",

            color: "white",

            fontSize: "1rem",

            cursor: "pointer",
          }}
          onClick={() => {
            onClose();

            navigate("/register");
>>>>>>> ee701d131c9db7a3fe6fa9f12d5c1276e07be2bb
          }}
        >
          Register
        </button>

        {/* CANCEL BUTTON */}

        <button
          style={{
            width: "100%",
<<<<<<< HEAD
            padding: "8px",
            background:
              "#ccc",
=======

            padding: "14px",

            border: "none",

            borderRadius: "14px",

            background: "rgba(255,255,255,0.12)",

            color: "white",

            cursor: "pointer",
>>>>>>> ee701d131c9db7a3fe6fa9f12d5c1276e07be2bb
          }}
          onClick={onClose}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
