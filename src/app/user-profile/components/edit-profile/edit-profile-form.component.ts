import { ToastsManager } from 'ng2-toastr';
import { UsersService } from '../../../shared/services/api/users.service';
import { Component } from '@angular/core';

@Component({
    selector: 'edit-profile-form',
    templateUrl: './edit-profile-form.html'
})
export class EditProfileFormComponent {

    constructor(private usersService: UsersService, private toastsManager: ToastsManager) { }

    onSubmit() {
    }
}
