import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { OffersPage } from './pages/offers/offers.page';
import { OfferPage } from './pages/offer/offer.page';

const routes: Routes = [
  { path: '', component: OffersPage },
  { path: ':id', component: OfferPage },
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    RouterModule.forChild(routes),
  ],
  declarations: [OffersPage, OfferPage],
})
export class OffersPageModule {}
