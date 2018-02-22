import { Component, Input, OnInit } from '@angular/core';
import { ToastsManager } from 'ng2-toastr'
import { LoginService } from 'app/shared/services/login.service'
import { ShopService } from 'app/shared/services/shop.service'

@Component({
  selector: 'edit-shop-modal',
  templateUrl: './edit-shop-modal.html',
  //styleUrls: ['./switch.scss'],
})
export class EditShopModal {
@Input() shop
password: string


  constructor(private loginService: LoginService,
              private toastManager: ToastsManager,
              private shopService: ShopService) {
  }

ngOnInit(){
  console.log(this.shop)
}

activate(){
  this.shopService.updateShop(this.shop._id, {approved: true})
  .then(shop => {
    this.shop = shop
  })
}

desActivate(){
  this.shopService.updateShop(this.shop._id, {approved: false})
  .then(shop => {
    this.shop = shop
  })
}
}
