import {GameEngine} from "./classes/game-engine.js";
import {BgTableRenderer} from "./classes/renderers/bg-table-renderer.js";
import {ImageTableRenderer} from "./classes/renderers/image-table-renderer.js";
import {EventLoop} from "./classes/event-loop.js";
import {PlayingField} from "./classes/playing-field.js";
import {CellsFactory} from "./classes/factories/cells-factory.js";
import {GameFacade} from "./classes/facades/game-facade.js";
import {GameMediator} from "./classes/ mediators/game-mediator.js";

(function game(document) {
    const cellsFactory = new CellsFactory(CellsFactory.BG_TYPES.bg_table);
    const playingField = new PlayingField(cellsFactory);
    const gameRenderer = new BgTableRenderer('#root', playingField);
    const gameEngine = new GameEngine(gameRenderer, playingField);
    const gameMediator = new GameMediator();

    const gameFacade = new GameFacade(
        gameRenderer,
        gameEngine,
        new EventLoop(),
        gameMediator
    );
    gameFacade.run();
})(document)
