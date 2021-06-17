import React, { useEffect, useReducer, createContext, useMemo } from 'react';
import axios from 'axios';
import CookieManager from '@react-native-cookies/cookies';

interface AuthContextValue {
  userToken: string | null;
  isLoading: boolean;
  isSignout: boolean;
  signIn: (data: SignInData) => void;
  signOut: () => void;
}

const initialContextValue: AuthContextValue = {
  userToken: null,
  isLoading: true,
  isSignout: false,
  signIn: () => {},
  signOut: () => {},
};

interface SignInData {
  username: string;
  password: string;
}

export const AuthContext = createContext<AuthContextValue>(initialContextValue);

export const AuthContextProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
          };
        case 'SIGN_IN':
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
    },
  );

  useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      let userToken;

      try {
        const cookies = await CookieManager.getAll();

        userToken = cookies?.GBNFL_AUTH?.value || null;
      } catch (e) {
        // Restoring token failed
        console.error('restoring token failed');
      }

      // After restoring token, we may need to validate it in production apps
      try {
        const me = await axios.get('/user/me');
        if (!me.data?.id) {
          userToken = null;
        }
      } catch (e) {}
      console.log('here');
      dispatch({ type: 'RESTORE_TOKEN', token: userToken });
    };

    bootstrapAsync();
  }, []);

  const authContext = useMemo(
    () => ({
      signIn: async (data: SignInData) => {
        try {
          await axios.post('/user/login', {
            email: data.username,
            password: data.password,
          });
          let userToken;
          try {
            const cookies = await CookieManager.getAll();

            userToken = cookies?.GBNFL_AUTH?.value || null;
          } catch (e) {
            // Restoring token failed
          }
          if (userToken) {
            dispatch({ type: 'SIGN_IN', token: userToken });
          }
        } catch (e) {
          console.error(e);
        }
      },
      signOut: () => dispatch({ type: 'SIGN_OUT' }),
    }),
    [],
  );
  return (
    <AuthContext.Provider value={{ ...authContext, ...state }}>
      {children}
    </AuthContext.Provider>
  );
};
