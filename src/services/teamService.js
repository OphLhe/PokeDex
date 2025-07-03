import API from './api';

export const createTeams = (data) => API.post('/teams', data, {
    headers:{
        Authorization: `${localStorage.getItem('token')}`
    }
});

export const addPokemonToTeam = (idTeams, data) => API.post(`/teams/${idTeams}/pokemons`, data, {
    headers:{
        Authorization: `${localStorage.getItem('token')}`
    }
});