import {GameStateIf} from "./game-state.if";
import {ThreeSymbolsGameContext} from "./three-symbols-game-context";

export class PrepareCardState implements GameStateIf {

    constructor(public context: ThreeSymbolsGameContext) {
    }

    public showThreeCoveredCards(): void {
        const chargedPoints: number = this.context.chargeAccountForGame();
        this.context.gameBoard.subtractPoints(chargedPoints);
        this.context.gameBoard.showCurrentPoints(this.context.getCurrentPoints());
        const symbols: string[] = this.context.prepareNewThreeSymbols();
        this.context.gameBoard.loadCards(symbols);
    }
}