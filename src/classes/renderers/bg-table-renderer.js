export class BgTableRenderer {
    constructor(rootElementSelector, levelsManager) {
        this.rootElementSelector = rootElementSelector;
        this.levelsManager = levelsManager;
        this.initializeDefaultData();
    }

    initializeDefaultData() {
        this.currentLevelStructure = this.levelsManager.getCurrentLevel();
        this.startNewGameBtnId = 'start-new-game';
    }

    restartLevel() {
        this.currentLevelStructure = this.levelsManager.getCurrentLevel();
        this.render();
    }

    renderNextLevel() {
        this.currentLevelStructure = this.levelsManager.getNextLevel();
        this.render();
    }

    getNewGameBtn() {
        return document.querySelector(`#${this.startNewGameBtnId}`);
    }

    getHtml() {
        return `<div class="main">
                    <header class="header">
                        <nav class="header__nav">
                            <ul class="header__ul">
                                <li class="header__li" id="${this.startNewGameBtnId}">Начать заново</li>
                            </ul>
                        </nav>
                    </header>
        
                <section class="game">
                    <table class="game__table">
                    ${this.currentLevelStructure.map(val => {
            return `<tr class="game__table__tr">
                                                              ${val.map(val => val.getHtml()).join('')}
                                        </tr>`
        }).join('')}
                    </table>
                </section>
        </div>`
    }

    render() {
        const rootElement = document.querySelector(`${this.rootElementSelector}`);

        if (!rootElement) {
            throw new Error('root element was not found!');
        }

        rootElement.innerHTML = this.getHtml();
    }
}
