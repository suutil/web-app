import { Component, Input, Output, EventEmitter } from '@angular/core';
import { UsersService } from 'app/shared/services/api/users.service'
@Component({
    selector: 'cookie-message',
    templateUrl: './cookie-message.html'
})
export class CookieMessageComponent {
  @Output() cookiesAgreed = new EventEmitter();
  private cookieAgreed : string = 'false'
  constructor(private usersService: UsersService){}

  agreeCookie(){
    this.usersService.agreeCookie()
    this.cookiesAgreed.emit()
  }
}
