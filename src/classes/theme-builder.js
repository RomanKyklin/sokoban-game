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
            <ul class="theme-builder-ul">
                ${this.themes.map(theme => `<li class="theme-builder-li">${theme}</li>`)}
            </ul>
        `
    }

    renderThemeMenu() {
        document.querySelector(this.themeBuilderSelector).innerHTML = this.themeHtml;
    }
}
