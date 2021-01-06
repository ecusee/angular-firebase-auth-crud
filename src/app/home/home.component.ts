import { Component, EventEmitter, Output } from '@angular/core';
import { FirebaseService } from '../service/firebase.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  @Output() isLogout = new EventEmitter<void>()
  constructor(public firebaseService: FirebaseService) { }

  // Get all posts
  ngOnInit() {
    this.firebaseService.getAllPost().subscribe(data => {
      this.post = data.map(e => {
        return {
          id: e.payload.doc.id,
          isEdit:false,
          name: e.payload.doc.data()['name'],
          content: e.payload.doc.data()['content']
        }
      })
    })
  }

  logout(){
    this.firebaseService.logout()
    this.isLogout.emit()
  }

  // Post

  post: any;
  postName: string;
  postContent: string;

  createPost() {
    let Post= {};
    Post['name'] = this.postName;
    Post['content'] = this.postContent;

    this.firebaseService.createNewPost(Post).then(res => {
      this.postName = '';
      this.postContent = '';
    })
    .catch(err => {
      console.log(err)
    })
  }

  editPost(postEdit) {
    postEdit.isEdit = true
  }

  updatePost(postData) {
    let updatedPost = {};
    
    updatedPost['name'] = postData.name;
    updatedPost['content'] = postData.content;

    this.firebaseService.updatePost(postData.id,updatedPost)
    postData.isEdit = false;
  }

  deletePost(postId) {
    this.firebaseService.deletePost(postId)
  } 
  
}
