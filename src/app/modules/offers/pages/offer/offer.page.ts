import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-offer',
  templateUrl: 'offer.page.html',
  styleUrls: ['offer.page.scss'],
})
export class OfferPage {
  constructor(private router: Router) {}

  public goHome(): void {
    this.router.navigate(['/home']);
  }

  public goNotes(): void {
    this.router.navigate(['/offers/notes/1']);
  }
}
