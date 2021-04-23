import { WinMatchPlayer } from '../types';

export const getTeamValueBasedOnKey = (
  players: WinMatchPlayer[],
  key: keyof WinMatchPlayer,
) => {
  return players.reduce((acc, curr) => acc + Number(curr[key]), 0);
};
export const getTeamKdRatio = (players: WinMatchPlayer[]) => {
  const killsDeaths = players.reduce(
    (acc, curr) => {
      acc.kills += curr.kills;
      acc.deaths += curr.deaths;
      return acc;
    },
    { kills: 0, deaths: 0 },
  );
  return killsDeaths.kills / (killsDeaths.deaths || 1);
};
