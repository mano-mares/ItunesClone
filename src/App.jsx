import React from "react";
import Itunes from "./components/Itunes"
import Track from "./components/Track"
import {
  BrowserRouter as Router,
  Route,
  Routes,
  BrowserRouter,
} from "react-router-dom";
const HomePage = () => {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Itunes />} />
      <Route path="/song/:trackId" element={<Track />} />
    </Routes>
  </BrowserRouter>
  )
}

export default HomePage;