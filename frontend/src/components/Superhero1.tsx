import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import axios from "axios";
import { useNavigate } from 'react-router-dom'
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';

const Input = styled('input')({
    display: 'none',
  });
  
export default function RecipeReviewCard() {
  const [hero, setHero] = useState([{name:'', description:'', id:0, createdAt:''}]);
  const { id } = useParams();
  const [imgData, setImgData] = useState("http://simpleicon.com/wp-content/uploads/picture.png");
  const [getImage, setgetImage] = useState([{id:0, img:'https://www.hallplace.org.uk/wp-content/uploads/2018/10/Superhero-February.jpg'}]);
  
  const navigate = useNavigate();
  
  var handleDelete = () => {
    (async () => {
    const rawResponse = await axios.delete('http://localhost:8000/heroes/'+hero[0].id,{ withCredentials: true })
      .then(function (response) {
          navigate(`/heroes`);
      })
    })()
  };
  
  const onChangePicture = (e:any) => {
    if (e.target.files[0]) {
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        const csv: string = reader.result as string;
        setImgData(csv);
      });
      reader.readAsDataURL(e.target.files[0]);
    }
  };
  
  const sendPic = (e:any) => {
    (async () => {
      await setgetImage([...getImage, {id:hero[0].id, img:imgData}])
      await console.log(getImage)
      await fetch('http://localhost:3005/postImg', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({id:hero[0].id, img:imgData})
      });
    })();
  };
  
  useEffect(() => {
    (async () => {
      try {
        await fetch('http://localhost:8000/heroes', {
          method: 'GET',
          credentials: 'include'
        })
        .then(response => response.json())
        .then(data =>{
          setHero(data.filter((e:any) => e.id == id))
        })
        
        await fetch('http://localhost:8000/images')
        .then(response => response.json())
        .then(data =>{
          if(data.length > 0){
            setgetImage(data.filter((e:any) => e.id == id))
          }
        })
      } catch {
        alert('Something went wrong!');
      }
    })();
  }, []);
  
  return (
    <div >
    <Button color="secondary" style={{marginLeft: '20px', marginTop: '20px'}} variant="contained">
      <Link style={{textDecoration: 'none', color: 'white'}} to='/heroes'>Go Back</Link>
    </Button>
    <Stack spacing={2} direction="row">
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            {hero[0].name.split(' ').map(function(item){return item[0]}).join('')}
          </Avatar>
        }
        title={hero[0].name}
        subheader={hero[0].createdAt}
      />
      <CardMedia
        component="img"
        height="300"
        image={imgData}
        alt="Paella dish"
      />
      <Stack spacing={2} direction="row">
      <Button variant="contained" onClick={handleDelete}>
            Delete
      </Button>
      <label htmlFor="contained-button-file">
        <Input accept="image/*;capture=camera" id="contained-button-file" type="file" onChange={onChangePicture} />
        <Button variant="contained" component="span">
          Upload
        </Button>
      </label>
      <Button variant="contained" onClick={sendPic}>
        Save
      </Button>
      </Stack>
      <CardContent>
        <Typography variant="body2" color="text.secondary">
            {hero[0].description}
        </Typography>
      </CardContent>
    </Card>
    <ImageList sx={{ width: 500, height: 450 }} cols={3} rowHeight={164}>
      {getImage.map((item) => (
        <ImageListItem key={item.img}>
          <img
            // onclick={deleteImg}
            style={{ width: '100%', height: '100%' }}
            src={`${item.img}`}
            loading="lazy"
          />
        </ImageListItem>
      ))}
    </ImageList>
    </Stack>
    </div>
  );
}
