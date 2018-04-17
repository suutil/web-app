import { SetPasswordComponent } from './set-password/set-password.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { ConfirmMailComponent } from './components/confirm-mail/confirm-mail.component';
import { ContactComponent } from './components/contact/contact.component';
import { LegalDisclaimerComponent } from './components/legal-disclaimer/legal-disclaimer.component';
import { PrivacyPolicyComponent } from './components/privacy-policy/privacy-policy.component';
import { CookiesPolicyComponent } from './components/cookies-policy/cookies-policy.component'
import { ConditionsComponent } from './components/conditions/conditions.component';
import { TransparencyComponent } from './components/transparency/transparency.component';
import { InfoSupplierComponent } from './components/info-supplier/info-supplier.component'
import { InfoDesignerComponent } from './components/info-designer/info-designer.component'
import { LandingContentComponent } from 'app/ui/molecules/landing-content/landing-content.component';
import { MyAccountComponent } from './components/my-account/my-account.component'

import { UserResolver } from './user.resolver';


import { AuthenticationGuard } from '../shared/authentication.guard';
import { RouterModule } from '@angular/router'
import { NgModule } from '@angular/core'

import { LoginComponent } from './login/login.component';



@NgModule({
  providers: [
    AuthenticationGuard,
    UserResolver
  ],
  imports: [
    RouterModule.forChild([
      { path: 'confirm-mail', component: ConfirmMailComponent },
      { path: 'set-password', component: SetPasswordComponent},
      { path: 'contacto', component: ContactComponent },
      { path: 'aviso-legal', component: LegalDisclaimerComponent },
      { path: 'politica-de-privacidad', component: PrivacyPolicyComponent },
      { path: 'politica-de-cookies', component: CookiesPolicyComponent },
      { path: 'condiciones', component: ConditionsComponent },
      { path: 'transparencia-gdpr', component: TransparencyComponent },
      { path: 'info-supplier', component: InfoSupplierComponent },
      { path: 'info-designer', component: InfoDesignerComponent  },
      { path: '', component: LoginComponent, canActivate: [AuthenticationGuard],
    children: [
      { path: '', component: LandingContentComponent },
      { path: 'change-password', component: ChangePasswordComponent, canActivate: [AuthenticationGuard] },
      { path: 'my-account', component: MyAccountComponent,
        canActivate: [AuthenticationGuard],
        data: { accessList: ['admin', 'designer'] },
        resolve: {
            user: UserResolver,
        }
      }
    ]}
    ])
  ],
  exports: [
    RouterModule
  ]
})

export class LoginRouterModule { }
