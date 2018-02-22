import { UsersService } from 'app/shared/services/api/users.service';
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class ProviderDashboardResolver implements Resolve<any> {
  constructor(private usersService: UsersService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<any> {
    return this.usersService.getMeASync();
  }
}
