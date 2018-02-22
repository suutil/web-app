import { ToastsManager } from 'ng2-toastr';
import { ConfirmationService } from 'app/shared/services/confirmation.service';
import { Router } from '@angular/router';
import { Component } from '@angular/core';


@Component({
  selector: 'confirm-mail',
  templateUrl: './confirm-mail.html'
})

export class ConfirmMailComponent {
  token: string

  constructor(private router: Router,
    private confirmationService: ConfirmationService,
    private toastManager: ToastsManager) { }

  ngOnInit() {
    this.router.routerState.root.queryParams
    .subscribe(queryParams =>{
      this.token = queryParams['token']
      this.confirmationService.activateUser(this.token)
    }
    )
  }


}
