// const playerReducer = (state, action) => {
//   switch (action.type) {
//     case 'add_error':
//       return { ...state, errorMessage: action.payload };
//     case 'get_player':
//       return { ...state, errorMessage: '', player: action.payload };
//     case 'clear_error_message':
//       return { ...state, errorMessage: '' };
//     default:
//       return state;
//   }
// };

// const getPlayer = dispatch => async ({ uno }) => {
//   try {
//     const response = await axios.get(`/players/uno/${uno}`);

//     await AsyncStorage.setItem('token', response.data.token);
//     dispatch({ type: 'get_player', payload: response.data.token });
//   } catch (err) {
//     dispatch({
//       type: 'add_error',
//       payload: 'Something went wrong with signup.',
//     });
//   }
// };

// export const { Provider, Context } = createDataContext(
//   playerReducer,
//   { getPlayer },
//   { player: null, errorMessage: '' },
// );
import React, { createContext, useState } from 'react';
import { Player } from '../types';

interface PlayerState {
  player: Player | null;
  setPlayer(player: Player): void;
  playerError: string | null;
  setPlayerError(...props: any): void;
}

const playerCtxDefaultValue: PlayerState = {
  player: null,
  setPlayer: () => {},
  playerError: null,
  setPlayerError: () => {},
};

export const PlayerStateContext = createContext<PlayerState>(
  playerCtxDefaultValue,
);

export const PlayerContextProvider: React.FC = ({ children }) => {
  const [player, setPlayer] = useState<PlayerState['player']>(null);
  const [playerError, setPlayerError] = useState<PlayerState['playerError']>(
    '',
  );

  return (
    <PlayerStateContext.Provider
      value={{ player, setPlayer, playerError, setPlayerError }}
    >
      {children}
    </PlayerStateContext.Provider>
  );
};
