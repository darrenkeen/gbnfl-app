const TROPHY_COUNTS = {
  1: '🏆',
  5: '🏅',
  10: '🎖',
};

export const generateTrophyEmoji = (count: number) => {
  let trophies = '';
  let usedCount = count;
  if (Math.floor(count / 10) > 0) {
    trophies += TROPHY_COUNTS[10].repeat(Math.floor(usedCount / 10));
    usedCount -= Math.floor(usedCount / 10) * 10;
  }
  if (Math.floor(count / 5) > 0) {
    trophies += TROPHY_COUNTS[5].repeat(Math.floor(usedCount / 5));
    usedCount -= Math.floor(usedCount / 5) * 5;
  }

  trophies += TROPHY_COUNTS[1].repeat(usedCount);

  return trophies;
};
