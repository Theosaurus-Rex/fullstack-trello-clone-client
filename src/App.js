import { useEffect, useState } from 'react';
import axios from 'axios'
import './App.css';
import { Button, Typography, Box } from '@material-ui/core';

const apiUrl = process.env.REACT_APP_API_URL

function App() {

  const [cards, setCards] = useState([])

  useEffect(() => {
    axios.get(`${apiUrl}/cards`)
      .then(({data}) => setCards(data))
  }, [])

  

  return (
    <div className="App">
      <header className="App-header">
        <Typography>
          Trello Clone
        </Typography>
        <Button>
          This is a Button
        </Button>
        {cards.map(({title, description, id}) => (
          <Box key={id}>
            <Typography>{title}</Typography>
            <Typography>{description}</Typography>
          </Box>
        ))}
      </header>
    </div>
  );
}

export default App;
