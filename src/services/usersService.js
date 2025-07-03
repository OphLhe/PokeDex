import API from './api';
// service pour les requêtes liées aux utilisateurs
export const register = (data) => API.post('/register', data);
export const login = (data) => API.post('/login', data);
// le token est envoyé dans les headers de la requ
export const getProfile = () => API.get('/profile',{
    headers:{
        Authorization: `${localStorage.getItem('token')}`
    }
});
// service pour mettre à jour le profil de l'utilisateur
export const updateProfile = (data) => API.put('/profile/update', data, {
    headers:{
        Authorization: `${localStorage.getItem('token')}`
    }
});

export const updatePassword = (data) => API.put('/profile/password' , data, {
    headers:{
        Authorization: `${localStorage.getItem('token')}`
    }
})