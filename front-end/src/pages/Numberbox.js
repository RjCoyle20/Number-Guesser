import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useState } from 'react'
import { Button, Form } from 'react-bootstrap';

export default function Numberbox() {
  
  const [guesses, setGuesses] = useState ({guesses: 0})
  const handleInputChange = (event) => {
    const {name, value} = event.target
    setGuesses({
      ...guesses,
      [name]: value
    })
    console.log(guesses)
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   console.log(guesses)

  //   try {
  //     const response = await fetch("http://localhost:8080/")
  //   } catch (error) {
      
  //   }
  // }
  return (
    <Form onSubmit={handleInputChange}
      component="form"
      sx={{ '& > :not(style)': { m: 1, width: '25ch', } }}
      noValidate
      autoComplete="off"
    >
      <TextField id="filled-basic" label="Filled" variant="outlined" />
      <div>
      <Button variant='primary' type='submit' className='button'>
        Submit
      </Button>
      </div>
    </Form>
  );
}
