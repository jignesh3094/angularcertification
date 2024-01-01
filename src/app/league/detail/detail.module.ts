import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CommonModule } from '@angular/common';
import { DetailComponent } from './detail.component';

const routes: Routes = [
  {
    path: ':team',
    component: DetailComponent
 },

];

@NgModule({
  declarations: [DetailComponent],
  imports: [RouterModule.forChild(routes),CommonModule],
  exports: [RouterModule]
})
export class DetailModule { }
