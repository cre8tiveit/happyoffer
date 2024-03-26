import { Component } from '@angular/core';
import { Store } from '@ngxs/store';
import {
  GetClients,
  GetContacts,
  GetLogging,
  GetNotifications,
  GetOffers,
} from './core/stores/offer/offer.actions';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private readonly store: Store) {
    this.store.dispatch(new GetClients());
    this.store.dispatch(new GetContacts());
    this.store.dispatch(new GetOffers());
    this.store.dispatch(new GetNotifications());
    this.store.dispatch(new GetLogging());
  }
}
