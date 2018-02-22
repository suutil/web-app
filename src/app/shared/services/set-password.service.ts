import { Injectable } from '@angular/core'

import { APIService } from './api/api.service'

@Injectable()
export class SetPasswordService {

    private setPasswordService: any;
    private resetPasswordMail: any;

    constructor(private apiService: APIService) {
        this.setPasswordService = this.apiService.getService('set-password')
        this.resetPasswordMail = this.apiService.getService('reset-password-mail')
    }

    reset({ password, token }) {
        this.apiService.setToken(token)
        return this.setPasswordService.create({ password })
    }

    change({password}){
      return this.setPasswordService.create({ password })
    }

    resetMail(email) {
        return this.resetPasswordMail.create({ email })
    }

}
