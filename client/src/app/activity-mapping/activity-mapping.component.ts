import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CreateActivityMappingDialogComponent } from '../create-activity-mapping-dialog/create-activity-mapping-dialog.component';
import { RoleItem } from '../role/role-datasource';
import { ActivitiesService } from '../_services/activities.service';
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
  displayedColumns = ['role_name', 'activity_name','can_create', 'can_read', 'can_update', 'can_delete', 'created_at', 'updated_at'];
  dataSource = new MatTableDataSource<any>;

  canCreate = false;
  canRead = false;
  canUpdate = false;
  canDelete = false;

  constructor(private activityService: ActivitiesService, public dialog: MatDialog, 
    private storageService: StorageService, private toastr : ToastrService, private router: Router) {}

  ngOnInit() {
    debugger
    const currentUrl = this.router.url
    const user = this.storageService.getUser();
    const userActivity = user.activities.find((a: any) => a.url === currentUrl);
    this.canCreate = userActivity.can_create;
    this.canRead = userActivity.can_read;
    this.canUpdate = userActivity.can_update;
    this.canDelete = userActivity.can_delete;
    this.getActivityMapData();
  }

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(CreateActivityMappingDialogComponent, {
      width: '50%',
      enterAnimationDuration,
      exitAnimationDuration,
    })
  }

  getActivityMapData() {
    const user = this.storageService.getUser();
    const roleId = user.activities[0].role_id;
    this.activityService.activityMappedData().subscribe({
      next: (res: any)=> {
        this.dataSource = new MatTableDataSource(res.activityMapping.filter((role: any) => role.rolename !== 'ADMIN' && role.id !== roleId))
        this.dataSource.paginator = this.paginator;
      },
      error: (err)=> {
        this.toastr.error("Error while fetching the records");
      }
    })
  }

}
