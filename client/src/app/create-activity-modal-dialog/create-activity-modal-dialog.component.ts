import { Component, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivitiesService } from '../_services/activities.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-activity-modal-dialog',
  templateUrl: './create-activity-modal-dialog.component.html',
  styleUrls: ['./create-activity-modal-dialog.component.scss']
})
export class CreateActivityModalDialogComponent {
  activityForm: any;
  actionBtn : string = "Save";

  constructor(private activityService: ActivitiesService, private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private dialogRef : MatDialogRef<CreateActivityModalDialogComponent>,
    private toastr : ToastrService
    ) {}

  ngOnInit() : void {
    this.activityForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      url: ['', [Validators.required]],
      description: ['', [Validators.required]],
      active: [false],
    });

    if(this.editData){
      this.actionBtn = "Update"
      this.activityForm.controls['name'].setValue(this.editData.name);
      this.activityForm.controls['url'].setValue(this.editData.url);
      this.activityForm.controls['description'].setValue(this.editData.description);
      this.activityForm.controls['active'].setValue(this.editData.active);
    }
  }

  addActivity() {
    if(!this.editData) {
      if(this.activityForm.valid) {
        alert(JSON.stringify(this.activityForm.value))
        this.activityService.postActivity(this.activityForm.value)
        .subscribe({
          next: (res)=> {
            this.toastr.success("Activity Added Successfully");
            this.activityForm.reset();
            this.dialogRef.close('save')
          },
          error: ()=> {
            this.toastr.error("Error while adding the activity");
          }
        }) 
      }
    }else {
      this.updateActivity();
    }
  }

  updateActivity() {
    debugger
    this.activityService.putActivity(this.activityForm.value, this.editData.id)
    .subscribe({
      next: (res)=> {
        this.toastr.success("Activity Updated Successfully");
        this.activityForm.reset();
        this.dialogRef.close('update');
      },
      error:()=> {
        this.toastr.error("Error while updating the record");
      }
    })
  }
}
