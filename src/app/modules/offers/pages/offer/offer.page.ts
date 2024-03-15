import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-offer',
  templateUrl: 'offer.page.html',
  styleUrls: ['offer.page.scss'],
})
export class OfferPage {
  constructor(private router: Router) {}
}
