import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  isLoggedIn = false;

  constructor(
    public fireBaseAuth: AngularFireAuth,
    public firebaseCrud: AngularFirestore
  ) {}

  // Authentication
  async signin(email: string, password: string) {
    await this.fireBaseAuth
      .signInWithEmailAndPassword(email, password)
      .then((res) => {
        this.isLoggedIn = true;
        localStorage.setItem('user', JSON.stringify(res.user));
      });
  }

  async signup(email: string, password: string) {
    await this.fireBaseAuth
      .createUserWithEmailAndPassword(email, password)
      .then((res) => {
        this.isLoggedIn = true;
        localStorage.setItem('user', JSON.stringify(res.user));
      });
  }

  logout() {
    this.fireBaseAuth.signOut();
    localStorage.removeItem('user');
  }

  // Post

  getAllPost(){
    return this.firebaseCrud.collection('post').snapshotChanges()
  }

  createNewPost(postObject) {
    return this.firebaseCrud.collection('post').add(postObject)
  }

  updatePost(postId,post) {
    return  this.firebaseCrud.doc('post/' + postId).update(post)
  }

  deletePost(postId) {
    this.firebaseCrud.doc('post/' + postId).delete()
  }
}
