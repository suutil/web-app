import { trigger, state, style, transition, animate, keyframes  } from '@angular/core'

export const shadeAnimation = trigger('shadeTrigger', [
    state('inactive', style({
      display: 'none'
    })),
    state('active', style({
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        opacity : '0.6'
    })),
    transition('inactive => active', animate('200ms ease-in')),
    transition('active => inactive', animate('200ms ease-out'))
])
