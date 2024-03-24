import axios from 'axios';

import { Injectable } from '@angular/core';
import { mockData } from './data.';
import { Observable } from 'rxjs';
import { Client } from '../core/types/types';

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
