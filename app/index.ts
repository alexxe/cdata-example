import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';

import { DemoModule } from './demo.module';
platformBrowserDynamic().bootstrapModule(DemoModule);
