export interface MatchHistoryListResponse {
  status: number;
  data: MatchData[];
}

export interface MatchData {
  metadata: MatchMetadata;
  players: Player[];
}

interface MatchMetadata {
  match_id: string;
  game_version: string;
  game_length_in_ms: number;
  started_at: string;
  is_completed: boolean;
  platform: string;
  region: string;
  cluster: string;
}

export interface Player {
  puuid: string;
  name: string;
  tag: string;
  stats: PlayerStats;
}

interface PlayerStats {
  score: number;
  kills: number;
  deaths: number;
  assists: number;
  headshots: number;
  bodyshots: number;
  legshots: number;
  damage: PlayerDamage;
}

interface PlayerDamage {
  dealt: number;
  received: number;
}
