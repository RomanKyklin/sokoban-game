import {CELL_TYPES} from "../cells/cell-types.js";


export class SokobanLevelsBuilder {
    constructor(
        renderer
    ) {
        this.renderer = renderer;
    }

    onMouseDown(event) {
        let shiftX = event.clientX - this.getBoundingClientRect().left;
        let shiftY = event.clientY - this.getBoundingClientRect().top;

        this.style.position = 'absolute';
        this.style.zIndex = 1000;
        document.body.append(this)

        const moveAt = (pageX, pageY) => {
            this.style.left = pageX - shiftX + 'px';
            this.style.top = pageY - shiftY + 'px';
        }

        moveAt(event.pageX, event.pageY);

        function onMouseMove(event) {
            moveAt(event.pageX, event.pageY);
        }

        // (3) перемещать по экрану
        document.addEventListener('mousemove', onMouseMove);

        // (4) положить мяч, удалить более ненужные обработчики событий
        this.onmouseup = function () {
            document.removeEventListener('mousemove', onMouseMove);
            this.onmouseup = null;
        };

        this.ondragstart = function () {
            return false;
        };
    }

    initializeDOMListeners() {
        document.getElementsByClassName(`game-panel-cell ${this.renderer.SKIN_MAP[CELL_TYPES.TARGET]}`)[0]
            .addEventListener('mousedown', this.onMouseDown);
    }

    getGamePanelHtml() {
        return `
            <h2>Панель элементов</h2>
            <div class="game-panel-cells-wrapper">
                <div class="game-panel-cell ${this.renderer.SKIN_MAP[CELL_TYPES.TARGET]}"></div>
                <div class="game-panel-cell ${this.renderer.SKIN_MAP[CELL_TYPES.WALL]}"></div>
                <div class="game-panel-cell ${this.renderer.SKIN_MAP[CELL_TYPES.BOX_ON_EMPTY]}"></div>
                <div class="game-panel-cell ${this.renderer.SKIN_MAP[CELL_TYPES.EMPTY]}"></div>
            </div>
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
        this.initializeDOMListeners();
    }
}
