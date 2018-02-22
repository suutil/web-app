import { Component, Input, OnInit } from '@angular/core';
import { UsersService } from 'app/shared/services/api/users.service'

@Component({
  templateUrl: './login.html'
})
export class LoginComponent {
  showLateralMenu = false
  showHeader = true
  private cookieAgreed : boolean = false
  constructor(private usersService: UsersService){}

  ngOnInit(){
    this.getCookieStatus()
  }

  getCookieStatus(){
    this.cookieAgreed = this.usersService.isCookieAgreed()
  }
}
