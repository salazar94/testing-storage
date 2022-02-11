import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { ResolversEnum } from '../enums/resolvers.enum';
import { AuthenticationService } from './authentication.service';
import { SplashScreenStateService } from './splash-screen-state.service';

@Injectable({
  providedIn: 'root'
})
export class LoginResolverService {

  constructor(private splashScreenState: SplashScreenStateService
    , private authService: AuthenticationService
  ) { }

  resolve(route: ActivatedRouteSnapshot): Observable<any> {
    return of(this.authService.isLoggedIn(ResolversEnum.LOGIN));
  }
}
