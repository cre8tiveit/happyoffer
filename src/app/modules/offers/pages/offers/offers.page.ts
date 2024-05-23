import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { ClientsPage } from '../clients/clients.page';
import { Offer } from 'src/app/core/types/types';
import { OfferState } from 'src/app/core/stores/offer/offer.state';
import { Observable } from 'rxjs';
import { StateDataObject } from 'src/app/core/types/store/state-data-object.type';
import { Select } from '@ngxs/store';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-offers',
  templateUrl: 'offers.page.html',
  styleUrls: ['offers.page.scss'],
})
export class OffersPage implements OnInit {
  @Select(OfferState.offers) public readonly offers$: Observable<
    StateDataObject<Offer[]>
  >;
  public isFilterVisible = false;
  public offers: Offer[] = [];
  public filteredOffers: Offer[] = [];

  constructor(
    private readonly router: Router,
    private modalCtrl: ModalController,
    private readonly dataService: DataService
  ) {}

  ngOnInit(): void {
    this.offers$.subscribe((offers) => {
      this.offers = (offers.data as Offer[])
      this.filteredOffers = this.offers;
    });
  }

  public showDetails(offer: Offer): void {
    this.dataService.setData(offer);
    this.router.navigate([`/offers/${offer.id}`]);
  }

  public toggleFilter() {
    this.isFilterVisible = !this.isFilterVisible;
  }

  async openModal() {
    const modal = await this.modalCtrl.create({
      component: ClientsPage,
    });
    modal.present();
    const { data, role } = await modal.onWillDismiss();
  }

  public search($event: any) {
    const value = $event.target.value;
    this.filteredOffers = this.offers.filter(
      (offer) =>
        offer.client.name.toLowerCase().includes(value.toLowerCase()) ||
        offer.name.toLowerCase().includes(value.toLowerCase())
    );
  }
}
