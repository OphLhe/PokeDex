import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate } from 'react-router-dom';

const NavBar = () => { 

    const navigate= useNavigate();

  return <>
    <Navbar expand="lg" className="bg-body-tertiary" >
      <Container>
        <Navbar.Brand onClick={()=>{navigate('/')}}>PokeDex</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link onClick={()=>{navigate('/')}}>Home</Nav.Link>
            {/* <Nav.Link onClick={()=>{navigate('./pokemon')}}>Pokemon Specifications</Nav.Link> */}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  </>;
}

export default NavBar;