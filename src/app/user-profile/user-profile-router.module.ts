import { UserProfileComponent } from './user-profile.component';
import { AuthenticationGuard } from '../shared/authentication.guard';
import { RouterModule } from '@angular/router'
import { NgModule } from '@angular/core'



@NgModule({
    providers: [
        AuthenticationGuard
    ],
    imports: [
        RouterModule.forChild([
            { path: 'profile', component: UserProfileComponent, canActivate: [AuthenticationGuard] }
        ])
    ],
    exports: [
        RouterModule
    ]
})

export class UserProfileRouterModule { }
