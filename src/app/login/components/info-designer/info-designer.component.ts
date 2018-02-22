import { ToastsManager } from 'ng2-toastr';
import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { UiModalService } from 'app/ui-modal/ui-modal.service';
import { SignupDesignerModal } from '../contact/signup-designer-modal.component';

@Component({
  selector: 'info-designer',
  templateUrl: './info-designer.html'
})

export class InfoDesignerComponent {
  token: string

  constructor(private router: Router,
    private toastManager: ToastsManager,
    private uiModalService: UiModalService) { }

  ngOnInit() {

  }

  openDesignerSignupModal(){
    this.uiModalService.openModal(SignupDesignerModal, {}, 'Regístrate como usuario profesional','Cancelar')
  }


}
