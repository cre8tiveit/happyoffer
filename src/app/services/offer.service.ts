import axios from 'axios';

import { Injectable } from '@angular/core';
import { mockData } from './data.';
import { Observable } from 'rxjs';
import { Offer } from '../core/types/types';
@Injectable({
  providedIn: 'root',
})
export class OfferService {
  getOffers(): Observable<Offer[]> {
    return new Observable<Offer[]>((subscriber) => {
      try {
        const response = mockData.offers;
        subscriber.next(response);
        subscriber.complete();
      } catch (error) {
        subscriber.error(error);
      }
    });
  }
}
