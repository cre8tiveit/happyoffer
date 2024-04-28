import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Capacitor } from '@capacitor/core';
import {
  FirebaseMessaging,
  GetTokenOptions,
} from '@capacitor-firebase/messaging';
import { initializeApp } from 'firebase/app';

@Component({
  selector: 'app-push',
  templateUrl: 'push.page.html',
})
export class PushNotificationsPage {
  constructor(private readonly router: Router) {
    const firebaseConfig = {
      apiKey: 'AIzaSyCjYxomqBfdyWyrp-DDZK8eorhs_purXaE',
      authDomain: 'happyoffer-fee6f.firebaseapp.com',
      projectId: 'happyoffer-fee6f',
      storageBucket: 'happyoffer-fee6f.appspot.com',
      messagingSenderId: '223887775459',
      appId: '1:223887775459:web:a541eda714c4157aae97d6',
      measurementId: 'G-M2PPV9365W',
    };
    const app = initializeApp(firebaseConfig);

    FirebaseMessaging.addListener('notificationReceived', (event) => {
      console.log('notificationReceived: ', { event });
    });
    FirebaseMessaging.addListener('notificationActionPerformed', (event) => {
      console.log('notificationActionPerformed: ', { event });
    });
  }

  public async next(): Promise<void> {
    await FirebaseMessaging.requestPermissions();
    this.router.navigate(['/home']);
  }
}
