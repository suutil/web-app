import { trigger, state, style, transition, animate, keyframes  } from '@angular/core'

export const lateralAnimation = trigger('lateralTrigger', [
    state('inactive', style({

        right: '-25rem'
    })),
    state('active', style({
        right: '0'
    })),
    transition('inactive => active', animate('200ms ease-in')),
    transition('active => inactive', animate('200ms ease-out'))
])
