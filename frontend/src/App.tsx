import React, { useState, useEffect } from "react";
import { Box, dividerClasses, Typography } from "@mui/material";
import Login from './Login';
import Grid from './Grid';
import axios from "axios";
import Superhero from './Superhero';

import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

function App() {
  //all stuff untill 'returm' to be removed at the end
  const [message, setMessage] = useState("");
  const [color, setColor] = useState("blue");

  useEffect(() => {
    // fetch('http://localhost:8000/heroes', {
    //   method: 'GET',
    //   credentials: 'include'
    // })
    // .then(response => response.json())
    // .then(data => {
    //   console.log(data);
    // })
    // ;
    //leaving this for now
    (async () => {
      try {
        const message = (await axios.get("/hello-world")).data;
        setMessage(message);
        setColor("blue");
      } catch {
        setMessage("Something went wrong!");
        setColor("red");
      }
    })();
  }, []);
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/heroes" element={<Grid />} />
      <Route path='/heroes/:id' element={<Superhero />} />
    </Routes>
  </BrowserRouter>
  );
  // return (
  //   <Box sx={{ mt: 10 }}>
  //     <Typography variant="h4" color={color} align="center">
  //       {message}
  //     </Typography>
  //   </Box>
  // );
}

export default App;
