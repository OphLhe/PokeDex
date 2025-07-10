import { useState } from 'react';
import { Button } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";

const NavBar = () => { 

    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    let userName = '';
    
    
    const logOut = () => {
        localStorage.removeItem('token');
        navigate('/');
    };

    const login=() => {
      navigate('/login');
    };

    if(token){
    userName = jwtDecode(token).username
    
    };
  
  return <>
      <Navbar expand="lg" className="bg-body-tertiary" >
      <Container>
        <Navbar.Brand onClick={()=>{navigate('/')}}>PokeDex</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar ">
          <Nav className="me-auto ">
            <Nav.Link onClick={()=>{navigate('/')}}>Home</Nav.Link>
            <Nav.Link onClick={()=>{navigate('./register')}}>Inscription</Nav.Link>
            
            {/* condition affiche bouton de déconnexion si un utilisateur est connecté */}
            { token ? (
              <>
              <p>Bienvenue {userName}</p>
              <Nav.Link onClick={()=>{navigate('./profile')}}>Profile</Nav.Link>
              <Nav.Link onClick={()=>{navigate('./team')}}>Equipe</Nav.Link>
              <Button variant='danger' onClick={logOut}>Déconnexion</Button>
              
              </>
            ) : 
            ( <Button onClick={login}>Connexion</Button>)}
            
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  </>;
}

export default NavBar;