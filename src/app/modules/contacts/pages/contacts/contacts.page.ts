import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contacts',
  templateUrl: 'contacts.page.html',
  styleUrls: ['contacts.page.scss'],
})
export class ContactsPage {
  constructor(private readonly router: Router) {}

  public ionViewWillEnter() {
    console.log('enter');
  }

  public goHome(): void {
    this.router.navigate(['/home']);
  }

  public search($event: any) {}
}
