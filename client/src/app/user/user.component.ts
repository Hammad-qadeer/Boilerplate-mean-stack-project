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
import { Router } from '@angular/router';

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
    private storageService: StorageService, private toastr : ToastrService, private router: Router) {
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
    const currentUrl = this.router.url
    const user = this.storageService.getUser();
    const userActivity = user.activities.find((a: any) => a.url === currentUrl);
    this.canCreate = userActivity.can_create;
    this.canRead = userActivity.can_read;
    this.canUpdate = userActivity.can_update;
    this.canDelete = userActivity.can_delete;
    this.getUsers();
  }
  
  getUsers() {
    debugger
    const user = this.storageService.getUser();
    const userId = user.activities[0].user_id;
    this.userService.getUsers().subscribe({
      next: (res: any)=> {
        this.dataSource = new MatTableDataSource(res.users.filter((user: any) => user.username !== 'Admin' ))
        this.dataSource.paginator = this.paginator;
      },
      error: (err)=> {
        this.toastr.error("Error while fetching the record");
      }
    })
  }

  updateActiveStatus(event: any, element: any) {
    debugger
    const newActiveStatus = event.checked;
    const userId = element.userId;
  
    // Make PUT request to update user's active status in the backend
    this.userService.updateUserStatus(userId, newActiveStatus).subscribe(
      (response: any) => {
        // Update user's active status in the frontend dataSource
        element.active = newActiveStatus;
        const message = newActiveStatus ? 'User has been activated' : 'User has been deactivated';
        this.toastr.success(message);
      },
      (error: any) => {
        console.error(error);
      }
    );
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
    this.userService.deleteUser(id).subscribe({
      next:(res) => {
        this.getUsers();
      },
      error: (err)=> {
        this.toastr.error("Error while fetching the record");
      },
  })
  }
}
