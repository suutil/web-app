import { FeathersDataResourceService } from './api/data-resoucers-feathers.service';
import { Injectable } from '@angular/core'


@Injectable()
export class TaxesService {

    constructor(private feathersDataResourceService: FeathersDataResourceService) { }

    getDataResources() {
        return this.feathersDataResourceService.get('taxes')
    }
}