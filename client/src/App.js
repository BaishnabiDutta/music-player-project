import React, { useEffect, useState } from "react";

import MusicPlayer from "./pages/MusicPlayer";

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
    <div className="App">
      <MusicPlayer />
    </div>
  );
}

export default App;
