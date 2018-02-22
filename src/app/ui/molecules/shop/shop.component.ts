import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ShopService } from 'app/shared/services/shop.service'
import { UsersService } from 'app/shared/services/api/users.service';
import { AuthenticationService } from 'app/shared/authentication.service'
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from '@angular/router'

import * as moment from 'moment';


@Component({
    selector: 'shop',
    templateUrl: './shop.html'
})
export class ShopComponent {
preview: boolean = false
showPayment: boolean = false
showShipping: boolean = false
showRefund: boolean = false
showPro: boolean = false

tags: any
user: any
categories: any
previousId: string
nextId: string
 shop: any = {}
    constructor(private route: ActivatedRoute,
                private authenticationService: AuthenticationService,
                private _sanitizer: DomSanitizer,
                private userService: UsersService,
                private shopService: ShopService,
                ){}


    ngOnInit() {
      this.authenticationService.isLogged(login => {
        if (login) {
          this.userService.getMeASync()
          .then(user=>{
            this.user = user
          })
        }
      })
  this.route.data.subscribe(data => {
    this.shop = data['shopData']
    console.log(this.shop)
    this.tags = data['tags']
    this.categories = data['categories']
    this.shopService.getActiveShopIds()
    .then(ids=>{
      this.buildLinks(ids)
    })
  })


    }

    addToFavorites(shop){
      return this.shopService.addToFavorites(shop._id)
      .then((updatedUser)=>{
        console.log(updatedUser)
        this.user = updatedUser;
      })
    }

    removeFromFavorites(shop){
      return this.shopService.removeFromFavorites(shop._id)
      .then((updatedUser)=>{
        console.log(updatedUser)
        this.user = updatedUser;
      })
    }

    like(shop){
      return this.shopService.likeShop(shop._id)
      .then((updatedShop)=>{
        this.shop = updatedShop;
      })
    }

    unlike(shop){
      return this.shopService.unlikeShop(shop._id)
      .then((updatedShop)=>{
        this.shop = updatedShop;
      })
    }

    buildLinks(ids){
      let currentId
      ids.forEach((el,i)=>{
        if(el._id === this.shop._id){
          currentId = i
        }
      })
      if(currentId === 0){
        this.previousId = undefined
        this.nextId = ids[currentId+1]
      }
      else if (currentId - ids.length + 1 === 0){
        this.nextId = undefined
        this.previousId = ids[currentId - 1]
      }
      else {
        this.previousId = ids[currentId - 1]
        this.nextId = ids[currentId+1]
      }
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
