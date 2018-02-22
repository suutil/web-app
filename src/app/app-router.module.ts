import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot([
      { path: '', component: AppComponent },
      { path: '**', redirectTo: '' }
    ])
  ],
  exports: [
    RouterModule
  ]
})

export class AppRouterModule {

}
