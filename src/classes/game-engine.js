import {GAME_ENGINE_ACTIONS} from "./mediators/game-mediator.js";

export class GameEngine {
    constructor(playingField, levelsManager, mediator) {
        this.playingField = playingField;
        this.levelsManager = levelsManager;
        this.mediator = mediator;
        this.startNewGameBtnId = 'start-new-game';
    }

    WIN_MESSAGE_TIMEOUT = 0;
    WIN_MESSAGE_TEXT = 'Вы выйграли!';
    NEXT_LEVEL_MESSAGE = 'Хотите перейти на следующий уровень ?';
    DO_NOT_HAVE_NEXT_LEVEL_MESSAGE = 'Следующий уровень отсутствует! Вы прошли финальный уровень.'

    environments = [];

    refreshEnvironmentsToWin() {
        this.environments = [];
    }

    playerMeetBrownBox(
        elementFromPlayer,
        playerDirectionFn,
        getElementFromFn,
    ) {
        const {element, rowIndex, cellIndex} = this.levelsManager.getElementFullData(elementFromPlayer);
        const fromBrownBoxElement = getElementFromFn(rowIndex, cellIndex);
        if (this.playingField.isGround(fromBrownBoxElement)) {
            this.levelsManager.changePositions(fromBrownBoxElement, elementFromPlayer);
            playerDirectionFn();
        } else if (this.playingField.isEnvironmentBox(fromBrownBoxElement)) {
            this.levelsManager.changePositions(elementFromPlayer, fromBrownBoxElement);
            playerDirectionFn();
            const saturatedBox = this.levelsManager.saturatedBoxAndReturnNewElement(elementFromPlayer);
            this.levelsManager.changeElementToGround(fromBrownBoxElement);
            this.boxMeetEnvironment(saturatedBox, fromBrownBoxElement);
        }
    }

    playerMeetSaturatedBox(nextElement, playerDirectionFn, getElementFromFn) {
        const {rowIndex, cellIndex, element} = this.levelsManager.getElementFullData(nextElement);
        const nextToSaturatedBoxElement = getElementFromFn(rowIndex, cellIndex);

        if (!this.playingField.isBox(nextToSaturatedBoxElement)) {
            this.boxLeaveEnvironment(nextElement);
            this.levelsManager.unSaturateBoxActions(this.levelsManager.getElementFullData(nextElement));
            this.playerMeetBrownBox(
                this.levelsManager.unSaturateBoxAndReturnNewElement(nextElement),
                playerDirectionFn,
                getElementFromFn
            );
        }
    }

    boxMeetEnvironment(saturatedBoxObj, environment) {
        this.environments.push([saturatedBoxObj, environment]);

        if (this.environments.length === this.getEnvironmentsToWin().length) {
            this.win()
        }
    }

    boxLeaveEnvironment(saturatedBoxObj) {
        const environmentBoxArray = this.environments.find(val => val.includes(saturatedBoxObj));

        if (!environmentBoxArray) {
            throw new Error('environments array doesnt have this specific saturated box');
        }

        this.environments = this.environments.filter(val => !val.includes(saturatedBoxObj));
    }

    getEnvironmentsToWin() {
        const gameStructure = this.levelsManager.getCurrentLevel();
        const environments = [];
        gameStructure.forEach(row => {
            row.forEach(cell => {
                if (this.playingField.isEnvironmentBox(cell)) environments.push(cell);
            })
        })
        return environments;
    }

    playerMeetEnvironment(environmentElement, playerDirectionFn) {
        playerDirectionFn();
        this.levelsManager.saturatePlayer();
        this.levelsManager.changeElementToGround(environmentElement);
    }

    rightAction() {
        this.gameActions(
            this.levelsManager.getRightElementFromThePlayer(),
            this.levelsManager.playerToRight.bind(this.levelsManager),
            this.levelsManager.getRightElementFrom.bind(this.levelsManager)
        );
    }

    leftAction() {
        this.gameActions(
            this.levelsManager.getLeftElementFromThePlayer(),
            this.levelsManager.playerToLeft.bind(this.levelsManager),
            this.levelsManager.getLeftElementFrom.bind(this.levelsManager)
        );
    }

    upAction() {
        this.gameActions(
            this.levelsManager.getTopElementFromThePlayer(),
            this.levelsManager.playerToTop.bind(this.levelsManager),
            this.levelsManager.getTopElementFrom.bind(this.levelsManager)
        );
    }

    bottomAction() {
        this.gameActions(
            this.levelsManager.getBottomElementFromThePlayer(),
            this.levelsManager.playerToBottom.bind(this.levelsManager),
            this.levelsManager.getBottomElementFrom.bind(this.levelsManager)
        );
    }

    gameActions(
        nextElement,
        playerDirectionFn,
        getElementFromFn
    ) {
        if (this.playingField.isPlayerSaturated(this.levelsManager.getCurrentPlayerData().player)
            && !this.playingField.isBox(nextElement)
            && !this.playingField.isBrownBox(nextElement)) {
            this.levelsManager.unSaturatePlayerActions(this.levelsManager.getCurrentEnvironmentPosition());
        }

        if (this.playingField.isGround(nextElement)) {
            playerDirectionFn();
        } else if (this.playingField.isBrownBox(nextElement)) {
            this.playerMeetBrownBox(
                nextElement,
                playerDirectionFn,
                getElementFromFn
            );
        } else if (this.playingField.isEnvironmentBox(nextElement)) {
            this.playerMeetEnvironment(
                nextElement,
                playerDirectionFn
            );
        } else if (this.playingField.isSaturatedBox(nextElement)) {
            this.playerMeetSaturatedBox(
                nextElement,
                playerDirectionFn,
                getElementFromFn
            );
        }
        this.postGameActions();
    }

    postGameActions() {
        this.startNewGameListener();
        this.mediator.publish(GAME_ENGINE_ACTIONS.rerender_game);
    }

    startNewGameListener() {
        document.getElementById('startNewGameBtnId').addEventListener('click', () => this.startNewGame());
    }

    startNewGame() {
        this.refreshEnvironmentsToWin();
        this.mediator.publish(GAME_ENGINE_ACTIONS.start_new_game);
    }

    initializeMediatorListeners() {
        this.mediator.subscribe(GAME_ENGINE_ACTIONS.on_left, this.leftAction.bind(this));
        this.mediator.subscribe(GAME_ENGINE_ACTIONS.on_right, this.rightAction.bind(this));
        this.mediator.subscribe(GAME_ENGINE_ACTIONS.on_top, this.upAction.bind(this));
        this.mediator.subscribe(GAME_ENGINE_ACTIONS.on_bottom, this.bottomAction.bind(this));
    }

    showWinMessage() {
        alert(this.WIN_MESSAGE_TEXT);
    }

    win() {
        setTimeout(() => {
            this.showWinMessage();
            this.refreshEnvironmentsToWin();
            const isStartNextLevel = confirm(this.NEXT_LEVEL_MESSAGE);
            if (this.levelsManager.hasNextLevel() && isStartNextLevel) {
                this.mediator.publish(GAME_ENGINE_ACTIONS.to_the_next_level);
                return;
            } else if (!this.levelsManager.hasNextLevel() && isStartNextLevel) {
                alert(this.DO_NOT_HAVE_NEXT_LEVEL_MESSAGE);
            }
            this.startNewGame();
        }, this.WIN_MESSAGE_TIMEOUT);
    }

    run() {
        this.initializeMediatorListeners();
        this.startNewGameListener();
    }
}
