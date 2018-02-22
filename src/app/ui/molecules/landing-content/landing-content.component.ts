import { Component, Input } from '@angular/core';
import { ContentService } from 'app/shared/services/content.service'
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import { BlogAccessModal } from './components/blog-access-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginService } from 'app/shared/services/login.service'
import { UiModalService } from 'app/ui-modal/ui-modal.service';


@Component({
    selector: 'landing-content',
    templateUrl: './landing-content.html'
})
export class LandingContentComponent {
    posts:any
    designerImageUrl: string = "https://suutil-images.s3.eu-central-1.amazonaws.com/1.landing-designer"
    providerImageUrl: string = "https://suutil-images.s3.eu-central-1.amazonaws.com/1.landing-provider"
    suggestion1ImageUrl: string = "https://i.pinimg.com/736x/72/9d/de/729dde8d99d0d7150418b8a05c6ad2f1--black-accent-walls-black-accents.jpg"
    suggestion2ImageUrl: string = "https://i.pinimg.com/736x/bf/92/1d/bf921d634f332762844c2a6f284b42da--scandinavian-living-rooms-grey-living-rooms.jpg"
    suggestion3ImageUrl: string = "http://imgs.livspace.com/ls_image/707659/living.png"

    constructor(
        private contentService: ContentService,
        private _sanitizer: DomSanitizer,
        private loginService: LoginService,
        private uiModalService: UiModalService){}
        ngOnInit() {
          this.contentService.getLandingPosts()
          .then(posts=>{
            this.posts= posts
          })
        }


        backgroundUrl(id){
          let backgroundUrl = 'https://suutil-images.s3.eu-central-1.amazonaws.com/'+ id + '.blog-main-picture'
          let safeBackgroundUrl = this._sanitizer.bypassSecurityTrustStyle('url('+ backgroundUrl +')')
          return safeBackgroundUrl
        }

        openBlogAccessModal() {
              this.uiModalService.openModal(BlogAccessModal, {}, 'Entrar', 'Entendido')
        }



}
