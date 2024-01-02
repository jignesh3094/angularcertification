import { Component, OnDestroy, OnInit } from '@angular/core';

import { DataService } from '../shared/data.service';
import { SelectedCountryData } from '../shared/league.interface';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit,OnDestroy {
  countrySubsription = new Subscription;
  countryData = [
    {
      'name': 'England',
      'id': 'england',
      'leagueId': 39
    },
    {
      'name': 'Spain',
      'id': 'spain',
      'leagueId': 140
    },
    {
      'name': 'Germany',
      'id': 'germany',
      'leagueId': 78
    },
    {
      'name': 'France',
      'id': 'france',
      'leagueId': 61
    },
    {
      'name': 'Italy',
      'id': 'italy',
      'leagueId': 135
    }
  ]
  selectedCountry: string = 'england';
  constructor(private dataService: DataService) {
    
   }

  ngOnInit(): void {
    this.countrySubsription = this.dataService.selectedCounty.subscribe(res => { 
      if(res) {
        this.selectedCountry = res.id;
      } else {
        this.changeCountry(this.countryData[0]);
      }
    })
    
  }

  changeCountry(obj:SelectedCountryData) {
      localStorage.removeItem('leagueData');
      this.selectedCountry = obj.id;
      this.dataService.setSelectedCountry(obj);
  }

  ngOnDestroy() {
    
    if(this.countrySubsription) {
      this.countrySubsription.unsubscribe();
    }
  
  }


}
