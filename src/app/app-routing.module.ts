import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';

import { CommonLayoutComponent } from "./layouts/common-layout/common-layout.component";

import { CommonLayout_ROUTES } from "./shared/routes/common-layout.routes";
import { LoginComponent } from './pages/auth/login/login.component';
import { AuthResolverService } from './shared/services/auth-resolver.service';
import { LoginResolverService } from './shared/services/login-resolver.service';

const appRoutes: Routes = [
    {
        path: '',
        redirectTo: '/dashboard',
        pathMatch: 'full',
    },
    {
        path: '',
        component: CommonLayoutComponent,
        resolve: { auth: AuthResolverService },
        children: CommonLayout_ROUTES 
    },
    { 
        path: 'login',
        resolve: { unauth: LoginResolverService },
        component: LoginComponent
    }
];

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes, { 
            preloadingStrategy: PreloadAllModules,
            anchorScrolling: 'enabled',
            scrollPositionRestoration: 'enabled',
            useHash: true
        })
    ],
    exports: [
        RouterModule
    ]
})

export class AppRoutingModule {
}