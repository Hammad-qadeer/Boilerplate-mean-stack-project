import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LayoutComponent } from './layout/layout.component';
import { UserComponent } from './user/user.component';

const routes: Routes = [
  {
    path: '', component: LayoutComponent,
    children: [
      // {path: 'dashboard', component: DashboardComponent},
      {path: 'user', component: UserComponent}
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
