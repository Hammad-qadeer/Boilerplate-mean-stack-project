import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { StorageService } from '../_services/storage.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuardGuard implements CanActivate {
  
  constructor(private storageService: StorageService, private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const activityURLS = this.storageService.getUser().activities.map((activity: any) => activity.url);
    const isAuthorized = activityURLS.includes(state.url);
    if (isAuthorized) {
      return true;
    } else {
      // Redirect to "not found" page
      this.router.navigate(['not-found']);
    }
    return false
  }
  }
  
