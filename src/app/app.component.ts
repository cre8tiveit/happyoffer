import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import {
  GetClients,
  GetLogging,
  GetNotifications,
  GetNotificationsCount,
  GetOffers,
} from './core/stores/offer/offer.actions';
import { FirebaseMessaging } from '@capacitor-firebase/messaging';
import { initializeApp } from 'firebase/app';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

interface OfferData {
  offer_id: number;
}
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private readonly store: Store, private readonly router: Router) {}
  ngOnInit(): void {
    if (localStorage.getItem('user') !== null) {
      const app = initializeApp(environment.firebase);

      FirebaseMessaging.addListener('notificationReceived', (event) => {
        console.log('notificationReceived: ', { event });
      });

      FirebaseMessaging.addListener('notificationActionPerformed', (event) => {
        const data = event.notification.data as OfferData;
        const offerId = data['offer_id'];
        this.router.navigate([`/offers/${offerId}`]);
      });

      this.store.dispatch(new GetClients());
      this.store.dispatch(new GetOffers());
      this.store.dispatch(new GetNotifications());
      this.store.dispatch(new GetNotificationsCount());
      this.store.dispatch(new GetLogging());
    }
  }
}
