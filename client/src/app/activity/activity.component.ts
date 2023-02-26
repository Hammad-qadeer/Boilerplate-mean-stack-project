import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CreateActivityModalDialogComponent } from '../create-activity-modal-dialog/create-activity-modal-dialog.component';
import { ActivitiesService } from '../_services/activities.service';
import { StorageService } from '../_services/storage.service';
import { ActivityDataSource, ActivityItem } from './activity-datasource';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.scss'],
})
export class ActivityComponent {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['name', 'active', 'url', 'created_at', 'actions'];
  dataSource = new MatTableDataSource<any>();

  canCreate = false;
  canRead = false;
  canUpdate = false;
  canDelete = false;

  constructor(
    private activityService: ActivitiesService,
    public dialog: MatDialog,
    private storageService: StorageService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit() {
    const currentUrl = this.router.url
    const user = this.storageService.getUser();
    console.log(user)
    const userActivity = user.activities.find(
      (a: any) => a.url === currentUrl
    );
    this.canCreate = userActivity.can_create;
    this.canRead = userActivity.can_read;
    this.canUpdate = userActivity.can_update;
    this.canDelete = userActivity.can_delete;
    this.getAllActivities();
  }

  openDialog(
    enterAnimationDuration: string,
    exitAnimationDuration: string
  ): void {
    if (this.canCreate) {
      this.dialog
        .open(CreateActivityModalDialogComponent, {
          width: '50%',
          enterAnimationDuration,
          exitAnimationDuration,
        })
        .afterClosed()
        .subscribe((val) => {
          this.getAllActivities();
        });
    } else {
      this.toastr.warning("You don't have access to Create");
    }
  }

  getAllActivities() {
    if (this.canRead) {
      this.activityService.getActivities().subscribe({
        next: (res: any) => {
          this.dataSource = new MatTableDataSource(res.activities);
          this.dataSource.paginator = this.paginator;
        },
        error: (err) => {
          this.toastr.error("Error while fetching the records");
        },
      });
    } else {
      this.toastr.warning("You don't have access to Read");
    }
  }

  editActivity(element: any) {
    debugger;
    if (this.canUpdate) {
      this.dialog
        .open(CreateActivityModalDialogComponent, {
          width: '50%',
          data: element,
        })
        .afterClosed()
        .subscribe((val) => {
          if (val === 'update') {
            this.getAllActivities();
          }
        });
    } else {
      this.toastr.warning("You don't have access to Edit");
    }
  }

  deleteActivity(id: number) {
    debugger;
    if (this.canDelete) {
      this.activityService.deleteActivity(id).subscribe({
        next: (res) => {
          this.getAllActivities();
        },
        error: (err) => {
          this.toastr.error("Error while deleting the record");
        },
      });
    } else {
      this.toastr.warning("You don't have access to Delete");
    }
  }
}
