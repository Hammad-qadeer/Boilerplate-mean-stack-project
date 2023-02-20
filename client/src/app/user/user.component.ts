import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { CreateUserModalDialogComponent } from '../create-user-modal-dialog/create-user-modal-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { UsersService } from '../_services/users.service';
import {ThemePalette} from '@angular/material/core';
import { StorageService } from '../_services/storage.service';

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

  constructor(public dialog: MatDialog, private userService: UsersService, private storageService: StorageService) {
    // this.dataSource = new UserDataSource();
  }

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(CreateUserModalDialogComponent, {
      width: '50%',
      enterAnimationDuration,
      exitAnimationDuration,
    }).afterClosed().subscribe(val => {
      this.getUsers();
  });
  }

  ngOnInit() {
    const user = this.storageService.getUser();
    const userActivity = user.activities.find((a: any) => a.name === 'User');
    alert(JSON.stringify(userActivity))
    this.canCreate = userActivity.can_create;
    this.canRead = userActivity.can_read;
    this.canUpdate = userActivity.can_update;
    this.canDelete = userActivity.can_delete;
    this.getUsers();
  }
  
  getUsers() {
    this.userService.getUsers().subscribe({
      next: (res: any)=> {
        this.dataSource = new MatTableDataSource(res.users)
        this.dataSource.paginator = this.paginator;
      },
      error: (err)=> {
        alert("Error while fetching the records")
      }
    })
  }

  editUser(element: any) {
    debugger
    this.dialog.open(CreateUserModalDialogComponent, {
      width: '50%',
      data: element
    }).afterClosed().subscribe(val => {
      if(val === 'update') {
        this.getUsers();
      }
    })
  }

  deleteUser(id: number) {
    debugger
    this.userService.deleteUser(id).subscribe({
      next:(res) => {
        this.getUsers();
      },
      error(err) {
        alert("Error while deleting the record")
      },
  })
  }
}
