import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { CreateActivityModalDialogComponent } from '../create-activity-modal-dialog/create-activity-modal-dialog.component';
import { ActivitiesService } from '../_services/activities.service';
import { StorageService } from '../_services/storage.service';
import { ActivityDataSource, ActivityItem } from './activity-datasource';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.scss']
})
export class ActivityComponent {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['name', 'active', 'url', 'created_at', 'actions'];
  dataSource = new MatTableDataSource<any>;

  canCreate = false;
  canRead = false;
  canUpdate = false;
  canDelete = false;
  
  constructor(private activityService: ActivitiesService, public dialog: MatDialog, private storageService: StorageService) { }

  ngOnInit() {
    const user = this.storageService.getUser();
    const userActivity = user.activities.find((a: any) => a.name === 'Activity');
    alert(JSON.stringify(userActivity))
    this.canCreate = userActivity.can_create;
    this.canRead = userActivity.can_read;
    this.canUpdate = userActivity.can_update;
    this.canDelete = userActivity.can_delete;
    this.getAllActivities();
  }

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(CreateActivityModalDialogComponent, {
      width: '50%',
      enterAnimationDuration,
      exitAnimationDuration,
    }).afterClosed().subscribe(val => {
      this.getAllActivities();
  });
  }

  getAllActivities() {
    this.activityService.getActivities().subscribe({
      next: (res: any)=> {
        this.dataSource = new MatTableDataSource(res.activities)
        this.dataSource.paginator = this.paginator;
      },
      error: (err)=> {
        alert("Error while fetching the records")
      }
    })
  }

  editActivity(element: any) {
    debugger
    this.dialog.open(CreateActivityModalDialogComponent, {
      width: '50%',
      data: element
    }).afterClosed().subscribe(val => {
      if(val === 'update') {
        this.getAllActivities();
      }
    })
  }

  deleteActivity(id: number) {
    debugger
    this.activityService.deleteActivity(id).subscribe({
      next:(res) => {
        this.getAllActivities();
      },
      error(err) {
        alert("Error while deleting the record")
      },
  })
  }
}
