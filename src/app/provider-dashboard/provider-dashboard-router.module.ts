import { ProviderDashboardResolver } from './provider-dashboard.resolver';
import { ShopResolver } from './shop.resolver';
import { ProviderDashboardComponent } from './provider-dashboard.component';
import { ProviderComponent } from './provider.component';
import { MyShopComponent } from './my-shop.component';
import { AuthenticationGuard } from '../shared/authentication.guard';
import { RouterModule } from '@angular/router'
import { NgModule } from '@angular/core'
import { CreateShopComponent } from 'app/ui/molecules/create-shop/create-shop.component';
import { CategoriesResolver } from './categories.resolver'
import { TagsResolver } from './tags.resolver'
import { PreviewResolver } from './preview.resolver'
import { ShopComponent } from 'app/ui/molecules/shop/shop.component';


@NgModule({
    providers: [
        AuthenticationGuard,
        ProviderDashboardResolver,
        ShopResolver,
        CategoriesResolver,
        TagsResolver,
        PreviewResolver
    ],
    imports: [
        RouterModule.forChild([


            {
                path: 'my-shop', component: ProviderComponent, canActivate: [AuthenticationGuard],
                data: { accessList: ['provider', 'admin'] },
                resolve: {
                    user: ProviderDashboardResolver,
                    shop: ShopResolver,
                    categories: CategoriesResolver,
                    tags: TagsResolver
                },

                children: [{
                    path: 'edit', component: ProviderDashboardComponent, canActivate: [AuthenticationGuard],
                    data: { accessList: ['provider', 'admin'] },
                    resolve: {
                        user: ProviderDashboardResolver,
                        shop: ShopResolver,
                        categories: CategoriesResolver,
                        tags: TagsResolver
                    }
                },

                    {
                        path: '', component: ShopComponent, canActivate: [AuthenticationGuard],
                        data: { accessList: ['provider', 'admin'] },
                        resolve: {
                            user: ProviderDashboardResolver,
                            shopData: ShopResolver,
                            tags: TagsResolver,
                            categories: CategoriesResolver,
                            preview: PreviewResolver
                        }

                    }
                ]
            },

        ])
    ],
    exports: [
        RouterModule
    ]
})

export class ProviderDashboardRouterModule { }
