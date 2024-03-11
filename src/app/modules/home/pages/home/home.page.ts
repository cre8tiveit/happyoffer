import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  public items = [
    {
      title: 'Clients',
      background: 'bg-primary',
      icon: 'assets/images/user.svg',
      url: '/clients',
    },
    {
      title: 'Contacts',
      background: 'bg-primary',
      icon: 'assets/images/users.svg',
      url: '/contacts',
    },
    {
      title: 'Offers',
      background: 'bg-primary',
      icon: 'assets/images/offers.svg',
      url: '/offers',
    },
    {
      title: 'Notifications',
      background: 'bg-primary',
      icon: 'assets/images/offers.svg',
      url: '/notifications',
    },
    {
      title: 'Settings',
      background: 'bg-secondary',
      icon: 'assets/images/offers.svg',
      url: '/settings',
    },
  ];

  constructor(private readonly router: Router) {}

  public navigate(url: string): void {
    this.router.navigate([url]);
  }
}
