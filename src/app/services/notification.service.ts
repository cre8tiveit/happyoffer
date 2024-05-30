import axios from 'axios';

import { Injectable } from '@angular/core';

import { Observable, catchError, from, map, throwError } from 'rxjs';
import { Notification, NotificationCount } from '../core/types/types';
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
    const config = getConfig();

    return from(axios.get(url, config)).pipe(
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
    const config = getConfig();
    axios.delete(url, config);
  }

  turnOffNotificationForOffer(id: string): void {
    const url = `${BASE_URL}notifications`;
    const config = getConfig();
    const data = {
      offer_id: id,
    };
    axios.post(url, data, config);
  }

  turnOnNotificationForOffer(id: string): void {
    const url = `${BASE_URL}notifications/${id}`;
    const config = getConfig();
    axios.delete(url, config);
  }

  getBlacklistedOffers(): String[] {
    return ['56'];
  }
}
