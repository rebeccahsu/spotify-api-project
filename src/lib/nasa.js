import axios from 'axios';

const apiKey = process.env.NASA_API_KEY;

export const getApod = async () => {
  const response = await axios.get(`https://api.nasa.gov/planetary/apod?api_key=${apiKey}`);
  return response.data;
};
