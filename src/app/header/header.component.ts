import { Component, OnInit } from '@angular/core';
import { SelectedCountryData } from './../shared/leagueModel';
import { DataService } from '../shared/data.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
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
  constructor(private dataService: DataService) { }

  ngOnInit(): void {
      this.changeCountry(this.countryData[0]);
  }

  changeCountry(obj:SelectedCountryData) {
      this.selectedCountry = obj.id;
      this.dataService.setSelectedCountry(obj);
  }

}
