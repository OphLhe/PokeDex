import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Form, ListGroup, Modal, ProgressBar } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import Stack from "react-bootstrap/Stack";
import typeColors from "../utils/typeColors";
import EvolveCard from "../Components/EvolveCard";
import { chooseTeams, addPokemonToTeam} from "../services/teamService";

const PokemonSpec = () => {
  const [pokemonSpecs, setPokemonSpec] = useState([]);
  const { name } = useParams();
  const [sprites, setSprites] = useState([]);
  const [stats, setStats] = useState([]);
  const [types, setTypes] = useState([]);
  const [evolves, setEvolve] = useState([]);
  const [url, setGetUrl] = useState("");
  const [modalAddTeam, setModalAddTeam] = useState(false);
  const [teams, setTeams] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState("");
  const [frenchName, setFrenchName] = useState(true);

  const fetchPokemonSpec = async () => {
    try {
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${name}`
      );
      setPokemonSpec(response.data);
      setSprites(response.data.sprites.other["home"].front_default);
      setStats(response.data.stats);
      setTypes(response.data.types);
    } catch (error) {
      console.error("Error fetching pokemon specifications:", error);
    }
  };

  const fetchEvolve = async () => {
    try {
      const resEvolve = await axios.get(
        `https://pokeapi.co/api/v2/pokemon-species/${name}`
      );
      const getUrl = await axios.get(resEvolve.data.evolution_chain.url);
      setGetUrl(getUrl.data.chain);
      const evoNames = extractEvolve(getUrl.data.chain);
      setEvolve(evoNames);
      // On récupère le nom de l'espèce en français
      setFrenchName(resEvolve.data.names[4].name);
    } catch (error) {
      console.error("Error fetching pokemon specifications:", error);
    }
  };

  // fonction pour extraire les noms des évolutions à partir de la chaine d'évolution
  const extractEvolve = (chain) => {
    // si la chaine d'évolution est vide, on retourne un tableau vide
    const names = [];
    // si la chaine d'évolution n'existe pas on retourne un tableau vide
    let current = chain;
    // on ajoute le nom de la premire espece
    do {
      // on récupère le nom
      names.push(current.species.name);
      // si l'espèce évolue, on ajoute le nom de l'évolution
      current = current.evolves_to[0];
      // on continue jusqu'a ce qu'il n'y ait plus d'évolutions
    } while (current && current.species);

    return names;
  };

  const userTeams = async () => {
    try {
      const res = await chooseTeams();
      setTeams(res.data);
      console.log(res.data);
    } catch (error) {
      console.error("Error fetching user teams:", error);
    }
  };

  const handleAddPokemonToTeam = async (e) => {
    e.preventDefault();
    try {
      await addPokemonToTeam(selectedTeam,{ pokemonName: name });
      setModalAddTeam(false);
      alert("Pokemon ajouté à l'équipe avec succès !");
    } catch (error) {
      console.error("Error adding pokemon to team:", error);    
      alert("Erreur lors de l'ajout du pokemon à l'équipe.");  
    }
  };

  useEffect(() => {
    fetchPokemonSpec();
    fetchEvolve();
    userTeams();
  }, [name]);

  return (
    <>
      <div className="d-flex flex-column align-items-center justify-content-center mb-5">
        <h1>Pokemon Specifications</h1>

        <h3 className="card-title mt-5">
          <strong>{frenchName}</strong>
        </h3>
        <div className="d-flex flex-row justify-content-center align-items-center gap-3 mt-3">
          <p>
            <strong>Ordre</strong> : {pokemonSpecs.id}
          </p>
          <p>
            <strong>Taille</strong> : {pokemonSpecs.height / 10}m
          </p>
          <p>
            <strong>Poids</strong> : {pokemonSpecs.weight / 10}kg
          </p>
        </div>
        <div className="d-flex flex-row align-items-center justify-content-center">
          <img
            src={sprites}
            className="imageSpec card-img-top"
            style={{ width: "26rem" }}
          />
          <div>
            <div className="typesEtAddTeam d-flex flex-row align-items-center justify-content-between">
              <Stack direction="horizontal" gap={2} className="mb-2">
                {types.map((type) => {
                  return (
                    <span
                      key={type.name}
                      style={{
                        border: "1px, solid, typeColors[type.type.name]",
                        color: typeColors[type.type.name],
                        borderRadius: "5px",
                        padding: "5px",
                      }}
                    >
                      <strong>{type.type.name.toUpperCase()}</strong>
                    </span>
                  );
                })}
              </Stack>
              <Button
                className="mb-3"
                variant="primary"
                onClick={() => setModalAddTeam(true)}>
                Ajouter à l'équipe
              </Button>
              <Modal show={modalAddTeam} onHide={() => setModalAddTeam(false)}>
                <Form onSubmit={handleAddPokemonToTeam}>
                  <Modal.Header closeButton>
                    <Modal.Title>Ajout d'un pokemon dans une équipe</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <Form.Group>
                      <Form.Label>Nom d’équipe</Form.Label>
                      <Form.Select
                        value={selectedTeam}
                        onChange={(e) =>
                          setSelectedTeam(e.target.value)}>
                        <option value="">Sélectionner une équipe</option>
                        {teams.map((index) => (
                          <option key={index.id} value={index.idTeams}>
                            {index.teamName}
                          </option>
                        ))};
                        </Form.Select>
                    </Form.Group>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button
                      variant="secondary"
                      onClick={() => setModalAddTeam(false)}>
                      Annuler
                    </Button>
                    <Button type="submit" variant="primary">
                      Ajouter
                    </Button>
                  </Modal.Footer>
                </Form>
              </Modal>
            </div>
            <div className="card-body ">
              <ListGroup style={{ width: "26rem" }}>
                {stats.map((stat) => {
                  return (
                    <ListGroup.Item key={stat.name} pokename={stat}>
                      <strong>{stat.stat.name.toUpperCase()}</strong>
                      <ProgressBar
                        now={stat.base_stat}
                        label={stat.base_stat}
                        max={200}
                        className="mt-1"
                      />
                    </ListGroup.Item>
                  );
                })}
              </ListGroup>
            </div>
          </div>
        </div>
        <div className="d-flex flex-row align-items-center justify-content-center mt-5 mb-5 gap-5">
          {evolves.map((evolve) => {
            return (
              <Link
                to={`/pokemon/${evolve}`}
                style={{ textDecoration: "none" }}>
                <EvolveCard key={evolve.name} name={evolve} />
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default PokemonSpec;
