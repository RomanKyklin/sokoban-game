import {BgTableRenderer} from "./bg-table-renderer.js";

export class LevelsBuilderRenderer extends BgTableRenderer {
    constructor(rootElementSelector, levelsManager, mediator) {
        super(rootElementSelector, levelsManager, mediator);
        this.additionalCellClasses = 'droppable';
    }

    initializeMediatorListeners() {
    }

    get headerTemplate() {
        return `<header class="header">
                        <nav class="header__nav">
                            <ul class="header__ul">
                                <li class="header__li" id="saveNewLevelTemplate">Сохранить</li>
                            </ul>
                        </nav>
                    </header>`;
    }
}
