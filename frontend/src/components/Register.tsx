
import * as React from 'react';
import { useState, useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import { Box, Typography, Grid } from "@mui/material";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from "axios";
import { useNavigate } from 'react-router-dom'

const Register = (stateChanger: any, ...rest: any) => {
    const handleRegister = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log('derp')
        stateChanger(false)
        axios.post('http://localhost:8000/users', {
          name: data.get('name'),
          password: data.get('password')
        })
        .then(function (response) {
            stateChanger(false)
        })
        .catch(function (error) {
          alert('Something went wrong');
        });
      };
return (
    <div>
    <Box component="form" noValidate onSubmit={handleRegister} sx={{ mt: 1 }}>
    <TextField
      margin="normal"
      required
      fullWidth
      id="name"
      label="name"
      name="name"
      autoComplete="name"
      autoFocus
    />
    <TextField
      margin="normal"
      required
      fullWidth
      name="password"
      label="Password"
      type="password"
      id="password"
      autoComplete="current-password"
    />
    <Button
      type="submit"
      fullWidth
      variant="contained"
      sx={{ mt: 3, mb: 2 }}
    >
    Register
    </Button>
    </Box>
  </div>
  );
}

export default Register;
