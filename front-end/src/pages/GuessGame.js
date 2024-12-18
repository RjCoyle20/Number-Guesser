import { useState } from "react"
import { Button, Form } from "react-bootstrap";
import { useLocation } from "react-router";
import Cookies from 'js-cookie';

//TODO get username from cookies
//TODO set up Post method for saving game
//TODO build out Profile.js page

export default function GuessGame(props){
    const {state} = useLocation();
    const {guesses} = state // Read values passed on state


    const [targetNumber, setTargetNumber] = useState(Math.floor(Math.random() * 100));
    const [guessesCounter, setGuessesCounter] = useState(0);
    const [currentGuess, setCurrentGuess] = useState()
    const [message, setMessage] =  useState("Play the odds or go with your gut!")
    const [isSuccessful, setIsSuccessful] = useState()

    const username = Cookies.get('username');

    const [gameData, setGameData] = useState ({
        guessesTotal: guesses,
        successful: isSuccessful,
        kGuesses: guessesCounter,
        targetNumber: targetNumber,
        username: username
    })

    const handleChange = (event) => {
        setCurrentGuess(event.target.value);
    }
   
    const handleSubmit = async (e) => {
        e.preventDefault();
        try { 
            if(currentGuess > 100 || currentGuess <= 0){
                throw new Error("Please enter a number between 1-100");
            }
            if(isNaN(currentGuess)){
                throw new Error("That is not a number. Please enter a number between 1-100");
            }
            console.log(guessesCounter + " guesses made; Current number is :" + currentGuess + " Try to guess this number: " + targetNumber)
            if (targetNumber == currentGuess && guessesCounter == 0) {
                console.log("Immaculate guess!")
                return( setMessage("Congratulations! Immaculate guess! You guessed the number on the first try!"),
                        setIsSuccessful(true));
                } else if (targetNumber == currentGuess ) {
                    console.log("Correct guess!")
                    return( setMessage("Congrats! you have guesesed the number " + targetNumber),
                            setIsSuccessful(true));
                }  else if ( targetNumber > currentGuess && guessesCounter != guesses) {
                    setMessage("The number is greater than " + currentGuess);
                    setGuessesCounter(guessesCounter + 1 );
                } else if (targetNumber < currentGuess && guessesCounter != guesses ) {
                    setMessage("The number is less than " + currentGuess);
                    setGuessesCounter(guessesCounter + 1);
                } else return (setMessage("CPU wins! You have exhausted all " + guesses + " trials. The number was " + targetNumber), 
                                setGuessesCounter(guessesCounter + 1),
                                setIsSuccessful(false));
                      
        } catch (error) {
            console.log("Error submiting guess " + currentGuess)
            setMessage(error.message);
        }

        if(isSuccessful == true || isSuccessful == false){
            try {
                console.log("Game data being sent back: " + gameData.guessesTotal + " <- total guesses" + gameData.kGuesses + " <- guesses used" + gameData.successful + " <- Successful?" + gameData.targetNumber + " <- Target number" + gameData.username + "<- username");
                const response = await fetch("http://localhost:8080/game/post", {
                    method: "POST", 
                    headers: {"Content-Type" : "application/json"},
                    body: JSON.stringify(gameData)
                })
            } catch (error) {
                console.log("Error submiting data to backend")
                setMessage(error.message);
            }
        }
    }

    //TODO Save game info to user (after creating user).
    

    return(
        <>
        <h1>
        Let's Play!
        </h1>
        <h4>Total Guesses: {guesses}</h4>
        <h4>Guesses Remaining: {guesses - guessesCounter}</h4>
        <h3>Guess a number between 1-100</h3>
        <h4>The Target number is: {targetNumber}</h4>
        <Form onSubmit={handleSubmit}>
        {/* If message begins with "T," display the input box and submit button. Otherwise, the game is over!" */}
        {message.charAt(0) == "C" || "" ? null :
        <input type="text" id="gameGuess" label="Guess" variant="outlined" value= {currentGuess} onChange={handleChange}/>}<p>The current guess is: {currentGuess}</p>
        <div>
        {message.charAt(0) == "C"  ? null : <Button variant='primary' type='submit'  >Submit</Button>}
        </div>
        </Form>
        <h2>{currentGuess}</h2>
        {message}
        </>

    )
}