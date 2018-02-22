import { Component, Input } from '@angular/core';
import { ToastsManager } from 'ng2-toastr'
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginService } from 'app/shared/services/login.service'
@Component({
  selector: 'designer-signup-form',
  templateUrl: './designer-signup-form.html'
})
export class DesignerSignupFormComponent {
  @Input() disabledRouteAutoRedirect
  email: string
  password: string
  rol: string = "designer"
  name: string
  lastName: string
  acceptConditions: boolean = false
  isLoading: boolean = false

  constructor(
    private loginService: LoginService,
    private toastManager: ToastsManager,
    public activeModal: NgbActiveModal) {}
  onSubmit() {
    if(this.acceptConditions && this.password.length > 5 && this.password.length < 11){
    this.isLoading = true
    this.loginService.signup(this.name, this.lastName, this.email, this.rol, this.password)
      .then(_=> {
          this.activeModal.close()
          this.toastManager.success('Te has registrado con exito! Solo tienes que confirmar tu dirección de correo electrónico para entrar en SUUTIL')
      })
      .catch(_ => {

        this.toastManager.error('Registro invalido')
      });
    }
    else {
      if(!this.acceptConditions){
      this.toastManager.error('Tienes que aceptar las condiciones para registrarte')
    }
    if (this.password.length < 6 || this.password.length > 10){
      this.toastManager.error('Tu contraseña debe tener entre 6 y 10 caracteres')
    }
    }
  }

  closeModal(){
    this.activeModal.close()
  }

}
