import { APIService } from './api/api.service';
import { FeathersDataResourceService } from './api/data-resoucers-feathers.service';
import { Injectable } from '@angular/core'


@Injectable()
export class ContentService {
    private blogService: any


    constructor(private apiService: APIService,
        private feathersDataResourceService: FeathersDataResourceService) {
        this.blogService = this.apiService.getService('blog')
    }


    //-------------------- BLOG MANAGEMENT---------------------\\
    createPost(params){
      return this.blogService.create(params)
    }

    getPost(id){
       return this.blogService.get(id)
      // .then(response => console.log(response))
    }

    getPosts(){
       return this.blogService.find({})
        .then(response => response)

    }

    getLastActivePosts(number){
      let params = {
          query: {
            $limit: number,
            $sort: {'createdAt': -1},
            active: true,
            $select: {
              title: 1,
              subtitle: 1
        }
          }
        }
      return this.blogService.find(params)
    }

    activatePost(postId){
      return this.blogService.patch(postId, { active: true})
    }

    desactivatePost(postId){
      return this.blogService.patch(postId, { active: false})
    }

    editPost(post){
      return this.blogService.patch(post._id, post)
    }

    getLandingPosts(){
      let params = {
        query: {
        //active: true,
        $limit: 3
        }
      }
      return this.blogService.find(params)
    }

}
