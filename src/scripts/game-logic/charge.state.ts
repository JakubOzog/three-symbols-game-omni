import {GameStateIf} from "./game-state.if";
import {ThreeSymbolsGameContext} from "./three-symbols-game-context";

export class ChargeState implements GameStateIf {

    constructor(public context: ThreeSymbolsGameContext) {
    }

    public showChargeScreen(): void {
        this.context.gameBoard.showChargeScreen();
        this.waitForCharge();
    }

    private waitForCharge(): void {
        this.context.gameBoard.onStageClick(() => {
            this.feedAccount();
        });
    }

    private feedAccount(): void {
        this.context.feedAmountToPoints();
        this.context.gameBoard.showCurrentPoints(this.context.getCurrentPoints());
        this.context.gameBoard.hideChargeScreen();
    }
}