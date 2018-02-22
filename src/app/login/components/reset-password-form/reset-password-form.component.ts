import { ToastsManager } from 'ng2-toastr';
import { SetPasswordService } from '../../../shared/services/set-password.service';
import { Router } from '@angular/router';
import { Component } from '@angular/core';


@Component({
    selector: 'reset-password-form',
    templateUrl: './reset-password-form.html'
})

export class ResetPasswordFormComponent {
    email: string

    constructor(private setPasswordService: SetPasswordService,
        private toastManager: ToastsManager) { }

    onSubmit() {
        this.setPasswordService.resetMail(this.email)
            .catch(_ => { })
            .then(_ => {
                this.toastManager.success('Email enviado')
            })
    }

    checkDirty(form, field) {
        return (form.controls[field] && form.controls[field].dirty)
    }
}
