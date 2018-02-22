import { ToastsManager } from 'ng2-toastr';
import { UsersService } from '../../../shared/services/api/users.service';
import { Component } from '@angular/core';

@Component({
    selector: 'change-password-form',
    templateUrl: './change-password-form.html'
})
export class ChangePasswordFormComponent {
    currentPassword
    newPassword
    repeatNewPassword

    constructor(private usersService: UsersService, private toastsManager: ToastsManager) { }

    onSubmit() {
        if (this.newPassword === this.repeatNewPassword) {
            this.usersService.changePassword(this.currentPassword, this.newPassword)
                .then(_ => this.toastsManager.success('Contraseña cambiada correctamente'))
                .catch()
        }
    }
}
