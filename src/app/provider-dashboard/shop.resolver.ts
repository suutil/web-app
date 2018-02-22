import { UsersService } from 'app/shared/services/api/users.service';
import { ShopService } from 'app/shared/services/shop.service';
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class ShopResolver implements Resolve<any> {
  constructor(private usersService: UsersService,
              private shopService: ShopService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<any> {
    return this.shopService.getShopByProvider(localStorage.getItem('userId'))
    .then(response=>{ return response[0]});
  }
}
