import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ListingGuard implements CanActivate {

  userToken: any;

  constructor(
    private _router: Router,
    private _jwtHelperSvc: JwtHelperService,
  ) { }

  canActivate(route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    const token = localStorage.getItem('token');

    if (token == undefined) {
      this._router.navigate(['/auth/signin']);
      return false;
    }

    if (token) {
      this.userToken = this._jwtHelperSvc.decodeToken(token);

      // Si no es propietario
      if (!this.userToken.roles.includes(2)) {
        this._router.navigate(['/account']);
        return false;
      }
    }

    return true;
  }

}
