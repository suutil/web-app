import { Component, Input, OnInit } from '@angular/core';
import { ToastsManager } from 'ng2-toastr'
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap'
import { ShopService } from 'app/shared/services/shop.service'

@Component({
  selector: 'new-category-modal',
  templateUrl: './new-category-modal.html',
})
export class NewCategoryModal {
newCategory: string


  constructor(private shopService: ShopService,
              private toastManager: ToastsManager,
              public activeModal: NgbActiveModal) {
  }

ngOnInit(){

}

addCategory() {
  this.shopService.createCategory(this.newCategory)
  .then(_=> {
      this.activeModal.close()
  })
  .catch(_ => {
      this.activeModal.close()
    this.toastManager.error('error')
  });
}

}
