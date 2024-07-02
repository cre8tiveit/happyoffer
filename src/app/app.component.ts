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
import { OfferService } from './services/offer.service';
import { DataService } from './services/data.service';

interface OfferData {
  offer_id: number;
}
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(
    private readonly store: Store,
    private readonly router: Router,
    private readonly offerService: OfferService,
    private readonly data: DataService
  ) {}

  ngOnInit(): void {
    if (localStorage.getItem('user') !== null) {
      const app = initializeApp(environment.firebase);

      FirebaseMessaging.addListener('notificationReceived', (event) => {
        console.log('notificationReceived: ', { event });
      });

      FirebaseMessaging.addListener('notificationActionPerformed', (event) => {
        const data = event.notification.data as OfferData;
        const offerId = data['offer_id'];
        this.gotoOffer(offerId);
      });
      this.dispatchAll();
    }
  }

  dispatchAll() {
    this.store.dispatch(new GetClients());
    this.store.dispatch(new GetOffers());
    this.store.dispatch(new GetNotifications());
    this.store.dispatch(new GetNotificationsCount());
    this.store.dispatch(new GetLogging());
  }

  gotoOffer(offerId: number) {
    this.offerService.getOffer(offerId).subscribe({
      next: (offer) => {
        if (offer) {
          this.data.setData(offer);
          this.router.navigate([`/offers/${offerId}`]);
          this.dispatchAll();
        } else {
          console.error('No offer data returned');
        }
      },
      error: (error) => {
        console.error('Failed to fetch offer:', error);
        // Optional: Navigate to an error page or show a user-friendly message
      },
    });
  }
}
