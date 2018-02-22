import { Injectable } from '@angular/core'
import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from '@angular/router'

import { ShopService } from 'app/shared/services/shop.service'


@Injectable()
export class CategoriesResolver implements Resolve<Object> {
    constructor(
        private shopService: ShopService,
    ) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.shopService.getAllCategories()
    }
}
