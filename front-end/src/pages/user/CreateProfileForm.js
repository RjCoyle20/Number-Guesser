import { useState } from "react";


export default function CreateProfileForm() {

    //Manage input values
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [verifyPassword, setVerifyPassword] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault(); 

        const data = {
            name: (event.target.name.value),
            password: (event.target.password.value),
            verifyPassword: (event.target.verifyPassword.value)
        }
        console.log(data)

        try{
            const response = await fetch ("localhost:8080/user/post", {
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
            </form>
        </div>
    )
}