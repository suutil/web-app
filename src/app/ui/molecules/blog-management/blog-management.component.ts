import { Component, Input, OnInit } from '@angular/core';
import { ToastsManager } from 'ng2-toastr'
import { ContentService } from 'app/shared/services/content.service'
import { UiModalService } from 'app/ui-modal/ui-modal.service';
import { EditPostModal } from './components/edit-post-modal.component';

@Component({
    selector: 'blog-management',
    templateUrl: './blog-management.html'
})
export class BlogManagementComponent {
    @Input() posts
    view: string = 'all'
    title: string = 'Nuevo post'
    post: any = {
        content: 'nuevo post de blog'
    }
    newInput: boolean = false
    constructor(
        private contentService: ContentService,
        private toastManager: ToastsManager,
        private uiModalService: UiModalService) {
    }

    ngOnInit() {
    }

    onSubmit() {
    }

    createPost() {
        this.contentService.createPost({ title: this.title })
            .then(result => { this.posts.push(result) })
    }
    editPost() {
        this.contentService.createPost(this.post)
    }

    toggleNewInput() {
        this.newInput = !this.newInput
    }

    openEditPostModal(post) {
        this.uiModalService.openModal(EditPostModal, {post: post}, 'Editar el post','Cerrar')
    }

    activatePost(postId) {
        this.contentService.activatePost(postId)
        .then(result => {
            let obj = this.posts.find((post, i) => {
                if (post._id === postId) {
                    this.posts[i] = result
                    return true; // stop searching
                }
            })
        })
    }

    desactivatePost(postId) {
        this.contentService.desactivatePost(postId)
            .then(result => {
                let obj = this.posts.find((post, i) => {
                    if (post._id === postId) {
                        this.posts[i] = result
                        return true; // stop searching
                    }
                })
            })
    }
}
