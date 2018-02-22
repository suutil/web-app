import { Component, Input, OnInit } from '@angular/core';
import { ToastsManager } from 'ng2-toastr'
import { ShopService } from 'app/shared/services/shop.service'

@Component({
  selector: 'edit-tag-modal',
  templateUrl: './edit-tag-modal.html',
})
export class EditTagModal {
@Input() tag


  constructor(private toastManager: ToastsManager,
              private shopService: ShopService) {
  }

ngOnInit(){
}

editTagName() {
  this.shopService.changeTagName(this.tag._id, this.tag.tagName)
    .then(tag=> {
        this.toastManager.success('Tag cambiado con exito')
    })
    .catch(_ => {
      this.toastManager.error('error')
    });
}

disableTag() {
  this.shopService.disableTag(this.tag._id)
  .then(tag=>{
    this.toastManager.success('Tag desactivado')
    this.tag = tag
  })
  .catch(_ => {
    this.toastManager.error('error')
  });
}

enableTag() {
  this.shopService.enableTag(this.tag._id)
  .then(tag=>{
    this.toastManager.success('Tag activado')
    this.tag = tag
  })
  .catch(_ => {
    this.toastManager.error('error')
  });
}



}
