import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from './components/header/header.component';
import { SubHeaderComponent } from './components/subheader/subheader.component';
import { StatusBadgeComponent } from './components/status-badge/status-badge.component';
import { OfferComponent } from './components/offer/offer.component';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule],
  declarations: [
    HeaderComponent,
    SubHeaderComponent,
    StatusBadgeComponent,
    OfferComponent,
  ],
  exports: [
    HeaderComponent,
    SubHeaderComponent,
    StatusBadgeComponent,
    OfferComponent,
  ],
})
export class SharedModule {}
