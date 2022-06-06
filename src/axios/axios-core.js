import axios from 'axios';

const instance = axios.create({
    // baseURL: 'http://localhost:8080/api'
    baseURL: 'https://movie-engine.azurewebsites.net/api',
});

export default instance;