import { SharedModule } from '../shared/shared.module';
import { UiModalService } from './ui-modal.service';
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { UiModalComponent } from './ui-modal.component'


@NgModule({
    imports: [
        CommonModule,
        SharedModule
    ],
    exports: [
        UiModalComponent
    ],
    entryComponents: [UiModalComponent],
    declarations: [
        UiModalComponent
    ],
    providers: []
})
export class UiModalModule { }
