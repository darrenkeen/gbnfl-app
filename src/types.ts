import { PLATFORM_TYPE } from './constants';

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
  players?: Player[];
  match: MatchData;
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

export interface LifetimeData {
  id: string;
  updatedAt: string;
  wins: number;
  kills: number;
  kdRatio: string;
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
  scorePerMinute: string;
  cash: number;
  deaths: number;
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

export interface MatchDataTeam {
  id: string;
  teamName: string;
  teamPlacement: number;
  players: WinMatchPlayer[];
}

export interface MatchListResponse {
  matches: MatchData[];
  totalMatches: number;
}

export interface MatchData {
  id: string;
  inGameMatchId: string;
  playerCount: number;
  mode: string;
  utcStartSeconds: number;
  utcEndSeconds: number;
  teams: MatchDataTeam[];
}

export interface CodLatestData {
  matches: CodLatestMatch[];
}

export interface CodLatestMatch {
  utcStartSeconds: number;
  utcEndSeconds: number;
  mode: string;
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

export interface LastUpdatedData<T> {
  lastUpdated: string;
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
  clanTag?: string;
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
  mode: string;
  duration: number;
  utcStartSeconds: number;
  utcEndSeconds: number;
  trophies: Trophy[];
}

export type WeeklyPlayerModes = Record<
  string,
  {
    updatedAt: string;
    mode: string;
    kills: number;
    deaths: number;
    assists: number;
    avgLifeTime: string;
    headshots: number;
    gulagDeaths: number;
    gulagKills: number;
    matchesPlayed: number;
    damageDone: number;
    damageTaken: number;
    kdRatio: string;
    killsPerGame: string;
  }
>;

export interface WeeklyPlayerModeType {
  updatedAt: string;
  mode: string;
  kills: number;
  deaths: number;
  assists: number;
  avgLifeTime: string;
  headshots: number;
  gulagDeaths: number;
  gulagKills: number;
  matchesPlayed: number;
  damageDone: number;
  damageTaken: number;
  kdRatio: string;
  killsPerGame: string;
  player: Player;
}

export interface WeeklyLeaderboard {
  kdRatioMax: WeeklyPlayerModeType;
  killsMax: WeeklyPlayerModeType;
}

export interface WeeklyPlayerType {
  modes: WeeklyPlayerModeType[];
}

export interface LatestMatchesResponse {
  matches: CodLatestMatch[];
}

export type SeasonStatsResponse = Array<{
  mode: string;
  gamesPlayed: number;
  wins: number;
  kills: number;
  deaths: number;
  kdRatio: number;
  assists: number;
  gulagWins: number;
  gulagLosses: number;
}>;

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  player: Player;
  email: string;
  updatedAt: string;
}

export interface Goal {
  goal: string | number;
  current: number;
  required: number;
  isComplete: boolean;
}

export interface OverallGoal {
  kd: Goal;
  winPercent: Goal;
  topTenPercent: Goal;
}

export enum AchievementType {
  Kills = 'KILLS',
  Kd = 'KD',
  Win = 'WIN',
  Gulag = 'GULAG',
  Killer = 'KILLER',
  TopTen = 'TOP_TEN',
}

export enum AchievementModifierType {
  Row = 'ROW',
  Last = 'LAST',
  Achieve = 'ACHIEVE',
}

export enum AchievementScope {
  Match = 'MATCH',
  Team = 'TEAM',
}

export enum AchievementSpecial {
  NoDeath = 'NO_DEATH',
  HighestKiller = 'HIGHEST_KILLER',
  Under250Dmg = 'UNDER_250_DMG',
}

export interface Achievement {
  id: string;
  type: AchievementType;
  value: number;
  modifier: number;
  modifierType: AchievementModifierType;
  scope: AchievementScope | null;
  special: AchievementSpecial[];
}

interface AchievementWithAchieved extends Achievement {
  achieved: boolean;
}

export interface PlayerAchievementWithMeta {
  _meta: {
    total: number;
    achieved: number;
    percentage: number;
  };
  achievements: Record<AchievementType, AchievementWithAchieved[]>;
}

export interface GameMode {
  name: string;
  isRanked: boolean;
  isTrophy: boolean;
}

export type GameModes = Record<string, GameMode>;
