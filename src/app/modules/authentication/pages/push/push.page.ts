import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Capacitor } from '@capacitor/core';
import {
  FirebaseMessaging,
  GetTokenOptions,
} from '@capacitor-firebase/messaging';
import { initializeApp } from 'firebase/app';
import { environment } from 'src/environments/environment';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-push',
  templateUrl: 'push.page.html',
})
export class PushNotificationsPage {
  constructor(private readonly router: Router, private readonly userService: UserService) {
    const app = initializeApp(environment.firebase);

    FirebaseMessaging.addListener('notificationReceived', (event) => {
      console.log('notificationReceived: ', { event });
    });

    FirebaseMessaging.addListener('notificationActionPerformed', (event) => {
      console.log('notificationActionPerformed: ', { event });
    });
  }

  public async next(): Promise<void> {
    if (Capacitor.isNativePlatform()) {
      await FirebaseMessaging.requestPermissions();
      await this.getToken();
    }
    this.router.navigate(['/home']);
  }

  public async getToken(): Promise<void> {
    const { token } = await FirebaseMessaging.getToken();
    console.log('Token: ', token);
    this.userService.saveToken(token)
  }
}
