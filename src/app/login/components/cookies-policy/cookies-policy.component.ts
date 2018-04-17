import { ToastsManager } from 'ng2-toastr';
import { Router } from '@angular/router';
import { Component } from '@angular/core';


@Component({
  selector: 'cookies-policy',
  templateUrl: './cookies-policy.html'
})

export class CookiesPolicyComponent {
  token: string

  constructor(private router: Router,
    private toastManager: ToastsManager) { }

  ngOnInit() {

  }


}
