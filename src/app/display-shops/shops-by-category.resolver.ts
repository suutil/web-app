import { Injectable } from '@angular/core'
import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from '@angular/router'

import { ShopService } from 'app/shared/services/shop.service'


@Injectable()
export class ShopsByCategoryResolver implements Resolve<Object> {
    constructor(
        private shopService: ShopService,
    ) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        let categoryId= route.params['category']
        return this.shopService.getShopsByCategory(categoryId)
    }
}
