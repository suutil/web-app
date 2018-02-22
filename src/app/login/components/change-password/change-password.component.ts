import { ToastsManager } from 'ng2-toastr';
import { SetPasswordService } from '../../../shared/services/set-password.service';
import { Router } from '@angular/router';
import { Component } from '@angular/core';


@Component({
  selector: 'change-password',
  templateUrl: './change-password.html'
})

export class ChangePasswordComponent {
  password: string
  passwordRepeat: string


  constructor(private router: Router,
    private setPasswordService: SetPasswordService,
    private toastManager: ToastsManager) { }

  ngOnInit() {
  }

  onSubmit() {
    if(this.password)
    this.setPasswordService.change({
      password: this.password
    })
      .then(_ => {
        this.toastManager.success('Contraseña actualizada con éxito')
      })
      .catch(error => {
        if (error && error.code === 401) {
          this.toastManager.error('Algo ha ido mal, vuelva a intentarlo')
        } else {
          this.toastManager.error('No se pudo cambiar la contraseña, vuelva a intentarlo')
        }
      })
  }

  checkDirty(form, field) {
    return (form.controls[field] && form.controls[field].dirty)
  }
}
