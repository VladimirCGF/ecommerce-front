import {ApplicationConfig, provideZoneChangeDetection} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {provideClientHydration} from '@angular/platform-browser';
import {provideHttpClient,} from "@angular/common/http";
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import {JWT_OPTIONS, JwtHelperService} from "@auth0/angular-jwt";
import {LocalStorageService} from "./services/local-storage.service";


export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({eventCoalescing: true}),
    provideRouter(routes),
    // provideHttpClient(withInterceptorsFromDi()),
    provideClientHydration(),
    provideHttpClient(),
    provideAnimationsAsync(),
    LocalStorageService,
    JwtHelperService,
    // {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    // {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
    {provide: JWT_OPTIONS, useValue: JWT_OPTIONS},
  ]
};
