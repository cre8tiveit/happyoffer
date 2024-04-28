import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Capacitor } from '@capacitor/core';
import { Store } from '@ngxs/store';
import {
  GetClients,
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
  public disabled = true;
  public isAndroid = false;
  public isIos = false;
  public isWeb = false;
  public error = false;

  constructor(
    private readonly router: Router,
    private readonly store: Store,
    private readonly authenticationService: AuthenticationService
  ) {}
  ngOnInit(): void {
    this.isAndroid = Capacitor.getPlatform() === 'android';
    this.isIos = Capacitor.getPlatform() === 'ios';
    this.isWeb = Capacitor.getPlatform() === 'web';
    this.loginForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, Validators.required),
    });
  }

  public async login(): Promise<void> {
    const email = this.loginForm.get('email').value;
    const password = this.loginForm.get('password').value;
    this.authenticationService
      .login(email, password)
      .then((user) => {
        localStorage.setItem('user', JSON.stringify(user));
        this.store.dispatch(new GetClients());
        this.store.dispatch(new GetOffers());
        this.store.dispatch(new GetNotifications());
        this.store.dispatch(new GetNotificationsCount());
        this.store.dispatch(new GetLogging());
        this.router.navigate(['/auth/push']);
      })
      .catch((error) => {
        this.error = true;
      });
  }

  public clearError(): void {
    this.error = false;
  }
}
