import axios from "axios";
import { useEffect, useState } from "react";
import PokeCard from '../Components/PokeCard'

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
                console.log(response.data.name);
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
        console.log(e.target.value);
    }
    

    return <>
    <div className='d-flex flex-column align-items-center justify-content-center m-4'>
        <h1>Home Page</h1>

        <input 
            type="text"
            className="searchBar form-control col-8 mb-5 mt-2" 
            placeholder="Recherche un pokemon"
            value={search}
            onChange={handleSetSearch}
        />

        <div className='d-flex flex-wrap justify-content-around align-content-center gap-3 col-5'>
            {pokemons.map((pokemon) => {
                return <PokeCard key={pokemon.name} pokeName={pokemon}/>
            })}
        </div>

        <div className='pageButton d-flex justify-content-between align-items-center mt-4' >
            <button className='previousButton btn btn-primary' 
                onClick={() => 
                setPage(page-20)} disabled={page === 0}>Previous</button>
                <span className="pagination">{page}</span>
            <button className='nextButton btn btn-primary' 
                onClick={() => 
                setPage(page+20)}>Next</button>   
        </div>
    </div>
    </>;
}
 
export default HomePage;