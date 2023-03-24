// authActions.ts

import axios from 'axios';

export const login = (email: string, password: string) => {
  return (dispatch: any) => {
    axios.post('/api/login', { email, password })
      .then((response) => {
        dispatch({ type: 'LOGIN_SUCCESS', payload: response.data });
        localStorage.setItem('authToken', response.data.authToken);
      })
      .catch((error) => {
        dispatch({ type: 'LOGIN_ERROR', payload: error });
      });
  };
};
