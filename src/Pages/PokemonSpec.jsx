import axios from "axios";
import { useEffect, useState } from "react";
import { ListGroup, ProgressBar } from "react-bootstrap";
import { useParams } from "react-router-dom";
import Stack from 'react-bootstrap/Stack';
import typeColors from "../utils/typeColors";

const PokemonSpec = () => {
  const [pokemonSpecs, setPokemonSpec] = useState([]);
  const { name } = useParams();
  const [sprites, setSprites] = useState([]);
  const [stats, setStats] = useState([]);
  const [types, setTypes] = useState([]);

  const fetchPokemonSpec = async () => {
    try {
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${name}`
      );
      setPokemonSpec(response.data);
      setSprites(response.data.sprites.other["home"].front_default);
      setStats(response.data.stats);
      setTypes(response.data.types);
      console.log(response.data.types[0].type.name);
    } catch (error) {
      console.error("Error fetching pokemon specifications:", error);
    }
  };

  useEffect(() => {
    fetchPokemonSpec();
  }, []);

  return (
    <>
        <div className="d-flex flex-column align-items-center justify-content-center">
            <h1>Pokemon Specifications</h1>

            <h3 className="card-title mt-5">
                <strong>{name.toUpperCase()}</strong>
            </h3>
            <div className="d-flex flex-row justify-content-center align-items-center gap-3 mt-3">
                <p><strong>Ordre</strong> : {pokemonSpecs.order}</p>
                <p><strong>Taille</strong> : {pokemonSpecs.height / 10}m</p>
                <p><strong>Poids</strong> : {pokemonSpecs.weight / 10}kg</p>
            </div>
            <div className="d-flex flex-row align-items-center justify-content-center">
                <img src={sprites} className="imageSpec card-img-top" style={{ width: '26rem' }} />
                <div>
                    <Stack direction="horizontal" gap={2} className="mb-2">
                        {types.map((type) => {
                            return (<span 
                                key={type.name} 
                                style= {{border: '1px, solid, typeColors[type.type.name]',
                                  color : typeColors[type.type.name],
                                  borderRadius: '5px',
                                  padding:'5px'
                                }}                                                         
                                pokeName={type}>
                                <strong>{type.type.name.toUpperCase()}</strong> 
                            </span>)    
                        })}
                    </Stack>
                        <div className="card-body ">
                            <ListGroup  style={{ width: '26rem' }}>
                                {stats.map((stat) => {
                                    return (<ListGroup.Item key={stat.name} pokeName={stat}>
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
        </div>
    </>
  );
};

export default PokemonSpec;
