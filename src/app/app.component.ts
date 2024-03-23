import { Component } from '@angular/core';
import { Store } from '@ngxs/store';
import { GetClients } from './core/stores/offer/offer.actions';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private readonly store: Store) {
    this.store.dispatch(new GetClients());
  }
}
