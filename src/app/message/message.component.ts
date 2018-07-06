import { Component, OnInit, Input } from '@angular/core';
import { ChatService } from '../_services/chat.service';
import { AuthService } from '../_services/auth.service';
import { ChatMessage } from '../_models/chat-message.model';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit {
  @Input() chatMessage: ChatMessage;
  private userEmail: string;
  private userName: string;
  private messageContent: string;
  private timeStamp: Date = new Date();
  private isOwnMessage: boolean;

  constructor() { }

  ngOnInit(chatMessage = this.chatMessage) {
    this.messageContent = chatMessage.message;
    this.timeStamp = chatMessage.timeSent;
    this.userEmail = chatMessage.email;
    this.userName = chatMessage.userName;
  }
}
