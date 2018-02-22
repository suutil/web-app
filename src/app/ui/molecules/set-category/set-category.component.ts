import { Component, Input } from '@angular/core';
import { ToastsManager } from 'ng2-toastr'
import { ShopService } from 'app/shared/services/shop.service'
@Component({
  selector: 'set-category',
  templateUrl: './create-tag.html'
})
export class SetCategoryComponent {
  @Input() categories : any
  @Input() setCategories : any

  constructor(
    private shopService: ShopService,
    private toastManager: ToastsManager,) {
  }



  setTag(){
    this.shopService.tagShop('59fc8a3c1058c240c28009ee', "avec les doigts")
    .then(r=>{console.log(r)})
  }

}
