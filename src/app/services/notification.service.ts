import axios from 'axios';

import { Injectable } from '@angular/core';

import { Observable, catchError, from, map, throwError } from 'rxjs';
import { Notification } from '../core/types/types';
import { getUser } from '../core/helpers/api.helper';
import { BASE_URL } from '../core/const';
import { format } from 'date-fns';

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
        console.log('response', response.data.data);
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
        console.log('notifications', notifications);
        return notifications;
      }),
      catchError((error) => throwError(() => error))
    );
  }
}
