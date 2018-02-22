import { DataMockService } from './data-mock.service';
import { Subject } from 'rxjs/Rx';
import { APIService } from './api.service';
import { Injectable } from '@angular/core'

import { Observable, BehaviorSubject } from 'rxjs'

import { DataResource } from 'app/shared/data-resources.interface'

class DataResourceImplementation implements DataResource {
    private loadDataObservable: Subject<Object> = new Subject()

    constructor(private dataService: any, private customQuery?: Object) {
    }

    loadData(page?: number, pageSize?: number, sortField?: string, sortAsc?: boolean, search?: string): any {
        let query = Object.assign({}, this.customQuery)

        query['$skip'] = page * pageSize
        query['$limit'] = pageSize

        if (search) {
            query['$or'] = [
                { name: { $search: search } },
                { firstName: { $search: search } },
                { lastName: { $search: search } },
                { email: { $search: search } },
                { customers: { $eq: search } }
            ]
        }
        if (sortField) {
            query['$sort'] = {}
            if (sortAsc) {
                query['$sort'][sortField] = 1
            } else {
                query['$sort'][sortField] = -1
            }
        }
        this.dataService.find({
            query
        })
            .then(result => {
                console.debug('DataResourceImplementation.loadData: ', result)
                this.loadDataObservable.next({
                    data: result.data,
                    count: result.total
                })
            })
            .catch(error => {
                console.error('Error get events!', error)
                this.loadDataObservable.error(error)
                this.loadDataObservable = new Subject()
            })

        return this.loadDataObservable
    }

    get(id: string): Promise<Object> {
        return this.dataService.get(id)
            .then(result => {
                console.debug('DataResourceImplementation.get id', result)
                return result
            })
            .catch(error => {
                console.error('Error get events!', error)
                throw error
            })
    }
}

@Injectable()
export class FeathersDataResourceService {

    constructor(private apiService: APIService, private dataMockService: DataMockService) {
    }

    get(name, customQuery?) {
        //TODO
        if (['users', 'alerts', 'documentation'].indexOf(name) != -1) {
            return new DataResourceImplementation(this.apiService.getService(name), customQuery)
        }

        return new DataResourceImplementation(this.dataMockService, customQuery)
    }

}
