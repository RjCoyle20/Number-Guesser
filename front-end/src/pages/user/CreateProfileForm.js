'use client'
import { useState } from "react";
import { useLocation } from "react-router";
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

export default function CreateProfileForm() {

    //Manage State variable
    const {state} = useLocation();
    // const {loggedIn} = state // Read values passed on state

    //Manage input values
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [verifyPassword, setVerifyPassword] = useState('');

    //manage error message 
    const [errorMessage, setErrorMessage] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault(); 
        
        const data = {
            username: (event.target.username.value),
            pwHash: (event.target.password.value),
            verifyPassword: (event.target.verifyPassword.value)
        }
        console.log(data)
        if( password != verifyPassword){
            setErrorMessage("Passwords must match");
        } else{
        try{
            const response = await fetch ("http://localhost:8080/user/post", {
                method: 'POST', 
                headers: {
                    "Content-Type" : "application/json"
                },
                body: JSON.stringify(data),
            });

            if (!response.ok){
                throw new Error ('User with this name already exists')
            }
            if (response.ok){

                console.log(data);
                console.log(data.username);
                console.log(response.headers);
                console.log(response.headers.get('User-ID'));
                Cookies.set('username', data.username, {
                    httpOnly: false,
                    path: '/'
                });
                navigate('/')

            // reset input values and error message upon successful submission
                setUsername('');
                setPassword('');
                setErrorMessage('');
            }
        //     const responseData = await response.json();
        //     console.log(responseData);

        //    Cookies.set('username', data.username, {
        //     httpOnly: false,
        //     path: '/',
        //    });
           console.log (Cookies.get('username'));
           
        }catch (error) {
            setErrorMessage(error.message);
            console.error('Error:', error);
        }
    }
    }
    return(
        <div>
            <form onSubmit={handleSubmit}>
                <h3>Create a Profile to Track your Stats</h3>
                {/* error message only displayes if present */}
                {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
                <div>
                    <h5>Username: </h5>

                    <input 
                    type="text" 
                    autoComplete="off"
                    id="username" 
                    value={username} 
                    onChange={(event) => setUsername(event.target.value)} 
                    required minLength={6}/>
                </div>
                <div>
                    <h5>Password: </h5>

                    <input 
                    type="text" 
                    autoComplete="off"
                    id="password" 
                    value={password} 
                    onChange={(event) => setPassword(event.target.value)} 
                    required minLength={8}/>
                </div>
                <div>
                    <h5>Verify Password: </h5>

                    <input 
                    type="text" 
                    autoComplete="off"
                    id="verifyPassword" 
                    value={verifyPassword} 
                    onChange={(event) => setVerifyPassword(event.target.value)} 
                    required minLength={8}/>
                </div>
                <button type="submit">Submit</button>
            </form>

            <p>Already Registered?<br /><a href="/user/login">Login</a></p>
        </div>
    )
}