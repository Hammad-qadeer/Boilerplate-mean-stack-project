import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { CreateActivityMappingDialogComponent } from '../create-activity-mapping-dialog/create-activity-mapping-dialog.component';
import { RoleItem } from '../role/role-datasource';
import { RolesService } from '../_services/roles.service';
import { StorageService } from '../_services/storage.service';

@Component({
  selector: 'app-activity-mapping',
  templateUrl: './activity-mapping.component.html',
  styleUrls: ['./activity-mapping.component.scss']
})
export class ActivityMappingComponent {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<RoleItem>;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['name', 'created_at', 'updated_at'];
  dataSource = new MatTableDataSource<any>;

  canCreate = false;
  canRead = false;
  canUpdate = false;
  canDelete = false;

  constructor(private roleService: RolesService, public dialog: MatDialog, 
    private storageService: StorageService, private toastr : ToastrService) {}

  ngOnInit() {
    const user = this.storageService.getUser();
    const userActivity = user.activities.find((a: any) => a.name === 'Profile');
    this.canCreate = userActivity.can_create;
    this.canRead = userActivity.can_read;
    this.canUpdate = userActivity.can_update;
    this.canDelete = userActivity.can_delete;
    this.getRoles();
  }

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    if(this.canCreate) {
    this.dialog.open(CreateActivityMappingDialogComponent, {
      width: '50%',
      enterAnimationDuration,
      exitAnimationDuration,
    })
  }else{
    this.toastr.warning("You don't have access to Create");
  }
  }

  getRoles() {
    if(this.canRead) {
    this.roleService.getRoles().subscribe({
      next: (res: any)=> {
        this.dataSource = new MatTableDataSource(res.roles)
        this.dataSource.paginator = this.paginator;
      },
      error: (err)=> {
        this.toastr.error("Error while fetching the records");
      }
    })
  } else {
    this.toastr.warning("You don't have access to Read");
  }
  }

}
