import { NgModule } from '@angular/core';
import { NoPreloading, RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';

const routes: Routes = [
  {
    path: '',
    component: AppComponent,
  },
];

@NgModule({
  exports: [RouterModule],
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: NoPreloading,
      onSameUrlNavigation: 'reload',
      paramsInheritanceStrategy: 'always',
      relativeLinkResolution: 'corrected',
    }),
  ],
})
export class AppRoutingModule {}
