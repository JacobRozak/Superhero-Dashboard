import React, { useState, useEffect } from "react";
import { Box, dividerClasses, Typography } from "@mui/material";
import Login from './components/Login';
import Grid from './components/Grid1';
import axios from "axios";
import Superhero from './components/Superhero';

import {
  BrowserRouter,
  Routes,
  Route,
  Link
} from "react-router-dom";

function App() {
  //all stuff untill 'returm' to be removed at the end
  return (
    <BrowserRouter>
      <div>
        <ul>
          <li>
            <Link to="/">login</Link>
          </li>
          <li>
            <Link to="/heroes">heroes</Link>
          </li>
        </ul>

        <hr />
        </div>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/heroes" element={<Grid />} />
      <Route path='/heroes/:id' element={<Superhero />} />
    </Routes>
    
    </BrowserRouter>
  );
}

export default App;
