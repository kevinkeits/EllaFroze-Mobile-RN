// api.ts

import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://ellafroze.com/api/external/doLogin',
  headers: {
    Authorization: `Bearer ${localStorage.getItem('authToken')}`,
  },
});
