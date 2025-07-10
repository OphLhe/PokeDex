import { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { createTeams, showTeams, deleteTeam } from "../services/teamService";
import PokeCard from "../Components/PokeCard";

const TeamPage = () => {
  const [modalTeam, setModalTeam] = useState(false);
  const [formTeam, setFormTeam] = useState({ teamName: "" });
  const [teams, setTeams] = useState([]);
  const [pokemons, setPokemon] = useState([]);
  const handleCreateTeam = async (e) => {
    location.reload();
    e.preventDefault();

    try {
      const response = await createTeams(formTeam);
      alert("Équipe créée avec succès !");
      setModalTeam(false);
      setFormTeam({ teamName: "" });
    } catch (error) {
      console.error("Error fetching creating team", error);
    }
  };

  const fetchTeams = async () => {
    try {
      const response = await showTeams();
      setTeams(response.data);
      setPokemon(response.data);
    } catch (error) {
      console.error("Error fetching teams:", error);
    }
  };

  const handleDelete = async (idTeams) => {
    try {
      await deleteTeam(idTeams);
      alert("Équipe supprimée avec succès !");
      location.reload(); 
    } catch (error) {
      console.error("Error deleting team:", error);
      alert("Erreur lors de la suppression de l'équipe.");
    }
  }
  useEffect(() => {
    fetchTeams();
  }, []);

  return (
    <>
      <div className="d-flex flex-column align-items-center justify-content-center m-3">
        <h1>Mes équipes</h1>
        <Button
          className="m-3"
          variant="primary"
          onClick={() => setModalTeam(true)}>
          Créer équipe
        </Button>
      </div>
     
     {/* moda pour créer une équipe  */}
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
                onChange={(e) =>
                  setFormTeam({ ...formTeam, teamName: e.target.value })
                }
                required/>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setModalTeam(false)}>
              Annuler
            </Button>
            <Button type="submit" variant="primary">
              Ajouter
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
      
        {teams.map((team) => {
          return<div className="d-flex flex-wrap flex-column align-items-center justify-content-center m-3 "
          style={{border:'3px solid red', 
            borderRadius:'10px', padding:'20px',
            boxShadow:'0 0 10px #5D5E60'}} >
            <div className="d-flex flex-row align-items-center justify-content-left m-3" width="100vw"> 
              <strong className="mb-4">{team.teamName}</strong>
              <div >
              <Button className="mb-3" variant="danger" onClick={() => handleDelete(team.idTeams)} >Supprimmer équipe</Button>
              </div>
            </div>
            <div className='d-flex flex-wrap flex-row justify-content-center align-content-center gap-2 mb-5' >
            {team.pkm.map((pokemon) => {
              return <PokeCard key={pokemon.id} pokeName={pokemon}/>
          })}
          </div>
          </div>
        })}  
    </>
  );
};

export default TeamPage;
