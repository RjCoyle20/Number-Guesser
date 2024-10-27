import logo from './logo.svg';
import './App.css';
import Appbar from './pages/appbar/Appbar';
import Numberbox from './pages/numberbox/Numberbox'
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import GuessGame from './pages/GuessGame';
import CreateProfileForm from './pages/user/CreateProfileForm';
import Login from './pages/user/Login';

function App() {
  return (

    <div className="App">
      <BrowserRouter>
      <Appbar/>
      
        <Routes>
        <Route path='/' element={<Numberbox/>}/>
        <Route path='/guessGame' element={<GuessGame/>}/>
        <Route path='/user/login' element={<Login/>}/>
        <Route path='/user/login/new' element={<CreateProfileForm/>}/>
        </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
