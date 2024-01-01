

export interface SelectedCountryData {
    name: string,
    id: string,
    leagueId: number
  }

export interface FixureData {
    id: string | undefined | null;
    last:  number;
}


  export interface LeagueModel {
    id:number,
    rank: number;
  name: string;
  logo: string;
  played: number,
 win: number,
draw: number,
lose: number,
goalsDiff: number,
points:number
}


export interface FixureModel {
        "league": {
          "id": Number,
          "name": string
          "country": string
          "logo": string
          "flag": string
          "season": Number,
          "round": string
        },
        "teams": {
          "home": {
            "id": Number,
            "name": string
            "logo": string
            "winner": boolean
          },
          "away": {
            "id": 40,
            "name": string
            "logo": string
            "winner": boolean
          }
        },
        "goals": {
          "home": number,
          "away": number
        },
        "score": {
          "halftime": {
            "home": number,
            "away": number
          },
          "fulltime": {
            "home": number,
            "away": number
        }
      },    
  }




