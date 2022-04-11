import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from "axios";
import { useNavigate } from 'react-router-dom'


const Superhero = () => {
  const navigate = useNavigate();
  const [hero, setHero] = useState([{name:'', description:'', id:0}]);
  const { id } = useParams();
  
  const [imgData, setImgData] = useState('');
  var cashePic = ''
  const onChangePicture = (e:any) => {
    if (e.target.files[0]) {
      // console.log("picture: ", e.target.files);
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        const csv: string = reader.result as string;
        setImgData(csv);
        cashePic = csv
      });
      reader.readAsDataURL(e.target.files[0]);
    }
  };
  var handleDelete = (id: string) => {
    axios.delete('http://localhost:8000/heroes/'+id,{ withCredentials: true })
    .then(function (response) {
      navigate(`/heroes`);
    })
  };
  
  // const sendPic = (pic:any) => {
  //   (async () => {
  //     const rawResponse = await fetch('../../public/images', {
  //       method: 'POST',
  //       headers: {
  //         'Accept': 'text/plain',
  //         'Content-Type': 'text/plain'
  //       },
  //       body: cashePic
  //     });
  //     const content = await rawResponse.json();
    
  //     console.log(content);
  //   })();
  //   derp.preventDefault();
  // }
  
  useEffect(() => {
    //doesnt work yet, its for pictures stuff
    // fetch(`http://localhost:8000/images`)
    // .then(res => res.json())
    // .then(data => { console.log(data)});
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
    <div>
      {hero.map((e) => (
        <div>
          <h1>{e.name}</h1>
          <h4>{e.description}</h4>
        </div>
      ))}
      <div className="register_profile_image">
        <input type="file" accept="image/*;capture=camera" onChange={onChangePicture}/>
      </div>
      <div className="previewProfilePic">
        <img height="200" width="200" className="playerProfilePic_home_tile" src={imgData} />
      </div>
      <button onClick={() => console.log('img sent')}>Send</button>
      <Link to='/heroes' className='btn'>
        Back To People
      </Link>
    </div>
  );
};

export default Superhero;
