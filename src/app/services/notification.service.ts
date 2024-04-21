import axios from 'axios';

import { Injectable } from '@angular/core';

import { Observable, catchError, from, map, throwError } from 'rxjs';
import { Notification, NotificationCount } from '../core/types/types';
import { getUser } from '../core/helpers/api.helper';
import { BASE_URL } from '../core/const';
import { format } from 'date-fns';
import { DeleteNotification } from '../core/stores/offer/offer.actions';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  getNotifications(): Observable<Notification[]> {
    const user = getUser();
    const token = user?.token || '';

    const url = `${BASE_URL}notifications`;
    const config = {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };

    return from(axios.get(url, config)).pipe(
      map((response) => {
        const notifications = response.data.data.map(
          (notification: any) =>
            ({
              id: notification.id,
              message: notification.attributes.message,
              type: notification.attributes.type,
              read: notification.attributes.read,
              createdAt: format(
                notification.attributes.created_at,
                'dd-MM-yyyy HH:mm'
              ),

              updatedAt: notification.attributes.updated_at,
              offerId: notification.attributes.offer_id,
              createdBy: notification.attributes.created_by,
            } as Notification)
        );
        return notifications;
      }),
      catchError((error) => throwError(() => error))
    );
  }

  getNotificationCount(): Observable<NotificationCount> {
    const user = getUser();
    const token = user?.token || '';

    const url = `${BASE_URL}notifications/count`;
    const config = {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };

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
    const user = getUser();
    const token = user?.token || '';

    const url = `${BASE_URL}notifications/${id}`;
    const config = {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };

    axios.delete(url, config);
  }
}
