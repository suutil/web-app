import { DesignerDashboardRouterModule } from './designer-dashboard-router.module';
import { DesignerDashboardComponent } from './designer-dashboard.component';
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { UIModule } from '../ui/ui.module'
import { SharedModule } from 'app/shared/shared.module'

@NgModule({
    declarations: [
        DesignerDashboardComponent
    ],
    providers: [],
    imports: [
        CommonModule,
        SharedModule,
        DesignerDashboardRouterModule,
        UIModule
    ],
    exports: [
    ]
})

export class DesignerDashboardModule { }
