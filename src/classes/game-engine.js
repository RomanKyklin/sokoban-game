export class GameEngine {
    constructor() {
    }

    WIN_MESSAGE_TIMEOUT = 1000;
    WIN_MESSAGE_TEXT = 'Вы выйграли!';

    GAME_HTML_SELECTORS = {
        playerIdentificationClass: 'game__table__td--player',
        playerDefaultCssClass: ['game__table__td--player', 'game__table__td--player-default'],
        playerLeftDirectionCssClass: ['game__table__td--player', 'game__table__td--player-left'],
        playerRightDirectionCssClass: ['game__table__td--player', 'game__table__td--player-right'],
        playerTopDirectionCssClass: ['game__table__td--player', 'game__table__td--player-top'],
        groundCssClass: 'game__table__td--ground',
        greenGroundClass: 'game__table__td--green-ground',
        brownBoxCssClass: 'game__table__td--brown-box',
        environmentCssClass: 'game__table__td--environment',
        newGameBtnClass: 'start-new-game',
        startGameBlockID: 'default-player-place',
        defaultBrownBoxPlaceID: 'default-brown-box-place',
        defaultEnvironmentPlaceID: 'default-environment-place'
    };

    KEYBOARD_KEYS = {
        leftArrowKey: 'ArrowLeft',
        rightArrowKey: 'ArrowRight',
        upArrowKey: 'ArrowUp',
        downArrowKey: 'ArrowDown'
    }

    currentPlayerDirectionClass = this.GAME_HTML_SELECTORS.playerDefaultCssClass;

    changePlayerDirection(newDirectionClass) {
        this.currentPlayerDirectionClass = newDirectionClass;
    }

    startNewGameListener() {
        document.querySelector(`.${this.GAME_HTML_SELECTORS.newGameBtnClass}`)
            .addEventListener('click', this.startNewGame.bind(this))
    }

    removePlayerClasses(node) {
        node.classList.remove(...this.GAME_HTML_SELECTORS.playerDefaultCssClass);
        node.classList.remove(...this.GAME_HTML_SELECTORS.playerRightDirectionCssClass);
        node.classList.remove(...this.GAME_HTML_SELECTORS.playerLeftDirectionCssClass);
        node.classList.remove(...this.GAME_HTML_SELECTORS.playerTopDirectionCssClass);
    }

    changePlayerPosition(currentElement, newElement) {
        document.querySelectorAll(`.${this.GAME_HTML_SELECTORS.playerIdentificationClass}`)
            .forEach(node => this.removePlayerClasses(node))
        newElement.classList.add(...this.currentPlayerDirectionClass);
    }

    changeBoxPosition(currentElement, newElement) {
        currentElement.classList.remove(this.GAME_HTML_SELECTORS.brownBoxCssClass);
        currentElement.classList.add(this.GAME_HTML_SELECTORS.groundCssClass);
        if (newElement.classList.contains(this.GAME_HTML_SELECTORS.groundCssClass)) {
            newElement.classList.remove(this.GAME_HTML_SELECTORS.groundCssClass);
        }
        newElement.classList.add(this.GAME_HTML_SELECTORS.brownBoxCssClass);
    }

    changeBrownBoxToGreenGroundPosition(currentElement, newElement) {
        currentElement.classList.remove(this.GAME_HTML_SELECTORS.brownBoxCssClass);
        currentElement.classList.add(this.GAME_HTML_SELECTORS.groundCssClass);
        newElement.classList.remove(this.GAME_HTML_SELECTORS.environmentCssClass);
        newElement.classList.add(this.GAME_HTML_SELECTORS.greenGroundClass);
    }

    isGroundElement(htmlElement) {
        return htmlElement && htmlElement.classList.contains(this.GAME_HTML_SELECTORS.groundCssClass);
    }

    isBrownBoxElement(htmlElement) {
        return htmlElement && htmlElement.classList.contains(this.GAME_HTML_SELECTORS.brownBoxCssClass);
    }

    isEnvironmentElement(htmlElement) {
        return htmlElement && htmlElement.classList.contains(this.GAME_HTML_SELECTORS.environmentCssClass);
    }

    isEnvironmentElementComesAfterBrownBox(newElement) {
        return this.isEnvironmentElement(this.getTopOrBottomNewElement(
            newElement,
            newElement?.parentElement || null,
            newElement?.parentElement?.nextElementSibling || null
        ))
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

    rightLeftArrowActions(playerElement, sibling) {
        this.movementActions(playerElement, sibling);
    }

    topArrowAction(playerElement) {
        const parentElement = playerElement?.parentElement || null;
        const topParentSibling = parentElement?.previousElementSibling || null;
        const topNewElement = this.getTopOrBottomNewElement(playerElement, parentElement, topParentSibling);
        topNewElement ? this.movementActions(playerElement, topNewElement) : null;
    }

    bottomArrowAction(playerElement) {
        const parentElement = playerElement?.parentElement || null;
        const bottomParentSibling = parentElement?.nextElementSibling || null;
        const bottomNewElement = this.getTopOrBottomNewElement(playerElement, parentElement, bottomParentSibling);
        bottomNewElement ? this.movementActions(playerElement, bottomNewElement) : null;
    }

    getTopOrBottomNewElement(currentElement, parentElement, parentSibling) {
        const elementKey = this.getChildElementKey(parentElement, currentElement);

        if (this.hasChildNodes(parentSibling)) {
            return this.getChildElementByKey(parentSibling, elementKey);
        }
        return null;
    }

    movementActions(playerElement, newElement) {
        const bottomNewElement = this.getTopOrBottomNewElement(
            newElement,
            newElement?.parentElement || null,
            newElement?.parentElement?.nextElementSibling || null
        );
        if (this.isGroundElement(newElement)) {
            this.changePlayerPosition(playerElement, newElement);
        } else if (this.isBrownBoxElement(newElement) && !this.isEnvironmentElementComesAfterBrownBox(newElement)) {
            this.changePlayerPosition(playerElement, newElement);
            this.changeBoxPosition(newElement, bottomNewElement);
        } else if (this.isBrownBoxElement(newElement) && this.isEnvironmentElementComesAfterBrownBox(newElement)) {
            this.changePlayerPosition(playerElement, newElement);
            this.changeBrownBoxToGreenGroundPosition(newElement, bottomNewElement);
            this.win();
        }
    }

    movementListeners() {
        document.addEventListener('keydown', $e => {
            const {key} = $e;
            let playerElement = document.querySelector(`.${this.currentPlayerDirectionClass}`);

            switch (key) {
                case this.KEYBOARD_KEYS.leftArrowKey:
                    this.changePlayerDirection(this.GAME_HTML_SELECTORS.playerLeftDirectionCssClass);
                    this.rightLeftArrowActions(playerElement, playerElement.previousElementSibling);
                    return;
                case this.KEYBOARD_KEYS.rightArrowKey:
                    this.changePlayerDirection(this.GAME_HTML_SELECTORS.playerRightDirectionCssClass);
                    this.rightLeftArrowActions(playerElement, playerElement.nextElementSibling);
                    return;
                case this.KEYBOARD_KEYS.upArrowKey:
                    this.changePlayerDirection(this.GAME_HTML_SELECTORS.playerTopDirectionCssClass);
                    this.topArrowAction(playerElement);
                    return;
                case this.KEYBOARD_KEYS.downArrowKey:
                    this.changePlayerDirection(this.GAME_HTML_SELECTORS.playerDefaultCssClass);
                    this.bottomArrowAction(playerElement);
                    return;
                default:
                    return;
            }
        })
    }

    setBrownBoxToDefaultPosition() {
        document.querySelectorAll(`.${this.GAME_HTML_SELECTORS.brownBoxCssClass}`).forEach(node => {
            node.classList.remove(this.GAME_HTML_SELECTORS.brownBoxCssClass);

            if (!node.classList.contains(this.GAME_HTML_SELECTORS.groundCssClass)) {
                node.classList.add(this.GAME_HTML_SELECTORS.groundCssClass);
            }
        });

        const defaultBrownBoxElement = document.querySelector(`#${this.GAME_HTML_SELECTORS.defaultBrownBoxPlaceID}`);

        if (defaultBrownBoxElement.classList.contains(this.GAME_HTML_SELECTORS.groundCssClass)) {
            defaultBrownBoxElement.classList.remove(this.GAME_HTML_SELECTORS.groundCssClass);
        }

        defaultBrownBoxElement.classList.add(this.GAME_HTML_SELECTORS.brownBoxCssClass);
    }

    setPlayerToDefaultPosition() {
        document.querySelectorAll(`.${this.GAME_HTML_SELECTORS.playerIdentificationClass}`).forEach(node => {
            this.removePlayerClasses(node);
        });
        document.querySelector(`#${this.GAME_HTML_SELECTORS.startGameBlockID}`).classList.add(
            ...this.GAME_HTML_SELECTORS.playerDefaultCssClass
        );

    }

    setEnvironmentToDefaultPosition() {
        document.querySelectorAll(`.${this.GAME_HTML_SELECTORS.greenGroundClass}`).forEach(node => {
            node.classList.remove(this.GAME_HTML_SELECTORS.greenGroundClass);
        });
        document.querySelector(`#${this.GAME_HTML_SELECTORS.defaultEnvironmentPlaceID}`).classList.add(
            this.GAME_HTML_SELECTORS.environmentCssClass
        );
    }

    startNewGame() {
        this.setPlayerToDefaultPosition();
        this.setBrownBoxToDefaultPosition();
        this.setEnvironmentToDefaultPosition();
    }

    showWinMessage() {
        alert(this.WIN_MESSAGE_TEXT);
    }

    win() {
        setTimeout(() => {
            this.showWinMessage();
            this.startNewGame();
        }, this.WIN_MESSAGE_TIMEOUT);
    }

    run() {
        this.startNewGameListener();
        this.movementListeners();
    }
}
