
export interface SelectedCountryData {
    name: string,
    id: string,
    leagueId: number
  }

export interface LeagueModeData {
    get: string;
    parameters: Parameters;
    errors: ErrorData | null;
    results: number;
    paging: Paging;
    response?: (ResponseEntity)[] | null;
  }
  export interface ErrorData{
    requests: string;
    access:string;
  }
  export interface Parameters {
    league: string;
    season: string;
  }
  export interface Paging {
    current: number;
    total: number;
  }
  export interface ResponseEntity {
    league: League;
  }
  export interface League {
    id: number;
    name: string;
    country: string;
    logo: string;
    flag: string;
    season: number;
    standings?: ((StandingsEntityEntity)[] | null)[] | null;
  }
  export interface StandingsEntityEntity {
    rank: number;
    team: Team;
    points: number;
    goalsDiff: number;
    group: string;
    form: string;
    status: string;
    description: string;
    all: AllOrHomeOrAway;
    home: AllOrHomeOrAway;
    away: AllOrHomeOrAway;
    update: string;
  }
  export interface Team {
    id: number;
    name: string;
    logo: string;
  }
  export interface AllOrHomeOrAway {
    played: number;
    win: number;
    draw: number;
    lose: number;
    goals: Goals;
  }
  export interface Goals {
    for: number;
    against: number;
  }
  