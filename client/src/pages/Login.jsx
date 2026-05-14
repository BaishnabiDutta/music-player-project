import { useState } from "react";
import axios from "axios";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:5000/api/users/login",
        {
          email,
          password,
        }
      );

      alert("Login Successful");

      localStorage.setItem("token", res.data.token);

    } catch (err) {
      alert("Invalid Credentials");
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
    }}
  >
    <div
      style={{
        background: "rgba(255,255,255,0.1)",
        padding: "40px",
        borderRadius: "20px",
        width: "300px",
        textAlign: "center",
        backdropFilter: "blur(10px)",
      }}
    >
      <h2 style={{ color: "white" }}>User Login</h2>

      <form onSubmit={handleLogin}>

        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            marginTop: "15px",
            borderRadius: "10px",
            border: "none",
          }}
        />

        <br /><br />

        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            borderRadius: "10px",
            border: "none",
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
            background: "#ff4d4d",
            color: "white",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          Login
        </button>

      </form>
    </div>
  </div>
);
}
export default Login;
