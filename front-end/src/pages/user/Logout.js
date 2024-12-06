import Cookies from 'js-cookie';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom'; 
import { useState } from 'react';

export default function Logout () {

    const[isConfirmed, setIsConfirmed] = useState(false);


        //testing cookies
        const authToken = Cookies.get('username');
        console.log("current username cookie =" + authToken);

        const handleClick = async (event) => {
            event.preventDefault();

            Cookies.remove('username', {path: "/"})

            //testing cookies
            const deletedCookie = Cookies.get('username');
            console.log("hopefully deleted username cookie =" + deletedCookie);

            setIsConfirmed(true);

        }


        return(
            <div>
                <h2>
                Would you like to logout?
                </h2>
                
                <Button variant="text" onClick={handleClick}>Yes</Button>
                <Button variant="text" as={Link} to="/">No</Button>
                <br></br>
                {isConfirmed ? "You have been successfully logged out" : null}

            </div>
        )
}