import { Component, Input, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from '../../interfaces/user.type';
import { AuthenticationService } from '../../services/authentication.service';
import { ThemeConstantService } from '../../services/theme-constant.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html'
})

export class HeaderComponent implements OnDestroy{

    @Input() user: User;

    searchVisible : boolean = false;
    quickViewVisible : boolean = false;
    isFolded : boolean;
    isExpand : boolean;
    authSubscriber: Subscription;

    constructor( private themeService: ThemeConstantService, private authService: AuthenticationService) {}

    ngOnDestroy(): void {
        this.authSubscriber?.unsubscribe();
    }

    ngOnInit(): void {
        this.themeService.isMenuFoldedChanges.subscribe(isFolded => this.isFolded = isFolded);
        this.themeService.isExpandChanges.subscribe(isExpand => this.isExpand = isExpand);
    }

    toggleFold() {
        this.isFolded = !this.isFolded;
        this.themeService.toggleFold(this.isFolded);
    }

    toggleExpand() {
        this.isFolded = false;
        this.isExpand = !this.isExpand;
        this.themeService.toggleExpand(this.isExpand);
        this.themeService.toggleFold(this.isFolded);
    }

    searchToggle(): void {
        this.searchVisible = !this.searchVisible;
    }

    quickViewToggle(): void {
        this.quickViewVisible = !this.quickViewVisible;
    }

    logout() {
        this.authSubscriber = this.authService.logout().subscribe();
    }
}
