import axios from 'axios';
import { Injectable } from '@angular/core';
import { Observable, catchError, from, map, throwError } from 'rxjs';
import { Note, Offer } from '../core/types/types';
import { BASE_URL } from '../core/const';
import { getUser } from '../core/helpers/api.helper';
import { format } from 'date-fns';
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
        const offers = response.data.data.map(
          (offer: any) =>
            ({
              id: offer.id,
              emailSubject: offer.attributes.email_subject,
              name: offer.attributes.name,
              created: offer.attributes.created_at,
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
                phoneNumber: offer.relationships.contact.phone_number,
                email: offer.relationships.contact.email,
              },
            } as any)
        );

        return (offers as Offer[]).sort(
          (a, b) =>
            new Date(b.created).getTime() - new Date(a.created).getTime()
        );
      }),
      catchError((error) => throwError(() => error))
    );
  }

  getOffer(id: string): Observable<Offer> {
    const user = getUser();
    const token = user?.token || '';
    const url = `${BASE_URL}offers/${id}`;
    const config = {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };

    return from(axios.get(url, config)).pipe(
      map((response) => {
        const offers = response.data.data.map(
          (offer: any) =>
            ({
              id: offer.id,
              emailSubject: offer.attributes.email_subject,
              name: offer.attributes.name,
              created: offer.attributes.created_at,
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
                phoneNumber: offer.relationships.contact.phone_number,
                email: offer.relationships.contact.email,
              },
            } as any)
        );

        return offers[0];
      }),
      catchError((error) => throwError(() => error))
    );
  }

  getNotes(offerId: number): Observable<Note[]> {
    const user = getUser();
    const token = user?.token || '';

    const url = `${BASE_URL}offers/${offerId}/notes`;
    const config = {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };

    return from(axios.get(url, config)).pipe(
      map((response) => {
        const notes = response.data.data.map(
          (note: any) =>
            ({
              id: note.id,
              createdBy: note.attributes.created_by,
              is_push_notification: note.attributes.is_push_notification,
              type: note.attributes.type,
              message: note.attributes.message,
              isDeletedApp: note.attributes.is_deleted_app,
              isCreatedAt: note.attributes.is_created_at,
              isUpdatedAt: note.attributes.is_updated_at,
            } as any)
        );

        return notes;
      }),
      catchError((error) => throwError(() => error))
    );
  }
}
