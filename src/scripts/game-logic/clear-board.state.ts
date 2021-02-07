import {ThreeSymbolsGameContext} from "./three-symbols-game-context";
import {GameStateIf} from "./game-state.if";

export class ClearBoardState implements GameStateIf {

    constructor(public context: ThreeSymbolsGameContext) {
    }

    public clearBoard(): void {
        return this.context.gameBoard.clearBoard();
    }
}