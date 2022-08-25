import axios from 'axios';

const apiDsn = axios.create({
  baseURL: 'https://api-devs-social-network.herokuapp.com/',
  headers: {
    Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiSm_Do28iLCJlbWFpbCI6ImpvYW9ASm9hby5jb20iLCJpYXQiOjE2NjEzOTU2MzMsImV4cCI6MTY2Mzk4NzYzMywic3ViIjoiZWRmOWU2OWYtZWNlYi00NzA0LWJiODgtMGViMjlmNGRiMTZlIn0.IsQGLoFRB2VKnMx8ZaU2GHYojFEJ5h_WQutXc1jvNHw`,
  },
});

export default apiDsn;
