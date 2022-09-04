import axios from 'axios';

const apiDsn = axios.create({
  baseURL: 'https://api-devs-social-network.herokuapp.com/',
  headers: {
    Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiSm_Do28iLCJlbWFpbCI6ImpvYW9vb0Bqb2FvLmNvbSIsImlhdCI6MTY2MTQ2NzkzOSwiZXhwIjoxNjY0MDU5OTM5LCJzdWIiOiI1ZmFlNWMyMC02YWIzLTQ5N2MtODZlMy0zZGRlMGFmNTdjMDYifQ.Ywnhj0d9pPXUOFR14jy6BFu0K9BzFKFROjub4iEoy_4`,
  },
});

export default apiDsn;
