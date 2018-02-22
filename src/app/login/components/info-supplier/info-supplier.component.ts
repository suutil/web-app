import { ToastsManager } from 'ng2-toastr';
import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { UiModalService } from 'app/ui-modal/ui-modal.service';
import { SignupProviderModal } from '../contact/signup-provider-modal.component';


@Component({
  selector: 'info-supplier',
  templateUrl: './info-supplier.html'
})

export class InfoSupplierComponent {
  token: string

  constructor(private router: Router,
    private toastManager: ToastsManager,
    private uiModalService: UiModalService) { }

  ngOnInit() {

  }

  openProviderSignupModal(){
    this.uiModalService.openModal(SignupProviderModal, {},'Regístrate como proveedor','Cancelar' )

  }


}
