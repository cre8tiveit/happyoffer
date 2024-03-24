import axios from 'axios';

import { Injectable } from '@angular/core';
import { mockData } from './data.';
import { Observable } from 'rxjs';
import { Notification } from '../core/types/types';
@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  getNotifications(): Observable<Notification[]> {
    return new Observable<Notification[]>((subscriber) => {
      try {
        const response = mockData.notifications;
        subscriber.next(response);
        subscriber.complete();
      } catch (error) {
        subscriber.error(error);
      }
    });
  }
}
