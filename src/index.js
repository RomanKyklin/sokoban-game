import {GameEngine} from "./classes/game-engine.js";
import {BgTableRenderer} from "./classes/renderers/bg-table-renderer.js";
import {ImageTableRenderer} from "./classes/renderers/image-table-renderer.js";
import {EventLoop} from "./classes/event-loop.js";
import {PlayingField} from "./classes/playing-field.js";
import {GameMediator} from "./classes/mediators/game-mediator.js";
import {LevelsManager} from "./classes/levels-manager.js";
import {SokobanLevelsBuilder} from "./classes/levels-builder/sokoban-levels-builder.js";
import {LevelsBuilderRenderer} from "./classes/renderers/levels-builder-renderer.js";
import {LevelsBuilderPlayingField} from "./classes/levels-builder-playing-field.js";

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
        levelsManager,
        mediator
    );

    const eventLoop = new EventLoop(mediator);

    const levelsBuilderGameRenderer = new LevelsBuilderRenderer(
        '#builder',
        new LevelsManager(0, (new LevelsBuilderPlayingField()).getAllLevels()),
        mediator,
        '#game-panel'
    );
    const levelsBuilder = new SokobanLevelsBuilder(levelsBuilderGameRenderer, mediator);

    gameRenderer.render();
    levelsBuilderGameRenderer.renderAll();
    eventLoop.initNavigationListeners();
    gameEngine.run();
    levelsBuilder.run();
})(document)
