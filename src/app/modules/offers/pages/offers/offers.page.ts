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
  public filterStartDate = new Date().toISOString().split('T')[0];
  public filterEndDate = new Date().toISOString().split('T')[0];
  private filterStatusses: Set<string> = new Set();
  private selectedClients: Set<number> = new Set();

  constructor(
    private readonly router: Router,
    private modalCtrl: ModalController,
    private readonly dataService: DataService
  ) {}

  ngOnInit(): void {
    this.offers$.subscribe((offers) => {
      this.offers = offers.data as Offer[];
      this.filteredOffers = this.offers;
    });
  }

  public showDetails(offer: Offer): void {
    this.dataService.setData(offer);
    this.router.navigate([`/offers/${offer.id}`]);
  }

  public toggleFilter() {
    this.filteredOffers = this.offers.filter((offer: Offer) => {
      const offerDate = this.convertDateFormat(offer.offerDate.split(' ')[0]);
      return (
        offerDate >= this.filterStartDate &&
        offerDate <= this.filterEndDate &&
        this.filterStatusses.has(offer.offerStatus)
      );
    });

    this.filteredOffers = this.filteredOffers.filter((offer: Offer) => {
      const id = offer.client.id || 0;
      return this.selectedClients.has(id);
    });
    this.isFilterVisible = !this.isFilterVisible;
  }

  public resetFilter() {
    this.filterStartDate = new Date().toISOString().split('T')[0];
    this.filterEndDate = new Date().toISOString().split('T')[0];
    this.filteredOffers = this.offers;
    this.isFilterVisible = !this.isFilterVisible;
  }

  async openModal() {
    const modal = await this.modalCtrl.create({
      component: ClientsPage,
      componentProps: {
        selectedClients: this.selectedClients,
      },
    });
    modal.present();
    modal.onDidDismiss().then((data) => {
      this.selectedClients = data.data.clients;
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

  public toggleFilterStatus(status: string) {
    if (this.filterStatusses.has(status)) {
      this.filterStatusses.delete(status);
    } else {
      this.filterStatusses.add(status);
    }
  }

  public getFilterStatus(status: string): boolean {
    return this.filterStatusses.has(status);
  }

  private convertDateFormat(dateString: string): string {
    const [day, month, year] = dateString.split('-');
    return `${year}-${month}-${day}`;
  }
}
