import { enableProdMode, importProvidersFrom } from '@angular/core';
//import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';


import { environment } from './environments/environment';
import { AppComponent } from './app/app.component';
//import { AppRoutingModule } from './app/app-routing.module';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
//import { ClienteService } from './app/clientes/cliente.service';
import { appConfig } from './app/app-config';




if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent,appConfig)
  .catch(err => console.error(err));
