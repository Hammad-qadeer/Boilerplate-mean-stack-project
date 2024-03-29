import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutComponent } from './layout/layout.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserComponent } from './user/user.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { CreateUserModalDialogComponent } from './create-user-modal-dialog/create-user-modal-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { ActivityComponent } from './activity/activity.component';
import { CreateActivityModalDialogComponent } from './create-activity-modal-dialog/create-activity-modal-dialog.component';
import { RoleComponent } from './role/role.component';
import { CreateActivityMappingDialogComponent } from './create-activity-mapping-dialog/create-activity-mapping-dialog.component';
import {MatExpansionModule} from '@angular/material/expansion';
import { LoginComponent } from './login/login.component'
import { httpInterceptorProviders } from '../app/_helpers/http.interceptor';
import { NotfoundComponent } from './notfound/notfound.component';
import {CdkAccordionModule} from '@angular/cdk/accordion';
import { ActivityMappingComponent } from './activity-mapping/activity-mapping.component';
import { CreateRoleModalDialogComponent } from './create-role-modal-dialog/create-role-modal-dialog.component';
import { ToastrModule } from 'ngx-toastr';



@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    DashboardComponent,
    UserComponent,
    CreateUserModalDialogComponent,
    ActivityComponent,
    CreateActivityModalDialogComponent,
    RoleComponent,
    CreateActivityMappingDialogComponent,
    LoginComponent,
    NotfoundComponent,
    ActivityMappingComponent,
    CreateRoleModalDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatDialogModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatSelectModule,
    MatInputModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatExpansionModule,
    CdkAccordionModule,
    ToastrModule.forRoot({
      timeOut: 10000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
      closeButton: true,
      progressBar: true,
    }),
  ],
  providers: [httpInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
