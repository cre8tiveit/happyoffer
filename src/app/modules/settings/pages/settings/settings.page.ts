import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-settings',
  templateUrl: 'settings.page.html',
  styleUrls: ['settings.page.scss'],
})
export class SettingsPage {
  constructor(private readonly router: Router) {}

  public everyNotification: boolean = true;

  public goHome(): void {
    this.router.navigate(['/home']);
  }

  public goOffers(): void {
    this.router.navigate(['/settings/offers']);
  }

  public logOff(): void {
    localStorage.removeItem('user');
    this.router.navigate(['']);
  }
}
