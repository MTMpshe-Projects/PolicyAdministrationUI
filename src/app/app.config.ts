import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
// provideClientHydration(),
export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }),provideHttpClient(),importProvidersFrom(
    MatProgressSpinnerModule,
    MatIconModule
  )]
};
