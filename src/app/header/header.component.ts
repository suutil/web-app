import { UsersService } from '../shared/services/api/users.service';
import { Component, OnInit } from '@angular/core'
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';

import { Observable } from 'rxjs'

import { AppConfigService } from 'app/core/services/app-config.service'

import { AuthenticationService } from 'app/shared/authentication.service'
import { LoginService } from 'app/shared/services/login.service'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginModal } from './components/login-modal.component';
import { SignupDesignerModal } from './components/signup-designer-modal.component';
import { SignupProviderModal } from './components/signup-provider-modal.component';


import { UiModalService } from '../ui-modal/ui-modal.service';

@Component({
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  selector: 'header'
})

export class HeaderComponent implements OnInit {
  login: boolean
  userRol: string
  name: string
  company: string
  user: any
  currentUrl: string = ""
  showResponsiveMenu : boolean = false

  constructor(private authenticationService: AuthenticationService,
    private userService: UsersService,
    private loginService: LoginService,
    private uiModalService: UiModalService,
    private router: Router,
    private route: ActivatedRoute) {
     router.events.subscribe(event => {
       if (event instanceof NavigationEnd) {
          this.currentUrl = event.url
}
  });
  }

  ngOnInit() {
    this.authenticationService.isLogged(login => {
      this.login = login
      if (login) {
        let user = this.userService.getMeSync()
        this.user = user
        this.userRol = user.rol
        this.name = user.name
        this.company = user.companyName
      }
    })
  }

  logout(){
      this.loginService.logout()
  }

  openLoginModal() {
        this.uiModalService.openModal(LoginModal, {}, 'Entrar', 'Cancelar')
  }

  openDesignerSignupModal(){
    this.uiModalService.openModal(SignupDesignerModal, {}, 'Regístrate como usuario profesional','Cancelar')
  }

  openProviderSignupModal(){
    this.uiModalService.openModal(SignupProviderModal, {},'Regístrate como proveedor','Cancelar' )

  }

  toggleResponsiveMenu(){
    this.showResponsiveMenu = !this.showResponsiveMenu
  }

}
