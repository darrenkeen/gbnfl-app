import { AuthContextState } from '../context/AuthContext';
import { User } from '../types';

export type AuthAction =
  | { type: AuthActionKind.SIGN_OUT }
  | { type: AuthActionKind.SIGN_IN; user: User }
  | { type: AuthActionKind.RESTORE_TOKEN; user: User | null };

export enum AuthActionKind {
  RESTORE_TOKEN = 'RESTORE_TOKEN',
  SIGN_IN = 'SIGN_IN',
  SIGN_OUT = 'SIGN_OUT',
}

export const reducer = (
  state: AuthContextState,
  action: AuthAction,
): AuthContextState => {
  switch (action.type) {
    case AuthActionKind.RESTORE_TOKEN:
      return {
        ...state,
        user: action.user,
        isLoading: false,
      };
    case AuthActionKind.SIGN_IN:
      return {
        ...state,
        isSignout: false,
        user: action.user,
      };
    case AuthActionKind.SIGN_OUT:
      return {
        ...state,
        isSignout: true,
        user: null,
      };
  }
};
