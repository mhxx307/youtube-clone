import httpRequest from './httpRequest';

export const fetchFromApi = async (url, params = {}) => {
    const options = {
        params,
        headers: {
            'X-RapidAPI-Key': process.env.REACT_APP_RAPID_API_KEY,
            'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com',
        },
    };
    const { data } = await httpRequest.get(url, options);
    return data;
};
