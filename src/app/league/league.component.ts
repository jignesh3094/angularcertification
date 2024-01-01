import { Component, OnDestroy, OnInit } from '@angular/core';
import { DataService } from '../shared/data.service';
import { Observable,Subscription} from 'rxjs';
import { SelectedCountryData } from '../shared/leagueModel';
import {LeagueModel} from '../shared/leagueModel'
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-league',
  templateUrl: './league.component.html',
  styleUrls: ['./league.component.scss']
})
export class LeagueComponent implements OnInit,OnDestroy {
  countrySubsription = new Subscription;
  apiFailed:  boolean = false;
  loader: boolean = true;
  leagueList: LeagueModel[] = [];
  leagueSubscription = new Subscription;
  constructor(private toastr: ToastrService,private dataService: DataService,private router: Router) {
   
   }

  ngOnInit(): void {
      this.countrySubsription = this.dataService.selectedCounty.subscribe(res => { 
        if(res) {
          this.getLeagueData(res);
        } 
      })
  }

  ngOnDestroy() {
     this.countrySubsription.unsubscribe();
  }

  teamClick(obj:LeagueModel) {
    this.router.navigate(['/detail/',obj.id]);
  }

  getLeagueData(selctedCountry: SelectedCountryData) {
   this.leagueSubscription = this.dataService.getLeaguesData(selctedCountry).subscribe((res)=> {
    this.loader = false;
      if(res && res.response && res.response.length > 0 && res.response[0].league && res.response[0].league.standings && res.response[0].league.standings.length > 0) {
        this.apiFailed = false;
        this.leagueList  = new Array<LeagueModel>();
        for(let i = 0; i<res.response[0].league.standings[0].length; i++) {
          this.leagueList.push(
            {
            rank:res.response[0].league.standings[0][i].rank,
            name:res.response[0].league.standings[0][i].team.name,
            logo:res.response[0].league.standings[0][i].team.logo,
            played:res.response[0].league.standings[0][i].all.played,
            win:res.response[0].league.standings[0][i].all.win,
            id:res.response[0].league.standings[0][i].team.id,
            lose: res.response[0].league.standings[0][i].all.lose,
            draw:res.response[0].league.standings[0][i].all.draw,
            goalsDiff:res.response[0].league.standings[0][i].goalsDiff,
            points:res.response[0].league.standings[0][i].points,
          })
            
        }
         
      }
      else if (res.errors && res.errors.requests) {
        this.apiFailed = true;
        this.toastr.error('Error!',res.errors.requests);
      }
     
   })
  }

  ngOnDesctory() {
    if(this.leagueSubscription) {
      this.leagueSubscription.unsubscribe();
    }
    if(this.countrySubsription) {
      this.countrySubsription.unsubscribe();
    }
  
  }

}
