import { Injectable, Component } from '@angular/core'
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UiModalComponent } from './ui-modal.component';


@Injectable()
export class UiModalService {
    isInfo: Boolean = false

    constructor(private modal: NgbModal,
    ) {
    }

    openInfoModal(component: Component, inputs: Object, title?: string) {
        this.isInfo = true
        return this.openModal(component, inputs, title, 'modal.close')
    }

    openModal(component: Component, inputs: Object, title?: string, dismissButton: string = 'Cancelar') {
        const modalRef = this.modal.open(UiModalComponent, { windowClass: 'lg' })
        modalRef.componentInstance.componentData = {
            component: component,
            inputs: inputs
        }
        modalRef.componentInstance.title = title
        modalRef.componentInstance.dismissButton = dismissButton
        return modalRef.result
    }

    closeModal(){

    }
}
