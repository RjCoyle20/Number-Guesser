import { TextField } from "@mui/material";
import { useState } from "react"
import { Button } from "react-bootstrap";


export default function GuessGame(props){
    const targetNumber = Math.floor(Math.random() * 100)
    const [guessesRemaining, setGuessesRemaining] = useState(props.guesses);
    const [currentGuess, setCurrentGuess] = useState()
    const [message, setMessage] =  useState("Play the odds or go with your gut!")

    const handleChange = (event) => {
        setCurrentGuess(event.target.value);
    }
    //TODO******* NEED TO USE HANDLE SUBMIT, NOT FOR LOOP
    const handleSubmit = async (e) => {
        e.preventDefault();
        try { 
            console.log(guessesRemaining + " guesses remaining; Current number is :" + currentGuess + " Try to guess this number: " + targetNumber)
            if (targetNumber == currentGuess) {
                return(message = "Congrats! you have guesesed the number " + targetNumber)
                } else if ( targetNumber > currentGuess && guessesRemaining != props.guesses) {
                    message = "The number is greater than " + currentGuess;
                    guessesRemaining--;
                } else if (targetNumber < currentGuess && guessesRemaining != props.guesses ) {
                    message = "The number is less than " + currentGuess;
                    guessesRemaining--;
                } else return (message = "You have exhausted " + props.guesses + " trials. The number was " + targetNumber);
            
        } catch (error) {
            
        }
    }

    // for (let i = 0; i < props.guesses; i++){
       
    // } 

    return(
        <>
        <h1>
        Let's Play!
        </h1>
        <h4>Total Guesses: {props.guesses}</h4>
        <h4>Guesses Remaining: {guessesRemaining}</h4>
        <h3>Guess a number between 1-100</h3>
        {message.charAt(0) == "Y" ? null :
        <TextField id="filled-basic" label="Filled" variant="outlined" value= {currentGuess} onChange={handleChange}/>}<p>The current guess is: {currentGuess}</p>
        <div>
        {message.charAt(0) == "Y" ? null : <Button variant='primary' type='submit' className='w-100' onSubmit={handleSubmit}>Submit</Button>}
        </div>
        <h2>{currentGuess}</h2>
        {message}
        </>

    )
}