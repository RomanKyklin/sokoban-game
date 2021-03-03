export class GameEngine {
    constructor() {
    }

    GAME_HTML_SELECTORS = {
        playerIdentificationClass: 'game__table__td--player',
        playerDefaultCssClass: ['game__table__td--player', 'game__table__td--player-default'],
        groundCssClass: 'game__table__td--ground',
        brownBoxCssClass: 'game__table__td--brown-box',
        environmentCssClass: 'game__table__td--environment',
        newGameBtnClass: 'start-new-game',
        startGameBlockID: 'start-game-block',
    };

    KEYBOARD_KEYS = {
        leftArrowKey: 'ArrowLeft',
        rightArrowKey: 'ArrowRight',
        upArrowKey: 'ArrowUp',
        downArrowKey: 'ArrowDown'
    }

    startNewGameListener() {
        document.querySelector(`.${this.GAME_HTML_SELECTORS.newGameBtnClass}`)
            .addEventListener('click', () => {
                document.querySelectorAll(this.GAME_HTML_SELECTORS.groundCssClass).forEach(node => {
                    node.classList.remove(...this.GAME_HTML_SELECTORS.playerDefaultCssClass);
                });
                document.querySelector(`#${this.GAME_HTML_SELECTORS.startGameBlockID}`).classList.add(
                    ...this.GAME_HTML_SELECTORS.playerDefaultCssClass
                );
            })
    }

    changePlayerPosition(currentElement, newElement) {
        currentElement.classList.remove(...this.GAME_HTML_SELECTORS.playerDefaultCssClass);
        newElement.classList.add(...this.GAME_HTML_SELECTORS.playerDefaultCssClass);
    }

    isGroundElement(element) {
        return element && element.classList.contains(this.GAME_HTML_SELECTORS.groundCssClass)
    }

    hasChildNodes(element) {
        return element && element.childNodes.length > 0;
    }

    getChildElementKey(parentElement, childElement) {
        let elementKey;

        parentElement.childNodes.forEach((node, key) => {
            if (node === childElement) elementKey = key;
        })

        return elementKey || null;
    }

    getChildElementByKey(parentElement, childElementKey) {
        let foundElement;

        parentElement.childNodes.forEach((val, key) => {
            if (key === childElementKey) {
                foundElement = val;
            }
        });

        return foundElement || null;
    }

    rightLeftArrowActions(sibling, playerElement) {
        if (this.isGroundElement(sibling)) {
            this.changePlayerPosition(playerElement, sibling);
        }
    }

    topBottomArrowActions(playerElement) {
        const parentElement = playerElement.parentElement;
        const topParentSibling = parentElement ? parentElement.previousElementSibling : null;
        const elementKey = this.getChildElementKey(parentElement, playerElement);

        if (this.hasChildNodes(topParentSibling)) {
            const topElement = this.getChildElementByKey(parentElement, elementKey);

            if (this.isGroundElement(topElement)) {
                this.changePlayerPosition(playerElement, topElement)
            }
        }
    }

    movementListeners() {
        document.addEventListener('keydown', $e => {
            const {key} = $e;
            let playerElement = document.querySelector(`.${this.GAME_HTML_SELECTORS.playerIdentificationClass}`);

            switch (key) {
                case this.KEYBOARD_KEYS.leftArrowKey:
                    this.rightLeftArrowActions(playerElement.previousElementSibling, playerElement);
                    return;
                case this.KEYBOARD_KEYS.rightArrowKey:
                    this.rightLeftArrowActions(playerElement.nextElementSibling, playerElement);
                    return;
                case this.KEYBOARD_KEYS.upArrowKey:
                    this.topBottomArrowActions(playerElement);
                    return;
                case this.KEYBOARD_KEYS.downArrowKey:
                    this.topBottomArrowActions(playerElement);
                    return;
                default:
                    return;
            }
        })
    }

    run() {
        this.startNewGameListener();
        this.movementListeners();
    }
}
