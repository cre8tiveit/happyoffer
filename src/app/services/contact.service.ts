import axios from 'axios';

import { Injectable } from '@angular/core';
import { mockData } from './data.';
import { Client, Contact } from '../core/stores/offer/offer.state';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  getContacts(): Observable<Contact[]> {
    return new Observable<Contact[]>((subscriber) => {
      try {
        const response = mockData.contacts;

        subscriber.next(response);
        subscriber.complete();
      } catch (error) {
        subscriber.error(error);
      }
    });
  }
}
