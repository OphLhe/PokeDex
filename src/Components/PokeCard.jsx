import axios from "axios";
import { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import typeColors from "../utils/typeColors";

const PokeCard = ({ pokeName }) => {
  const [pokePicture, setPokePicture] = useState([]);
  const [pokeInfos, setPokeInfos] = useState([]);
  const [types, setTypes] = useState([]);
  const [frenchName, setFrenchName] = useState(true);

  

  const fetchPokePicture = async () => {
    try {
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${pokeName.name}`
      );
      setPokePicture(response.data.sprites.other["home"].front_default);
      setPokeInfos(response.data);
      setTypes(response.data.types);
    } catch (error) {
      console.error("error fetching pokePicture:", error);
    }
  };

  const fetchFrenchName = async () => {
    try {
      const resFrench = await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${pokeName.name}`);
      setFrenchName(resFrench.data.names[4].name);
      console.log("resFrench", resFrench.data.names[4].name);
    } catch (error) {
      console.error("error fetching french name:", error);
    }
  }

  useEffect(() => {
    fetchPokePicture();
    fetchFrenchName();
  }, []);

  const mainType = types[0]?.type.name || 'normal'
  const backgroundColor = typeColors[mainType] || "#ccc"

  return <>
    <Link className="linkPokeCard" to={`/pokemon/${pokeName.name}`}>
      <Card className = "pokeCard"
      style={{backgroundColor: backgroundColor}}>
        <Card.Img className = 'cardImage'  src={pokePicture}/>
        <Card.Body >
          <Card.Title>{frenchName}</Card.Title>
          <Card.Text className="text-truncate-bis">
            <strong>Ordre</strong> : {pokeInfos.id}
            <br />
            <strong>Taille</strong> : {pokeInfos.height / 10} m
            <br />
            <strong>Poids</strong> : {pokeInfos.weight / 10} kg
          </Card.Text>
        </Card.Body>
      </Card>
    </Link>
    
  </>
};

export default PokeCard;
