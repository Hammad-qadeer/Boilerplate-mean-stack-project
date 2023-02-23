import { Component, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RolesService } from '../_services/roles.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-role-modal-dialog',
  templateUrl: './create-role-modal-dialog.component.html',
  styleUrls: ['./create-role-modal-dialog.component.scss']
})
export class CreateRoleModalDialogComponent {
  roleForm: any;
  actionBtn : string = "Save";

  constructor(private roleService: RolesService, private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private dialogRef : MatDialogRef<CreateRoleModalDialogComponent>,
    private toastr: ToastrService
    ) {}
    

    ngOnInit() : void {
      this.roleForm = this.formBuilder.group({
        name: ['', [Validators.required]],
      });

      if(this.editData){
        this.actionBtn = "Update"
        this.roleForm.controls['name'].setValue(this.editData.name);
      }
    }

    addRole() {
      if(!this.editData) {
        if(this.roleForm.valid) {
          this.roleService.postRole(this.roleForm.value)
          .subscribe({
            next: (res)=> {
              this.toastr.success("Role added Successfully");
              this.roleForm.reset();
              this.dialogRef.close('save')
            },
            error: ()=> {
              this.toastr.error("Error while updating the record");
            }
          }) 
        }
      }else {
        this.updateRole();
      }
    }

    updateRole() {
      debugger
      this.roleService.putRole(this.roleForm.value, this.editData.id)
      .subscribe({
        next: (res)=> {
          this.roleForm.reset();
          this.dialogRef.close('update');
        },
        error:()=> {
          alert("Error while updating the record")
        }
      })
    }

}
