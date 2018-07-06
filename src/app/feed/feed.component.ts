import { Component, OnInit, OnChanges } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ChatService } from '../_services/chat.service';
import { ChatMessage } from '../_models/chat-message.model';
import { AngularFireDatabase } from 'angularfire2/database';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss']
})
export class FeedComponent implements OnInit, OnChanges {
  private feed: Observable<any[]>;

  constructor(private chat: ChatService, private afd: AngularFireDatabase) {
  }

  ngOnInit() {
    this.feed = this.chat.getMessages();
  }

  ngOnChanges() {
    this.feed = this.chat.getMessages();
  }

}
