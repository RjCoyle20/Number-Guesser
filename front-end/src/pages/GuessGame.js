import { useEffect, useState } from "react"
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
    const [currentGuess, setCurrentGuess] = useState();
    const [message, setMessage] =  useState("Play the odds or go with your gut!");
    const [isSuccessful, setIsSuccessful] = useState(false);
    const [isGameOver, setIsGameOver] = useState(false);
    const [previousGuess, setPreviousGuess] = useState();

   

    const username = Cookies.get('username');

    const [gameData, setGameData] = useState ({
        guessTotal: guesses,
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
                // setGuessesCounter(guessesCounter + 1)
                if (currentGuess == previousGuess){
                    throw new Error ("No sense in guessing the same number twice");
                }
                console.log(guessesCounter +1 + " guesses made out of " + guesses + " Current number is :" + currentGuess + " Try to guess this number: " + targetNumber)
                console.log("is game over? " + isGameOver)
                console.log("is game successful? " + isSuccessful)
                if (targetNumber == currentGuess && guessesCounter == 0 && !isGameOver ) {
                    console.log("Immaculate guess!")
                    setIsGameOver((isGameOver) => !isGameOver)
                    setIsSuccessful((isSuccessful) => !isSuccessful)
                    setMessage("Congratulations! Immaculate guess! You guessed the number on the first try!");
                    setGuessesCounter(guessesCounter + 1 )
                    console.log(isGameOver)
                    console.log("is game over? " + isGameOver)
                    console.log("is game successful? " + isSuccessful)
                    } else if (targetNumber == currentGuess && !isGameOver) {
                        console.log("Correct guess!")
                        setMessage("Congrats! you have guesesed the number " + targetNumber)
                        setIsSuccessful((isSuccessful) => !isSuccessful)
                        setIsGameOver((isGameOver) => !isGameOver)
                        setGuessesCounter(guessesCounter + 1 )
                        console.log("is game over? " + isGameOver)
                        console.log("is game successful? " + isSuccessful)
                    }  else if ( targetNumber > currentGuess && guessesCounter != guesses -1) {
                        setMessage("The number is greater than " + currentGuess)
                        setGuessesCounter(guessesCounter + 1 );
                        setPreviousGuess(currentGuess);
                    } else if (targetNumber < currentGuess && guessesCounter != guesses -1 ) {
                        setMessage("The number is less than " + currentGuess);
                        setGuessesCounter(guessesCounter + 1);
                        setPreviousGuess(currentGuess);
                    } else {
                        setMessage("CPU wins! You have exhausted all " + guesses + " trials. The number was " + targetNumber)
                        setGuessesCounter(guessesCounter + 1)
                        setIsGameOver((isGameOver) => !isGameOver)
                        console.log("is game over? " + isGameOver)
                        console.log("is game successful? " + isSuccessful)
                        
                    }
            } catch (error) {
                console.log("Error submiting guess " + currentGuess)
                setMessage(error.message);
        }
        
        
    }
    useEffect(() => {
        console.log("this is isSuccessful " + isSuccessful);
        console.log("this is isGameOver " + isGameOver);
        gameData.successful = isSuccessful;
        gameData.kGuesses = guessesCounter;

        const postData = async () => {
            try{
            console.log("Game data being sent back: " + gameData.guessTotal + " <- total guesses " + gameData.kGuesses + " <- guesses used " + gameData.successful + " <- Successful?" + gameData.targetNumber + " <- Target number" + gameData.username + "<- username");
            const response = await fetch("http://localhost:8080/game/post", {
                    method: "POST", 
                    headers: {"Content-Type" : "application/json"},
                    body: JSON.stringify(gameData)
                })

            } catch (error){
                console.log('Error posting results', error);
            }
            
    };
    if(isGameOver){
        postData();
    } 
}, [isGameOver]);
    
 
    return(
        <>
        <h1>
        Let's Play!
        </h1>
        <h5>Total Guesses: {guesses}</h5>
        <h5>Guesses Remaining: {guesses - guessesCounter}</h5>
        <h3>Guess a number between 1-100</h3>
        {/* <h4>The Target number is: {targetNumber}</h4> */}
        <Form onSubmit={handleSubmit}>
        {/* If message begins with "T," display the input box and submit button. Otherwise, the game is over!" */}
        {message.charAt(0) == "C" || "" ? null :
        <input type="text" id="gameGuess" label="Guess" variant="outlined" value= {currentGuess} onChange={handleChange}/>}
        {/* <p>The current guess is: {currentGuess}</p> */}
        <div>
        {message.charAt(0) == "C"  ? null : <Button variant='primary' type='submit'  >Submit</Button>}
        </div>
        </Form>
        <h2>{currentGuess}</h2>
        {message}
        </>

    )
}