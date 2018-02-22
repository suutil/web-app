import { ChangePasswordFormComponent } from './components/change-password/change-password-form.component';
import { EditProfileFormComponent } from './components/edit-profile/edit-profile-form.component';
import { UserProfileRouterModule } from './user-profile-router.module';
import { UserProfileComponent } from './user-profile.component';
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { SharedModule } from 'app/shared/shared.module'
import { UIModule } from '../ui/ui.module';

@NgModule({
    declarations: [
        UserProfileComponent,
        ChangePasswordFormComponent,
        EditProfileFormComponent
    ],
    providers: [],
    imports: [
        CommonModule,
        SharedModule,
        UserProfileRouterModule,
        UIModule
    ],
    exports: [
    ]
})

export class UserProfileModule { }
