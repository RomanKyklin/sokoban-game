export class SokobanLevelsBuilder {
    constructor(
        renderer
    ) {
        this.renderer = renderer;
    }

    getGamePanelHtml() {
        return `
        <h1>darova</h1>
        `
    }

    render() {
        const gameHtml = this.renderer.getHtml();
        const gamePanelHtml = this.getGamePanelHtml();
        document.getElementById(this.renderer.rootElementSelector).innerHTML = gameHtml;
    }

    run() {
        this.render();
    }
}
