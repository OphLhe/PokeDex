import { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { createTeams, showTeams } from "../services/teamService";
import PokeCard from "../Components/PokeCard";

const TeamPage = () => {
  const [modalTeam, setModalTeam] = useState(false);
  const [formTeam, setFormTeam] = useState({ teamName: "" });
  const [teams, setTeams] = useState([]);
  // const [pokemons, setPokemon] = useState([]);

  const handleCreateTeam = async (e) => {
    e.preventDefault();

    try {
      const response = await createTeams(formTeam);
      alert("Équipe créée avec succès !");
      console.log("Equipe créée avec succés:", response.data);
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
      // setPokemon(response.data);
      console.log("Équipes récupérées:", response.data[0].pkm1);
    } catch (error) {
      console.error("Error fetching teams:", error);
    }
  };



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

      <div className="d-flex flex-column align-items-center justify-content-center m-3">
        
        {teams.map((team) => {
          return <span key={team.idTeams} value={team.idTeams}> 
          <strong>{team.teamName}</strong>
            {teams.map((team) => {
              return <PokeCard key={team.pkm1} pokeName={team} value={team.pkm1}/>
          })}
        </span>
        })}  

      </div>
    </>
  );
};

export default TeamPage;
