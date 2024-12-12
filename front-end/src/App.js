import logo from './logo.svg';
import './App.css';
import Appbar from './pages/appbar/Appbar';
import Numberbox from './pages/numberbox/Numberbox'
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import GuessGame from './pages/GuessGame';
import CreateProfileForm from './pages/user/CreateProfileForm';
import Login from './pages/user/Login';
import Logout from './pages/user/Logout';
import Cookies from 'js-cookie';
import { useState } from "react"
import Profile from './pages/user/Profile';

function App() {
  const [usernameCookieGlobal, setUsernameCookieGlobal] = useState(Cookies.get('username'));
  return (

    <div className="App">
      <BrowserRouter>
      <Appbar usernameCookieGlobal={usernameCookieGlobal}/>

        <Routes>
        <Route path='/' element={<Numberbox/>}/>
        <Route path='/guessGame' element={<GuessGame/>}/>
        <Route path='/user/login' element={<Login usernameCookieGlobal = {usernameCookieGlobal}/>}/>
        <Route path='/user/login/new' element={<CreateProfileForm />}/>
        <Route path='/user/logout' element={<Logout usernameCookieGlobal = {usernameCookieGlobal}/>}/>
        {/* May need to change path below to incorporate user's profile name, though not necessarily. */}
        <Route path='/user' element={<Profile/>}/>
        </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
