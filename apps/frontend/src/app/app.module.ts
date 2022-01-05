import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './components/app/app.component';
import { MenuComponent } from './components/menu/menu.component';
import {
  ReportsRegistryService,
  ScenariiRegistryService,
} from './modules/shared/public-api';
import { SharedModule } from './modules/shared/shared.module';

const factories = {
  loadData: (
    scenarii: ScenariiRegistryService,
    reports: ReportsRegistryService
  ): (() => void) => {
    const f = () => {
      scenarii.load();
      reports.load();
    };
    return f;
  },
};
@NgModule({
  declarations: [AppComponent, MenuComponent],
  imports: [BrowserModule, SharedModule, AppRoutingModule],
  providers: [
    {
      provide: APP_INITIALIZER,
      multi: true,
      deps: [ScenariiRegistryService, ReportsRegistryService],
      useFactory: factories.loadData,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
