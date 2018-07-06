import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  private email;
  private password;
  private displayName;
  private errorMessage;

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit() {
  }

  signUp() {
    const email = this.email;
    const password = this.password;
    const displayName = this.displayName;
    this.auth.signUp(email, password, displayName)
      .then(resolve => this.router.navigate(['\chat'])
        .catch(error => this.errorMessage = error.message));
  }

}
