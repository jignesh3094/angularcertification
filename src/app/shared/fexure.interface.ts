
export interface FixureData {
    id: string | undefined | null;
    last:  number;
}

export interface Fexure {
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
  live: string;
}
export interface Paging {
  current: number;
  total: number;
}
export interface ResponseEntity {
  fixture: Fixture;
  league: League;
  teams: Teams;
  goals: HalftimeOrGoals;
  score: Score;
}
export interface Fixture {
  id: number;
  referee?: null;
  timezone: string;
  date: string;
  timestamp: number;
  periods: Periods;
  venue: Venue;
  status: Status;
}
export interface Periods {
  first: number;
  second?: null;
}
export interface Venue {
  id: number;
  name: string;
  city: string;
}
export interface Status {
  long: string;
  short: string;
  elapsed: number;
}
export interface League {
  id: number;
  name: string;
  country: string;
  logo: string;
  flag: string;
  season: number;
  round: string;
}
export interface Teams {
  home: HomeOrAway;
  away: HomeOrAway;
}
export interface HomeOrAway {
  id: number;
  name: string;
  logo: string;
  winner: boolean;
}
export interface HalftimeOrGoals {
  home: number;
  away: number;
}
export interface Score {
  halftime: HalftimeOrGoals;
  fulltime: FulltimeOrExtratimeOrPenalty;
  extratime: FulltimeOrExtratimeOrPenalty;
  penalty: FulltimeOrExtratimeOrPenalty;
}
export interface FulltimeOrExtratimeOrPenalty {
  home?: null;
  away?: null;
}

        



    
    
      
      
     
  
  

