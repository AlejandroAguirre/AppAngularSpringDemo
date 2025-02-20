import { ApplicationConfig } from "@angular/core"

import { importProvidersFrom } from '@angular/core';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideAnimations } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { withInterceptorsFromDi, provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { routes } from '../app/app-routes';


export const appConfig:ApplicationConfig= {
    providers: [
        importProvidersFrom(
          //BrowserModule, 
          FormsModule, MatDatepickerModule, MatMomentDateModule),
      // ClienteService,
        provideRouter(routes),
        provideHttpClient(withInterceptorsFromDi()),
        provideAnimations(),
    ]
}