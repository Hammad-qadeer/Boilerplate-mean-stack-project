import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActivityComponent } from './activity/activity.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LayoutComponent } from './layout/layout.component';
import { LoginComponent } from './login/login.component';
import { RoleComponent } from './role/role.component';
import { UserComponent } from './user/user.component';
import { AuthGuard } from './_helpers/auth.guard';
import { RoleGuardGuard } from './_helpers/role-guard.guard';

const routes: Routes = [
  {
    path: '', component: LayoutComponent,
    children: [
      {path: 'dashboard', component: DashboardComponent},
      {path: 'management/user', component: UserComponent, canActivate: [AuthGuard, RoleGuardGuard] },
      {path: 'management/view-activities', component: ActivityComponent, canActivate: [AuthGuard, RoleGuardGuard]},
      {path: 'management/view-profiles', component: RoleComponent, canActivate: [AuthGuard, RoleGuardGuard]},
      
    ]
  },
  { path: 'login', component: LoginComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
