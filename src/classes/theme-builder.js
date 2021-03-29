export class ThemeBuilder {
    constructor(themeBuilderSelector) {
        this.themeBuilderSelector = themeBuilderSelector;
    }

    themes = [
        'red',
        'blue',
        'dark'
    ];

    isMenuVisible = false;
    selectedTheme = this.themes[0];

    toggleMenuVisibility() {
        this.isMenuVisible = !this.isMenuVisible
    }

    initializeDOMListeners() {
        document.querySelector('.theme-builder-menu').addEventListener('click', () => {
            this.toggleMenuVisibility();
            this.renderThemeMenu();
        })
    }

    get themeHtml() {
        return `
            <div class="theme-builder-menu">
                <div class="builder-theme-title">Theme builder</div>
                <ul class="theme-builder-ul">
                    ${this.themes.map(theme => `<li class="theme-builder-li">${theme}</li>`).join('')}
                </ul>
            </div>
        `
    }

    renderThemeMenu() {
        document.querySelector(this.themeBuilderSelector).innerHTML = this.themeHtml;
        this.initializeDOMListeners();
    }
}
