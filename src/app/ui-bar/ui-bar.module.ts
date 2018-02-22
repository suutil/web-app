import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';


import { NgbProgressbarModule } from '@ng-bootstrap/ng-bootstrap'


import { UiBarComponent }   from './ui-bar.component'


@NgModule({
    imports: [BrowserModule, FormsModule, NgbProgressbarModule],
    exports: [UiBarComponent],
    declarations: [UiBarComponent],
    providers: [],
})
export class UiBarModule { }
