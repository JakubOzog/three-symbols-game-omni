import {ThreeSymbolsGameContext} from "./three-symbols-game-context";
import {GameStateIf} from "./game-state.if";
import {AnimationFinishEvent} from "../game-scene/game-board";

export class CountPointsState implements GameStateIf {

    constructor(public context: ThreeSymbolsGameContext) {
    }

    public countPoints(): void {
        const points = this.context.checkWinedPoints();
        this.context.gameBoard.onAnimationFinish.once(AnimationFinishEvent.POINTS_SET, this.updateCurrentPoints.bind(this))
        return this.context.gameBoard.animateObtainedPoints(points);
    }

    private updateCurrentPoints(): void {
        const points = this.context.getCurrentPoints();
        return this.context.gameBoard.showCurrentPoints(points);
    }
}