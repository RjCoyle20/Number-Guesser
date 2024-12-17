import { useEffect, useState } from "react";
import Cookies from 'js-cookie';
import { Table } from "react-bootstrap";

export default function Profile(){

    // Set username from cookies to display on profile page
    const authToken = Cookies.get('username');

    const [username, setUsername] = useState(authToken);
    const [games, setGames] = useState([]);
    
   
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
        } catch (error) {
            console.error('Error fetching search results:', error);
        }
    }
    })

    return(
        <div>
        <h1>{username}</h1>
        <Table>
            
        </Table>
        </div>
    )
}