import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    { path: '', redirectTo: 'tool-config-to-lib', pathMatch: 'full' },

    {
        path: 'tool-config-to-lib',
        loadChildren: () =>
            import('tool-config-to-lib-ang15').then(m => m.ToolConfigToLibAng15Module),
    },
    {
        path: 'tool-dom',
        loadChildren: () =>
            import('tool-dom-ang15').then(m => m.ToolDomAng15Module),
    },
    {
        path: 'tool-exchange',
        loadChildren: () =>
            import('tool-exchange-ang15').then(m => m.ToolExchangeAng15Module),
    },
    {
        path: 'tool-width-page',
        loadChildren: () =>
            import('tool-width-page-ang15').then(m => m.ToolWidthPageAng15Module),
    },

    { path: '**', redirectTo: 'tool-config-to-lib' },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
