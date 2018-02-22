import { PassThrough } from 'stream'
import { Injectable } from '@angular/core'


import { AppConfigService } from 'app/core/services/app-config.service'
import { AuthenticationService } from 'app/shared/authentication.service'

const feathers = require('feathers/client')
const socketio = require('feathers-socketio/client')
const io = require('socket.io-client')
const hooks = require('feathers-hooks')
const rest = require('feathers-rest/client')
const authentication = require('feathers-authentication/client')
const superagent = require('superagent')

@Injectable()
export class APIService {
  private _url: string
  private _app: any

  constructor(private appConfigService: AppConfigService,
    private authenticationService: AuthenticationService) {
    this._url = appConfigService.appConfig['server']

    this._setupSuperAgentErrorHandler()

    this._app = feathers()
      .configure(rest(this._url).superagent(superagent))
      .configure(authentication({ storage: window.localStorage, storageKey: 'suutil-jwt' }))
      .configure(hooks())

    this.setToken(window.localStorage['suutil-jwt'])
  }

  private _setupSuperAgentErrorHandler() {
    const end = superagent.Request.prototype.end;
    const refreshToken = this.refreshToken.bind(this)
    //const toastManager = this.toastManager

    superagent.Request.prototype.end = function (callback) {
      return end.call(this, (error, response) => {
        if ((response && response.unauthorized) &&
          (!response.body.data || response.body.data && !response.body.data.validToken) &&
          !response.req.url.endsWith('authentication')) {
          refreshToken()
            .then(refresh => {
              response.req.header.Authorization = refresh.accessToken
              response.req.send(response.req._data)
                .end((error, response) => callback(error, response))
            })
            .catch(_ => {
              callback(error, response);
            })
        } else {
          if (error && !error.status) {
            let errorDescription ='server-communication-missing'
            // toastManager.error(errorDescription)
          }
          callback(error, response);
        }
      });
    };
  }

  get url(): string {
    return this._url
  }

  get app(): any {
    return this._app
  }

  refreshToken() {
    this.setToken(localStorage.getItem('suutil-refresh'))
    return this._app.authenticate({
      strategy: 'jwt'
    })
      .then(response => {
        this._app.set('accessToken', response.accessToken)
        localStorage.setItem('suutil-jwt', response.accessToken);
        localStorage.setItem('suutil-refresh', response.refreshToken);
        return response
      }).catch(error => {
        this.authenticationService.setLogged(false)
        throw (error)
      })
  }

  authenticate(strategy: string, email: string, password: string): any {
    return this._app.authenticate({
      strategy,
      email,
      password
    })
      .then(response => {
        localStorage.setItem('suutil-refresh', response.refreshToken);
        localStorage.setItem('userId', response.userId);
      })

  }

  getUserId() {
    return localStorage.getItem('userId');
  }

  getUser() {
    var storedValue = localStorage.getItem('user')
    if (storedValue) {
      return JSON.parse(storedValue)
    } else {
      return undefined
    }
  }

  getService(serviceName: string) {
    return this._app.service(serviceName);
  }

  setToken(token: string) {
    this._app.set('accessToken', token)
  }




}
