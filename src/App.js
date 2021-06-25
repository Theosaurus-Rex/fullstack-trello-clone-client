import { useEffect, useState } from 'react';
import './App.css';
import { Button, Typography, Box, Card, TextField, CardContent, Grid, CircularProgress, FormHelperText } from '@material-ui/core';
import { api } from './data'
import { validateInput } from './utils/validators';
import { Alert } from '@material-ui/lab'


function App() {

  const [cards, setCards] = useState([])
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [loading, setLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState("")
  const [titleValid, setTitleValid] = useState(true)
  const [descriptionValid, setDescriptionValid] = useState(true)

  useEffect(() => {
    api.get("/cards")
      .then(({data}) => setCards(data))
      .catch((err) => setErrorMessage(err.message))
      .finally(setLoading(false))
  }, [])

  useEffect(() => {
    setTitleValid(validateInput(title))
  }, [title])

  useEffect(() => {
    setDescriptionValid(validateInput(description))
  }, [description])


  const addCard = (event) => {
    event.preventDefault()
    setLoading(true)
    
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
      .catch((err) => setErrorMessage(err.message))
      .finally(setLoading(false))
  }

  

  return (
    <div className="body">
    <Grid  container direction="column" justify="center" alignItems="center">
        <Typography component="h1" variant="h2">
          Trello Clone
        </Typography>

        {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
        {loading && <CircularProgress/>}

      <Grid container direction="row" justify="center" alignItems="center">
        {cards.map(({title, description, id}) => (
          <Box className="card" key={id}>
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
            <TextField error={!titleValid} onChange={(event) => setTitle(event.target.value)} value={title} id="title" label="Title"/>
            <TextField error={!descriptionValid} onChange={(event) => setDescription(event.target.value)} value={description} id="description" label="Description"/>
            <Button disabled={!titleValid || !descriptionValid} type="submit">Add Task</Button>
            <FormHelperText error={!titleValid || !descriptionValid}>Please don't use any naughty words.</FormHelperText>
          </Grid>
        </form>
      
    </Grid>
    </div>
  )
}

export default App;
