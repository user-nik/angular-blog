import { Component, OnInit, OnDestroy } from '@angular/core';
import { PostsService } from 'src/app/shared/posts.service';
import { Post } from 'src/app/shared/interfaces';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit, OnDestroy {

  posts: Post[] = []
  pSub: Subscription
  dSub: Subscription
  searchStr = ''

  constructor(private postService: PostsService) { }

  ngOnDestroy(): void {
    if(this.pSub){
      this.pSub.unsubscribe()
    }
    if(this.dSub){
      this.dSub.unsubscribe()
    }
  }

  remove(id: string){
    this.dSub = this.postService.remove(id)
    .subscribe(()=>{
      this.posts = this.posts.filter(post=>post.id !== id)
    })
  }

  ngOnInit(): void {
    this.pSub = this.postService.getAll()
    .subscribe(posts => {
      this.posts = posts
    })
  }

}
