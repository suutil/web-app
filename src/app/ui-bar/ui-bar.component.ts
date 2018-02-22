import { Component, Input, OnInit } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'ui-bar',
    templateUrl: 'ui-bar.component.html'
})
export class UiBarComponent implements OnInit {
    @Input() valueText: string = ''
    @Input() maxValueText: string = ''
    @Input() value: number = 0
    @Input() maxValue: number = 100
    @Input() inRow: boolean = false
    @Input() color: string = ''
    private progress: number = 0

    constructor() { }

    ngOnInit() {
        this.progress = (this.value / this.maxValue) * 100
    }
}