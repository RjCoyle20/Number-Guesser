import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useState } from 'react'
import { Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router';
import './Numberbox.css';

export default function Numberbox() {
  
  const [guesses, setGuesses] = useState ({guesses: 0})

  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const {name, value} = event.target
    setGuesses({
      ...guesses,
      [name]: value
    })
    console.log(guesses)
    navigate('/guessGame')
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
    <>
    <div className='center-form'>Enter Number of Guesses
    <Form onSubmit={handleInputChange}
    >
      <TextField id="filled-basic" label="Filled" variant="outlined" />
      <div>

      <Button variant='primary' type='submit' className='button'>
        Submit
      </Button>
      </div>
    </Form>
    </div>
    </>
  );
}
