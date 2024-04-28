import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { LoginPage } from './pages/login/login.page';
import { PushNotificationsPage } from './pages/push/push.page';
import { NgIconsModule } from '@ng-icons/core';
import { heroBellAlert } from '@ng-icons/heroicons/outline';

const routes: Routes = [
  { path: '', component: LoginPage },
  { path: 'push', component: PushNotificationsPage },
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    ReactiveFormsModule,
    NgIconsModule.withIcons({
      heroBellAlert,
    }),
    RouterModule.forChild(routes),
  ],
  declarations: [LoginPage, PushNotificationsPage],
})
export class AuthenticationModule {}
