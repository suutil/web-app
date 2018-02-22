import { BlogRouterModule } from './blog-router.module';
import { BlogComponent } from './blog.component';
import { PostComponent } from './post.component';
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { UIModule } from '../ui/ui.module'
import { SharedModule } from 'app/shared/shared.module'

@NgModule({
    declarations: [
        BlogComponent,
        PostComponent
    ],
    providers: [],
    imports: [
        CommonModule,
        SharedModule,
        BlogRouterModule,
        UIModule
    ],
    exports: [
    ]
})

export class BlogModule { }
