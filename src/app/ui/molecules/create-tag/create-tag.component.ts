import { Component, Input, OnInit } from '@angular/core';
import { ToastsManager } from 'ng2-toastr'
import { ShopService } from 'app/shared/services/shop.service'
import { UiModalService } from 'app/ui-modal/ui-modal.service';
import { EditTagModal } from './components/edit-tag-modal.component';

@Component({
  selector: 'create-tag',
  templateUrl: './create-tag.html'
})
export class CreateTagComponent {

  tag: string
  tags: any

  constructor(
    private shopService: ShopService,
    private toastManager: ToastsManager,
    private uiModalService: UiModalService) {
  }

  ngOnInit(){
    this.shopService.getActiveTags()
    .then(tags => {
      this.tags= tags
    })
  }

  onSubmit() {
    this.shopService.createTag(this.tag)
      .then(tag=> {
          this.tags.push(tag)
      })
      .catch(_ => {
        this.toastManager.error('error')
      });
  }

OpenEditTagModal(tag){
  this.uiModalService.openModal(EditTagModal, {tag: tag}, 'Editar el tag','Cerrar')
}
}
