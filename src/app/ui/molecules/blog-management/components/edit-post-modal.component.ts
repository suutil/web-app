import { Component, Input, OnInit } from '@angular/core';
import { ToastsManager } from 'ng2-toastr'
import { ContentService } from 'app/shared/services/content.service'

@Component({
  selector: 'edit-post-modal',
  templateUrl: './edit-post-modal.html',
})
export class EditPostModal {
@Input() post


  constructor(private toastManager: ToastsManager,
              private contentService: ContentService) {
  }

ngOnInit(){
}

editPost() {
    this.contentService.editPost(this.post)
    .then(post=> {
      this.toastManager.success('Post actualizado con éxito')
    })
}


}
