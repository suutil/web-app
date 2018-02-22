import { userInfo } from 'os';
import { Injectable } from '@angular/core'

import { APIService } from './api/api.service'
const moment = require('moment-timezone')


@Injectable()
export class InfoService {

    private infoService: any;
    private promiseContabiltyInfo = undefined
    private promiseWorkerInfo = undefined

    constructor(private apiService: APIService) {
        this.infoService = this.apiService.getService('company-info')
    }

    getInfo(type) {
        if (type === 'contability' && this.promiseContabiltyInfo) {
            return this.promiseContabiltyInfo
        }

        if (type === 'worker' && this.promiseWorkerInfo) {
            return this.promiseWorkerInfo
        }

        let userId = this.apiService.getUserId()

        let params = {
            query: {
                userId
            },
        }

        let companyInfo = this._getStoredInfo(this._buildKey(userId, type))
        let companyInfoSaved = this._getStoredInfo(this._buildKey(userId) + '-saved')

        if (companyInfo && companyInfoSaved && moment().utc().startOf('day').valueOf() === companyInfoSaved.date) {
            if (type === 'contability') {
                this.promiseContabiltyInfo = Promise.resolve(companyInfo)
            }
            else if (type === 'worker') {
                this.promiseWorkerInfo = Promise.resolve(companyInfo)
            }

        }
        else {

            if (type === 'contability') {
                this.promiseContabiltyInfo = this.infoService.find(params)
                    .then(info => {
                        this._storeInfo(this._buildKey(userId, 'contability'), info.contability)
                        this._storeInfo(this._buildKey(userId, 'worker'), info.worker)
                        this._storeInfo(this._buildKey(userId) + '-saved', { date: moment().utc().startOf('day').valueOf() })
                        return info['contability']
                    })
            }
            else if (type === 'worker') {
                this.promiseWorkerInfo = this.infoService.find(params)
                    .then(info => {
                        this._storeInfo(this._buildKey(userId, 'contability'), info.contability)
                        this._storeInfo(this._buildKey(userId, 'worker'), info.worker)
                        this._storeInfo(this._buildKey(userId) + '-saved', { date: moment().utc().startOf('day').valueOf() })
                        return info['worker']
                    })
            }

        }

        if (type === 'contability') {
            return this.promiseContabiltyInfo
                .then(info => {
                    this.promiseContabiltyInfo = undefined
                    return info
                })
        }
        else if (type === 'worker') {
            return this.promiseWorkerInfo
                .then(info => {
                    this.promiseWorkerInfo = undefined
                    return info
                })
        }

    }

    _buildKey(userId, type?) {
        if (type) {
            return userId + '-' + type + '-companyInfo'
        }
        else {
            return userId + '-companyInfo'
        }
    }

    _storeInfo(key, info) {
        localStorage.setItem(key, JSON.stringify(info));
    }

    _getStoredInfo(key) {
        var storedValue = localStorage.getItem(key)
        if (storedValue) {
            return JSON.parse(storedValue)
        } else {
            return undefined
        }
    }
}