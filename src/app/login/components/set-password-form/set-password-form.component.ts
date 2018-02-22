import { ToastsManager } from 'ng2-toastr';
import { SetPasswordService } from '../../../shared/services/set-password.service';
import { Router } from '@angular/router';
import { Component } from '@angular/core';


@Component({
  selector: 'set-password-form',
  templateUrl: './set-password-form.html'
})

export class SetPasswordFormComponent {
  password: string
  passwordRepeat: string
  token: string

  constructor(private router: Router,
    private setPasswordService: SetPasswordService,
    private toastManager: ToastsManager) { }

  ngOnInit() {
    this.router.routerState.root.queryParams.subscribe(queryParams => this.token = queryParams['token'])
  }

  onSubmit() {
    this.setPasswordService.reset({
      password: this.password,
      token: this.token
    })
      .then(_ => {
        this.toastManager.success('Contraseña actualizada con éxito')
        this.router.navigate(['/login'])
      })
      .catch(error => {
        if (error && error.code === 401) {
          this.toastManager.error('El enlace ha expirado, vuelva a crear otro')
        } else {
          this.toastManager.error('No se pudo cambiar la contraseña, vuelva a intentarlo')
        }
      })
  }

  checkDirty(form, field) {
    return (form.controls[field] && form.controls[field].dirty)
  }
}
