import { Component, Input, OnInit } from '@angular/core';
import { ToastsManager } from 'ng2-toastr'
import { ShopService } from 'app/shared/services/shop.service'

@Component({
  selector: 'edit-category-modal',
  templateUrl: './edit-category-modal.html',
})
export class EditCategoryModal {
@Input() category


  constructor(private toastManager: ToastsManager,
              private shopService: ShopService) {
  }

ngOnInit(){
}

editTagName() {
  this.shopService.changeCategoryName(this.category._id, this.category.categoryName)
    .then(cat=> {
        this.toastManager.success('Tag cambiado con exito')
        this.category = cat
    })
    .catch(_ => {
      this.toastManager.error('error')
    });
}

disableCategory() {
  this.shopService.disableCategory(this.category._id)
  .then(cat=>{
    this.category = cat
    this.toastManager.success('Categoria desactivada')
  })
  .catch(_ => {
    this.toastManager.error('error')
  });
}

enableCategory() {
  this.shopService.enableCategory(this.category._id)
  .then(cat=>{
    this.category = cat
    this.toastManager.success('Categoria activada')
  })
  .catch(_ => {
    this.toastManager.error('error')
  });
}



}
