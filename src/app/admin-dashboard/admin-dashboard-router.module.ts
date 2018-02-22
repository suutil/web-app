import { AdminDashboardResolver } from './admin-dashboard.resolver';
import { BlogResolver } from './blog.resolver';
import { AdminDashboardComponent } from './admin-dashboard.component';
import { AuthenticationGuard } from '../shared/authentication.guard';
import { RouterModule } from '@angular/router'
import { NgModule } from '@angular/core'
import { CategoriesResolver } from './categories.resolver'



@NgModule({
    providers: [
        AuthenticationGuard,
        AdminDashboardResolver,
        BlogResolver,
        CategoriesResolver
    ],
    imports: [
        RouterModule.forChild([
            {
                path: 'admin-dashboard', component: AdminDashboardComponent, canActivate: [AuthenticationGuard],
                data: { accessList: ['admin'] },
                resolve: {
                    posts: BlogResolver,
                    categories: CategoriesResolver
                }

            }
        ])
    ],
    exports: [
        RouterModule
    ]
})

export class AdminDashboardRouterModule { }
