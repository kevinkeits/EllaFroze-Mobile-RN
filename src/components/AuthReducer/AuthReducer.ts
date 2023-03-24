// authReducer.ts

const initialState = {
    isLoggedIn: false,
    authToken: null,
    error: null,
  };
  
  const authReducer = (state = initialState, action: any) => {
    switch (action.type) {
      case 'LOGIN_SUCCESS':
        return {
          ...state,
          isLoggedIn: true,
          authToken: action.payload.authToken,
          error: null,
        };
      case 'LOGIN_ERROR':
        return {
          ...state,
          isLoggedIn: false,
          authToken: null,
          error: action.payload,
        };
      // ... other cases for handling logout, etc.
      default:
        return state;
    }
  };
  
  export default authReducer;
  