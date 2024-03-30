import { Injectable, OnDestroy } from '@angular/core';

import { StateDataObject } from '../../types/store/state-data-object.type';
import { StateDataObjectHelper } from '../../helpers/state-data-object.helper';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { Observable, Subject, filter, takeUntil, tap } from 'rxjs';
import { DeleteNotification, GetNotifications } from './offer.actions';
import { inspectStatus } from '../../helpers/rxjs.helper';
import { NotificationService } from 'src/app/services/notification.service';
import { Notification } from '../../types/types';

export interface NotificationStateModel {
  notifications: StateDataObject<Notification[]>;
}

@State<NotificationStateModel>({
  name: 'notification',
  defaults: {
    notifications: StateDataObjectHelper.getStateDataObject(),
  },
})
@Injectable()
export class NotificationState implements OnDestroy {
  private readonly _unsubscribe: Subject<void> = new Subject<void>();

  constructor(private readonly notificationService: NotificationService) {}

  @Selector()
  public static notifications(
    state: NotificationStateModel
  ): StateDataObject<Notification[]> {
    return state.notifications;
  }

  @Action(GetNotifications)
  public GetNotifications({
    patchState,
  }: StateContext<NotificationStateModel>): Observable<
    StateDataObject<Notification[]>
  > {
    return this.notificationService.getNotifications().pipe(
      filter((notifications) => !!notifications),
      inspectStatus(),
      tap((result) => patchState({ notifications: result })),
      takeUntil(this._unsubscribe)
    );
  }

  @Action(DeleteNotification)
  public deleteClient(
    { getState, patchState }: StateContext<NotificationStateModel>,
    { id }: DeleteNotification
  ) {
    const currentNotifications = getState().notifications?.data || [];
    const updatedNotifications = currentNotifications.filter(
      (notification) => notification.id !== id
    );

    patchState({
      notifications: {
        ...getState().notifications,
        data: updatedNotifications,
      },
    });
  }

  ngOnDestroy(): void {
    this._unsubscribe.next();
    this._unsubscribe.complete();
  }
}
