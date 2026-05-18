import React, { useEffect, useState } from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

import MusicPlayer from "./pages/MusicPlayer";
import Register from "./pages/Register";

import "./App.css";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2500);
  }, []);

  if (loading) {
    return (
      <div className="loader-screen">
        <h1>ALGORYTHM</h1>

        <p>Where code meets rhythm</p>
      </div>
    );
  }

  return (
    <BrowserRouter>
      {/* TOAST CONTAINER */}

      <ToastContainer
        position="top-right"
        autoClose={2500}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        pauseOnHover
        theme="dark"
      />

      <Routes>
        <Route path="/" element={<MusicPlayer />} />

        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
