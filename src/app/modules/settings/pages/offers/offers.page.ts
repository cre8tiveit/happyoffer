import { Component, OnInit } from '@angular/core';
import { Offer } from 'src/app/core/types/types';
import { OfferState } from 'src/app/core/stores/offer/offer.state';
import { Observable } from 'rxjs';
import { StateDataObject } from 'src/app/core/types/store/state-data-object.type';
import { Select } from '@ngxs/store';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-offers',
  templateUrl: 'offers.page.html',
  styleUrls: ['offers.page.scss'],
})
export class OffersNotificationPage implements OnInit {
  @Select(OfferState.offers) public readonly offers$: Observable<
    StateDataObject<Offer[]>
  >;
  public isFilterVisible = false;
  public offers: Offer[] = [];
  public filteredOffers: Offer[] = [];

  constructor(private readonly notificationService: NotificationService) {}

  ngOnInit(): void {
    this.offers$.subscribe((offers) => {
      this.offers = offers.data as Offer[];

      const blacklistedOffers = this.notificationService.getBlacklistedOffers();
      const updatedOffers = this.offers.map((offer) => {
        return {
          ...offer,
          isBlacklisted: blacklistedOffers.includes(offer.id),
        };
      });

      this.offers = updatedOffers;
      this.filteredOffers = this.offers;
    });
  }

  public search($event: any) {
    const value = $event.target.value;
    this.filteredOffers = this.offers.filter(
      (offer) =>
        offer.client.name.toLowerCase().includes(value.toLowerCase()) ||
        offer.name.toLowerCase().includes(value.toLowerCase())
    );
  }

  public toggleNotification($event: any, id: string): void {
    const { checked } = $event.detail;
    if (checked) {
      this.notificationService.turnOnNotificationForOffer(id);
    } else {
      this.notificationService.turnOffNotificationForOffer(id);
    }
  }
}
