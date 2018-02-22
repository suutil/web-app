import { AdminDashboardRouterModule } from './admin-dashboard-router.module';
import { AdminDashboardComponent } from './admin-dashboard.component';
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { UIModule } from '../ui/ui.module'
import { SharedModule } from 'app/shared/shared.module'
import { CategoryManagementModule } from 'app/category-management/category-management.module'
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { BootstrapSwitchModule } from 'angular2-bootstrap-switch';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SwitchComponent } from './components/switch.component'
import { EditUserModal } from './components/edit-user-modal.component';
import { EditShopModal } from './components/edit-shop-modal.component';


@NgModule({
    declarations: [
        AdminDashboardComponent,
        SwitchComponent,
        EditUserModal,
        EditShopModal
    ],
    entryComponents: [
        EditUserModal,
        EditShopModal
    ],
    providers: [],
    imports: [
        CommonModule,
        SharedModule,
        AdminDashboardRouterModule,
        UIModule,
        Ng2SmartTableModule,
        BootstrapSwitchModule.forRoot(),
        BrowserAnimationsModule,
        CategoryManagementModule
    ],
    exports: [
    ]
})

export class AdminDashboardModule { }
