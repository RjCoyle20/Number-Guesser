import { useEffect } from "react";


export default function Profile(){

    const [games, setGames] = useState([]);

    useEffect( () => {
        const fetchGames = async () => {
        try {
            const response = await fetch ("http://localhost:8080/")
        } catch (error) {
            
        }
    }
    })
}