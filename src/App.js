import { useEffect, useState } from 'react';
import './App.css';
import { Button, Typography, Box, Card, TextField, CardContent, Grid } from '@material-ui/core';
import { api } from './data'
import { validateInput } from './utils/validators';


function App() {

  const [cards, setCards] = useState([])
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")

  useEffect(() => {
    api.get("/cards")
      .then(({data}) => setCards(data))
  }, [])

  const handleTextChange = (event, setter) => {
    // Run input through the validator function
    const textInput = event.target.value
    if (validateInput(textInput)) {
      setter(textInput)
    } else {
      alert("That is a naughty word!")
    }
    
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
    <div class="body">
    <Grid  container direction="column" justify="center" alignItems="center">
        <Typography class="title">
          Trello Clone
        </Typography>

      <Grid container direction="row" justify="center" alignItems="center">
        {cards.map(({title, description, id}) => (
          <Box class="card" key={id}>
            <Card variant="outlined" color="primary">
              <CardContent>
                <Typography variant="h4">{title}</Typography>
                <Typography variant="h5">{description}</Typography>
              </CardContent>
            </Card>
          </Box>
        ))}
      </Grid>
    

        {/* NEW CARD FORM */}
      
        <form onSubmit={addCard}>
          <Grid container direction="column" justify="center" alignItems="center">
            <TextField onChange={(event) => handleTextChange(event, setTitle)} value={title} id="title" label="Title"/>
            <TextField onChange={(event) => handleTextChange(event, setDescription)} value={description} id="description" label="Description"/>
            <Button type="submit">Add Task</Button>
          </Grid>
        </form>
      
    </Grid>
    </div>
  )
}

export default App;
