import { Injectable } from '@angular/core'



@Injectable()
export class DataMockService {

    constructor() { }

    find(params) {
        let page = params.query.$skip / params.query.$limit
        let result = {
            data: this._generateDataMock(page),
            total: 50
        }

        return Promise.resolve(result)
    }

    _generateDataMock(page) {
        let pageSize = 10
        let data = []
        for (let i = (page * pageSize); i < (page + 1) * pageSize; i++) {
            data.push(this._getItemData(i + 1))
        }

        return data

    }

    _getItemData(index) {
        return {
            firstName: 'firstName-' + index,
            lastName: 'lastName-' + index,
            company: 'company-' + index,
            email: 'email-' + index,
            period: 'periodo ' + index,
            tax: 'tax ' + index,
            date: 'date-' + index,
            customer: 'customer-' + index,
            documentName: 'documentName-' + index,
            alertType: 'alertType-' + index,
            detail: 'detail-' + index
        }
    }

}
