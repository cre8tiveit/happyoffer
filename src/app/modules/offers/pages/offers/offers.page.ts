import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-offers',
  templateUrl: 'offers.page.html',
  styleUrls: ['offers.page.scss'],
})
export class OffersPage {
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
  constructor(private readonly router: Router) {}

  public ionViewWillEnter() {
    console.log('enter');
  }

  public showDetails(id: string) {
    this.router.navigate([`/offers/${id}`]);
  }

  public goHome(): void {
    this.router.navigate(['/home']);
  }

  public search($event: any) {}
}
