import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { StorageService } from '../_services/storage.service';
import { AuthService } from '../_services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
  user: any;

  constructor(private breakpointObserver: BreakpointObserver, 
    private storageService: StorageService, private authService: AuthService,
    private router: Router) {
    this.user = this.storageService.getUser();
  }

  logout(): void {
    this.authService.logout().subscribe({
      next: res => {
        this.storageService.clean();
        this.router.navigate(['/login'])
      },
      error: err => {
        console.log(err);
      }
    });
  }

}
