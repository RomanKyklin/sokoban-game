import {GameEngine} from "./classes/game-engine.js";
import {BgTableRenderer} from "./classes/renderers/bg-table-renderer.js";
import {ImageTableRenderer} from "./classes/renderers/image-table-renderer.js";
import {EventLoop} from "./classes/event-loop.js";
import {PlayingField} from "./classes/playing-field.js";
import {CellsFactory} from "./classes/factories/cells-factory.js";
import {GameFacade} from "./classes/facades/game-facade.js";
import {GameMediator} from "./classes/mediators/game-mediator.js";
import {LevelsManager} from "./classes/levels-manager.js";

(function game(document) {
    const cellsFactory = new CellsFactory(CellsFactory.BG_TYPES.bg_table);
    const playingField = new PlayingField(cellsFactory);
    const levelsManager = new LevelsManager(0, playingField.getAllLevels());
    const mediator = new GameMediator();

    const gameRenderer = new BgTableRenderer(
        '#root',
        levelsManager
    );

    const gameEngine = new GameEngine(
        playingField,
        levelsManager,
        mediator
    );

    const gameFacade = new GameFacade(
        gameRenderer,
        gameEngine,
        new EventLoop(),
        mediator
    );
    gameFacade.run();
})(document)
