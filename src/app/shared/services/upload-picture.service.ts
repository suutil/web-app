import { FeathersDataResourceService } from './api/data-resoucers-feathers.service';
import { Injectable } from '@angular/core'
import { APIService } from './api/api.service';
import { UsersService } from 'app/shared/services/api/users.service';


@Injectable()
export class UploadPictureService {
  private uploadPictureService: any

    constructor(private feathersDataResourceService: FeathersDataResourceService,
    private apiService: APIService,
        private userService: UsersService) {
      this.uploadPictureService = this.apiService.getService('picture') }


    uploadPicture(image, type, shopId, collection){
      console.log(type)
     return  this.uploadPictureService.update(shopId, { image: true, data: image, type: type, collection: collection })
    }


}
