import axios from 'axios';

const downloader = url => {
  if (!url) return Promise.reject('No url');

  return axios.get(url, {
    responseType: 'arraybuffer'
  });
};

export default downloader;
