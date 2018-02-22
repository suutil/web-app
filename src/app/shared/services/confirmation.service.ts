import { Injectable } from '@angular/core'
import { Router } from '@angular/router';
import { ToastsManager } from 'ng2-toastr';

import { UsersService } from 'app/shared/services/api/users.service'
import { AuthenticationService } from 'app/shared/authentication.service'
import { Credential } from 'app/shared/credential.model'
import { User } from 'app/shared/user.model'
import { UiModalService } from 'app/ui-modal/ui-modal.service';
import { APIService } from './api/api.service';



@Injectable()
export class ConfirmationService {
  private confirmationMailService: any
  private confirmationService: any

    constructor(private apiService: APIService,
        private usersService: UsersService,
        private authenticationService: AuthenticationService,
        private router: Router,
        private modalService: UiModalService,
        private toastManager: ToastsManager) {
        this.confirmationMailService = this.apiService.getService('confirmation-mail')
        this.confirmationService = this.apiService.getService('confirmation')
    }

    sendConfirmationMail(email){
    return this.confirmationMailService.create({email})
    .then(_ => {
    })
    }

    activateUser(token){
      this.apiService.setToken(token)
      this.confirmationService.create({ activated: true})

      .then(user => {
        localStorage.setItem('user', JSON.stringify(user));
        this.toastManager.success('Has confirmado tu mail con éxito')
        this.router.navigate(['/shops'])
      })
      .catch(error => {
        if (error && error.code === 401) {
          this.toastManager.error('El enlace ha expirado, vuelva a crear otro')
        } else {
          this.toastManager.error('Algo ha ido mal, vuelva a intentarlo')
        }
      })
    }

}
