import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import {
  GetClients,
  GetContacts,
  GetLogging,
  GetNotifications,
  GetOffers,
} from './core/stores/offer/offer.actions';
import { NotificationsService } from './services/notifications.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(
    private readonly store: Store,
    private readonly notificationsService: NotificationsService
  ) {
    this.store.dispatch(new GetClients());
    this.store.dispatch(new GetContacts());
    this.store.dispatch(new GetOffers());
    this.store.dispatch(new GetNotifications());
    this.store.dispatch(new GetLogging());
  }
  ngOnInit(): void {
    this.notificationsService.registerNotifications();
    this.notificationsService.addListeners();
  }
}
