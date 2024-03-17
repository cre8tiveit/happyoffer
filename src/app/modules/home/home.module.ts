import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './pages/home/home.page';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { NgIconsModule } from '@ng-icons/core';
import {
  heroUsers,
  heroUser,
  heroUserGroup,
  heroDocumentText,
  heroBellAlert,
  heroCog6Tooth,
  heroHome,
} from '@ng-icons/heroicons/outline';

const routes: Routes = [{ path: '', component: HomePage }];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    NgIconsModule.withIcons({
      heroUsers,
      heroUser,
      heroUserGroup,
      heroDocumentText,
      heroBellAlert,
      heroCog6Tooth,
      heroHome,
    }),
    RouterModule.forChild(routes),
  ],
  declarations: [HomePage],
})
export class HomePageModule {}
