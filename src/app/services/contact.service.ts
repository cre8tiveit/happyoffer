import axios from 'axios';

import { Injectable } from '@angular/core';
import { mockData } from './data.';
import { Observable } from 'rxjs';
import { Contact } from '../core/types/types';

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
