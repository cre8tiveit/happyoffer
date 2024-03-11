import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { ClientsPage } from './pages/clients/clients.page';
import { SharedModule } from '../shared/shared.module';

const routes: Routes = [{ path: '', component: ClientsPage }];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    RouterModule.forChild(routes),
  ],
  declarations: [ClientsPage],
})
export class ClientsPageModule {}
