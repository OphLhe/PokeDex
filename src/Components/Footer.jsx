import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

const Footer = () => {

  return <>
    <Navbar className="bg-body-tertiary" fixed='bottom'>
      <Container>
        <Navbar.Brand href="#home">PokeDex</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            Signed in as: <a href="#login">Lhermitte Ophélie</a>
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  </>;
}

export default Footer;