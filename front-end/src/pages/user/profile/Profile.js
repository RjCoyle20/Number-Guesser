import { useEffect, useState } from "react";
import Cookies from 'js-cookie';
import Table from 'react-bootstrap/Table';
import './Profile.css';


export default function Profile(){

    // Set username from cookies to display on profile page
    const authToken = Cookies.get('username');

    const [username, setUsername] = useState(authToken);
    const [games, setGames] = useState([]);
    const [id, setId] = useState(1);
   
    console.log("username read: " + username);

    useEffect( () => {

        const fetchGames = async () => {
        try {
            const response = await fetch ("http://localhost:8080/user/" + username, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            const data = await response.json();
            setGames(data);
            console.log(data);
       
        } catch (error) {
            console.error('Error fetching search results:', error);
        }
    };

    if(username) {
        fetchGames();
    }
    }, [username])

    return(
        <div>
        <h1>{username}</h1>
        <br/><br/>
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Total Guesses</th>
                    <th>Guesses Used</th>
                    <th>Target Number</th>
                    <th>Win/Loss</th>
                </tr>
            </thead>
            <tbody>
                {games.map((game) => (
                    <tr key= {game.id}>
                        <td >{games.indexOf(game) +1 }</td>
                        <td>{game.guessTotal}</td>
                        <td>{game.kGuesses}</td>
                        <td>{game.targetNumber}</td>
                        <td>{game.successful ? "WIN" : "LOSS"}</td>
                    </tr>
                ))}
            </tbody>
        </Table>
        </div>
    )
}