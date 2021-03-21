export class SokobanLevelsBuilder {
    constructor(
        renderer
    ) {
        this.renderer = renderer;
    }

    getGamePanelHtml() {
        return `
        <h1>panel blueprint</h1>
        `
    }

    render() {
        const gameHtml = this.renderer.getHtml();
        const gamePanelHtml = this.getGamePanelHtml();
        document.querySelector(this.renderer.rootElementSelector).innerHTML = gameHtml;
        document.querySelector('#game-panel').innerHTML += gamePanelHtml;
    }

    run() {
        this.render();
    }
}
