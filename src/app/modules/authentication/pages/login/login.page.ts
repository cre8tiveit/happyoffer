import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import {
  GetClients,
  GetContacts,
  GetOffers,
  GetNotifications,
  GetLogging,
  GetNotificationsCount,
} from 'src/app/core/stores/offer/offer.actions';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: 'login.page.html',
  styleUrls: ['login.page.scss'],
})
export class LoginPage implements OnInit {
  public loginForm: any;

  constructor(
    private readonly router: Router,
    private readonly store: Store,
    private readonly authenticationService: AuthenticationService
  ) {}
  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, Validators.required),
    });
  }

  public async login(): Promise<void> {
    const user = await this.authenticationService.login(
      'henk@cre8tiveit.nl',
      'password'
    );
    console.log(user);
    localStorage.setItem('user', JSON.stringify(user));
    this.store.dispatch(new GetClients());
    this.store.dispatch(new GetOffers());
    this.store.dispatch(new GetNotifications());
    this.store.dispatch(new GetNotificationsCount());
    this.store.dispatch(new GetLogging());
    this.router.navigate(['/home']);
  }
}
