import { useEffect, useState } from 'react';
// import './App.css';
import { Button, Typography, Box, Card, TextField, CardContent } from '@material-ui/core';
import { api } from './data'


function App() {

  const [cards, setCards] = useState([])
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")

  useEffect(() => {
    api.get("/cards")
      .then(({data}) => setCards(data))
  }, [])

  const handleTextChange = (event, setter) => {
    setter(event.target.value)
  }

  const addCard = (event) => {
    event.preventDefault()
    
    // Send post request to add new card to backend
    api.post("/cards", {
      title, 
      description
    })
      .then(({data}) => {
        //Clone cards array from state
        const cardsClone = [...cards]
        //Add new card
        cardsClone.push({
          title: data.title,
          description: data.description, 
          id: data.id
        })
        setTitle("")
        setDescription("")
        //Set it as new state
        setCards(cardsClone)
      })
      .catch(err => console.log("oops: ", err))
  }

  

  return (
    <Box>
      
        <Typography>
          Trello Clone
        </Typography>

        <Button>
          This is a Button
        </Button>

        {cards.map(({title, description, id}) => (
          <Box key={id}>
            <Card variant="outlined">
              <CardContent>
                <Typography>{title}</Typography>
                <Typography>{description}</Typography>
              </CardContent>
            </Card>
          </Box>
        ))}

        {/* NEW CARD FORM */}
        <form onSubmit={addCard}>
          <TextField onChange={(event) => handleTextChange(event, setTitle)} value={title} id="title" label="Title"/>
          <TextField onChange={(event) => handleTextChange(event, setDescription)} value={description} id="description" label="Description"/>
          <Button type="submit">Add Task</Button>
        </form>
    </Box>
  )
}

export default App;
