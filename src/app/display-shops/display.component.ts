import { Component, Input, OnInit, ViewContainerRef, ViewEncapsulation } from '@angular/core'
import { ToastsManager } from 'ng2-toastr'
import { LoginService } from 'app/shared/services/login.service'
import { ShopService } from 'app/shared/services/shop.service'
import { ConfirmationService } from 'app/shared/services/confirmation.service'
import { ActivatedRoute } from '@angular/router'
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import { AuthenticationService } from 'app/shared/authentication.service'
import { UsersService } from '../shared/services/api/users.service';



@Component({
  selector: 'display-shops',
  templateUrl: './display.html',
  encapsulation: ViewEncapsulation.None
})
export class DisplayComponent {

showShopFilter = true
shops: any = []
categories: any = []
tags: any = []
userRol: string
user: any
login: boolean

  constructor(private authenticationService: AuthenticationService,
     private loginService: LoginService,
     private userService: UsersService,
     private confirmationService: ConfirmationService,
     private toastManager: ToastsManager,
     private route: ActivatedRoute,
     private shopService: ShopService,
     private _sanitizer: DomSanitizer) {}

     ngOnInit(){
       this.route.data.subscribe(data => {
           this.shops = data['shops']
           this.categories = data['categories']
           this.tags = data['tags']
       })
       this.authenticationService.isLogged(login => {
         this.login = login
         if (login) {
           this.userService.getMeASync()
           .then(user=>{
             this.user = user
             this.userRol = user.rol
           })
         }
       })
     }

     addToFavorites(shop){
       console.log(shop)
       return this.shopService.addToFavorites(shop._id)
       .then((updatedUser)=>{
         console.log(updatedUser)
         this.user = updatedUser;
       })
     }

     removeFromFavorites(shop){
      let index = this.shops.indexOf(shop);
      console.log(shop)
       return this.shopService.removeFromFavorites(shop._id)
       .then((updatedUser)=>{
         console.log(updatedUser)
         this.user = updatedUser;
       })
     }

     logoUrl(id){
       let logoUrl = 'https://suutil-images.s3.eu-central-1.amazonaws.com/'+ id + '.logo'
       let safeUrl = this._sanitizer.bypassSecurityTrustStyle('url('+ logoUrl +')')
       return safeUrl
     }

     confirmMail(){
       return this.confirmationService.sendConfirmationMail(this.user.email)
     }

     like(shop){
       let index = this.shops.indexOf(shop);
       return this.shopService.likeShop(shop._id)
       .then((updatedShop)=>{
         this.shops[index] = updatedShop;
       })
     }

     unlike(shop){
       let index = this.shops.indexOf(shop);
       return this.shopService.unlikeShop(shop._id)
       .then((updatedShop)=>{
         this.shops[index] = updatedShop;
       })
     }

}
