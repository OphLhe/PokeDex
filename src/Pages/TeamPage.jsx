import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";

const TeamPage = () => {
  const [modalTeam, setModalTeam] = useState(false);
  const [formTeam, setFormTeam] = useState({ teamName: "" });

  const handleCreateTeam = async (e) => {
    e.preventDefault(); 

    try {
        const response = await handleCreateTeam(formTeam);
        console.log('Equipe créée avec succés:', response.data)
        setModalTeam(false);
        setFormTeam({teamName:''}) 
        
    } catch (error) {
        console.error('Error fetching creating team', error);
    }
  }

  return (
    <>

    <div className='d-flex flex-column align-items-center justify-content-center m-3'>
      <h1>Mes équipes</h1>
      <Button
        className="m-3"
        variant="primary"
        onClick={() => setModalTeam(true)}>
        Créer équipe
      </Button>
    </div>

      <Modal show={modalTeam} onHide={() => setModalTeam(false)}>
        <Form onSubmit={handleCreateTeam}>
          <Modal.Header closeButton>
            <Modal.Title>création d'une équipe</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group>
              <Form.Label>Nom d’équipe</Form.Label>
              <Form.Control
                type="text"
                value={formTeam.teamName}
                onChange={(e) =>setFormTeam({ ...formTeam, teamName: e.target.value })}
                required
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setModalTeam(false)}>
              Annuler
            </Button>
            <Button type="submit" variant="primary">
              ajouter
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    
    </>
  );
};

export default TeamPage;