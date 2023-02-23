import { Component } from '@angular/core';
import { ActivitiesService } from '../_services/activities.service';
import { RolesService } from '../_services/roles.service';
import {ThemePalette} from '@angular/material/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-activity-mapping-dialog',
  templateUrl: './create-activity-mapping-dialog.component.html',
  styleUrls: ['./create-activity-mapping-dialog.component.scss'],
})
export class CreateActivityMappingDialogComponent {
  roles: any;
  selectedRoleId: any;
  selectedActivityId: any;
  isCreate!: boolean;
  isRead!: boolean;
  isUpdate!: boolean;
  isDelete!: boolean;
  userActivities: any;

  constructor(
    private roleService: RolesService,
    private activityService: ActivitiesService,
    private dialogRef : MatDialogRef<CreateActivityMappingDialogComponent>,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.getRoles();
  }

  assignActivity() {
    const formData = [];
    for (let i = 0; i < this.userActivities.length; i++) {
      const activity = this.userActivities[i];
      if (activity.can_create || activity.can_read || activity.can_update || activity.can_delete) {
      formData.push({
        role_id: this.selectedRoleId,
        activity_id: this.userActivities[i].id,
        isCreate: this.userActivities[i].can_create ? 1 : 0,
        isRead: this.userActivities[i].can_read ? 1 : 0,
        isUpdate: this.userActivities[i].can_update ? 1 : 0,
        isDelete: this.userActivities[i].can_delete ? 1 : 0,
      });
    }
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
        console.log(res);
        // this.cdr.detectChanges();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  getRoles() {
    this.roleService.getRoles().subscribe({
      next: (res: any) => {
        this.roles = res.roles;
      },
      error: (err) => {
        alert('Error while fetching the records');
      },
    });
  }
}
