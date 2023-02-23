import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActivityMappingComponent } from 'src/app/activity-mapping/activity-mapping.component';
import { ActivityComponent } from 'src/app/activity/activity.component';
import { DashboardComponent } from 'src/app/dashboard/dashboard.component';
import { LayoutComponent } from 'src/app/layout/layout.component';
import { RoleComponent } from 'src/app/role/role.component';
import { UserComponent } from 'src/app/user/user.component';
import { AuthGuard } from 'src/app/_helpers/auth.guard';
import { RoleGuardGuard } from 'src/app/_helpers/role-guard.guard';

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard, RoleGuardGuard],
    component: LayoutComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'user', component: UserComponent },
      { path: 'view-activities', component: ActivityComponent },
      { path: 'view-profiles', component: ActivityMappingComponent },
      { path: 'view-role', component: RoleComponent }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
