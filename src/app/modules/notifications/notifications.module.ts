import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { NotificationsPage } from './pages/notifications/notifications.page';
import { heroHomeSolid } from '@ng-icons/heroicons/solid';
import { NgIconsModule } from '@ng-icons/core';

const routes: Routes = [{ path: '', component: NotificationsPage }];

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
  declarations: [NotificationsPage],
})
export class NotificationsPageModule {}
