import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { enableProdMode } from '@angular/core'

import { AppModule } from './app/app.module';

import 'lord-icon-element';

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));

;

enableProdMode();
platformBrowserDynamic().bootstrapModule(AppModule);