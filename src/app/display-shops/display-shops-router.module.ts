import { DisplayShopsComponent } from './display-shops.component';
import { FavoriteShopsComponent } from './favorite-shops.component';
import { DisplayComponent } from './display.component';
import { AuthenticationGuard } from '../shared/authentication.guard';
import { RouterModule } from '@angular/router'
import { NgModule } from '@angular/core'
import { ShopComponent } from 'app/ui/molecules/shop/shop.component';
import { ShopResolver } from './shop.resolver'
import { ShopsResolver } from './shops.resolver'
import { AllShopsResolver } from './all-shops.resolver'
import { FavoriteShopsResolver } from './favorite-shops.resolver'
import { CategoriesResolver } from './categories.resolver'
import { ShopsByCategoryResolver } from './shops-by-category.resolver'
import { ShopsByCountryResolver } from './shops-by-country.resolver'
import { ShopsByTagResolver } from './shops-by-tag.resolver'
import { NewShopsResolver } from './new-shops.resolver'
import { TagsResolver } from './tags.resolver'
import { LikedShopsResolver } from './liked-shops.resolver'


@NgModule({
    providers: [
        AuthenticationGuard,
        ShopResolver,
        ShopsResolver,
        FavoriteShopsResolver,
        CategoriesResolver,
        ShopsByCategoryResolver,
        ShopsByCountryResolver,
        AllShopsResolver,
        ShopsByTagResolver,
        NewShopsResolver,
        TagsResolver,
        LikedShopsResolver
    ],
    imports: [
        RouterModule.forChild([
            {
                path: 'shops', component: DisplayComponent, canActivate: [AuthenticationGuard],
                //data: { accessList: ['admin', 'manager'] },
                resolve: {

                    categories: CategoriesResolver,
                    tags: TagsResolver
                }


            ,
            children: [
              {
              path: '', component: DisplayShopsComponent, canActivate: [AuthenticationGuard],
              //data: { accessList: ['admin', 'manager'] },
              resolve: {
                  shops: ShopsResolver
              }

          },
          {
          path: 'all', component: DisplayShopsComponent, canActivate: [AuthenticationGuard],
          data: { accessList: ['admin'] },
          resolve: {
              shops: AllShopsResolver
          }

      },
              {
                  path: 'new', component: DisplayShopsComponent, canActivate: [AuthenticationGuard],
                  //data: { accessList: ['admin', 'manager'] },
                  resolve: {
                      shops: NewShopsResolver
                  }

              },
              {
                  path: 'favorites', component: FavoriteShopsComponent, canActivate: [AuthenticationGuard],
                  data: { accessList: ['designer'] },
                  resolve: {
                      shops: FavoriteShopsResolver,
                  }

              },
              {
                  path: 'category/:category', component: DisplayShopsComponent, canActivate: [AuthenticationGuard],
                  data: { accessList: ['designer', 'admin','provider'] },
                  resolve: {
                      shops: ShopsByCategoryResolver
                  }

              },
              {
                  path: 'most-liked', component: DisplayShopsComponent, canActivate: [AuthenticationGuard],
                  data: { accessList: ['designer', 'admin','provider'] },
                  resolve: {
                      shops: LikedShopsResolver
                  }

              },
              {
                  path: 'country/:country', component: DisplayShopsComponent, canActivate: [AuthenticationGuard],
                  data: { accessList: ['designer', 'admin','provider'] },
                  resolve: {
                      shops: ShopsByCountryResolver
                  }

              },
              {
                  path: 'tag/:tag', component: DisplayShopsComponent, canActivate: [AuthenticationGuard],
                  data: { accessList: ['designer', 'admin','provider'] },
                  resolve: {
                      shops: ShopsByTagResolver
                  }

              },

              {
                  path: 'id/:id', component: ShopComponent, canActivate: [],
                  resolve: {
                      shopData: ShopResolver,
                      tags: TagsResolver,
                      categories: CategoriesResolver
                  }
              }
            ]
          }
        ])
    ],
    exports: [
        RouterModule
    ]
})

export class DisplayShopsRouterModule { }
