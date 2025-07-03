import { useEffect, useState } from "react";
import { login } from '../services/usersService';
import {Button} from 'react-bootstrap';
import Form from 'react-bootstrap/Form'
import { useNavigate } from "react-router-dom";

const LoginPage  = () => {

  // variable contenant les données de l'utilisateur
  const [userData, setUserData] = useState({mail:'', password:''});
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        // appel vers l'api avec les données du formulaire
        // récupération du token
      const response  = await login(userData);
    //   stockage du token dans le local storage
      localStorage.setItem('token', response.data.token);
      // redirection vers la page d'accueil
      navigate('/');

      alert("User logged in successfully");
    } catch (error) {
      console.error('Login failed',error);
      alert("Login failed, please try again");
    }
  }


    return <>

    <div className='d-flex flex-column align-items-center justify-content-center m-3'>
        <h1>Connexion</h1>
    </div>

    <Form onSubmit={handleSubmit} className='d-flex flex-column align-items-center justify-content-center mt-5'>

      <Form.Group className="mb-3 col-4 mt-2">
        <Form.Label>Email</Form.Label>
        <Form.Control 
          type="email" 
          placeholder="Enter your email" 
          value={userData.mail}
          onChange={(e) => setUserData({...userData, mail:e.target.value})}
          required/>
      </Form.Group>

      <Form.Group className="mb-3 col-4 mt-2">
        <Form.Label>Password</Form.Label>
        <Form.Control 
          type="password" 
          placeholder="Password"
          value={userData.password}
          onChange={(e)=> setUserData({...userData, password:e.target.value})}
          required />
      </Form.Group>

      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>

    </>;
};
 
export default LoginPage;