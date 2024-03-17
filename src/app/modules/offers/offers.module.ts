import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { OffersPage } from './pages/offers/offers.page';
import { OfferPage } from './pages/offer/offer.page';
import { heroHomeSolid } from '@ng-icons/heroicons/solid';
import { heroFunnel } from '@ng-icons/heroicons/outline';
import { NgIconsModule } from '@ng-icons/core';
import { NotesPage } from './pages/notes/notes.page';

const routes: Routes = [
  { path: '', component: OffersPage },
  { path: ':id', component: OfferPage },
  { path: 'notes/:id', component: NotesPage },
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    RouterModule.forChild(routes),
    NgIconsModule.withIcons({
      heroHomeSolid,
      heroFunnel,
    }),
  ],
  declarations: [OffersPage, OfferPage, NotesPage],
})
export class OffersPageModule {}
