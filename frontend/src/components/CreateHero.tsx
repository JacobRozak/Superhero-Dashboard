
import * as React from 'react';
import { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Box } from "@mui/material";
import axios from "axios";
import FormControl from '@mui/material/FormControl';
import Typography from '@mui/material/Typography';

const CreateHero = (element: any) => {
    const [description, setDescription] = useState('');
    const handleSubmit = (e:any) => {
      try {
      (async () => {
        var capitalize = e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1);
        const message = (await axios.get('https://dbpedia.org/sparql?default-graph-uri=http%3A%2F%2Fdbpedia.org&query=prefix+dbpedia%3A+%3Chttp%3A%2F%2Fdbpedia.org%2Fresource%2F%3E%0D%0Aprefix+dbpedia-owl%3A+%3Chttp%3A%2F%2Fdbpedia.org%2Fontology%2F%3E%0D%0A%0D%0Aselect+%3Fabstract+%3Fthumbnail+where+%7B+%0D%0Adbpedia%3A'+capitalize+'+dbpedia-owl%3Aabstract+%3Fabstract+%3B%0D%0Adbpedia-owl%3Athumbnail+%3Fthumbnail+.%0D%0Afilter%28langMatches%28lang%28%3Fabstract%29%2C%22en%22%29%29%0D%0A%7D&format=application%2Fsparql-results%2Bjson')).data;
        if(message.results.bindings[0].abstract.value){
          setDescription(message.results.bindings[0].abstract.value);
        }
      })()
      } catch {
        alert("Something went wrong!");
      }
    }
    const handleRegister = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        (async () => {
            try {
                fetch('http://localhost:8000/heroes', {
                    method: 'post',
                    credentials: 'include',headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                  },body: JSON.stringify({name: data.get('name'), shortDescription: data.get('shortDescription'), description: data.get('description'), power: 'super human streangth and power'})
                })
              alert('Hero created!');
              document.querySelectorAll("input").forEach(element => {
                element.value = '';
              });
            } catch {
              alert('not a Real hero')
            }
          })();
      };
return (
    <div>
    <Typography style={{marginLeft: '150px'}} variant="h6" gutterBottom component="div">
      **try picking well known heroes, such as "Superman" or "Batman", to auto-fill description
    </Typography>
    <Box component="form" noValidate onSubmit={handleRegister} sx={{ mt: 1, maxWidth: '100%',  width: 550 }}>
    <FormControl sx={{ m: 3, width: '25ch' }} variant="standard">
    <TextField
      className="input"
      onChange={handleSubmit}
      style={{textTransform: "capitalize"}}
      id="name"
      label="name"
      name="name"
      autoComplete="name"
    />
    </FormControl>
    <FormControl sx={{ m: 3, width: '25ch' }} variant="standard">
      <TextField
        className="input"
        id="shortDescription"
        label="Brief Description"
        name="shortDescription"
        autoComplete="shortDescription"
      />
    </FormControl>
    <FormControl sx={{ m: 3, width: '56ch' }} variant="standard">
    <TextField
      className="input"
      id="outlined-multiline-static"
      name="description"
      multiline
      rows={10}
      defaultValue={description}
    />
    </FormControl>
    <Button
      type="submit"
      fullWidth
      variant="contained"
      sx={{ mt: 3, mb: 1 }}
    >
    Register
    </Button>
    </Box>
  </div>
  );
}

export default CreateHero;
