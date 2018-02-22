import { Component, Input, EventEmitter, Output } from '@angular/core';

@Component({
    selector: 'search-input',
    templateUrl: './search-input.html',
})
export class SearchInputComponent {
    @Input('id') id: string;
    @Input('placeholder') placeholder: string;

    @Output() searchInputValue = new EventEmitter<string>();


    emitValue(value) {
        this.searchInputValue.emit(value)
    }

}
