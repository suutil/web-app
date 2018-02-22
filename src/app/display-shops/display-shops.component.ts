import { Component, Input, OnInit } from '@angular/core'
import { ToastsManager } from 'ng2-toastr'
import { LoginService } from 'app/shared/services/login.service'
import { ShopService } from 'app/shared/services/shop.service'
import { ConfirmationService } from 'app/shared/services/confirmation.service'
import { ActivatedRoute } from '@angular/router'
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import { AuthenticationService } from 'app/shared/authentication.service'
import { UsersService } from '../shared/services/api/users.service';

import * as moment from 'moment';



@Component({
  selector: 'display-shops',
  templateUrl: './display-shops.html'
})
export class DisplayShopsComponent {

shops: any = []
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
       return this.shopService.addToFavorites(shop._id)
       .then((updatedUser)=>{
         this.user = updatedUser;
       })
     }

     removeFromFavorites(shop){
      let index = this.shops.indexOf(shop);
       return this.shopService.removeFromFavorites(shop._id)
       .then((updatedUser)=>{
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

     isNew(date){
       let now = new Date()
       let creationDate = moment(date)
       let duration = moment.duration({ from: creationDate, to: now  }).asDays();
       if(duration <= 30){
         return true;
       }
       else {
         return false
       }
     }




}
