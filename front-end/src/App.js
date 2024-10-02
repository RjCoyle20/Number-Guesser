import logo from './logo.svg';
import './App.css';
import Appbar from './pages/appbar/Appbar';
import Numberbox from './pages/numberbox/Numberbox'
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import GuessGame from './pages/GuessGame';

function App() {
  return (

    <div className="App">
      <BrowserRouter>
      <Appbar/>
      
        <Routes>
        <Route path='/' element={<Numberbox/>}/>
        <Route path='/guessGame' element={<GuessGame/>}/>
        </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
