import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LeagueComponent } from './league.component';
import { CommonModule } from '@angular/common';


const routes: Routes = [
  {
    path: '',
    component: LeagueComponent
 },

];

@NgModule({
  declarations: [LeagueComponent],
  imports: [RouterModule.forChild(routes),CommonModule],
  exports: [RouterModule]
})
export class LeagueModule { }
