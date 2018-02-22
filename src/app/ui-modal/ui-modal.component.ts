import { empty } from 'rxjs/Observer';
import { Component, Input, ViewContainerRef, ViewChild, ReflectiveInjector, ComponentFactoryResolver } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
    selector: 'ui-modal-component',
    templateUrl: './ui-modal.html'
})
export class UiModalComponent {
    @Input() private title: string
    @Input()  dismissButton: string
    private modalTitle: string
    modalEmpty: boolean = false
    private currentComponent = null

    @ViewChild('dynamicComponentContainer', { read: ViewContainerRef }) dynamicComponentContainer: ViewContainerRef;

    set componentData(data: { component: any, inputs: any }) {
        if (!data) {
            return;
        }

        let factory = this.resolver.resolveComponentFactory(data.component);
        let componentRef = this.dynamicComponentContainer.createComponent(factory);

        data.inputs = data.inputs || {}

        this.modalTitle = componentRef.instance['title']

        this.modalEmpty = componentRef.instance['empty']

        Object.keys(data.inputs).forEach(currentInput => {
            componentRef.instance[currentInput] = data.inputs[currentInput];
        })
        this.currentComponent = componentRef;
    }

    constructor(private resolver: ComponentFactoryResolver, public activeModal: NgbActiveModal) {

    }
}
