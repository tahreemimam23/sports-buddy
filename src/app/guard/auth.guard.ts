import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, GuardResult, MaybeAsync, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private service: AuthService, private router: Router) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<GuardResult> {
    if (this.service.isLoggedIn()) {
      if (route.url.length > 0) {
        let urlPath = route.url[0].path;
        if (urlPath == 'user' && this.service.getUserRole() == 'admin') {
          this.router.navigate(['']);
          return false;
        } else if (urlPath == 'admin' && this.service.getUserRole() == 'user') {
          this.router.navigate(['']);
          return false;
        } else {
          return true;
        }
      } else {
        return true;
      }
    } else {
      this.router.navigate(['login']);
      return false;
    }
  }

}
