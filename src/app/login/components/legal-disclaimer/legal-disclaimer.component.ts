import { ToastsManager } from 'ng2-toastr';
import { Router } from '@angular/router';
import { Component } from '@angular/core';


@Component({
  selector: 'legal-disclaimer',
  templateUrl: './legal-disclaimer.html'
})

export class LegalDisclaimerComponent {
  token: string

  constructor(private router: Router,
    private toastManager: ToastsManager) { }

  ngOnInit() {

  }


}
