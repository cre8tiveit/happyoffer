import { Injectable, OnDestroy } from '@angular/core';

import { StateDataObject } from '../../types/store/state-data-object.type';
import { StateDataObjectHelper } from '../../helpers/state-data-object.helper';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { Observable, Subject, filter, takeUntil, tap } from 'rxjs';
import { AddNote, DeleteNotification, GetNotifications } from './offer.actions';
import { inspectStatus } from '../../helpers/rxjs.helper';
import { NotificationService } from 'src/app/services/notification.service';
import { Notification, NotificationCount } from '../../types/types';
import { Badge } from '@capawesome/capacitor-badge';

export interface NotificationStateModel {
  notifications: StateDataObject<Notification[]>;
  count: StateDataObject<NotificationCount>;
}

@State<NotificationStateModel>({
  name: 'notification',
  defaults: {
    notifications: StateDataObjectHelper.getStateDataObject(),
    count: StateDataObjectHelper.getStateDataObject(),
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

  @Selector()
  public static count(
    state: NotificationStateModel
  ): StateDataObject<NotificationCount> {
    return state.count;
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

  @Action(GetNotifications)
  public getNotificationsCount({
    patchState,
  }: StateContext<NotificationStateModel>): Observable<
    StateDataObject<NotificationCount>
  > {
    return this.notificationService.getNotificationCount().pipe(
      filter((notificationsCount) => !!notificationsCount),
      inspectStatus(),
      tap(async (result) => {
        const count = result.data?.count || 0;
        if (count > 0) {
          Badge.set({ count });
        } else {
          Badge.clear();
        }

        patchState({ count: result });
      }),
      takeUntil(this._unsubscribe)
    );
  }

  @Action(DeleteNotification)
  public deleteNotification(
    { getState, patchState }: StateContext<NotificationStateModel>,
    { id }: DeleteNotification
  ) {
    const currentNotifications = getState().notifications?.data || [];
    this.notificationService.deleteNotification(id);
    const updatedNotifications = currentNotifications.filter(
      (notification) => notification.id !== id
    );
    Badge.decrease();
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
