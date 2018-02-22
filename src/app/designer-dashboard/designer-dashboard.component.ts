import { Component, Input } from '@angular/core';
import { ToastsManager } from 'ng2-toastr'
import { LoginService } from 'app/shared/services/login.service'


@Component({
  selector: 'designer-dashboard',
  templateUrl: './designer-dashboard.html'
})
export class DesignerDashboardComponent {

showShopFilter = true
  constructor(private loginService: LoginService, private toastManager: ToastsManager) {
  }



}
