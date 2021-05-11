import { MODE_KEYS, PLATFORM_TYPE } from './constants';

export interface PlayerTrophies {
  name: string;
  platformId: string;
  platformType: keyof typeof PLATFORM_TYPE;
  uno: string;
  trophyCount: number;
}

export interface Trophy {
  id: string;
  name: string;
  player: Player;
}

export interface Player {
  id: string;
  name: string;
  sbmmUrl: string;
  platformId: string;
  platformType: keyof typeof PLATFORM_TYPE;
  uno: string;
}

export interface ApprovalGame {
  gameId: string;
  dateTime: Date;
  trophies: {
    trophyId: string;
    playerName: string;
    kills: number;
  }[];
}

export interface CodLifetimeData {
  level: number;
  prestige: number;
  totalXp: number;
  lifetime: {
    mode: {
      br: {
        properties: {
          wins: number;
          kills: number;
          kdRatio: number;
          downs: number;
          topTwentyFive: number;
          topTen: number;
          contracts: number;
          revives: number;
          topFive: number;
          score: number;
          timePlayed: number;
          gamesPlayed: number;
          tokens: number;
          scorePerMinute: number;
          cash: number;
          deaths: number;
        };
      };
    };
  };
}

export interface CodLatestData {
  matches: CodLatestMatch[];
}

export interface CodLatestMatch {
  utcStartSeconds: number;
  utcEndSeconds: number;
  mode: keyof typeof MODE_KEYS;
  matchID: string;
  duration: number;
  gameType: 'wz';
  playerCount: number;
  player: {
    username: string;
  };
  playerStats: {
    kills: number;
    matchXp: number;
    scoreXp: number;
    score: number;
    totalXp: number;
    headshots: number;
    rank: number;
    scorePerMinute: number;
    distanceTraveled: number;
    deaths: number;
    kdRatio: number;
    gulagKills: number;
    teamPlacement: number;
    damageDone: number;
    damageTaken: number;
  };
}

export interface CachedData<T> {
  cacheTimestamp: string;
  data: T;
}

export interface MatchPlayer {
  utcStartSeconds: number;
  utcEndSeconds: number;
  map: string;
  mode: string;
  matchID: string;
  duration: number;
  playlistName: string | null;
  version: number;
  gameType: string;
  playerCount: number;
  playerStats: {
    kills: number;
    medalXp: number;
    objectiveLastStandKill: number;
    matchXp: number;
    scoreXp: number;
    wallBangs: number;
    score: number;
    totalXp: number;
    headshots: number;
    assists: number;
    challengeXp: number;
    rank: number;
    scorePerMinute: number;
    distanceTraveled: number;
    teamSurvivalTime: number;
    deaths: number;
    kdRatio: number;
    objectiveBrDownEnemyCircle2: number;
    objectiveBrMissionPickupTablet: number;
    bonusXp: number;
    objectiveReviver: number;
    objectiveBrKioskBuy: number;
    gulagDeaths: number;
    timePlayed: number;
    executions: number;
    gulagKills: number;
    nearmisses: number;
    objectiveBrCacheOpen: number;
    percentTimeMoving: number;
    miscXp: number;
    longestStreak: number;
    teamPlacement: number;
    damageDone: number;
    damageTaken: number;
  };
  player: {
    team: string;
    rank: number;
    username: string;
    uno: string;
    clantag: string;
    brMissionStats: {
      missionsComplete: number;
      totalMissionXpEarned: number;
      totalMissionWeaponXpEarned: number;
      missionStatsByType: {
        assassination: {
          weaponXp: number;
          xp: number;
          count: number;
        };
        scavenger: {
          weaponXp: number;
          xp: number;
          count: number;
        };
      };
    };
  };
  teamCount: number;
  privateMatch: boolean;
}
export interface WinMatchPlayer {
  id: string;
  username: string;
  uno: string;
  missionsComplete: number;
  missionStats: string[];
  headshots: number;
  assists: number;
  scorePerMinute: string;
  kills: number;
  score: number;
  medalXp: number;
  matchXp: number;
  scoreXp: number;
  wallBangs: number;
  totalXp: number;
  challengeXp: number;
  distanceTraveled: string;
  teamSurvivalTime: string;
  deaths: number;
  kdRatio: string;
  objectiveBrMissionPickupTablet: number;
  bonusXp: number;
  gulagDeaths: number;
  timePlayed: number;
  executions: number;
  gulagKills: number;
  nearmisses: number;
  objectiveBrCacheOpen: number;
  percentTimeMoving: string;
  miscXp: number;
  longestStreak: number;
  damageDone: number;
  damageTaken: number;
}

export type MatchTeam = Record<
  string,
  {
    players: MatchPlayer[];
    kills: number;
    deaths: number;
    teamKdRatio: number;
    teamSurvivalTime: number;
    teamPlacement: number;
  }
>;

export interface MatchData {
  id: string;
  inGameMatchId: string;
  teams: MatchTeam;
  playerCount: number;
  mode: keyof typeof MODE_KEYS;
  duration: number;
  utcStartSeconds: number;
  utcEndSeconds: number;
  trophies: Trophy[];
}
export interface WinMatchData {
  id: string;
  inGameMatchId: string;
  teams: {
    id: string;
    players: WinMatchPlayer[];
    teamPlacement: number;
    teamName: string;
  }[];
  playerCount: number;
  mode: keyof typeof MODE_KEYS;
  duration: number;
  utcStartSeconds: number;
  utcEndSeconds: number;
  trophies: Trophy[];
}

export type WeeklyPlayerModes = Record<
  keyof typeof MODE_KEYS,
  { kills: number; deaths: number; kdRatio: number }
>;

export interface WeeklyPlayerType {
  modes: WeeklyPlayerModes;
}

export interface LatestMatchesResponse {
  matches: CodLatestMatch[];
}
