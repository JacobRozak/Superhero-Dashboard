import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import axios from "axios";
import { useNavigate } from 'react-router-dom'

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}
const Input = styled('input')({
    display: 'none',
  });

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function RecipeReviewCard() {
  const [hero, setHero] = useState([{name:'', description:'', id:0, createdAt:''}]);
  const { id } = useParams();
  const [imgData, setImgData] = useState("http://simpleicon.com/wp-content/uploads/picture.png");
  const [expanded, setExpanded] = useState(false);
  
  const navigate = useNavigate();
  
  var handleDelete = () => {
    axios.delete('http://localhost:8000/heroes/'+hero[0].id,{ withCredentials: true })
    .then(function (response) {
        navigate(`/heroes`);
    })
  };
  
  var cashePic = ''
  const onChangePicture = (e:any) => {
    if (e.target.files[0]) {
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        const csv: string = reader.result as string;
        setImgData(csv);
        cashePic = csv
      });
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  useEffect(() => {
    (async () => {
      try {
        fetch('http://localhost:8000/heroes', {
          method: 'GET',
          credentials: 'include'
        })
        .then(response => response.json())
        .then(data =>{
          setHero(data.filter((e:any) => e.id == id))
        })
      } catch {
        alert('Something went wrong!');
      }
    })();
  }, []);
  return (
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
      </Stack>
      <CardContent>
        <Typography variant="body2" color="text.secondary">
            {hero[0].description}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
        </ExpandMore>
      </CardActions>
    </Card>
  );
}
