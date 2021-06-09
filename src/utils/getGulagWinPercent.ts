export const getGulagWinPercent = (wins: number, deaths: number) => {
  const totalPlayed = wins + deaths;
  return (wins / totalPlayed) * 100;
};
