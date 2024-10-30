import Cookies from 'js-cookie';
import { useState } from 'react';

//I don't think any of this is right. UseState may be possible.
export default function CheckForLoggedIn() {
    const [loggedIn, setLoggedIn] = useState(false);

    const token = Cookies.get('authToken');
    return token ? true : false;
  }