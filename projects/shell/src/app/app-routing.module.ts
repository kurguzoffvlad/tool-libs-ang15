import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Стартовые компоненты библиотек (должны экспортироваться из public-api каждой библиотеки)
import { ToolConfigToLibAng15Component } from 'tool-config-to-lib-ang15';
import { ToolDomAng15Component } from 'tool-dom-ang15';
import { ToolExchangeAng15Component } from 'tool-exchange-ang15';
import { ToolWidthPageAng15Component } from 'tool-width-page-ang15';

const routes: Routes = [
  { path: '', redirectTo: 'tool-config-to-lib', pathMatch: 'full' },

  {
    path: 'tool-config-to-lib',
    component: ToolConfigToLibAng15Component
  },
  {
    path: 'tool-dom',
    component: ToolDomAng15Component
  },
  {
    path: 'tool-exchange',
    component: ToolExchangeAng15Component
  },
  {
    path: 'tool-width-page',
    component: ToolWidthPageAng15Component
  },

  { path: '**', redirectTo: 'tool-config-to-lib' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

