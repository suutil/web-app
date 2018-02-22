import { Component, Input, OnInit } from '@angular/core';
import { ToastsManager } from 'ng2-toastr'


@Component({
  selector: 'login-modal',
  templateUrl: './login-modal.html',
})
export class LoginModal {
view:string = 'login'


  constructor() {
  }

ngOnInit(){

}

setView(view){
  this.view = view
}


}
