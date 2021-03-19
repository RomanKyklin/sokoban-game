import {GameEngine} from "./classes/game-engine.js";
import {BgTableRenderer} from "./classes/renderers/bg-table-renderer.js";
import {ImageTableRenderer} from "./classes/renderers/image-table-renderer.js";
import {EventLoop} from "./classes/event-loop.js";
import {PlayingField} from "./classes/playing-field.js";
import {GameMediator} from "./classes/mediators/game-mediator.js";
import {LevelsManager} from "./classes/levels-manager.js";

(function game(document) {
    const playingField = new PlayingField();
    const levelsManager = new LevelsManager(0, playingField.getAllLevels());
    const mediator = new GameMediator();

    const gameRenderer = new BgTableRenderer(
        '#root',
        levelsManager,
        mediator
    );

    const gameEngine = new GameEngine(
        playingField,
        levelsManager,
        mediator
    );

    const eventLoop = new EventLoop(mediator);

    gameRenderer.render();
    eventLoop.initNavigationListeners();
    gameEngine.run();
})(document)
