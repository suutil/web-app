import { ToastsManager } from 'ng2-toastr';
import { Router } from '@angular/router';
import { Component } from '@angular/core';


@Component({
  selector: 'conditions',
  templateUrl: './conditions.html'
})

export class ConditionsComponent {
  token: string

  constructor(private router: Router,
    private toastManager: ToastsManager) { }

  ngOnInit() {

  }


}
