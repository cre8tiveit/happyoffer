import axios from 'axios';

import { Injectable } from '@angular/core';

import { Observable, catchError, from, map, throwError } from 'rxjs';
import { Notification, NotificationCount, PostNote } from '../core/types/types';
import { getConfig } from '../core/helpers/api.helper';
import { BASE_URL } from '../core/const';
import { format } from 'date-fns';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  getNotifications(): Observable<Notification[]> {
    const url = `${BASE_URL}notifications`;
    const config = getConfig();

    return from(axios.get(url, config)).pipe(
      map((response) => {
        const notifications = response.data.data.map(
          (notification: any) =>
            ({
              id: notification.id,
              message: notification.attributes.message,
              type: notification.attributes.type,
              read: notification.attributes.read,
              created: notification.attributes.created_at,
              createdAt: format(
                notification.attributes.created_at,
                'dd-MM-yyyy HH:mm'
              ),

              updatedAt: notification.attributes.updated_at,
              offerId: notification.attributes.offer_id,
              createdBy: notification.attributes.created_by,
            } as Notification)
        );
        return (notifications as Notification[]).sort(
          (a, b) =>
            new Date(b.created).getTime() - new Date(a.created).getTime()
        );
      }),
      catchError((error) => throwError(() => error))
    );
  }

  getNotificationCount(): Observable<NotificationCount> {
    const url = `${BASE_URL}notifications/count`;
    return from(axios.get(url, getConfig())).pipe(
      map((response) => {
        return {
          count: response.data.data.notification_count,
        } as NotificationCount;
      }),
      catchError((error) => throwError(() => error))
    );
  }

  deleteNotification(id: number): void {
    const url = `${BASE_URL}notifications/${id}`;
    axios.delete(url, getConfig());
  }

  addNotification(note: PostNote): Promise<any> {
    const url = `${BASE_URL}notes`;
    return axios.post(url, note, getConfig());
  }

  turnOffNotificationForOffer(id: string): void {
    const url = `${BASE_URL}notifications/blacklist`;
    const data = {
      offer_id: id,
    };
    axios.post(url, data, getConfig());
  }

  turnOnNotificationForOffer(id: string): void {
    const url = `${BASE_URL}notifications/blacklist/${id}`;
    axios.delete(url, getConfig());
  }

  getBlacklistedOffers(): Observable<String[]> {
    const url = `${BASE_URL}blacklisted`;
    const config = getConfig();
    return from(axios.get(url, config)).pipe(
      map((response) => {
        const blacklistedOffers = response.data.data.map(
          (blacklisted: any) => '' + blacklisted.offer_id
        );
        return blacklistedOffers as String[];
      })
    );
  }
}
