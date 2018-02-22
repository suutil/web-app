import { AppConfigService } from '../../../core/services/app-config.service'
import { Injectable } from '@angular/core'

import * as _ from 'lodash'
import { Credential } from 'app/shared/credential.model'
import { User } from 'app/shared/user.model'

import { APIService } from './api.service'

@Injectable()
export class UsersService {
    private userServices

    constructor(private apiService: APIService) {
        this.userServices = apiService.getService('users')
    }

    login(credential: Credential) {
        return this.apiService.authenticate('local', credential.user, credential.password)
            .then(result => {
                console.log('Authenticated!')
                return this.getMeASync()
            })
            .then(user => {
                return localStorage.setItem('user', JSON.stringify(user));
            })
            .catch(error => {
                console.error('Error authenticating!', error)
                throw error
            })
    }



    signup(user: User) {
        return this.userServices.create(user)
            .catch(error => {
                console.error(error)
                throw error
            })
    }

    signupProvider(user: any) {
        return this.userServices.create(user)
            .catch(error => {
                console.error(error)
                throw error
            })
    }

    changePassword(currentPassword: string, newPassword: string) {
        var passwordCredentials = {
            currentPassword,
            password: newPassword
        }
        return this.patchMe(passwordCredentials)
    }

    getMeSync() {
        return JSON.parse(localStorage.getItem('user'))
    }

    getMeASync() {
        return this.userServices.get(this.apiService.getUserId())
    }

    get(id){
        return this.userServices.get(id)
    }

    patch(id: string, data: Object) {
        return this.userServices.patch(id, data)
        .catch(error => {
            console.error(error)
            throw error
        })
    }

    patchMe(data: Object) {
        return this.patch(this.apiService.getUserId(), data)
    }

    remove(id: string, data?: Object) {
        return this.userServices.remove(id, data)
    }

    removeMe(data?: Object) {
        return this.remove(this.apiService.getUserId(), data)
    }

    agreeCookie(){
      return localStorage.setItem('cookie-agreed', 'true');
    }

    isCookieAgreed(){
      let cookieStatus
      if(localStorage.getItem('cookie-agreed')){
        cookieStatus = true
      }
      else {
        cookieStatus = false
      }
      return cookieStatus
    }
}
