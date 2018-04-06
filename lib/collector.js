import axios from 'axios';

const API = 'https://api.giphy.com';
const ENDPOINT = '/v1/gifs/random';

const URL = `${API}${ENDPOINT}`;

const collector = (tag = 'reaction') => {
  return axios.get(URL, {
    params: {
      api_key: process.env['GIPHY_KEY'],
      tag,
      rating: 'PG-13',
      fmt: 'json'
    }
  });
};

export default collector;