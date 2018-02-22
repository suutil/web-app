import { SetPasswordComponent } from './set-password/set-password.component';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { UIModule } from 'app/ui/ui.module'


import { LoginRouterModule } from 'app/login/login-router.module'
import { SharedModule } from 'app/shared/shared.module'


import { SetPasswordFormComponent } from './components/set-password-form/set-password-form.component'
import { ChangePasswordComponent } from './components/change-password/change-password.component'
import { ResetPasswordFormComponent } from './components/reset-password-form/reset-password-form.component'
import { ConfirmMailComponent } from './components/confirm-mail/confirm-mail.component'
import { ContactComponent } from './components/contact/contact.component'
import { LegalDisclaimerComponent } from './components/legal-disclaimer/legal-disclaimer.component'
import { PrivacyPolicyComponent } from './components/privacy-policy/privacy-policy.component'
import { ConditionsComponent } from './components/conditions/conditions.component'
import { TransparencyComponent } from './components/transparency/transparency.component'
import { InfoSupplierComponent } from './components/info-supplier/info-supplier.component'
import { InfoDesignerComponent } from './components/info-designer/info-designer.component'
import { MyAccountComponent } from './components/my-account/my-account.component'

import { SignupDesignerModal } from './components/contact/signup-designer-modal.component';
import { SignupProviderModal } from './components/contact/signup-provider-modal.component';







@NgModule({
  declarations: [
    SetPasswordFormComponent,
    LoginComponent,
    SetPasswordComponent,
    ConfirmMailComponent,
    ContactComponent,
    LegalDisclaimerComponent,
    PrivacyPolicyComponent,
    ConditionsComponent,
    TransparencyComponent,
    InfoSupplierComponent,
    InfoDesignerComponent,
    MyAccountComponent,
    ChangePasswordComponent,

    SignupDesignerModal,
    SignupProviderModal
  ],
  providers: [],
  entryComponents: [ SignupDesignerModal, SignupProviderModal ],
  imports: [
    CommonModule,
    LoginRouterModule,
    SharedModule,
    UIModule
  ],
  exports: [

    SetPasswordComponent,
  ]
})

export class LoginModule { }
