
import { Component, OnInit } from '@angular/core';
import { DataService } from '../../shared/data.service';
import { Observable,Subscription} from 'rxjs';
import { FixureData, FixureModel } from '../../shared/leagueModel';

import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {
  countrySubsription = new Subscription;
  fexureSubsription = new Subscription;
  apiFailed:  boolean = false;
  loader: boolean = true;
  featurLIst: FixureModel[] = [];
  id: string | undefined | null;

constructor(private toastr: ToastrService,private router: Router,private dataService: DataService,private routerData: ActivatedRoute) {
       this.id = this.routerData.snapshot.paramMap.get('team');
       this.getFixtureData({id: this.id,last: 10})
   }

  ngOnInit(): void {
  }

  ngOnDestroy() {
  }


  getFixtureData(fixureData: FixureData) {
    this.fexureSubsription = this.dataService.getFixturesData(fixureData).subscribe(res=> {
     this.loader = false;
      if(res && res.response && res.response.length > 0) {
        this.apiFailed = false;
        this.featurLIst  = new Array<FixureModel>();
        for(let i = 0; i<res.response.length; i++) {
          this.featurLIst.push(res.response[i]);
            
        }
      }
      else if (res.errors && res.errors.requests) {
        this.apiFailed = true;
        this.toastr.error('Error!',res.errors.requests);
      }
    })
  }

  back() {
    this.router.navigate(['/']);
  }

  ngOnDesctory() {
    if(this.fexureSubsription) {
      this.fexureSubsription.unsubscribe();
    }
    if(this.countrySubsription) {
      this.countrySubsription.unsubscribe();
    }
  
  }

}

