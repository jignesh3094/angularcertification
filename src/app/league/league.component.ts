import { Component, OnDestroy, OnInit } from '@angular/core';
import { DataService } from '../shared/data.service';
import { Observable,Subscription} from 'rxjs';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ErrorData, League, LeagueModeData, SelectedCountryData, StandingsEntityEntity, Team } from '../shared/league.interface';
@Component({
  selector: 'app-league',
  templateUrl: './league.component.html',
  styleUrls: ['./league.component.scss']
})
export class LeagueComponent implements OnInit,OnDestroy {
  countrySubsription = new Subscription;
  apiFailed:  boolean = false;
  loader: boolean = true;
  leagueList!: StandingsEntityEntity[] | null
  selectedTeam!: number
  leagueSubscription = new Subscription;
  error!: ErrorData;
  constructor(private toastr: ToastrService,private dataService: DataService,private router: Router) {
   
   }

  ngOnInit(): void {
      this.countrySubsription = this.dataService.selectedCounty.subscribe(res => { 
        if(res) {
          this.getLeagueData(res);
        } 
      })
  }

 
  teamClick(obj:Team) {
    this.selectedTeam = obj.id;
    this.router.navigate(['/detail/',obj.id]);
  }

  getLeagueData(selctedCountry: SelectedCountryData) {
    this.loader = true;
    if ("leagueData" in localStorage) {
     let res = JSON.parse(localStorage.getItem("leagueData")!);
     this.setLeagueResponse(res);
  } else {
    this.leagueSubscription = this.dataService.getLeaguesData(selctedCountry).subscribe((res)=> {
       localStorage.setItem('leagueData',JSON.stringify(res));
       this.setLeagueResponse(res);
     })
  }
  }


  setLeagueResponse(res:LeagueModeData) {
    this.loader = false;
    if(res.errors) {
      this.error = res.errors;
    }
    if(res && res.response && res.response.length > 0 && res.response[0].league && res.response[0].league.standings && res.response[0].league.standings.length > 0) {
        this.apiFailed = false;
        this.leagueList  = res.response[0].league.standings[0];
      } else if(this.error.requests) {
        localStorage.removeItem('leagueData');
        this.toastr.error('Error!',this.error.requests);
        this.apiFailed = true;
      }else {
        localStorage.removeItem('leagueData');
        this.toastr.error('Error!',this.error.access);
        this.apiFailed = true;
      }
  }

 

  ngOnDestroy() {
    if(this.leagueSubscription) {
      this.leagueSubscription.unsubscribe();
    }
    if(this.countrySubsription) {
      this.countrySubsription.unsubscribe();
    }
  
  }

}
