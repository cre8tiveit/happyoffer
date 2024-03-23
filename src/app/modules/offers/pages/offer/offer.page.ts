import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-offer',
  templateUrl: 'offer.page.html',
  styleUrls: ['offer.page.scss'],
})
export class OfferPage {
  public phoneNumber = '31623523625';
  constructor(private router: Router) {}

  public goNotes(): void {
    this.router.navigate(['/offers/notes/1']);
  }

  public openWhatsApp(): void {
    window.open(`https://wa.me/31623523625`, '_blank');
  }
}
