import { Injectable } from '@angular/core'

import { FeathersDataResourceService } from './api/data-resoucers-feathers.service'

import { APIService } from './api/api.service'

@Injectable()
export class DocumentationService {

    documentationBlob

    constructor(private feathersDataResourceService: FeathersDataResourceService, private apiService: APIService) {
        this.documentationBlob = this.apiService.getService('documentation-blob')
    }

    getDataResources(customQuery) {
        return this.feathersDataResourceService.get('documentation', customQuery)
    }

    uploadFile(to: Array<String>, title, uri) {
        return this.documentationBlob.create({
            to,
            title,
            uri
        });
    }

}