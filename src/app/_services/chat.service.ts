import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import { ChatMessage } from '../_models/chat-message.model';
import { AuthService } from '../_services/auth.service';
import * as firebase from 'firebase';

@Injectable()
export class ChatService {
  private user: firebase.User;
  private chatMessages: FirebaseListObservable<ChatMessage[]>;
  private chatMessage: ChatMessage;
  private userName: Observable<string>;

  private userId;
  private email;

  constructor(private afd: AngularFireDatabase, private afa: AngularFireAuth) {
    this.afa.authState.subscribe(auth => {
      if (auth !== undefined && auth !== null) {
        this.userId = auth.uid;
        this.email = auth.email;
      }
    });

    this.getUser(this.userId).subscribe(res => {
      this.userName = res.displayName;
      console.log(res);
    });
  }

  getUser(userId) {
    const path = `users/${userId}`;

    return this.afd.object(path);
  }

  getUsers() {
    const path = '/users';
    return this.afd.list(path);
  }

  sendMessage(message) {
    const timestamp = this.getTimeStamp();
    console.log(this.userName);
    this.chatMessages = this.getMessages();
    this.chatMessages.push({
      message: message,
      timeSent: timestamp,
      userName: this.userName,
      email: this.email
    });
  }

  getMessages(): FirebaseListObservable<ChatMessage[]> {
    return this.afd.list('messages', {
      query: {
        limitToLast: 50
      }
    });
  }

  getTimeStamp() {
    const now = new Date();
    const date = now.getUTCFullYear() + '-' +
                 (now.getUTCMonth() + 1) + '-' +
                 now.getUTCDate();
    const time = now.getUTCHours() + ':' +
                 now.getUTCMinutes();

    return (date + ' ' + time);
  }

}
