import axios from "axios";
import { useEffect, useState } from "react";
import PokeCard from '../Components/PokeCard'
import { Button } from "react-bootstrap";

const HomePage = () => {
    
    const [pokemons, setPokemon] = useState([]);
    const [page, setPage] = useState(0);
    const [search, setSearch] = useState('');
    

    const fetchPokemon = async () => {
        try {
            if (search === '') {
                const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/?limit=20&offset=${page}`);
                setPokemon(response.data.results);                                  
            }else{
                const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${search}`);
                setPokemon(() => [response.data]); 
            } 
        }catch (error) {
            console.error("error fetching pokemon:", error);            
        }
    }
    
    useEffect( ()=>{
        fetchPokemon()
    }, [page,search]);
    
    const handleSetSearch = (e) => {
        setSearch(e.target.value);
    }
    

    return <>
    <div className='d-flex flex-column align-items-center justify-content-center m-3'>
        <h1>Accueil</h1>

        <input 
            type="text"
            className="searchBar form-control col-4 mb-5 mt-2" 
            placeholder="Recherche un pokemon"
            value={search}
            onChange={handleSetSearch}
        />

        <div className='d-flex flex-wrap justify-content-around align-content-center gap-2 col-6'>
            {pokemons.map((pokemon) => {
                return <PokeCard key={pokemon.name} pokeName={pokemon.name}/>
            })}
        </div>

        <div className='pageButton d-flex justify-content-between align-items-center mb-5 mt-5 col-5' >
            <Button className='previousButton btn btn-primary' 
                onClick={() => 
                setPage(page-20)} disabled={page === 0}>Previous</Button>
                
            <Button className='nextButton btn btn-primary' 
                onClick={() => 
                setPage(page+20)}>Next</Button>   
        </div>
    </div>
    </>;
}
 
export default HomePage;