import { Component, Input } from '@angular/core';

@Component({
    selector: 'progress-bar',
    templateUrl: './progress-bar.html'
})
export class ProgressBarComponent {
    @Input() labelLeft: string
    @Input() labelRight: number
    @Input() percent: number
    @Input() size: string
    @Input() classId: string
}