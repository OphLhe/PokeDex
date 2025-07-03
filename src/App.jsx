import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from "./Components/NavBar";
import Footer from "./Components/Footer";
import HomePage from './Pages/HomePage';
import PokemonSpec from './Pages/PokemonSpec';
import "./styles/footer.css";
import "./styles/homePage.css";
import "./styles/navbar.css";
import "./styles/pokeCard.css";
import "./styles/pokemonSpec.css";
import "./styles/evolveCard.css";
import RegisterPage from './Pages/RegisterPage';
import LoginPage from './Pages/LoginPage';
import ProfilePage from './Pages/ProfilePage'
import TeamPage from './Pages/TeamPage'


function App() {
  
  return (
    <>
    <BrowserRouter>
      <NavBar/>
        <Routes>
          <Route path ='/' element = {<HomePage/>}/>
          <Route path ='/pokemon/:name' element = {<PokemonSpec/>}/>
          <Route path = '/register' element ={<RegisterPage/>}/>
          <Route path = '/login' element ={<LoginPage/>}/>
          <Route path = '/profile' element ={<ProfilePage/>}/>
          <Route path = '/team' element ={<TeamPage/>}/>
        </Routes>
        <Footer/>
    </BrowserRouter>
    </>
  )
}

export default App
