import axios from 'axios';

import { Injectable } from '@angular/core';
import { mockData } from './data.';
import { Client } from '../core/stores/offer/offer.state';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  getClients(): Observable<Client[]> {
    return new Observable<Client[]>((subscriber) => {
      try {
        const response = mockData.clients;

        subscriber.next(response);
        subscriber.complete();
      } catch (error) {
        subscriber.error(error);
      }
    });
  }
}
