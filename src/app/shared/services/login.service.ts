import { Injectable } from '@angular/core'
import { Router } from '@angular/router';
import { UsersService } from 'app/shared/services/api/users.service'
import { AuthenticationService } from 'app/shared/authentication.service'
import { Credential } from 'app/shared/credential.model'
import { User } from 'app/shared/user.model'
import { UiModalService } from 'app/ui-modal/ui-modal.service';
import { APIService } from './api/api.service';
import { ConfirmationService } from 'app/shared/services/confirmation.service';



@Injectable()
export class LoginService {
  private confirmationMailService: any


    constructor(private apiService: APIService,
        private usersService: UsersService,
        private authenticationService: AuthenticationService,
        private confirmationService: ConfirmationService,
        private router: Router,
        private modalService: UiModalService) {
        this.confirmationMailService = this.apiService.getService('confirmation-mail')
    }

    login(user: string, password: string, disabledRouteAutoRedirect?: boolean) {
        let credential = new Credential(user, password)
        return this.usersService.login(credential)
            .then(_ => {
                this.authenticationService.setCredential(credential)
                this.authenticationService.setLogged(true)
                //if (!disabledRouteAutoRedirect) {
                    let user = this.usersService.getMeSync()
                    if (user.rol === 'designer') {
                        this.router.navigate(['/shops'])
                    } else if (user.rol === 'provider') {
                        this.router.navigate(['/my-shop'])
                    }
                    else if (user.rol === 'admin') {
                        this.router.navigate(['/admin-dashboard'])
                    }

                //}
                return _
            })
    }

    signup(firstName: string, lastName: string, email: string,  rol: string, password: string) {
        let newUser = new User(firstName, lastName, email, rol, password)
        return this.usersService.signup(newUser)
            .then(user =>
              this.confirmationService.sendConfirmationMail(user.email)
              .then( res => {
                console.log(res)
              })
            )
            .catch(_ => {
                console.log(_)
            })
    }

    signupProvider(firstName: string, lastName: string, email: string,  rol: string, company: string, applicationUrl: string) {
        let newUser = {
          firstName,
           lastName,
           email,
           rol,
           company,
           applicationUrl
         }
        return this.usersService.signupProvider(newUser)
            .then(user =>
              console.log(user)
              //this.confirmationService.sendConfirmationMail(user.email)
            )
            .catch(_ => {
                console.error('error')
            })
    }

    activateProvider(id, password){
      return this.usersService.patch(id, { password })
      .catch((error)=>{return error})
    }

    logout() {
        this.authenticationService.setLogged(false)
        localStorage.clear()
        this.router.navigate([''])
    }

    confirmMail(email){
    this.confirmationMailService.create({email})
    }

}
