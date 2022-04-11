import * as React from 'react';
import { useState, useEffect } from "react";
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import axios from "axios";
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

const StyledPaper = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(2),
    maxWidth: 400,
    color: theme.palette.text.primary,
  }));

const HeroList = () => {
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
  <div>
    <Button onClick={()=>document.cookie = 'token' + '=; Max-Age=0'} style={{marginLeft: '20px'}} variant="contained">
      <Link style={{textDecoration: 'none', color: 'white'}} to='/'>Logout</Link>
    </Button>
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 2, sm: 8, md: 12 }}>
      {heroes.map((hero) => (
      <StyledPaper
        sx={{
          my: 2,
          mx: 'auto',
          p: 6,
        }}
      >
        <Grid container wrap="nowrap" spacing={2}>
          <Grid item>
            <Avatar>{hero.name.split(' ').map(function(item){return item[0]}).join('')}</Avatar>
          </Grid>
          <Grid item xs>
            <Typography gutterBottom variant="subtitle1" component="div">
              {hero.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {hero.shortDescription}
            </Typography>
          </Grid>
            <Grid item>
            <Stack spacing={2} direction="column">
                <Button variant="contained">
                  <Link style={{textDecoration: 'none', color: 'white'}} to={`${hero.id}`}>Learn More</Link>
                </Button>
                <Button variant="contained" color="error" onClick={() => handleDelete(hero.id)}>
                  Delete
                </Button>
            </Stack>
            </Grid>
        </Grid>
      </StyledPaper>
        ))}
      </Grid>
    </Box>
    </div>
  );
}

export default HeroList;
