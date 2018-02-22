import { Component, Input, OnInit } from '@angular/core';
import { ToastsManager } from 'ng2-toastr'
import { ShopService } from 'app/shared/services/shop.service';

@Component({
  selector: 'set-category-modal',
  templateUrl: './set-category-modal.html',
})
export class SetCategoryModal {
@Input() shopCategories

  constructor(  private shopService: ShopService) {
  }

ngOnInit(){
  /*this.shopService.getAllActiveCategories()
  .then(result=>{
    return this.shopService.buildCategoryDatas(result.data)
  })
  .then(categoryDatas=> {
    console.log(categoryDatas)
  })*/
}


}
