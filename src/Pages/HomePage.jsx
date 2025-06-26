import axios from "axios";
import { useEffect, useState } from "react";
import PokeCard from '../Components/PokeCard'

const HomePage = () => {
    
    const [pokemons, setPokemon] = useState([]);

    const fetchPokemon = async () => {

        try {
            const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=20`);
            setPokemon(response.data.results);
            console.log(response.data.results);            
        }
         
        catch (error) {
            console.error("error fetching pokemon:", error);            
        }
    }
    
    useEffect( ()=>{
        fetchPokemon()
    }, []);
    
    return <>
    <div className='d-flex flex-column align-items-center justify-content-center m-4'>
        <h1>Home Page</h1>

        <div className='d-flex flex-wrap justify-content-around align-content-center gap-3 col-5'>
            {pokemons.map((pokemon) => {
                return <PokeCard key={pokemon.name} pokeName={pokemon}/>
            })}
        </div>

    </div>
    </>;
}
 
export default HomePage;