import { BlogResolver } from './blog.resolver';
import { PostResolver } from './post.resolver';
import { UserResolver } from './user.resolver';
import { BlogComponent } from './blog.component';
import { PostComponent } from './post.component';
import { AuthenticationGuard } from '../shared/authentication.guard';
import { RouterModule } from '@angular/router'
import { NgModule } from '@angular/core'



@NgModule({
    providers: [
        AuthenticationGuard,
        BlogResolver,
        PostResolver,
        UserResolver
    ],
    imports: [
        RouterModule.forChild([
            {
                path: 'magazine', component: BlogComponent,
                canActivate: [AuthenticationGuard],
                data: { accessList: ['admin','designer','provider'] },
                resolve: {
                    posts: BlogResolver
                }

            },
            {
                path: 'magazine/:id', component: PostComponent,
                canActivate: [AuthenticationGuard],
                data: { accessList: ['admin','designer','provider'] },
                resolve: {
                   post: PostResolver,
                   user: UserResolver
                }

            }
        ])
    ],
    exports: [
        RouterModule
    ]
})

export class BlogRouterModule { }
