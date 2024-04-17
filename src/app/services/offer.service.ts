import axios from 'axios';

import { Injectable } from '@angular/core';

import {
  Observable,
  catchError,
  empty,
  from,
  last,
  map,
  throwError,
} from 'rxjs';
import { Offer } from '../core/types/types';
import { BASE_URL } from '../core/const';
import { getUser } from '../core/helpers/api.helper';
import { format } from 'date-fns';
import { LoggerToken } from '@ng-icons/core/lib/providers/features/logger';
@Injectable({
  providedIn: 'root',
})
export class OfferService {
  getOffers(): Observable<Offer[]> {
    const user = getUser();
    const token = user?.token || '';

    const url = `${BASE_URL}offers`;
    const config = {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };

    return from(axios.get(url, config)).pipe(
      map((response) => {
        console.log(
          'response offer',
          response.data.data[0].relationships.contact
        );
        const offers = response.data.data.map(
          (offer: any) =>
            ({
              id: offer.id,
              emailSubject: offer.attributes.email_subject,
              name: offer.attributes.name,
              offerDate: format(
                offer.attributes.offer_date,
                'dd-MM-yyyy HH:mm'
              ),
              offerNumber: offer.attributes.offer_number,
              offerStatus: offer.attributes.offer_status,
              offerType: offer.attributes.offer_type,
              totalOfferPriceOnce: offer.attributes.total_offer_price_once,
              totalOfferPriceRepeat: offer.attributes.total_offer_price_repeat,
              url: offer.attributes.url,
              client: {
                name: offer.relationships.client.company_name,
                websiteUrl: offer.relationships.client.website_url,
                email: offer.relationships.client.email,
                logo: offer.relationships.client.logo,
              },
              contact: {
                firstname: offer.relationships.contact.firstname,
                lastname: offer.relationships.contact.lastname,
                gender: offer.relationships.contact.gender,
                pjhoneNumber: offer.relationships.contact.phone_number,
                email: offer.relationships.contact.email,
              },
            } as any)
        );
        console.log('offers', offers);
        return offers;
      }),
      catchError((error) => throwError(() => error))
    );
  }
}
