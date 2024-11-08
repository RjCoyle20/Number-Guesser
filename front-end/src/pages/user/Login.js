
import Cookies from 'js-cookie';
import { useState } from 'react';



export default function Login() {

    //testing cookies
    const authToken = Cookies.get('username');
    console.log(authToken)

    // manage input values
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    //manage error message
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
    }
    

    return(
        <div>
            <form onSubmit={handleSubmit}>
                {/* error message only displays if present */}
                {errorMessage && <div style={{color:'red'}}>{errorMessage}</div>}
            </form>
        </div>
    )
}