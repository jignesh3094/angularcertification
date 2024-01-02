import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { NotfoundComponent } from './notfound/notfound.component';

const routes: Routes = [
  {
    path: '',
    component: HeaderComponent,
    
    children: [
      {
        path: '',
        loadChildren: () => import('./league/league.module').then(m=>m.LeagueModule),
        pathMatch: 'full',
      },
    ],
   
 },
 {
  path: 'detail',
  loadChildren: () => import('./league/detail/detail.module').then(m=>m.DetailModule) 
},
{
  path: '**',
  component: NotfoundComponent
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
