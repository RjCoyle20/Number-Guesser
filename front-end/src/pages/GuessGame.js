import { TextField } from "@mui/material";
import { useState } from "react"
import { Button, Form } from "react-bootstrap";
import { useLocation } from "react-router";


export default function GuessGame(props){
    const {state} = useLocation();
    const {guesses} = state // Read values passed on state

    const [targetNumber, setTargetNumber] = useState(Math.floor(Math.random() * 100));
    const [guessesRemaining, setGuessesRemaining] = useState(guesses);
    const [currentGuess, setCurrentGuess] = useState()
    const [message, setMessage] =  useState("Play the odds or go with your gut!")
    
    const handleChange = (event) => {
        setCurrentGuess(event.target.value);
    }
   
    const handleSubmit = async (e) => {
        e.preventDefault();
        try { 
            console.log(guessesRemaining + " guesses remaining; Current number is :" + currentGuess + " Try to guess this number: " + targetNumber)
            if (targetNumber == currentGuess) {
                console.log("Correct guess!")
                return( setMessage("Congrats! you have guesesed the number " + targetNumber))
                } else if ( targetNumber > currentGuess && guessesRemaining != 1) {
                    setMessage("The number is greater than " + currentGuess);
                    setGuessesRemaining(guessesRemaining - 1 );
                } else if (targetNumber < currentGuess && guessesRemaining != 1 ) {
                    setMessage("The number is less than " + currentGuess);
                    setGuessesRemaining(guessesRemaining - 1);
                } else return (setMessage("CPU wins! You have exhausted all " + guesses + " trials. The number was " + targetNumber), 
                                setGuessesRemaining(guessesRemaining - 1));
            //TODO Error handling.
        } catch (error) {
            
        }
    }

    //TODO Save game info to user (after creating user).

    return(
        <>
        <h1>
        Let's Play!
        </h1>
        <h4>Total Guesses: {guesses}</h4>
        <h4>Guesses Remaining: {guessesRemaining}</h4>
        <h3>Guess a number between 1-100</h3>
        <h4>The Target number is: {targetNumber}</h4>
        <Form onSubmit={handleSubmit}>
        {/* If message begins with "T," display the input box and submit button. Otherwise, the game is over!" */}
        {message.charAt(0) == "C" || "" ? null :
        <input type="text" id="gameGuess" label="Guess" variant="outlined" value= {currentGuess} onChange={handleChange}/>}<p>The current guess is: {currentGuess}</p>
        <div>
        {message.charAt(0) == "C"  ? null : <Button variant='primary' type='submit' className='w-100' >Submit</Button>}
        </div>
        </Form>
        <h2>{currentGuess}</h2>
        {message}
        </>

    )
}