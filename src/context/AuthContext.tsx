import React, { useEffect, useReducer, createContext, useMemo } from 'react';
import axios from 'axios';
import CookieManager from '@react-native-cookies/cookies';

import { User } from '../types';
import { AuthAction, AuthActionKind, reducer } from '../reducers/AuthReducer';
import { Alert } from 'react-native';

export interface AuthContextState {
  user: User | null;
  isLoading: boolean;
  isSignout: boolean;
}

const initialContextState: AuthContextState = {
  user: null,
  isLoading: true,
  isSignout: false,
};

interface SignInData {
  username: string;
  password: string;
}

interface AuthContextType {
  state: AuthContextState;
  signIn: (data: SignInData) => boolean;
  signOut: () => void;
  dispatch: React.Dispatch<AuthAction>;
}

export const AuthContext = createContext<AuthContextType>({
  state: initialContextState,
  dispatch: () => null,
  signIn: () => false,
  signOut: () => {},
});

export const AuthContextProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialContextState);

  useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      let user: User | null = null;
      let token: string | null = null;

      try {
        const cookies = await CookieManager.getAll();

        token = cookies?.GBNFL_AUTH?.value || null;
      } catch (e) {
        // Restoring token failed
        console.error('restoring token failed');
      }

      if (token) {
        try {
          const me = await axios.get('/user/me');
          user = me.data || null;
        } catch (e) {
          console.error('Error getting user');
        }
      }
      dispatch({ type: AuthActionKind.RESTORE_TOKEN, user });
    };

    bootstrapAsync();
  }, []);

  const authContextMemo = useMemo(
    () => ({
      signIn: async (data: SignInData) => {
        console.log(axios.defaults.baseURL);
        try {
          const login = await axios.post('/user/login', {
            email: data.username,
            password: data.password,
          });

          if (login?.data?.user) {
            dispatch({
              type: AuthActionKind.RESTORE_TOKEN,
              user: login.data.user,
            });
            return true;
          }
          return false;
        } catch (e) {
          Alert.alert('Wrong username/password');
          console.error(e);
          return false;
        }
      },
      signOut: async () => {
        console.log('signing out');
        try {
          await axios.get('/user/logout');
        } catch (e) {
          console.error('There was a problem logging out');
        }
        dispatch({ type: AuthActionKind.SIGN_OUT });
      },
    }),
    [],
  );
  return (
    <AuthContext.Provider value={{ ...authContextMemo, state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
