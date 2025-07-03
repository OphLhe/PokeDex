import { useEffect, useState } from "react";
import { register } from '../services/usersService';
import {Button} from 'react-bootstrap';
import Form from 'react-bootstrap/Form'

const RegisterPage  = () => {

  // variable contenant les données de l'utilisateur
  const [userData, setUserData] = useState({name:'', mail:'', password:''});

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {

      await register(userData)
      alert("utilisateur inscrit")

    } catch (error) {

      console.error(error);
      alert("CPT")
      
    }

  }

    return <>

    <div className='d-flex flex-column align-items-center justify-content-center m-3'>
        <h1>Inscription</h1>
    </div>

    <Form onSubmit={handleSubmit} className='d-flex flex-column align-items-center justify-content-center mt-5'>
      <Form.Group className="mb-3 col-4 mt-2 ">
        <Form.Label>Name</Form.Label>
        <Form.Control 
          type="text" 
          placeholder="Enter your name" 
          value={userData.name} 
          onChange={(e) => setUserData({...userData, name:e.target.value})}/>
      </Form.Group>

      <Form.Group className="mb-3 col-4 mt-2">
        <Form.Label>Email</Form.Label>
        <Form.Control 
          type="email" 
          placeholder="Enter your email" 
          value={userData.mail}
          onChange={(e) => setUserData({...userData, mail:e.target.value})}/>
      </Form.Group>

      <Form.Group className="mb-3 col-4 mt-2">
        <Form.Label>Password</Form.Label>
        <Form.Control 
          type="password" 
          placeholder="Password"
          value={userData.password}
          onChange={(e)=> setUserData({...userData, password:e.target.value})} />
      </Form.Group>

      <Button variant="primary" type="submit">Submit</Button>

    </Form>

    </>;
};
 
export default RegisterPage;