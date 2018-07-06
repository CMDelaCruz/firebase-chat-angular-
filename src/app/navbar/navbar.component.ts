import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  private user: Observable<firebase.User>;
  private userEmail;

  constructor(private auth: AuthService) { }

  ngOnInit() {
    this.user = this.auth.authUser();
    this.user.subscribe(user => {
      if(user) {
        this.userEmail = user.email;
      }
    });
  }

}
