import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, delay, map, tap } from 'rxjs/operators';

import { User } from '../interfaces/user.type';
import { AuthenticationForm } from '../interfaces/authentication-form';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { SplashScreenStateService } from './splash-screen-state.service';
import { ResolversEnum } from '../enums/resolvers.enum';

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {

    isLogged: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;

    constructor(private http: HttpClient, private router: Router, private splashScreenState: SplashScreenStateService) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    isLoggedIn(resolver: string) {
        let ret = false;
        this.http.get(`${environment.endpoint}api/auth/check`)
            .pipe(
                tap((response: any) => {
                    this.resolveLogged(true, resolver);
                }),
                catchError(
                    error => {
                        this.resolveLogged(false, resolver)
                        return of();
                    }
                )
            ).subscribe();
        return true;
    }

    resolveLogged(logged: boolean, resolver) {
        switch (resolver) {
            case ResolversEnum.COMMON:
                if (!logged) return this.router.navigate(['/login']);
                this.splashScreenState.stop();
                break;
            case ResolversEnum.LOGIN:
                if (logged) return this.router.navigate(['/']);
                this.splashScreenState.stop();
                break;
            default:
                break;
        }
        this.isLogged.next(logged);
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    login(form: AuthenticationForm) {
        const { username, password } = form;
        const TOKEN_URL = `${environment.endpoint}oauth/token`;
        const body = {
            grant_type: 'password',
            client_id: environment.client_id,
            client_secret: environment.client_secret,
            username: username,
            password: password,
            scope: '*'
        };

        return this.http.post<any>(TOKEN_URL, body)
            .pipe(
                map(response => {
                    localStorage.setItem('session-object', JSON.stringify(response));
                    this.isLogged.next(true);
                    this.router.navigate(['/dashboard']);
                }, error => {
                    console.error(error);
                })
            );
    }

    logout() {
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    }
}