import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useState } from 'react'
import { Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router';
import './Numberbox.css';
import { BrowserRouter } from 'react-router-dom';
import GuessGame from '../GuessGame';


export default function Numberbox() {
  
  const [guesses, setGuesses] = useState ('')
  const [submitted, setSubmitted] = useState(false)
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitted(true);
    console.log(guesses)
    // navigate('/guessGame')
  };

  const handleChange = (event) => {
    event.preventDefault();

    setGuesses(event.target.value)
    console.log(guesses);
  }

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
    <Form onSubmit={handleSubmit}>
    
      <input type='text' id="guesses" value={guesses} label="Guesses" variant="outlined" onChange={handleChange} /><p>Number of guesses: {guesses}</p>
      <div>

      <Button variant='primary' type='submit' className='button' >
        Submit
      </Button>
      </div>
    </Form> 
    {submitted == true ? <GuessGame guesses = {guesses}/> : null}
    </div>
    </>

  );
}
