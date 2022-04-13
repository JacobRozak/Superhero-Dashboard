import React, { useState, useEffect } from "react";
import Login from './components/Login';
import Grid from './components/Grid';
import Superhero from './components/Superhero';

import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/heroes" element={<Grid />} />
      <Route path='/heroes/:id' element={<Superhero />} />
    </Routes>
    </BrowserRouter>
  );
}

export default App;
