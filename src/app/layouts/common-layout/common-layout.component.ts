import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from "@angular/router";
import { isThursday } from 'date-fns';
import { Observable } from "rxjs";
import { distinctUntilChanged, filter, map, startWith } from "rxjs/operators";
import { User } from 'src/app/shared/interfaces/user.type';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { IBreadcrumb } from "../../shared/interfaces/breadcrumb.type";
import { ThemeConstantService } from '../../shared/services/theme-constant.service';

@Component({
    selector: 'app-common-layout',
    templateUrl: './common-layout.component.html',
})

export class CommonLayoutComponent {

    breadcrumbs$: Observable<IBreadcrumb[]>;
    contentHeaderDisplay: string;
    isFolded: boolean;
    isSideNavDark: boolean;
    isExpand: boolean;
    selectedHeaderColor: string;

    user: User;

    constructor(private router: Router
        , private activatedRoute: ActivatedRoute
        , private themeService: ThemeConstantService
        , private authService: AuthenticationService
    ) {
        this.router.events.pipe(
            filter(event => event instanceof NavigationEnd),
            map(() => {
                let child = this.activatedRoute.firstChild;
                while (child) {
                    if (child.firstChild) {
                        child = child.firstChild;
                    } else if (child.snapshot.data && child.snapshot.data['headerDisplay']) {
                        return child.snapshot.data['headerDisplay'];
                    } else {
                        return null;
                    }
                }
                return null;
            })
        ).subscribe((data: any) => {
            this.contentHeaderDisplay = data;
        });
    }

    ngOnInit() {
        this.authService.currentUser.subscribe(user => this.user = user);
        this.breadcrumbs$ = this.router.events.pipe(
            startWith(new NavigationEnd(0, '/', '/')),
            filter(event => event instanceof NavigationEnd), distinctUntilChanged(),
            map(data => this.buildBreadCrumb(this.activatedRoute.root))
        );
        this.themeService.isMenuFoldedChanges.subscribe(isFolded => this.isFolded = isFolded);
        this.themeService.isSideNavDarkChanges.subscribe(isDark => this.isSideNavDark = isDark);
        this.themeService.selectedHeaderColor.subscribe(color => this.selectedHeaderColor = color);
        this.themeService.isExpandChanges.subscribe(isExpand => this.isExpand = isExpand);
    }

    private buildBreadCrumb(route: ActivatedRoute, url: string = '', breadcrumbs: IBreadcrumb[] = []): IBreadcrumb[] {
        let label = '', path = '/', display = null;

        if (route.routeConfig) {
            if (route.routeConfig.data) {
                label = route.routeConfig.data['title'];
                path += route.routeConfig.data['url'];
            }
        } else {
            label = 'Dashboard';
            path += 'dashboard';
        }

        const nextUrl = path && path !== '/dashboard' ? `${url}${path}` : url;
        const breadcrumb = <IBreadcrumb>{
            label: label, url: nextUrl
        };

        const newBreadcrumbs = label ? [...breadcrumbs, breadcrumb] : [...breadcrumbs];
        if (route.firstChild) {
            return this.buildBreadCrumb(route.firstChild, nextUrl, newBreadcrumbs);
        }
        return newBreadcrumbs;
    }
}