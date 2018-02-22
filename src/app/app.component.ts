import { fdatasync } from 'fs';
import { setTimeout } from 'timers'
import { ToastsManager } from 'ng2-toastr'
import { NavigationCancel, ActivatedRoute } from '@angular/router'
import { NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router'
import { SlimLoadingBarService } from 'ng2-slim-loading-bar'
import { Component, ViewContainerRef, ViewEncapsulation } from '@angular/core'
import lateralMenuOptionsConfig from './lateral-menu-options'

@Component({
  selector: 'app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})

// APP-COMPONENT
export class AppComponent {
  activatedRouteMain: ActivatedRoute
  public title: String = 'suutil-app'
  public showHeader: boolean = true
  public showShopFilter: boolean = false

  lateralMenuOptions = lateralMenuOptionsConfig

  type
  data
  options


  public constructor(
    viewContainerRef: ViewContainerRef,
    private slimLoadingBarService: SlimLoadingBarService,
    router: Router,
    toastr: ToastsManager) {



    // the lang to use, if the lang isn't available, it will use the current loader to get them

    toastr.setRootViewContainerRef(viewContainerRef)
    router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.navigationStart()
      }

      if (event instanceof NavigationEnd ||
        event instanceof NavigationCancel ||
        event instanceof NavigationError
      ) {
        this.navigationEnd()
      }
    })
  }

  onActivate(event) {
    this.showHeader = event.showHeader === false ? false : true
  }

  navigationStart() {
    this.slimLoadingBarService.start()
  }

  navigationEnd() {
    this.slimLoadingBarService.complete()
  }

}
