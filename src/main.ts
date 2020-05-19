import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

const bootstrapApp = () => {
  platformBrowserDynamic()
    .bootstrapModule(AppModule)
    .catch((err) => console.error(err));
};

if (window['cordova']) {
  console.log('[Cordova found]');
  document.addEventListener('deviceready', () => bootstrapApp());
} else {
  console.log('[Cordova not found]');
  bootstrapApp();
}
