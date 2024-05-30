import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Offer } from 'src/app/core/types/types';
import { DataService } from 'src/app/services/data.service';
import { Browser } from '@capacitor/browser';
import { Clipboard } from '@capacitor/clipboard';
import { Store } from '@ngxs/store';
import { GetNotes } from 'src/app/core/stores/offer/offer.actions';
import { OfferService } from 'src/app/services/offer.service';

@Component({
  selector: 'app-offer',
  templateUrl: 'offer.page.html',
  styleUrls: ['offer.page.scss'],
})
export class OfferPage implements OnInit {
  public phoneNumber = '31623523625';
  public toastMessage = '';

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
        console.log('id', id);
        this.offerService.getOffer(id).subscribe((offer) => {
          this.offer = offer;
        })
      })
    }
  }
  
  public goNotes(): void {
    this.store.dispatch(new GetNotes(this.offer.id));
    this.router.navigate([`/offers/notes/${this.offer.id}`]);
  }

  public openWhatsApp(phonenumber: string): void {
    window.open(`https://wa.me/${phonenumber}`, '_blank');
  }

  public showOffer(): void {
    Browser.open({ url: this.offer.url });
  }

  public openWebsite(): void {
    Browser.open({ url: this.offer.client.websiteUrl });
  }

  public copyUrl(): void {
    this.toastMessage = 'URL copied to clipboard.';
    Clipboard.write({ string: this.offer.url });
  }
}
