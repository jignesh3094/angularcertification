import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, map } from 'rxjs';
import { FixureData, SelectedCountryData } from './leagueModel';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  selectedCounty = new BehaviorSubject<SelectedCountryData|null>(null);
  constructor(private http: HttpClient) { }
  
  setSelectedCountry(obj: SelectedCountryData) {
    this.selectedCounty.next(obj);
  }

  getLeaguesData(requestObj:SelectedCountryData): Observable<any> {
       console.log(requestObj);
       let obj = {
        league: requestObj.leagueId,
        season: 2023
       }
       return this.http.get<any>(environment.apiBaseUrl+"/standings",{params: obj})
      }

      getFixturesData(requestObj:FixureData): Observable<any>  {

        let obj:{} = {
          team: requestObj.id,
          last: 10
         }
          return this.http.get(environment.apiBaseUrl+"/fixtures",{params: obj})
      }
}
