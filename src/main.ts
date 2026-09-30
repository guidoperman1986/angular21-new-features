import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import { installWebMcpPolyfill } from './app/webmcp-polyfill';

installWebMcpPolyfill();

bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));
