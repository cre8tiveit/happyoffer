import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { TabsComponent } from './modules/tabs/tabs.component';
import { AuthGuardService as AuthGuard } from './services/auth-guard.service';

const routes: Routes = [
  {
    path: '',
    component: TabsComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'home',
      },
      {
        path: 'home',
        canActivate: [AuthGuard],
        loadChildren: () =>
          import('./modules/home/home.module').then((m) => m.HomePageModule),
      },
      {
        path: 'auth',
        loadChildren: () =>
          import('./modules/authentication/authentication.module').then(
            (m) => m.AuthenticationModule
          ),
      },
      {
        path: 'clients',
        canActivate: [AuthGuard],
        loadChildren: () =>
          import('./modules/clients/clients.module').then(
            (m) => m.ClientsPageModule
          ),
      },
      {
        path: 'contacts',
        canActivate: [AuthGuard],
        loadChildren: () =>
          import('./modules/contacts/contacts.module').then(
            (m) => m.ContactsPageModule
          ),
      },
      {
        path: 'offers',
        canActivate: [AuthGuard],
        loadChildren: () =>
          import('./modules/offers/offers.module').then(
            (m) => m.OffersPageModule
          ),
      },
      {
        path: 'notifications',
        canActivate: [AuthGuard],
        loadChildren: () =>
          import('./modules/notifications/notifications.module').then(
            (m) => m.NotificationsPageModule
          ),
      },
      {
        path: 'settings',
        canActivate: [AuthGuard],
        loadChildren: () =>
          import('./modules/settings/settings.module').then(
            (m) => m.SettingsPageModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
