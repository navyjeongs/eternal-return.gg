// 특정 유저의 특정 게임에 대한 정보
export interface GameRecord {
  bestWeapon: number;
  characterLevel: number;
  characterNum: number;
  damageToPlayer: number;
  equipment: [number, number, number, number, number, number];
  escapeState: number;
  gameId: number;
  gameRank: number;
  matchingMode: number;
  matchingTeamMode: number;
  monsterKill: number;
  playTime: string;
  playerAssistant: number;
  playerDeaths: number;
  playerKill: number;
  playingDate: string;
  routeIdOfStart: number;
  seasonId: number;
  skinCode: number;
  traitFirstCore: number;
  traitFirstSub: [] | [number, number];
  traitSecondSub: [] | [number, number];
  mmrAfter?: number;
  mmrGain?: number;
}

// 특정 게임의 참여한 모든 유저의 게임 정보
export interface DetailGameRecord {
  nickname: string;
  userNum: number;
  characterNum: number;
  characterLevel: number;
  gameRank: number;
  playerKill: number;
  playerAssistant: number;
  monsterKill: number;
  bestWeapon: number;
  bestWeaponLevel: number;
  equipment: [number, number, number, number, number, number];
  damageToPlayer: number;
  playerDeaths: number;
  traitFirstCore: number;
  traitFirstSub: [] | [number, number];
  traitSecondSub: [] | [number, number];
  escapeState: number;
}
