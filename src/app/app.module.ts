import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { NgxsModule } from '@ngxs/store';
import { environment } from 'src/environments/environment';
import { OfferState } from './core/stores/offer/offer.state';
import { NgIconsModule } from '@ng-icons/core';
import {
  heroUsers,
  heroUser,
  heroHome,
  heroDocumentText,
  heroCog6Tooth,
  heroTrash,
  heroPlusCircle,
} from '@ng-icons/heroicons/outline';
import { TabsComponent } from './modules/tabs/tabs.component';
import { heroHomeSolid } from '@ng-icons/heroicons/solid';
import { ClientState } from './core/stores/offer/client.state';
import { NotificationState } from './core/stores/offer/notification.state';
import { LoggingState } from './core/stores/offer/logging.state';
import { ContactState } from './core/stores/offer/contact.state';
import { StatusBadgeComponent } from './modules/shared/components/status-badge/status-badge.component';

@NgModule({
  declarations: [AppComponent, TabsComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    NgxsModule.forRoot(
      [OfferState, ClientState, ContactState, NotificationState, LoggingState],
      {
        developmentMode: !environment.production,
      }
    ),
    NgIconsModule.withIcons({
      heroUsers,
      heroUser,
      heroHome,
      heroHomeSolid,
      heroDocumentText,
      heroCog6Tooth,
      heroTrash,
      heroPlusCircle,
    }),
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
