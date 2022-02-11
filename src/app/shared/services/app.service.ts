import { Injectable, Injector } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthenticationService } from './authentication.service';
import { SplashScreenStateService } from './splash-screen-state.service';

@Injectable()
export class AppService {
  constructor(private injector: Injector) { }
  initializeApp() {
    if (environment.production) {
      // tslint:disable-next-line:max-line-length
      console.log('%c                                                                                                                                   ', 'font-size:260px; background:url(https://media1.tenor.com/images/3b7aefd50f639f50590debb952a70f08/tenor.gif); width: 300px; height: 300px; background-size: auto; background-repeat: no-repeat;');
    } else {
      console.log('inicializando aplicacion');
    }
  }
}
