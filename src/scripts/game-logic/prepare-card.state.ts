import {GameStateIf} from "./game-state.if";
import {ThreeSymbolsGameContext} from "./three-symbols-game-context";

export class PrepareCardState implements GameStateIf {

    constructor(public context: ThreeSymbolsGameContext) {
    }

    public showThreeCoveredCards(): void {
        const symbols: string[] = this.context.prepareNewThreeSymbols();
        return this.context.gameBoard.loadCards(symbols);
    }
}