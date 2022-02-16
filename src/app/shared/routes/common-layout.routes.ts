import { Routes } from '@angular/router';

export const CommonLayout_ROUTES: Routes = [
    {
        path: 'dashboard',
        loadChildren: () => import('../../dashboard/dashboard.module').then(m => m.DashboardModule),
    },
    {
        path: 'catalogs/product-types',
        loadChildren: () => import('../../pages/product-types/product-types.module').then(m => m.ProductTypesModule),
    },
];
