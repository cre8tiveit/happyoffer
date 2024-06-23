import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { Store } from '@ngxs/store';
import { getOfferUrl } from 'src/app/core/helpers/api.helper';
import { GetNotes } from 'src/app/core/stores/offer/offer.actions';
import { Offer } from 'src/app/core/types/types';
import { DataService } from 'src/app/services/data.service';
import { OfferService } from 'src/app/services/offer.service';
import { Browser } from '@capacitor/browser';
import { Clipboard } from '@capacitor/clipboard';

@Component({
  selector: 'app-offer',
  templateUrl: './offer.component.html',
  styleUrls: ['./offer.component.scss'],
})
export class OfferComponent implements OnInit {
  @Input() fromNotification = false;

  public phoneNumber = '';
  public toastMessage = '';
  offerUrl = '';

  public offer: Offer = {} as Offer;

  constructor(
    private router: Router,
    private store: Store,
    private readonly dataService: DataService,
    private readonly offerService: OfferService,
    private readonly activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.offer = this.dataService.getData();
    if (!this.offer) {
      this.activatedRoute.params.subscribe((params: Params) => {
        const id = params['id'];
        this.offerService.getOffer(id).subscribe((offer) => {
          this.offer = offer;
          this.getOfferUrl();
        });
      });
    } else {
      this.getOfferUrl();
    }
  }

  public goNotes(): void {
    this.store.dispatch(new GetNotes(this.offer.id));
    const url = this.fromNotification
      ? `/notifications/notes/${this.offer.id}`
      : `/offers/notes/${this.offer.id}`;
    this.router.navigate([url]);
  }

  public openWhatsApp(phonenumber: string): void {
    window.open(`https://wa.me/${phonenumber}`, '_blank');
  }

  public showOffer(): void {
    Browser.open({ url: this.getOfferUrl() });
  }

  public openWebsite(): void {
    const url = this.offer.client.websiteUrl;
    Browser.open({ url });
  }

  public copyUrl(): void {
    this.toastMessage = 'URL copied to clipboard.';
    Clipboard.write({ string: this.getOfferUrl() });
  }

  getOfferUrl(): string {
    return getOfferUrl(this.offer.url);
  }
}
