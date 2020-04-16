import React, { useReducer, useEffect } from 'react';
import authReducer from './authReducer';
import AuthContext from './authContext';

import { SET_USER, LOGOUT_USER } from '../types';

const AuthState = (props) => {
  const initialState = {
    user: '',
  };

  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    //check if user is logged in
    async function chechRefreshToken() {
      const result = await (
        await fetch('http://localhost:5000/api/auth/refresh_token', {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
        })
      ).json();
      setUser({
        accessToken: result.accessToken,
      });
      // setLoading(false);
    }
    chechRefreshToken();
  }, []);



  const setUser = (user) => {
    dispatch({
      type: SET_USER,
      payload: user,
    });
  };



  const logOutCallback = async () => {
    await fetch('http://localhost:5000/api/auth/logout', {
      method: 'POST',
      credentials: 'include',
    });

    dispatch({
      type: LOGOUT_USER,
    });

  };

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        setUser,
        logOutCallback,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
export default AuthState;
