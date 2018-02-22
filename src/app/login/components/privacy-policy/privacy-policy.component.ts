import { ToastsManager } from 'ng2-toastr';
import { Router } from '@angular/router';
import { Component } from '@angular/core';


@Component({
  selector: 'privacy-policy',
  templateUrl: './privacy-policy.html'
})

export class PrivacyPolicyComponent {
  token: string

  constructor(private router: Router,
    private toastManager: ToastsManager) { }

  ngOnInit() {

  }


}
