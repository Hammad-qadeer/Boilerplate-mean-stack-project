import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { CreateUserModalDialogComponent } from '../create-user-modal-dialog/create-user-modal-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { UsersService } from '../_services/users.service';
import {ThemePalette} from '@angular/material/core';
import { StorageService } from '../_services/storage.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  // dataSource: UserDataSource;

  canCreate = false;
  canRead = false;
  canUpdate = false;
  canDelete = false;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns: string[] = ['username', 'email', 'role', 'active', 'actions'];
  dataSource = new MatTableDataSource<any>;

  constructor(public dialog: MatDialog, private userService: UsersService, 
    private storageService: StorageService, private toastr : ToastrService) {
    // this.dataSource = new UserDataSource();
  }

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    if(this.canCreate) {
    this.dialog.open(CreateUserModalDialogComponent, {
      width: '50%',
      enterAnimationDuration,
      exitAnimationDuration,
    }).afterClosed().subscribe(val => {
      this.getUsers();
  });
} else {
  this.toastr.warning("You don't have access for Create");
}
  }

  ngOnInit() {
    const user = this.storageService.getUser();
    const userActivity = user.activities.find((a: any) => a.name === 'User');
    this.canCreate = userActivity.can_create;
    this.canRead = userActivity.can_read;
    this.canUpdate = userActivity.can_update;
    this.canDelete = userActivity.can_delete;
    this.getUsers();
  }
  
  getUsers() {
    if(this.canRead) {
    this.userService.getUsers().subscribe({
      next: (res: any)=> {
        this.dataSource = new MatTableDataSource(res.users)
        this.dataSource.paginator = this.paginator;
      },
      error: (err)=> {
        this.toastr.error("Error while fetching the record");
      }
    })
  }else {
    this.toastr.warning("You don't have access to View");
  }
  }

  editUser(element: any) {
    debugger
    if(this.canUpdate) {
    this.dialog.open(CreateUserModalDialogComponent, {
      width: '50%',
      data: element
    }).afterClosed().subscribe(val => {
      if(val === 'update') {
        this.getUsers();
      }
    })
  } else {
    this.toastr.warning("You don't have access for Edit");
  }
  }

  deleteUser(id: number) {
    debugger
    if(this.canDelete) {
    this.userService.deleteUser(id).subscribe({
      next:(res) => {
        this.getUsers();
      },
      error: (err)=> {
        this.toastr.error("Error while fetching the record");
      },
  })
} else {
  this.toastr.warning("You don't have access for Delete");
}
  }
}
