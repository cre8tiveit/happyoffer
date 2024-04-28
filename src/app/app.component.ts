import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import {
  GetClients,
  GetLogging,
  GetNotifications,
  GetNotificationsCount,
  GetOffers,
} from './core/stores/offer/offer.actions';
import { NotificationsService } from './services/notifications.service';
import { Capacitor } from '@capacitor/core';
import { initializeApp } from 'firebase/app';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(
    private readonly store: Store,
    private readonly notificationsService: NotificationsService
  ) {}
  ngOnInit(): void {
    if (localStorage.getItem('user') !== null) {
      this.store.dispatch(new GetClients());
      this.store.dispatch(new GetOffers());
      this.store.dispatch(new GetNotifications());
      this.store.dispatch(new GetNotificationsCount());
      this.store.dispatch(new GetLogging());
    }
  }
}
