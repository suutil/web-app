//import { CustomersDashboardResolver } from './customers-dashboard.resolver';
import { DesignerDashboardComponent } from './designer-dashboard.component';
import { AuthenticationGuard } from '../shared/authentication.guard';
import { RouterModule } from '@angular/router'
import { NgModule } from '@angular/core'



@NgModule({
    providers: [
        AuthenticationGuard,
  //      DesignerDashboardResolver
    ],
    imports: [
        RouterModule.forChild([
            {
                path: 'designer-dashboard', component: DesignerDashboardComponent, canActivate: [AuthenticationGuard],
                //data: { accessList: ['admin', 'manager'] },
                //resolve: {
                //    tableData: CustomersDashboardResolver
                //}

            }
        ])
    ],
    exports: [
        RouterModule
    ]
})

export class DesignerDashboardRouterModule { }
