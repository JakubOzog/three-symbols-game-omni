import {ThreeSymbolsGameContext} from "./three-symbols-game-context";
import {GameStateIf} from "./game-state.if";

export class PrepareGameBoardState implements GameStateIf {

    constructor(public context: ThreeSymbolsGameContext) {
    }

    public drawBoard(): void {
        this.context.gameBoard.drawBoard();
    }
}