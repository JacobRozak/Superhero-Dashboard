import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
const Superhero = () => {
  const [hero, setHero] = useState([{name:'', description:''}]);
  const { id } = useParams();

  useEffect(() => {
    fetch('http://localhost:8000/heroes', {
            method: 'GET',
            credentials: 'include'
      })
        .then(response => response.json())
        .then(data =>{
          setHero(data.filter((e:any) => e.id == id))
        }
        )
  }, []);
  return (
    <div>
      {hero.map((e) => (
        <div>
          <h1>{e.name}</h1>
          <h4>{e.description}</h4>
        </div>
      ))}
      <Link to='/heroes' className='btn'>
        Back To People
      </Link>
    </div>
  );
};

export default Superhero;
