import { Component, Input, OnInit } from '@angular/core';
import { ToastsManager } from 'ng2-toastr'
import { LoginService } from 'app/shared/services/login.service'
import { UsersService } from 'app/shared/services/api/users.service'
import { ActivatedRoute, Route } from '@angular/router';


@Component({
  selector: 'provider',
  templateUrl: './provider.html'
})
export class ProviderComponent {
user: any
showShopFilter = true
categories: any
tags: any
shop: any

  constructor(private loginService: LoginService,
     private toastManager: ToastsManager,
     private usersService: UsersService,
     private route: ActivatedRoute) {
  }


  ngOnInit() {
      this.route.data.subscribe(data => {
        console.log(data)
          this.user = data['user'];
          this.categories = data['categories']
          this.tags = data['tags']
          if(data['shop']){
          this.shop = data['shop'][0]
        }
      })
  }




}
