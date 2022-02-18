import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NZ_I18N, en_US } from 'ng-zorro-antd/i18n';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';

import { registerLocaleData, PathLocationStrategy, LocationStrategy } from '@angular/common';
import en from '@angular/common/locales/en';

import { AppRoutingModule } from './app-routing.module';
import { TemplateModule } from './shared/template/template.module';
import { SharedModule } from './shared/shared.module';

import { AppComponent } from './app.component';
import { CommonLayoutComponent } from './layouts/common-layout/common-layout.component';
import { FullLayoutComponent } from './layouts/full-layout/full-layout.component';

import { NgChartjsModule } from 'ng-chartjs';
import { ThemeConstantService } from './shared/services/theme-constant.service';
import { LoginComponent } from './pages/auth/login/login.component';

import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { ReactiveFormsModule } from '@angular/forms';
import { SplashScreenComponent } from './shared/components/splash-screen/splash-screen.component';
import { AppService } from './shared/services/app.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from './shared/interceptor/token.interceptor';
import { NgxUiLoaderConfig, NgxUiLoaderHttpModule, NgxUiLoaderModule, NgxUiLoaderRouterModule, PB_DIRECTION, POSITION, SPINNER } from 'ngx-ui-loader';
import { environment } from 'src/environments/environment';

export function app_init(appService: AppService) {
    return () => appService.initializeApp();
}

const antdModule = [
    NzFormModule,
    NzInputModule,
    NzButtonModule,
    NzCardModule,
    NzCheckboxModule
]

const ngxUiLoaderConfig: NgxUiLoaderConfig = {
    // bgsColor: environment.brand_color,
    bgsPosition: POSITION.bottomLeft,
    // bgsSize: 40,
    bgsType: SPINNER.ballSpinClockwiseFadeRotating, // background spinner type
    fgsType: SPINNER.doubleBounce, // foreground spinner type
    // fgsColor: environment.brand_color,
    // pbColor: environment.brand_color,
    pbDirection: PB_DIRECTION.leftToRight, // progress bar direction
    pbThickness: 8, // progress bar thickness
  };

registerLocaleData(en);

@NgModule({
    declarations: [
        AppComponent,
        CommonLayoutComponent,
        FullLayoutComponent,
        LoginComponent,
        SplashScreenComponent
    ],
    imports: [
        ReactiveFormsModule,
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        NzBreadCrumbModule,
        TemplateModule,
        SharedModule,
        NgChartjsModule,
        NgxUiLoaderModule.forRoot(ngxUiLoaderConfig),
        NgxUiLoaderRouterModule,
        NgxUiLoaderHttpModule,
        ...antdModule
    ],
    providers: [
        {
            provide: NZ_I18N,
            useValue: en_US,
        },
        {
            provide: LocationStrategy,
            useClass: PathLocationStrategy
        },
        ThemeConstantService,
        AppService,
        {
            provide: APP_INITIALIZER, useFactory: app_init, deps: [AppService], multi: true
        },
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
