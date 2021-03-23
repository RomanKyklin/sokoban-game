import {CELL_TYPES} from "../cells/cell-types.js";
import {GAME_ENGINE_ACTIONS} from "../mediators/game-mediator.js";

export class SokobanLevelsBuilder {
    constructor(
        mediator,
        levelsBuilderManager,
        elementSkins = []
    ) {
        this.mediator = mediator;
        this.levelsBuilderManager = levelsBuilderManager;
        this.elementSkins = elementSkins;
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
            const {cellType} = elemBelow.dataset;

            if ((cellType && !(Number(cellType) & CELL_TYPES.PLAYER)) && this.currentDroppable != droppableBelow) {
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
            if (this.currentDroppable) {
                const {x: eX, y: eY} = this.currentDroppable.dataset;
                const {cellType} = element.dataset;
                this.levelsBuilderManager.currentLevelStructure[eY][eX] = Number(cellType);
                element.remove();
                this.mediator.publish(GAME_ENGINE_ACTIONS.rerender_builder);
                this.run()
            }
            document.removeEventListener('mousemove', onMouseMove);
            element.onmouseup = null;
        };

        element.ondragstart = function () {
            return false;
        };
    }

    initializeDOMListeners() {
        this.elementSkins.forEach(skin => {
            document.getElementsByClassName(`game-panel-cell ${skin}`)[0]
                .addEventListener('mousedown', this.onMouseDown.bind(this));
        })
    }

    saveLevel() {
        localStorage.setItem(
            this.levelsBuilderManager.currentLevelIndex,
            JSON.stringify(this.levelsBuilderManager.currentLevelStructure)
        );
    }

    initializeMediatorSubscriptions() {
        this.mediator.subscribe(GAME_ENGINE_ACTIONS.levels_builder_save, () => this.saveLevel());
    }

    run() {
        this.initializeDOMListeners();
        this.initializeMediatorSubscriptions();
    }
}
