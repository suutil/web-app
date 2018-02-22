import { Router } from '@angular/router'
import { Injectable } from '@angular/core'

import { Credential } from 'app/shared/credential.model'

import { BehaviorSubject } from 'rxjs'

import { PersistentBehaviorSubject } from 'app/shared/persistence.service'


@Injectable()
export class AuthenticationService {
    @PersistentBehaviorSubject(false) private _logged: BehaviorSubject<boolean>
    private credential: Credential

    constructor(private router: Router) {
    }

    isLogged(callback?) {
        if (callback) {
            return this._logged.asObservable().subscribe(callback)
        } else {
            return this._logged.getValue()
        }
    }

    setLogged(logged: boolean) {
        this._logged.next(logged)
        if (logged === false) {
            this.router.navigate(['login'])
        }
    }

    setCredential(credential: Credential) {
        this.credential = credential;
    }

    getCredential() {
        return this.credential;
    }

}
