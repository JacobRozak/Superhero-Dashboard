//import * as React from 'react';
import React, { useState, useEffect } from "react";
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import ButtonBase from '@mui/material/ButtonBase';
import axios from "axios";
import {Link} from "react-router-dom";
import Button from '@mui/material/Button';

const Img = styled('img')({
  margin: 'auto',
  display: 'block',
  maxWidth: '100%',
  maxHeight: '100%',
});
const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));
  

function App() {
  const [heroes, setHeroes] = useState([{name:'', description:'', shortDescription:'', id:''}]);
  var handleDelete = (id: string) => {
    axios.delete('http://localhost:8000/heroes/'+id,{ withCredentials: true })
    .then(function (response) {
      setHeroes(heroes.filter((p: any) => p.id !== parseInt(id)));
    })
  };
    useEffect(() => {
        fetch('http://localhost:8000/heroes', {
            method: 'GET',
            credentials: 'include'
      })
        .then(response => response.json())
        .then(data =>{
          setHeroes(data)
        }
        )
    }, [])
      return (
      <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
        {heroes.map((hero) => (
          <Paper
          sx={{
            p: 2,
            margin: 'auto',
            maxWidth: 500,
            flexGrow: 1,
            backgroundColor: (theme) =>
              theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
          }}
        >
          <Grid container spacing={2}>
            <Grid item>
              <ButtonBase sx={{ width: 128, height: 128 }}>
                <Img alt="complex" src="/static/images/grid/complex.jpg" />
              </ButtonBase>
            </Grid>
            <Grid item xs={12} sm container>
              <Grid item xs container direction="column" spacing={10}>
                <Grid item xs>
                  <Typography gutterBottom variant="subtitle1" component="div">
                    {hero.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {hero.shortDescription}
                  </Typography>
                </Grid>
                <Grid item>
                  {/* <Typography sx={{ cursor: 'pointer' }} variant="body2"> */}
                    <Link to={`${hero.id}`}>Learn More</Link>
                  {/* </Typography> */}
                </Grid>
                <Grid item>
                  <a href="#" className="btn btn-sm btn-outline-secondary" onClick={() => handleDelete(hero.id)}>Delete</a>
                </Grid>
              </Grid>
              <Grid item>
                <Typography variant="subtitle1" component="div">
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Paper>    
        ))}
    </Grid>
  );
}

export default App;
