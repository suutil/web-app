import { DisplayShopsRouterModule } from './display-shops-router.module';
import { DisplayShopsComponent } from './display-shops.component';
import { FavoriteShopsComponent } from './favorite-shops.component';
import { DisplayComponent } from './display.component';

import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { UIModule } from '../ui/ui.module'
import { SharedModule } from 'app/shared/shared.module'

@NgModule({
    declarations: [
        DisplayShopsComponent,
        DisplayComponent,
        FavoriteShopsComponent
    ],
    providers: [],
    imports: [
        CommonModule,
        SharedModule,
        DisplayShopsRouterModule,
        UIModule
    ],
    exports: [
    ]
})

export class DisplayShopsModule { }
