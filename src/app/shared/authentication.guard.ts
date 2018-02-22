import { userInfo } from 'os';
import { UsersService } from './services/api/users.service';
import { Injectable } from '@angular/core';
import {
  CanActivate,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';

import { AuthenticationService } from 'app/shared/authentication.service';

@Injectable()
export class AuthenticationGuard implements CanActivate {
  constructor(private authenticationService: AuthenticationService,
    private router: Router,
    private usersService: UsersService) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (state.url === '/') {
      if (this.authenticationService.isLogged()) {
        return this._redirect()
      }
      else {
        return true
      }
    }
    else {
      if (this.authenticationService.isLogged()) {
        return this._checkAccess(next.data['accessList'])
      }
      else {
        console.log('state',state.url)
        //this.router.navigate([''])
        return false;
      }
    }
  }

  _redirect() {
    let user = this.usersService.getMeSync()
    if (user.rol === 'provider') {
      this.router.navigate(['my-shop'])
    }
    else if (user.rol === 'designer') {
      this.router.navigate(['shops'])
    }
    else if (user.rol === 'admin') {
      this.router.navigate(['admin-dashboard'])
    }
    return false
  }

  _checkAccess(accessList) {
    if (!accessList) {
      return true
    }
    else {
      let user = this.usersService.getMeSync()
      if (this._checkAccesByRol(user.rol, accessList)) {
        return true
      }
      else {
        this.router.navigate([''])
        return false;
      }

    }
  }

  _checkAccesByRol(rol, accessList) {
    return accessList.some(access => rol === access)
  }

}
