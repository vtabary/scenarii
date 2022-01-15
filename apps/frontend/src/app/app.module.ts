import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './components/app/app.component';
import { MenuComponent } from './components/menu/menu.component';
import {
  CSVConfigurationRegistryService,
  ScenariosRegistryService,
} from './modules/shared/public-api';
import { SharedModule } from './modules/shared/shared.module';

const factories = {
  loadData: (
    scenarios: ScenariosRegistryService,
    csvConfiguration: CSVConfigurationRegistryService
  ): (() => void) => {
    const f = () => {
      scenarios.load();
      csvConfiguration.load();
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
      deps: [ScenariosRegistryService, CSVConfigurationRegistryService],
      useFactory: factories.loadData,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
