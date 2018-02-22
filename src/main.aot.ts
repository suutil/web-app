import './polyfills';

import { platformBrowser } from '@angular/platform-browser';

import { AppModule } from './app/app.module';

import { enableProdMode } from '@angular/core';

if (process.env.ENV === 'production') {
    enableProdMode();
}

platformBrowser().bootstrapModule(AppModule);
