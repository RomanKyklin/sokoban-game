import {CELL_TYPES} from "../cells/cell-types.js";

export class SokobanLevelsBuilder {
    constructor(
        renderer
    ) {
        this.renderer = renderer;
        this.currentDroppable = null;
    }

    onMouseDown(event) {
        const element = event.target;
        let shiftX = event.clientX - element.getBoundingClientRect().left;
        let shiftY = event.clientY - element.getBoundingClientRect().top;

        element.style.position = 'absolute';
        element.style.zIndex = 1000;
        document.body.append(element)

        const moveAt = (pageX, pageY) => {
            element.style.left = pageX - shiftX + 'px';
            element.style.top = pageY - shiftY + 'px';
        }

        moveAt(event.pageX, event.pageY);

        const onMouseMove = (event) => {
            moveAt(event.pageX, event.pageY);

            element.hidden = true;
            let elemBelow = document.elementFromPoint(event.clientX, event.clientY);
            element.hidden = false;

            if (!elemBelow) return;

            let droppableBelow = elemBelow.closest('.droppable');

            if (this.currentDroppable != droppableBelow) {
                if (this.currentDroppable) {
                    // логика обработки процесса "вылета" из droppable (удаляем подсветку)
                    leaveDroppable(this.currentDroppable);
                }
                this.currentDroppable = droppableBelow;
                if (this.currentDroppable) {
                    // логика обработки процесса, когда мы "влетаем" в элемент droppable
                    enterDroppable(this.currentDroppable);
                }
            }

            function enterDroppable(elem) {
                elem.style.background = 'pink';
            }

            function leaveDroppable(elem) {
                elem.style.background = '';
            }
        }

        // (3) перемещать по экрану
        document.addEventListener('mousemove', onMouseMove);

        // (4) положить мяч, удалить более ненужные обработчики событий
        element.onmouseup = () => {
            this.renderer.levelsManager.currentLevelStructure.forEach((row, y) => {
                row.forEach((cell, x) => {

                })
            })
            document.removeEventListener('mousemove', onMouseMove);
            element.onmouseup = null;
        };

        element.ondragstart = function () {
            return false;
        };
    }

    initializeDOMListeners() {
        document.getElementsByClassName(`game-panel-cell ${this.renderer.SKIN_MAP[CELL_TYPES.TARGET]}`)[0]
            .addEventListener('mousedown', this.onMouseDown.bind(this));
        document.getElementsByClassName(`game-panel-cell ${this.renderer.SKIN_MAP[CELL_TYPES.WALL]}`)[0]
            .addEventListener('mousedown', this.onMouseDown.bind(this));
        document.getElementsByClassName(`game-panel-cell ${this.renderer.SKIN_MAP[CELL_TYPES.BOX_ON_EMPTY]}`)[0]
            .addEventListener('mousedown', this.onMouseDown.bind(this));
        document.getElementsByClassName(`game-panel-cell ${this.renderer.SKIN_MAP[CELL_TYPES.EMPTY]}`)[0]
            .addEventListener('mousedown', this.onMouseDown.bind(this));
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
