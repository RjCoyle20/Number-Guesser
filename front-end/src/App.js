import logo from './logo.svg';
import './App.css';
import Appbar from './pages/Appbar';
import Numberbox from './pages/Numberbox'
import { Routes, Route, BrowserRouter } from 'react-router-dom';
function App() {
  return (

    <div className="App">
      <BrowserRouter>
      <Appbar/>
      hELLO THIS IS RYAN
        <Routes>
        <Route path='/' element={<Numberbox/>}/>
        </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
