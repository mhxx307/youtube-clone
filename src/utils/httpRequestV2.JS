import axios from 'axios';

const httpRequest = axios.create({
    baseURL: 'https://yt-api.p.rapidapi.com',
});

export default httpRequest;
