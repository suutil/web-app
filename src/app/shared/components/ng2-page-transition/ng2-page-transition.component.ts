import { Component,  Input, ElementRef,OnInit, OnDestroy, ViewChild } from '@angular/core';
import { animate, trigger, state,  transition, style} from '@angular/animations';
import { Router, NavigationStart } from '@angular/router';

import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'ng2-page-transition',
  template: '<div class="h-100" #container style="opacity:1;" [@ng2ElementState]="ng2PageTransition"><ng-content></ng-content></div>',
  animations: [
    trigger('ng2ElementState', [
      state('inactive', style({
        opacity: 0,
      })),
      state('active', style({
        opacity: 1,
      })),
      transition('* => active', animate('200ms ease-in-out'))
    ])
  ]
})
export class Ng2PageTransition implements OnDestroy, OnInit {
  @Input() scrollTop = true
  @ViewChild('container') el: ElementRef
  ng2PageTransition: string = 'inactive'
  observer

  constructor(private router: Router, private elRef: ElementRef) {
    this.ng2PageTransition = 'inactive'

    this.observer = new MutationObserver((mutations) => {
      Observable
        .from(mutations)
        .filter((mutation: any) => {
          return !!mutation.addedNodes
        })
        .subscribe(() => {
          this.ng2PageTransition = 'inactive'
          setTimeout(() => {
            if (this.scrollTop) {
              window.scrollTo(0, 0)
            }
            this.ng2PageTransition = 'active'
          }, 300)
        })
    })
  }

  ngOnInit() {
    this.observer.observe(this.el.nativeElement, { childList: true })
  }

  ngOnDestroy() {
    this.observer.disconnect()
  }
}
