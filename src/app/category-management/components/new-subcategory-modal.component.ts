import { Component, Input, OnInit } from '@angular/core';
import { ToastsManager } from 'ng2-toastr'
import { ShopService } from 'app/shared/services/shop.service'


@Component({
  selector: 'new-subcategory-modal',
  templateUrl: './new-subcategory-modal.html',
})
export class NewSubcategoryModal {
@Input() parentCategory : any
newSubcategory: string


  constructor(private shopService: ShopService) {
  }

ngOnInit(){

}

addSubcategory() {
  this.shopService.createSubcategory(this.newSubcategory, this.parentCategory._id )
}


}
