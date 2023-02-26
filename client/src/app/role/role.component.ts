import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CreateRoleModalDialogComponent } from '../create-role-modal-dialog/create-role-modal-dialog.component';
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
  displayedColumns = ['name', 'created_at', 'updated_at', 'actions'];
  dataSource = new MatTableDataSource<any>;

  canCreate = false;
  canRead = false;
  canUpdate = false;
  canDelete = false;

  constructor(private roleService: RolesService, public dialog: MatDialog, 
    private storageService: StorageService, private toastr : ToastrService, private router: Router) {}

  ngOnInit() {
    const currentUrl = this.router.url
    console.log(currentUrl)
    const user = this.storageService.getUser();
    const userActivity = user.activities.find((a: any) => a.url === currentUrl);
    console.log(userActivity)
    this.canCreate = userActivity.can_create;
    this.canRead = userActivity.can_read;
    this.canUpdate = userActivity.can_update;
    this.canDelete = userActivity.can_delete;
    this.getRoles();
  }

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    if(this.canCreate) {
    this.dialog.open(CreateRoleModalDialogComponent, {
      width: '50%',
      enterAnimationDuration,
      exitAnimationDuration,
    }).afterClosed().subscribe(val => {
      this.getRoles();
  });
}   else {
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
  }else {
    this.toastr.warning("You don't have access to Read");
  }
  }

  editRole(element: any) {
    debugger
    if(this.canUpdate) {
    this.dialog.open(CreateRoleModalDialogComponent, {
      width: '50%',
      data: element
    }).afterClosed().subscribe(val => {
      if(val === 'update') {
        this.getRoles();
      }
    })
  } else {
    this.toastr.warning("You don't have access to Edit");
  }
  }

  deleteRole(id: number) {
    debugger
    if(this.canDelete) {
    this.roleService.deleteRole(id).subscribe({
      next:(res) => {
        this.getRoles();
      },
      error: (err)=> {
        this.toastr.error("Error while deleting the record");
      },
  })
    } else {
      this.toastr.warning("You don't have access to Delete");
    }
  }

}
