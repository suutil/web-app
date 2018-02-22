import { Component, Input, OnInit } from '@angular/core';
import { ToastsManager } from 'ng2-toastr'
import { ContentService } from 'app/shared/services/content.service'
import { UiModalService } from 'app/ui-modal/ui-modal.service';

@Component({
    selector: 'landing-management',
    templateUrl: './landing-management.html'
})
export class LandingManagementComponent {
    constructor(
        private contentService: ContentService,
        private toastManager: ToastsManager,
        private uiModalService: UiModalService) {
    }

    ngOnInit() {

    }

}
