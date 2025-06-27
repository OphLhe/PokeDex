import axios from "axios";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";

const PokeCard = ({ pokeName }) => {
  const [pokePicture, setPokePicture] = useState([]);
  const [pokeInfos, setPokeInfos] = useState([]);

  const fetchPokePicture = async () => {
    try {
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${pokeName.name}`
      );
      setPokePicture(response.data.sprites.other["home"].front_default);
      setPokeInfos(response.data);
    } catch (error) {
      console.error("error fetching pokePicture:", error);
    }
  };
  useEffect(() => {
    fetchPokePicture();
  }, []);

  return <>
      <Card style={{ 
        width: "16rem", 
        border:"1px solid #58595b", 
        boxShadow:"5px 5px 10px #58595b",
        }}>
        <Card.Img src={pokePicture}/>
        <Card.Body>
          <Card.Title>{pokeName.name.toUpperCase()}</Card.Title>
          <Card.Text className="text-truncate-bis">
            <strong>Ordre</strong> : {pokeInfos.id}
            <br />
            <strong>Taille</strong> : {pokeInfos.height / 10} m
            <br />
            <strong>Poids</strong> : {pokeInfos.weight / 10} kg
          </Card.Text>
          <Link to={`/pokemon/${pokeName.name}`}>
            <Button variant="primary">More details</Button>
          </Link>
        </Card.Body>
      </Card>
    </>
};

export default PokeCard;
