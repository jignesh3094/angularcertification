
import { Component, OnDestroy, OnInit } from '@angular/core';
import { DataService } from '../../shared/data.service';
import { Observable,Subscription} from 'rxjs';
import { ErrorData, FixureData, ResponseEntity } from '../../shared/fexure.interface';

import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit,OnDestroy {
  countrySubsription = new Subscription;
  fexureSubsription = new Subscription;
  apiFailed:  boolean = false;
  loader: boolean = true;
  error!: ErrorData;
  featurLIst!: (ResponseEntity)[] | null
  id: string | undefined | null;

constructor(private toastr: ToastrService,private router: Router,private dataService: DataService,private routerData: ActivatedRoute) {
       this.id = this.routerData.snapshot.paramMap.get('team');
       this.getFixtureData({id: this.id,last: 10})
   }

  ngOnInit(): void {
  }


  getFixtureData(fixureData: FixureData) {
    this.fexureSubsription = this.dataService.getFixturesData(fixureData).subscribe((res)=> {
     this.loader = false;
     if(res.errors) {
      this.error = res.errors;
     }
      if(res && res.response && res.response.length > 0) {
        this.apiFailed = false;
        this.featurLIst  = res.response
      }
      else if(this.error.requests) {
        this.setErrors(this.error.requests)
      } else {
        this.setErrors(this.error.access)
      }
    
    })
  }

  setErrors(error:string) {
    this.toastr.error('Error!',error);
    this.apiFailed = true;
  }

  back() {
    this.router.navigate(['/']);
  }

  ngOnDestroy() {
    if(this.fexureSubsription) {
      this.fexureSubsription.unsubscribe();
    }  
  }

}

