import { BehaviorSubject, Observable } from 'rxjs/Rx';
import { Injectable } from '@angular/core'


@Injectable()
export class AlertsLateralService {

    observableState = new BehaviorSubject<string>('inactive')
    state : string = 'inactive'

    constructor() { }

    toggle() {
        this.state = (this.state === 'inactive' ? 'active' : 'inactive');
        this.observableState.next(this.state)
    }

    subscribe(cb) {
        return this.observableState.subscribe(cb)
    }

}
