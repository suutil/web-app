import { Injectable } from '@angular/core'
import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from '@angular/router'

import { ContentService } from 'app/shared/services/content.service'


@Injectable()
export class BlogResolver implements Resolve<Object> {
    constructor(
        private contentService: ContentService,
    ) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.contentService.getPosts()
    }
}
