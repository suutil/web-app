import { Component, Input, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs/Rx';
import { RequestOptions } from '@angular/http';
import { UploadPictureService } from 'app/shared/services/upload-picture.service';
import { Options, ImageResult } from "ngx-image2dataurl";
import { ToastsManager } from 'ng2-toastr'



@Component({
    selector: 'upload-form',
    templateUrl: './upload-form.html'
})
export class UploadFormComponent {
    @Input() type: string
    @Input() maxHeight: number
    @Input() maxWidth: number
    @Input() image: any
    @Input() isUploaded: boolean
    @Input() userId: string
    @Input() id: string
    @Input() collection: string
    placeholder : string
    resizeOptions: Options = {
      resize: {
        maxHeight: 0,
        maxWidth:  0
      },
        //resizeQuality: 0.7
    }


    constructor(private uploadPictureService: UploadPictureService,
       private toastManager: ToastsManager) {

    }

    ngOnInit(){
      this.resizeOptions.resize.maxHeight = this.maxHeight
      this.resizeOptions.resize.maxWidth = this.maxWidth
    }

    selected(imageResult: ImageResult) {
        this.placeholder = imageResult.file.name
        this.image = imageResult.resized
            && imageResult.resized.dataURL
            || imageResult.dataURL
    }

    save() {
        if (this.image) {
            return this.uploadPictureService.uploadPicture(this.image, this.type, this.id, this.collection)
            .then(r=> this.toastManager.success('Foto subida con éxito'))
            .catch(error=>  this.toastManager.error('Algo fue mal.Vuelve a intentarlo por favor!'))
        }
    }

}
