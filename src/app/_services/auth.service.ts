import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase/app';
import { User } from '../_models/user.model';

@Injectable()
export class AuthService {
  private user: Observable<firebase.User>;
  private authState;

  constructor(private afa: AngularFireAuth, private afd: AngularFireDatabase, private router: Router) { 
    this.user = afa.authState;
  }

  authUser() {
    return this.user;
  }

  currentUserId() {
    return this.authState !== null ? this.authState.uid : '';
  }

  login(email, password) {
    return this.afa.auth.signInWithEmailAndPassword(email, password)
      .then ((resolve) => {
        this.authState = resolve;
        this.setUserStatus('online');
        this.router.navigate(['/chat']);
      }).catch(error => console.log(error));
  }

  logout() {
    this.afa.auth.signOut();
    this.router.navigate(['login']);
  }

  signUp(email, password, displayName) {
    return this.afa.auth.createUserWithEmailAndPassword(email, password)
      .then((user) => {
        this.authState = user;
        const status = 'online';
        this.setUserData(email, displayName, status);
      }).catch(error => console.log(error));
  }

  setUserData(email, displayName, status) {
    const path = 'users/' + this.currentUserId();
    const data = {
      email: email,
      displayName: displayName,
      status: status
    };

    this.afd.object(path).update(data)
      .catch(error => console.log(error));
  }

  setUserStatus(status) {
    const path = 'users/' + this.currentUserId();
    const data = {
      status: status
    };

    this.afd.object(path).update(data)
      .catch(error => console.log(error));
  }

}
