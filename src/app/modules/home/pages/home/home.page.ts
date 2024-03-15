import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  public items = [
    {
      title: 'Clients',
      background: 'bg-primary',
      icon: 'assets/images/user.svg',
      activieBackground: 'bg-primary',
      url: '/clients',
      classes: '',
    },
    {
      title: 'Contacts',
      background: 'bg-primary',
      activeBackground: 'bg-primary',
      icon: 'assets/images/users.svg',
      url: '/contacts',
      classes: '',
    },
    {
      title: 'Offers',
      background: 'bg-primary',
      activeBackground: 'bg-primary',
      icon: 'assets/images/offers.svg',
      url: '/offers',
      classes: '',
    },
    {
      title: 'Notifications',
      background: 'bg-primary',
      activeBackground: 'bg-primary',
      icon: 'assets/images/offers.svg',
      url: '/notifications',
      classes: '',
    },
    {
      title: 'Settings',
      background: 'bg-secondary',
      activeBackground: 'bg-red-500',
      icon: 'assets/images/offers.svg',
      url: '/settings',
      classes: '',
    },
  ];

  constructor(private readonly router: Router) {}

  ngOnInit(): void {
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
    this.router.navigate([url]);
  }
}
