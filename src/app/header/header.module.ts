import { UIModule } from '../ui/ui.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from 'app/shared/shared.module';
import { UiModalService } from '../ui-modal/ui-modal.service';
import { HeaderComponent } from 'app/header/header.component';
import { LoginModal } from './components/login-modal.component';
import { SignupDesignerModal } from './components/signup-designer-modal.component';
import { SignupProviderModal } from './components/signup-provider-modal.component';





@NgModule({
  // Components, Pipes, Directive
  declarations: [
    HeaderComponent,
    LoginModal,
    SignupDesignerModal,
    SignupProviderModal
  ],

  providers: [ UiModalService],
  entryComponents: [ LoginModal, SignupDesignerModal, SignupProviderModal ],

  // Modules
  imports: [
    CommonModule,
    SharedModule,
    UIModule
  ],

  exports: [
    HeaderComponent
  ]
})

export class HeaderModule {

}
