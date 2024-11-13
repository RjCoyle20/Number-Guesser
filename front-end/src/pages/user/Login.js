
import Cookies from 'js-cookie';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';



export default function Login() {

    //testing cookies
    const authToken = Cookies.get('username');
    console.log(authToken)

    // manage input values
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    //manage error message
    const [errorMessage, setErrorMessage] = useState('');

    const navigate = useNavigate();

    //TODO build this next.
    const handleSubmit = async (event) => {
        event.preventDefault();

        const data = {
            username: event.target.username.value,
            password: event.target.password.value,
        };

        try {
            const response = await fetch("http://localhost:8080/user/", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            if (!response.ok) {
                throw new Error ('Invalid login credentials.');
            }
            if (response.ok) {
                console.log(data);
                console.log(data.username);
                console.log(response.headers);
                console.log(response.headers.get('User-ID'));
                Cookies.set('username', data.username, {
                    httpOnly: false,
                    path: '/',
                   });
                   navigate('/')
                   //TODO find a way to route page to user's homepage once they log in.

                // reset input values and error message upon successful submission
                setUsername('');
                setPassword('');
                setErrorMessage('');

            }

        } catch (error) {
            setErrorMessage(error.message);
            console.error('Login Error:', error);
        }
    }
    

    return(
        <div>
            <form onSubmit={handleSubmit}>
                <h3>Login</h3>
                {/* error message only displays if present */}
                {errorMessage && <div style={{color:'red'}}>{errorMessage}</div>}
                <div>
                    <h5>Username: </h5>

                    <input 
                    type="text" 
                    autoComplete="off"
                    id="username" 
                    value={username} 
                    onChange={(event) => setUsername(event.target.value)} 
                    />
                </div>
                <div>
                    <h5>Password: </h5>

                    <input 
                    type="text" 
                    autoComplete="off"
                    id="password" 
                    value={password} 
                    onChange={(event) => setPassword(event.target.value)} 
                    />
                </div>
                <button type="submit">Submit</button>

                <p>Or Create an Account <a href="/user/login/new">here</a></p>
            </form>
        </div>
    )
}