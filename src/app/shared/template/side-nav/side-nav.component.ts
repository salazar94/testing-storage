import { Component } from '@angular/core';
import { ThemeConstantService } from '../../services/theme-constant.service';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
    selector: 'app-sidenav',
    templateUrl: './side-nav.component.html'
})

export class SideNavComponent{

    public menuItems: any[]
    isFolded : boolean;
    isSideNavDark : boolean;
    isExpand : boolean;

    constructor(
        private themeService: ThemeConstantService
        , private authService: AuthenticationService
    ) {
    }

    ngOnInit(): void {
        this.authService.sidebar.subscribe(sidebar => {
            this.menuItems = sidebar;
        });
        this.themeService.isMenuFoldedChanges.subscribe(isFolded => this.isFolded = isFolded);
        this.themeService.isExpandChanges.subscribe(isExpand => this.isExpand = isExpand);
        this.themeService.isSideNavDarkChanges.subscribe(isDark => this.isSideNavDark = isDark);
    }

    closeMobileMenu(): void {
        if (window.innerWidth < 992) {
            this.isFolded = false;
            this.isExpand = !this.isExpand;
            this.themeService.toggleExpand(this.isExpand);
            this.themeService.toggleFold(this.isFolded);
        }
    }
}
