import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ToastsManager } from 'ng2-toastr'
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginService } from 'app/shared/services/login.service'
@Component({
  selector: 'login-form',
  templateUrl: './login-form.html'
})
export class LoginFormComponent {
  @Input() disabledRouteAutoRedirect
  @Output() goToReset = new EventEmitter();
  email: string
  password: string
  isLoading: boolean = false

  constructor(
    private loginService: LoginService,
    private toastManager: ToastsManager,
    public activeModal: NgbActiveModal) {
  }

  onSubmit() {
    this.isLoading = true;
    this.loginService.login(this.email, this.password, false)
      .then(_=> {
          this.activeModal.close()
      })
      .catch(_ => {
          this.activeModal.close()
        this.toastManager.error('invalid login')
      });
  }

  goToResetView(){
    this.goToReset.emit()
  }
}
