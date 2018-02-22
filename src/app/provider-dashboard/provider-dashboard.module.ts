import { ProviderDashboardRouterModule } from './provider-dashboard-router.module';
import { ProviderDashboardComponent } from './provider-dashboard.component';
import { MyShopComponent } from './my-shop.component';
import { ProviderComponent } from './provider.component';
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { UIModule } from '../ui/ui.module'
import { SharedModule } from 'app/shared/shared.module'
import { SetCategoryModal } from './components/set-category-modal.component'


@NgModule({
    declarations: [
        ProviderDashboardComponent,
        ProviderComponent,
        MyShopComponent,
        SetCategoryModal
    ],
    providers: [],
    entryComponents: [ SetCategoryModal],
    imports: [
        CommonModule,
        SharedModule,
        ProviderDashboardRouterModule,
        UIModule
    ],
    exports: [
    ]
})

export class ProviderDashboardModule { }
