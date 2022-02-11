import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

    constructor() { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const session = JSON.parse(localStorage.getItem('session-object'));
        if (session && session.access_token) {
            request = request.clone({
                headers: request.headers.set('Authorization', `Bearer ${session.access_token}`)
            });
        }

        return next.handle(request);
    }
}