import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from "./Components/NavBar";
import Footer from "./Components/Footer";
import HomePage from './Pages/HomePage';
import PokemonSpec from './Pages/PokemonSpec';

function App() {
  
  return (
    <>
    <BrowserRouter>
      <NavBar/>
        <Routes>
          <Route path ='/' element = {<HomePage/>}/>
          <Route path ='/pokemon/:name' element = {<PokemonSpec/>}/>
        </Routes>
        <Footer/>
    </BrowserRouter>
    </>
  )
}

export default App
