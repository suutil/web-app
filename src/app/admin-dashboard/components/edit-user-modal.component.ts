import { Component, Input, OnInit } from '@angular/core';
import { ToastsManager } from 'ng2-toastr'
import { LoginService } from 'app/shared/services/login.service'


@Component({
  selector: 'edit-user-modal',
  templateUrl: './edit-user-modal.html',
  //styleUrls: ['./switch.scss'],
})
export class EditUserModal {
@Input() user
password: string


  constructor(private loginService: LoginService,private toastManager: ToastsManager) {
  }

ngOnInit(){
  console.log(this.user)
}

setPassword(){
  this.loginService.activateProvider(this.user._id, this.password)
  .then((_)=>{
      this.toastManager.success('Usuario editado')
    }
  )
}


}
