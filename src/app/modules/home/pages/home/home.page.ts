import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Capacitor } from '@capacitor/core';
import { NavController } from '@ionic/angular';
import { Select } from '@ngxs/store';
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
      badge: 1,
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
    private readonly router: Router,
    private readonly navController: NavController
  ) {}

  ngOnInit(): void {
    this.notificationsCount$.subscribe((notificationsCount) => {
      this.notificationsCount = notificationsCount.data as NotificationCount;
      console.log('notifications', this.notificationsCount);
      this.items[3].badge = this.notificationsCount.count;
    });

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
  }

  public navigate(url: string): void {
    this.navController.navigateForward(url);
  }
}
