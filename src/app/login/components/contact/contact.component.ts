import { ToastsManager } from 'ng2-toastr';
import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { UiModalService } from 'app/ui-modal/ui-modal.service';
import { SignupDesignerModal } from './signup-designer-modal.component';
import { SignupProviderModal } from './signup-provider-modal.component';

@Component({
  selector: 'contact',
  templateUrl: './contact.html'
})

export class ContactComponent {
  token: string

  constructor(private router: Router,
    private toastManager: ToastsManager,
    private uiModalService: UiModalService) { }

  ngOnInit() {

  }



    openDesignerSignupModal(){
      this.uiModalService.openModal(SignupDesignerModal, {}, 'Regístrate como usuario profesional','Cancelar')
    }

    openProviderSignupModal(){
      this.uiModalService.openModal(SignupProviderModal, {},'Regístrate como proveedor','Cancelar' )

    }


}
