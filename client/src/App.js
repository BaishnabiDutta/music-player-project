<<<<<<< HEAD
import React, {
  useEffect,
  useState,
} from "react";

import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
=======
import React, { useEffect, useState } from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
>>>>>>> ee701d131c9db7a3fe6fa9f12d5c1276e07be2bb

import MusicPlayer from "./pages/MusicPlayer";
import Register from "./pages/Register";
import AdminPage from "./AdminPage";

import "./App.css";

function App() {
  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2500);
  }, []);

  if (loading) {
    return (
      <div className="loader-screen">
<<<<<<< HEAD
        <h1>
          ALGORYTHM
        </h1>

        <p>
          Where code meets
          rhythm
        </p>
=======
        <h1>ALGORYTHM</h1>

        <p>Where code meets rhythm</p>
>>>>>>> ee701d131c9db7a3fe6fa9f12d5c1276e07be2bb
      </div>
    );
  }

  return (
    <BrowserRouter>
<<<<<<< HEAD
      <Routes>
        <Route
          path="/"
          element={
            <MusicPlayer />
          }
        />

        <Route
          path="/register"
          element={
            <Register />
          }
        />

        {/* ADMIN ROUTE */}
        <Route
          path="/admin"
          element={
            <AdminPage />
          }
        />
=======
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
>>>>>>> ee701d131c9db7a3fe6fa9f12d5c1276e07be2bb
      </Routes>
    </BrowserRouter>
  );
}

export default App;
