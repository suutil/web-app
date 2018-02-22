import { ToastsManager } from 'ng2-toastr';
import { Router } from '@angular/router';
import { Component } from '@angular/core';


@Component({
  selector: 'transparency',
  templateUrl: './transparency.html'
})

export class TransparencyComponent {
  token: string

  constructor(private router: Router,
    private toastManager: ToastsManager) { }

  ngOnInit() {

  }


}
