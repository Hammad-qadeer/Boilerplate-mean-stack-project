import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { CreateActivityMappingDialogComponent } from '../create-activity-mapping-dialog/create-activity-mapping-dialog.component';
import { RolesService } from '../_services/roles.service';
import { StorageService } from '../_services/storage.service';
import { RoleDataSource, RoleItem } from './role-datasource';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.scss']
})
export class RoleComponent {
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

  constructor(private roleService: RolesService, public dialog: MatDialog, private storageService: StorageService) {}

  ngOnInit() {
    const user = this.storageService.getUser();
    const userActivity = user.activities.find((a: any) => a.name === 'Profile');
    alert(JSON.stringify(userActivity))
    this.canCreate = userActivity.can_create;
    this.canRead = userActivity.can_read;
    this.canUpdate = userActivity.can_update;
    this.canDelete = userActivity.can_delete;
    this.getRoles();
  }

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(CreateActivityMappingDialogComponent, {
      width: '50%',
      enterAnimationDuration,
      exitAnimationDuration,
    })
  }

  getRoles() {
    this.roleService.getRoles().subscribe({
      next: (res: any)=> {
        this.dataSource = new MatTableDataSource(res.roles)
        this.dataSource.paginator = this.paginator;
      },
      error: (err)=> {
        alert("Error while fetching the records")
      }
    })
  }

}
