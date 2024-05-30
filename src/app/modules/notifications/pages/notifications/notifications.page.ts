import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Select, Store } from '@ngxs/store';
import { Observable, of, tap } from 'rxjs';
import { NotificationState } from 'src/app/core/stores/offer/notification.state';
import { DeleteNotification } from 'src/app/core/stores/offer/offer.actions';
import { StateDataObject } from 'src/app/core/types/store/state-data-object.type';
import { Notification } from 'src/app/core/types/types';

@Component({
  selector: 'app-notifications',
  templateUrl: 'notifications.page.html',
  styleUrls: ['notifications.page.scss'],
})
export class NotificationsPage implements OnInit {
  @Select(NotificationState.notifications)
  public readonly notifications$: Observable<StateDataObject<Notification[]>>;

  constructor(
    private readonly store: Store,
    private readonly navController: NavController
  ) {}

  public notifications: Notification[] = [];

  ngOnInit(): void {
    this.notifications$.subscribe((notifications) => {
      this.notifications = notifications.data as Notification[];
    });
  }

  public delete(id: number): void {
    console.log('delete', id);
    this.store.dispatch(new DeleteNotification(id));
  }

  public showOffer(offerId: number): void {
    this.navController.navigateForward(`notifications/offer/${offerId}`);
  }
}
