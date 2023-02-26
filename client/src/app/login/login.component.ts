import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../_services/auth.service';
import { StorageService } from '../_services/storage.service';
import { ThemePalette } from '@angular/material/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  constructor(private authService: AuthService, private storageService: StorageService, 
    private router : Router, private toastr: ToastrService) {}

  loginForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  });
  disabled = false;
  isLoggedIn = false;
  userData: any;
  hide = true;

  ngOnInit(): void {
    if (this.storageService.isLoggedIn()) {
      this.isLoggedIn = true;
      this.router.navigate(['management/user'])
    }
  }

  onSubmit(): void {
    debugger
    this.disabled = true;
    const { username, password } = this.loginForm.value;

    this.authService.login(username!, password!).subscribe({
      next: data => {
        this.userData = data;
        if(this.userData.isActive) {
        this.storageService.saveUser(data);
        this.router.navigate(['management/user']);
        // this.reloadPage();
        }else {
          this.toastr.error('Please contact admin', 'In Active User');
        }
      },
      error: err => {
        this.toastr.error('Invalid Credentials');
      }
    });
  }

  
}
