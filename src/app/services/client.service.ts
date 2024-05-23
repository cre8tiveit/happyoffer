import axios from 'axios';

import { Injectable } from '@angular/core';
import { Observable, catchError, from, map, throwError } from 'rxjs';
import { Client, Contact } from '../core/types/types';
import { BASE_URL } from '../core/const';
import { getConfig, getUser } from '../core/helpers/api.helper';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  getClients(): Observable<Client[]> {
    const user = getUser();
    const token = user?.token || '';

    const companyId = user?.company?.id;
    if (!companyId) {
      return throwError(() => new Error('Company ID is undefined'));
    }

    const url = `${BASE_URL}companies/${companyId}/clients`;
    const config = {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };

    return from(axios.get(url, config)).pipe(
      map((response) => {
        const clients = response.data.data.map(
          (client: any) =>
            ({
              id: client.id,
              name: client.attributes.company_name,
              email: client.attributes.email,
              phone: client.attributes.phone_number,
              address: client.attributes.address,
              houseNumber: client.attributes.house_number,
              city: client.attributes.city,
              zip: client.attributes.zip_code,
              chamberOfCommerce: client.attributes.chamber_of_commerce_number,
              country: client.attributes.country,
              websiteUrl: client.attributes.website_url,
              logo: client.attributes.logo,
              deletedAt: client.attributes.deleted_at,
            } as Client)
        );
        return clients.filter((client: Client) => !client.deletedAt);
      }),
      catchError((error) => throwError(() => error))
    );
  }

  updateClient(client: Client): void {
    const user = getUser();
    const url = `${BASE_URL}clients/${client.id}`;
    const config = getConfig(user);

    const updatedData = {
      company_name: client.name,
      address: client.address,
      house_number: client.houseNumber,
      zip_code: client.zip,
      country: client.country,
      city: client.city,
      phone_number: client.phone,
      website_url: client.websiteUrl,
      chamber_of_commerce_number: client.chamberOfCommerce,
      email: client.email,
    };
    axios.patch(url, updatedData, config);
  }

  addClient(client: Client): Promise<void> {
    const user = getUser();
    const url = `${BASE_URL}clients`;
    const config = getConfig(user);

    const updatedData = {
      company_id: user?.company?.id,
      company_name: client.name,
      address: client.address,
      house_number: client.houseNumber,
      zip_code: client.zip,
      country: client.country,
      city: client.city,
      phone_number: client.phone,
      website_url: client.websiteUrl,
      chamber_of_commerce_number: client.chamberOfCommerce,
      email: client.email,
    };
    return axios.post(url, updatedData, config);
  }

  getContacts(id: number): Observable<Contact[]> {
    const user = getUser();
    const token = user?.token || '';

    const url = `${BASE_URL}clients/${id}/contacts`;
    const config = {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };

    return from(axios.get(url, config)).pipe(
      map((response) => {
        const contacts = response.data.data.map(
          (contact: any) =>
            ({
              id: contact.id,
              firstname: contact.attributes.firstname,
              lastname: contact.attributes.lastname,
              gender: contact.attributes.gender,
              email: contact.attributes.email,
              emailConfirmation: contact.attributes.email_confirmation,
              phoneNumber: contact.attributes.phone_number,
              note: contact.attributes.note,
              deletedAt: contact.attributes.deleted_at,
            } as Contact)
        );

        return contacts.filter((contact: Contact) => !contact.deletedAt);
      }),
      catchError((error) => throwError(() => error))
    );
  }
}
