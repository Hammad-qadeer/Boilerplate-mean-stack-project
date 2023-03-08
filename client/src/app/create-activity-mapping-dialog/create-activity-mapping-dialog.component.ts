import { Component } from '@angular/core';
import { ActivitiesService } from '../_services/activities.service';
import { RolesService } from '../_services/roles.service';
import {ThemePalette} from '@angular/material/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { StorageService } from '../_services/storage.service';

@Component({
  selector: 'app-create-activity-mapping-dialog',
  templateUrl: './create-activity-mapping-dialog.component.html',
  styleUrls: ['./create-activity-mapping-dialog.component.scss'],
})
export class CreateActivityMappingDialogComponent {
  roles: any;
  selectedRoleId: any;
  selectedActivityId: any;
  isCreate = false;
  isRead =false;
  isUpdate = false;
  isDelete = false;
  userActivities: any;

  constructor(
    private roleService: RolesService,
    private activityService: ActivitiesService,
    private dialogRef : MatDialogRef<CreateActivityMappingDialogComponent>,
    private toastr: ToastrService,
    private storageService: StorageService
  ) {}

  ngOnInit() {
    this.getRoles();
  }

  assignActivity() {
    debugger
    const formData = [];
    for (let i = 0; i < this.userActivities.length; i++) {
      const activity = this.userActivities[i];
      formData.push({
        role_id: this.selectedRoleId,
        activity_id: this.userActivities[i].id,
        isCreate: this.userActivities[i].can_create ? 1 : 0,
        isRead: this.userActivities[i].can_read ? 1 : 0,
        isUpdate: this.userActivities[i].can_update ? 1 : 0,
        isDelete: this.userActivities[i].can_delete ? 1 : 0,
      });
  }
    this.activityService.assignActivityToRole(formData).subscribe({
      next: () => {
        this.toastr.success("Activity Added Successfully");
        this.dialogRef.close('save')
      },
      error: () => {
        this.toastr.error("Error while adding the Activity");
      },
    });
  }

  getSelectedActivities() {
    debugger;
    const role_id = this.selectedRoleId;
    this.activityService.getSelectedActivities(role_id).subscribe({
      next: (res: any) => {
        this.userActivities = res.activities;
        // this.cdr.detectChanges();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  getRoles() {
    const user = this.storageService.getUser();
    const roleId = user.activities[0].role_id;
    this.roleService.getRoles().subscribe({
      next: (res: any) => {
        this.roles = res.roles.filter((role: any) => role.name !== 'ADMIN' && role.id !== roleId ); 
      },
      error: (err) => {
        alert('Error while fetching the records');
      },
    });
  }
}
