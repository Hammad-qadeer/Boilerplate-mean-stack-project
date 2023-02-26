import { Component, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import {ThemePalette} from '@angular/material/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RolesService } from '../_services/roles.service';
import { UsersService } from '../_services/users.service';

@Component({
  selector: 'app-create-user-modal-dialog',
  templateUrl: './create-user-modal-dialog.component.html',
  styleUrls: ['./create-user-modal-dialog.component.scss']
})
export class CreateUserModalDialogComponent {

  hide = true;
  confirmPassword = true;

  roles: any;
  userForm: any;
  actionBtn : string = "Save";

  constructor(private userService: UsersService, private formBuilder: FormBuilder, private roleService : RolesService,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private dialogRef : MatDialogRef<CreateUserModalDialogComponent>
    ) {}

  ngOnInit() : void {
    this.userForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.required]],
      password: [''],
      active: [false],
      roleId: ['']
    });

    if(this.editData){
      this.actionBtn = "Update"
      this.userForm.controls['username'].setValue(this.editData.username);
      this.userForm.controls['email'].setValue(this.editData.email);
      this.userForm.controls['password'].setValue(this.editData.passwordHash);
      this.userForm.controls['active'].setValue(this.editData.active);
      this.userForm.controls['roleId'].setValue(this.editData.roleId);
    }
    this.getRoles();
  }

  getRoles() {
    this.roleService.getRoles().subscribe({
      next: (res: any)=> {
        console.log(res)
        this.roles = res.roles;
        console.log(this.roles)
      },
      error: (err)=> {
        alert("Error while fetching the records")
      }
    })
  }

  addUser() {
    if(!this.editData) {
      if(this.userForm.valid) {
        alert(JSON.stringify(this.userForm.value))
        this.userService.postUser(this.userForm.value)
        .subscribe({
          next: (res)=> {
            alert("Employee added Successfully");
            this.userForm.reset();
            this.dialogRef.close('save')
          },
          error: ()=> {
            alert("Error while adding the employee")
          }
        }) 
      }
    }else {
      this.updateUser();
    }
  }

  updateUser() {
    debugger
    this.userService.putUser(this.userForm.value, this.editData.userId)
    .subscribe({
      next: (res)=> {
        this.userForm.reset();
        this.dialogRef.close('update');
      },
      error:()=> {
        alert("Error while updating the record")
      }
    })
  }
}
