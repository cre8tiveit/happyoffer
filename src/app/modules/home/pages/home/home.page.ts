import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Capacitor } from '@capacitor/core';
import { Badge } from '@capawesome/capacitor-badge';
import { NavController } from '@ionic/angular';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { NotificationState } from 'src/app/core/stores/offer/notification.state';
import { GetNotificationsCount } from 'src/app/core/stores/offer/offer.actions';
import { StateDataObject } from 'src/app/core/types/store/state-data-object.type';
import { NotificationCount } from 'src/app/core/types/types';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  @Select(NotificationState.count)
  public readonly notificationsCount$: Observable<
    StateDataObject<NotificationCount>
  >;

  public isAndroid = false;
  public isIos = false;
  public isWeb = false;

  public notificationsCount: NotificationCount = {
    count: 0,
  };

  public items = [
    {
      title: 'Clients',
      background: 'bg-primary',
      icon: 'heroUser',
      activieBackground: 'bg-primary',
      url: '/clients',
      badge: 0,
      classes: '',
    },
    {
      title: 'Contacts',
      background: 'bg-primary',
      activeBackground: 'bg-primary',
      icon: 'heroUserGroup',
      url: '/contacts',
      badge: 0,
      classes: '',
    },
    {
      title: 'Offers',
      background: 'bg-primary',
      activeBackground: 'bg-primary',
      icon: 'heroDocumentText',
      badge: 0,
      url: '/offers',
      classes: '',
    },
    {
      title: 'Notifications',
      background: 'bg-primary',
      activeBackground: 'bg-primary',
      icon: 'heroBellAlert',
      badge: 0,
      url: '/notifications',
      classes: '',
    },
    {
      title: 'Settings',
      background: 'bg-tertiary',
      activeBackground: 'bg-red-500',
      icon: 'heroCog6Tooth',
      url: '/settings',
      badge: 0,
      classes: '',
    },
  ];

  constructor(
    private readonly navController: NavController,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.updateNotificationsCount();
    this.store.dispatch(new GetNotificationsCount());
  }

  ionViewWillEnter(): void {
    this.store.dispatch(new GetNotificationsCount());
  }

  public navigate(url: string): void {
    this.navController.navigateForward(url);
  }

  updateNotificationsCount(): void {
    this.notificationsCount$.subscribe(async (notificationsCount) => {
      this.notificationsCount = notificationsCount.data as NotificationCount;
      this.items[3].badge = this.notificationsCount?.count;
      const isSupported = await Badge.isSupported();

      this.isAndroid = Capacitor.getPlatform() === 'android';
      this.isIos = Capacitor.getPlatform() === 'ios';
      this.isWeb = Capacitor.getPlatform() === 'web';
      this.items = this.items.map((item) => {
        const classes = `${item.background}`;
        const updatedItem = {
          ...item,
          classes,
        };
        return updatedItem;
      });
    });
  }
}
