import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

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

    loginRequestActive: Subject<boolean> = new Subject<boolean>();
    isLogged: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    private currentUserSubject: BehaviorSubject<User> = new BehaviorSubject<User>(null);
    public currentUser: Observable<User>;
    private sidebarSubject: BehaviorSubject<any> = new BehaviorSubject<any>([]);
    public sidebar: Observable<any>;

    constructor(private http: HttpClient, private router: Router, private splashScreenState: SplashScreenStateService) {
        this.currentUser = this.currentUserSubject.asObservable();
        this.sidebar = this.sidebarSubject.asObservable();
    }

    isLoggedIn(resolver: string) {
        this.http.get(`${environment.endpoint}api/auth/check`)
            .pipe(
                tap((response: any) => {
                    this.currentUserSubject.next(response.user);
                    this.sidebarSubject.next(response.sidebar);
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
        const TOKEN_URL = `${environment.endpoint}oauth/token`;
        const body = {
            grant_type: 'password',
            client_id: environment.client_id,
            client_secret: environment.client_secret,
            ...form,
            scope: '*'
        };

        return this.http.post<any>(TOKEN_URL, body)
            .pipe(
                map(response => {
                    localStorage.setItem('session-object', JSON.stringify(response));
                    this.isLogged.next(true);
                    this.router.navigate(['/dashboard']);
                }),
                catchError(error => {
                    this.loginRequestActive.next(false);
                    console.error(error);
                    return of(error);
                })
            );
    }

    logout() {
        const LOGOUT_URL = `${environment.endpoint}api/auth/logout`;
        return this.http.post<any>(LOGOUT_URL, {})
            .pipe(
                map(() => {
                    localStorage.removeItem('session-object');
                    this.isLogged.next(false);
                    this.router.navigate(['/login']);
                }, error => {
                    console.error(error);
                })
            );
    }
}