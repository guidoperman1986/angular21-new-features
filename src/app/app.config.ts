import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection,
} from '@angular/core';
import { provideExperimentalWebMcpForms } from '@angular/forms/signals';
import {
  provideRouter,
  withExperimentalAutoCleanupInjectors,
  withViewTransitions,
} from '@angular/router';

import { provideHttpClient, withFetch } from '@angular/common/http';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withFetch()),
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes, withViewTransitions(), withExperimentalAutoCleanupInjectors()),
    provideZonelessChangeDetection(),
    provideExperimentalWebMcpForms(),
  ],
};
