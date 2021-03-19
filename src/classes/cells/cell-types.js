export default class CellTypes {
    static PLAYER_TYPE = 'player'
    static GROUND_TYPE = 'ground';
    static ENVIRONMENT_TYPE = 'environment';
    static BOX_TYPE = 'box';
    static BROWN_BOX_TYPE = 'brown-box';
    static SATURATED_BOX_TYPE = 'saturated-box-type';
    static SATURATED_PLAYER_TYPE = 'saturated-player-type';
}
export const CELL_TYPES = {
    OUT_SPACE: 1,
    EMPTY: 2,
    WALL: 4,
    TARGET: 8,
    BOX: 16,
    PLAYER: 32
};
CELL_TYPES.BOX_ON_EMPTY =  CELL_TYPES.BOX | CELL_TYPES.EMPTY;
CELL_TYPES.BOX_ON_TARGET =  CELL_TYPES.BOX | CELL_TYPES.TARGET;
CELL_TYPES.PLAYER_ON_EMPTY =  CELL_TYPES.PLAYER | CELL_TYPES.EMPTY;
CELL_TYPES.PLAYER_ON_TARGET =  CELL_TYPES.PLAYER | CELL_TYPES.TARGET;
