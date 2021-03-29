export class ThemeBuilder {
    constructor(themeBuilderSelector) {
        this.themeBuilderSelector = themeBuilderSelector;
    }

    themes = [
        'red',
        'blue',
        'dark'
    ];

    get themeHtml() {
        return `
            <div class="builder-theme">
                <div class="builder-theme-title">Theme builder</div>
                <ul class="theme-builder-ul">
                    ${this.themes.map(theme => `<li class="theme-builder-li">${theme}</li>`)}
                </ul>
            </div>
        `
    }

    renderThemeMenu() {
        document.querySelector(this.themeBuilderSelector).innerHTML = this.themeHtml;
    }
}
