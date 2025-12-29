import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'dashboard',
        loadComponent: () => import('./pages/dashboard/dashboard').then(c => c.Dashboard),
        children: [
            {
                path: 'signal-forms',
                loadComponent: () => import('./components/signal-forms/signal-forms').then(c => c.SignalForms)
            },
            {
                path: 'http-resource',
                loadComponent: () => import('./pages/http-resource/http-resource').then(c => c.HttpResource)
            },
            {
                path: '',
                redirectTo: 'signal-forms',
                pathMatch: 'full'
            }
        ]
    },
    {
        path: '**',
        redirectTo: 'dashboard',
        pathMatch: 'full'
    }
];
