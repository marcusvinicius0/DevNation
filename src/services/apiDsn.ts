import axios from 'axios';

const apiDsn = axios.create({
  baseURL: 'https://api-devs-social-network.herokuapp.com/',
});

export default apiDsn;
