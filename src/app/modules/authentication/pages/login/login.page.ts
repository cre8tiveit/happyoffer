import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: 'login.page.html',
  styleUrls: ['login.page.scss'],
})
export class LoginPage {
  public loginForm: any;

  constructor() {}

  public login(): void {
    console.log('login');
  }
}
