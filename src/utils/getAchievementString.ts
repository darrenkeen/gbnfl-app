import {
  Achievement,
  AchievementModifierType,
  AchievementType,
} from '../types';

export const getAchievementString = (achievement: Play): string => {
  const { type, value, modifier, modifierType } = achievement;
  // switch (type) {
  //   case AchievementType.Kills: {
  //     return getKillsString(value, modifier, modifierType);
  //   }
  //   case AchievementType.Gulag: {
  //     return `${achievement.value} gulag wins in ${achievement.modifier} matches`;
  //   }
  // }
  switch (modifierType) {
    case AchievementModifierType.Row: {
      return `${type === AchievementType.Gulag ? 'Win' : 'Get'} ${
        value > 1 ? value : 'a'
      } ${getTypeString(type)}${
        value > 1 ? 's' : ''
      } ${modifier} matches in a row`;
    }
    case AchievementModifierType.Last: {
      return `Get ${value > 1 ? value : 'a'} ${getTypeString(type)}${
        value > 1 ? 's' : ''
      } in the last ${modifier} matches`;
    }
  }
  return `Get ${value > 1 ? value : 'a'} ${getTypeString(type)}${
    value > 1 ? 's' : ''
  } in ${modifier > 1 ? `${modifier} matches` : 'a match'}`;
};

export const getTypeString = (type: AchievementType) => {
  switch (type) {
    case AchievementType.Kills: {
      return 'kill';
    }
    case AchievementType.Killer: {
      return 'highest kill';
    }
    case AchievementType.TopTen: {
      return 'top ten';
    }
    case AchievementType.Win: {
      return 'win';
    }
    case AchievementType.Gulag: {
      return 'gulag';
    }
  }
};
