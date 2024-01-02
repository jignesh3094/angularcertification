import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { LeagueModeData, SelectedCountryData } from './league.interface';
import { Fexure, FixureData } from './fexure.interface';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  selectedCounty = new BehaviorSubject<SelectedCountryData|null>(null);
  constructor(private http: HttpClient) { }
  
  setSelectedCountry(obj: SelectedCountryData) {
    this.selectedCounty.next(obj);
  }

  getLeaguesData(requestObj:SelectedCountryData): Observable<LeagueModeData> {
       let obj = {
        league: requestObj.leagueId,
        season: 2023
       }
       return this.http.get<LeagueModeData>(environment.apiBaseUrl+"/standings",{params: obj})
      }

      getFixturesData(requestObj:FixureData): Observable<Fexure>  {

        let obj:{} = {
          team: requestObj.id,
          last: 10
         }
          return this.http.get<Fexure>(environment.apiBaseUrl+"/fixtures",{params: obj})
      }


      
}
