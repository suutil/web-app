import { Component, Input, OnInit } from '@angular/core';
import { ToastsManager } from 'ng2-toastr'
import { LoginService } from 'app/shared/services/login.service'
import { ActivatedRoute } from '@angular/router'
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';


@Component({
  selector: 'post',
  templateUrl: './post.html'
})
export class PostComponent {
post: any
showShopFilter = true
user: any

  constructor( private route: ActivatedRoute,
      private _sanitizer: DomSanitizer,
    private loginService: LoginService, private toastManager: ToastsManager) {
  }

ngOnInit(){
   this.route.data.subscribe(data => {
     this.post = data['post']
     this.user = data['user']
   })
}

backgroundUrl(id,type){
  let backgroundUrl = 'https://suutil-images.s3.eu-central-1.amazonaws.com/'+ id + '.'+type
  let safeBackgroundUrl = this._sanitizer.bypassSecurityTrustStyle('url('+ backgroundUrl +')')
  return safeBackgroundUrl
}

}
