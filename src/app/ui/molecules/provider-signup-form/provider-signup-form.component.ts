import { Component, Input } from '@angular/core';
import { ToastsManager } from 'ng2-toastr'
import { TranslateService } from 'ng2-translate'
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginService } from 'app/shared/services/login.service'
@Component({
  selector: 'provider-signup-form',
  templateUrl: './provider-signup-form.html'
})
export class ProviderSignupFormComponent {
  firstName: string
   lastName: string
   email: string
   rol: string = "provider"
   company: string
   applicationUrl: string
   acceptConditions: boolean = false
   isLoading: boolean = false


  constructor(
    private loginService: LoginService,
    private toastManager: ToastsManager,
    public activeModal: NgbActiveModal) {
  }

  onSubmit() {
    if(this.acceptConditions){
    this.isLoading
    this.loginService.signupProvider(this.firstName, this.lastName,this.email, this.rol, this.company,this.applicationUrl)
    .then(_=> {
        this.activeModal.close()
        this.toastManager.success('Has aplicado con exito.')
    })
      .catch(_ => {

        this.toastManager.error('login.invalid-login')
      });
    }
    else {
      this.toastManager.error('Tienes que aceptar las condiciones para registrarte')
    }
  }

  closeModal(){
    this.activeModal.close()
  }

}
