import axios from 'axios';

const httpRequest = axios.create({
    baseURL: 'https://youtube-v31.p.rapidapi.com',
});

export default httpRequest;
