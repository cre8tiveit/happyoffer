import axios from 'axios';

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Logging } from '../core/types/types';
@Injectable({
  providedIn: 'root',
})
export class LoggingService {
  getLogging(): Observable<Logging[]> {
    return new Observable<Logging[]>((subscriber) => {
      try {
        const response=  undefined
        subscriber.next(response);
        subscriber.complete();
      } catch (error) {
        subscriber.error(error);
      }
    });
  }
}
