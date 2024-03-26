import { Injectable, OnDestroy } from '@angular/core';

import { StateDataObject } from '../../types/store/state-data-object.type';
import { StateDataObjectHelper } from '../../helpers/state-data-object.helper';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { Observable, Subject, filter, takeUntil, tap } from 'rxjs';
import { GetNotifications } from './offer.actions';
import { inspectStatus } from '../../helpers/rxjs.helper';
import { NotificationService } from 'src/app/services/notification.service';
import { Logging, Notification } from '../../types/types';
import { LoggingService } from 'src/app/services/logging.service';

export interface LoggingStateModel {
  logging: StateDataObject<Logging[]>;
}

@State<LoggingStateModel>({
  name: 'logging',
  defaults: {
    logging: StateDataObjectHelper.getStateDataObject(),
  },
})
@Injectable()
export class LoggingState implements OnDestroy {
  private readonly _unsubscribe: Subject<void> = new Subject<void>();

  constructor(private readonly loggingService: LoggingService) {}

  @Selector()
  public static logging(state: LoggingStateModel): StateDataObject<Logging[]> {
    return state.logging;
  }

  @Action(GetNotifications)
  public GetLogging({
    patchState,
  }: StateContext<LoggingStateModel>): Observable<StateDataObject<Logging[]>> {
    return this.loggingService.getLogging().pipe(
      filter((logging) => !!logging),
      inspectStatus(),
      tap((result) => patchState({ logging: result })),
      takeUntil(this._unsubscribe)
    );
  }

  ngOnDestroy(): void {
    this._unsubscribe.next();
    this._unsubscribe.complete();
  }
}
