import {GAME_ENGINE_ACTIONS} from "./mediators/game-mediator.js";

export class GameEngine {
    constructor(levelsManager, mediator) {
        this.levelsManager = levelsManager;
        this.mediator = mediator;
    }

    WIN_MESSAGE_TIMEOUT = 0;
    WIN_MESSAGE_TEXT = 'Вы выйграли!';
    NEXT_LEVEL_MESSAGE = 'Хотите перейти на следующий уровень ?';
    DO_NOT_HAVE_NEXT_LEVEL_MESSAGE = 'Следующий уровень отсутствует! Вы прошли финальный уровень.'

    rightAction() {
        this.levelsManager.toRight();
        this.postGameActions()
    }

    leftAction() {
        this.levelsManager.toLeft();
    }

    topAction() {
        this.levelsManager.toTop()
    }

    bottomAction() {
        this.levelsManager.toBottom()
    }

    gameActions(actionFn) {
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
        this.mediator.publish(GAME_ENGINE_ACTIONS.start_new_game);
    }

    initializeMediatorListeners() {
        this.mediator.subscribe(GAME_ENGINE_ACTIONS.on_left, () => this.leftAction());
        this.mediator.subscribe(GAME_ENGINE_ACTIONS.on_right, () => this.rightAction());
        this.mediator.subscribe(GAME_ENGINE_ACTIONS.on_top, () => this.topAction());
        this.mediator.subscribe(GAME_ENGINE_ACTIONS.on_bottom, () => this.bottomAction());
    }

    showWinMessage() {
        alert(this.WIN_MESSAGE_TEXT);
    }

    win() {
        setTimeout(() => {
            this.showWinMessage();
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
