'use client'
import { useState } from "react";


export default function CreateProfileForm() {

    //Manage input values
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [verifyPassword, setVerifyPassword] = useState('');

    //manage error message 
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault(); 

        const data = {
            username: (event.target.username.value),
            pwHash: (event.target.password.value),
            verifyPassword: (event.target.verifyPassword.value)
        }
        console.log(data)

        try{
            const response = await fetch ("http://localhost:8080/user/post", {
                method: 'POST', 
                headers: {
                    "Content-Type" : "application/json"
                },
                body: JSON.stringify(data),
            })

            const responseData = await response.json();
            console.log(responseData);

        }catch (error) {

            console.error(error);
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
                    required minLength={2}/>
                </div>
                <div>
                    <h5>Password: </h5>

                    <input 
                    type="text" 
                    autoComplete="off"
                    id="password" 
                    value={password} 
                    onChange={(event) => setPassword(event.target.value)} 
                    required minLength={2}/>
                </div>
                <div>
                    <h5>Verify Password: </h5>

                    <input 
                    type="text" 
                    autoComplete="off"
                    id="verifyPassword" 
                    value={verifyPassword} 
                    onChange={(event) => setVerifyPassword(event.target.value)} 
                    required minLength={2}/>
                </div>
                <button type="submit">Submit</button>
            </form>

            <p>Already Registered?<br /><a href="/user/login">Login</a></p>
        </div>
    )
}