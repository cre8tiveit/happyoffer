import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { ClientsPage } from '../clients/clients.page';

@Component({
  selector: 'app-offers',
  templateUrl: 'offers.page.html',
  styleUrls: ['offers.page.scss'],
})
export class OffersPage {
  public isFilterVisible = false;
  public offers: any[] = [
    {
      id: 1,
      number: '1',
      client: 'henk',
      name: 'Offername',
      nameContactPerson: 'henk',
      created: new Date(),
    },
    {
      id: 2,
      number: '2',
      client: 'henk',
      name: 'Offername',
      nameContactPerson: 'henk',
      created: new Date(),
    },
    {
      id: 3,
      number: '3',
      client: 'henk',
      name: 'Offername',
      nameContactPerson: 'henk',
      created: new Date(),
    },
  ];
  constructor(
    private readonly router: Router,
    private modalCtrl: ModalController
  ) {}

  public ionViewWillEnter() {
    console.log('enter');
  }

  public showDetails(id: string) {
    this.router.navigate([`/offers/${id}`]);
  }

  public goHome(): void {
    this.router.navigate(['/home']);
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
  public search($event: any) {}
}
