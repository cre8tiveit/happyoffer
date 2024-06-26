import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { SettingsPage } from './pages/settings/settings.page';
import { heroHomeSolid } from '@ng-icons/heroicons/solid';
import { NgIconsModule } from '@ng-icons/core';
import { OffersNotificationPage } from './pages/offers/offers.page';

const routes: Routes = [
  { path: '', component: SettingsPage },
  { path: 'offers', component: OffersNotificationPage },
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
    }),
  ],
  declarations: [SettingsPage, OffersNotificationPage],
})
export class SettingsPageModule {}
