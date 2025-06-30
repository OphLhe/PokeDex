import axios from "axios";
import { useEffect, useState } from "react";
import { ListGroup, ProgressBar } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import Stack from 'react-bootstrap/Stack';
import typeColors from "../utils/typeColors";
import EvolveCard from "../Components/EvolveCard";

const PokemonSpec = () => {
  const [pokemonSpecs, setPokemonSpec] = useState([]);
  const { name } = useParams();
  const [sprites, setSprites] = useState([]);
  const [stats, setStats] = useState([]);
  const [types, setTypes] = useState([]);
  const [evolves, setEvolve] = useState([]);
  const [url, setGetUrl] = useState("");

  const fetchPokemonSpec = async () => {
    try {
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
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
      const resEvolve = await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${name}`);
      const getUrl = await axios.get(resEvolve.data.evolution_chain.url)
      setGetUrl(getUrl.data.chain)
      console.log(getUrl.data.chain.evolves_to[0].species.name);
      const evoNames = extractEvolve(getUrl.data.chain)
      console.log(evoNames);
      setEvolve(evoNames)  
    } catch (error) {
      console.error("Error fetching pokemon specifications:", error);
    }
  }

  // fonction pour extraire les noms des évolutions à partir de la chaine d'évolution 
  const extractEvolve = (chain) => {
    // si la chaine d'évolution est vide, on retourne un tableau vide
    const names = [];
    // si la chaine d'évolution n'existe pas on retourne un tableau vide
    let current = chain 
     // on ajoute le nom de la premire espece
    do {
      // on récupère le nom
      names.push(current.species.name)
      // si l'espèce évolue, on ajoute le nom de l'évolution
      current = current.evolves_to[0]
      // on continue jusqu'a ce qu'il n'y ait plus d'évolutions
    }while (current && current.species)

      return names      
  }

  useEffect(() => {
    fetchPokemonSpec();
    fetchEvolve()
  }, [name]);


  return (
    <>
        <div className="d-flex flex-column align-items-center justify-content-center">
            <h1>Pokemon Specifications</h1>

            <h3 className="card-title mt-5">
                <strong>{name.toUpperCase()}</strong>
            </h3>
            <div className="d-flex flex-row justify-content-center align-items-center gap-3 mt-3">
                <p><strong>Ordre</strong> : {pokemonSpecs.id}</p>
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
                                >
                                <strong>{type.type.name.toUpperCase()}</strong> 
                            </span>)    
                        })}
                    </Stack>
                        <div className="card-body ">
                            <ListGroup  style={{ width: '26rem' }}>
                                {stats.map((stat) => {
                                    return (<ListGroup.Item key={stat.name} pokename={stat}>
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
                return <Link to={`/pokemon/${evolve}`} style={{textDecoration:'none'}}> <EvolveCard key={evolve.name} name={evolve}/></Link>
              })}          
            </div>
        </div>
    </>
  );
}


export default PokemonSpec;
