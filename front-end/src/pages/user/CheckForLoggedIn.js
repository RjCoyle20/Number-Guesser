
import Cookies from 'js-cookie';
import { useState } from 'react';

export default function CheckForLoggedIn () {

    const [isLoggedIn, setIsLoggedIn] = useState("false");

    const usernameCookie = Cookies.get('username');
    if (!usernameCookie) {
      setIsLoggedIn("false");
    } else {
      setIsLoggedIn("true");
    }

    return (
        isLoggedIn
    );
}