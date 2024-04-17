import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Offer } from 'src/app/core/types/types';
import { DataService } from 'src/app/services/data.service';
import { Browser } from '@capacitor/browser';

@Component({
  selector: 'app-offer',
  templateUrl: 'offer.page.html',
  styleUrls: ['offer.page.scss'],
})
export class OfferPage implements OnInit {
  public phoneNumber = '31623523625';

  offer: Offer = {} as Offer;

  constructor(
    private router: Router,
    private readonly dataService: DataService
  ) {}
  ngOnInit(): void {
    this.offer = this.dataService.getData();
  }

  public goNotes(): void {
    this.router.navigate(['/offers/notes/1']);
  }

  public openWhatsApp(): void {
    window.open(`https://wa.me/31623523625`, '_blank');
  }

  public showOffer(): void {
    Browser.open({ url: this.offer.url });
  }

  public openWebsite(): void {
    Browser.open({ url: this.offer.client.websiteUrl });
  }
}
