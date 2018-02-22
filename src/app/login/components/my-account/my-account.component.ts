import { ToastsManager } from 'ng2-toastr';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Component } from '@angular/core';
import { UsersService } from 'app/shared/services/api/users.service';


@Component({
  selector: 'my-account',
  templateUrl: './my-account.html'
})

export class MyAccountComponent {
  token: string
  isLoading: boolean = false
  user: any
  constructor(
    private usersService: UsersService,
    private route: ActivatedRoute,
   private router: Router,
    private toastManager: ToastsManager) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
        this.user = data['user'];
    })

  }

  onSubmit(){
    this.usersService.patchMe(this.user)
    .then(user =>{
      this.toastManager.success('Datos de la cuenta actualizados')
      this.isLoading = false
    })
  }


}
