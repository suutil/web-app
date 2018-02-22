import { Component, Input, OnInit } from '@angular/core';
import { ToastsManager } from 'ng2-toastr'
import { LoginService } from 'app/shared/services/login.service'
import { UsersService } from 'app/shared/services/api/users.service'
import { ActivatedRoute, Route, Router } from '@angular/router';
import { ShopService } from 'app/shared/services/shop.service'
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';


@Component({
  selector: 'my-shop',
  templateUrl: './my-shop.html'
})
export class MyShopComponent {


showPayment: boolean = false
showShipping: boolean = false
showRefund: boolean = false
showPro: boolean = false
user: any
showShopFilter = true
categories: any
tags: any
shop: any

  constructor(private loginService: LoginService,
     private _sanitizer: DomSanitizer,
     private shopService: ShopService,
     private toastManager: ToastsManager,
     private usersService: UsersService,
     private route: ActivatedRoute,
     private router: Router) {
  }


  ngOnInit() {
      this.route.data.subscribe(data => {
          this.user = data['user'];
          this.categories = data['categories']
          this.tags = data['tags']
          if(data['shop']){
          this.shop = data['shop']
        }
      })
  }


createShop(){
   this.shopService.createShop(this.user._id)
   .then(response=>{
   this.router.navigate(['/my-shop/edit'])
 }
 )
}
backgroundUrl(id,type){
  let backgroundUrl = 'https://suutil-images.s3.eu-central-1.amazonaws.com/'+ id + '.'+type
  let safeBackgroundUrl = this._sanitizer.bypassSecurityTrustStyle('url('+ backgroundUrl +')')
  return safeBackgroundUrl
}

togglePayment(){
  this.showPayment = !this.showPayment
}

toggleShipping(){
  this.showShipping = !this.showShipping
}

toggleRefund(){
  this.showRefund = !this.showRefund
}

togglePro(){
  this.showPro = !this.showPro
}


}
