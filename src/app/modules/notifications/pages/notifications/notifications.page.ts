import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-notifications',
  templateUrl: 'notifications.page.html',
  styleUrls: ['notifications.page.scss'],
})
export class NotificationsPage {
  constructor(private readonly router: Router) {}

  public goHome(): void {
    this.router.navigate(['/home']);
  }
}
