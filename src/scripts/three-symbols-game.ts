import {Engine} from "./game-engine/engine";
import {ThreeSymbolsGameContext} from "./game-logic/three-symbols-game-context";
import {PrepareGameBoardState} from "./game-logic/prepare-game-board.state";
import {PrepareCardState} from "./game-logic/prepare-card.state";
import {CountPointsState} from "./game-logic/count-points.state";
import {ClearBoardState} from "./game-logic/clear-board.state";
import {AnimationFinishEvent, GameBoard} from "./game-scene/game-board";
import {ChargeState} from "./game-logic/charge.state";

export class ThreeSymbolsGame {
    private gameBoard = new GameBoard(this.engine);
    private threeSymbolsGame = new ThreeSymbolsGameContext(this.gameBoard);

    constructor(private engine: Engine) {
        this.letsPlay();
        this.gameBoard.onAnimationFinish.on(AnimationFinishEvent.BOARD_DRAWN, this.checkAvailableCredits.bind(this));
        this.gameBoard.onAnimationFinish.on(AnimationFinishEvent.FEED_CREDITS, this.checkAvailableCredits.bind(this));
        this.gameBoard.onAnimationFinish.on(AnimationFinishEvent.CARD_UNCOVERED, this.countPoints.bind(this));
        this.gameBoard.onAnimationFinish.on(AnimationFinishEvent.POINTS_SET, this.clearBoard.bind(this));
        this.gameBoard.onAnimationFinish.on(AnimationFinishEvent.BOARD_CLEANED, this.checkAvailableCredits.bind(this));
    }

    private letsPlay(): void {
        const prepareGameBoard = new PrepareGameBoardState(this.threeSymbolsGame);
        prepareGameBoard.drawBoard();
    }

    private checkAvailableCredits(): void {
        if (this.threeSymbolsGame.hasCreditsForGame()) {
            this.loadNewSymbols();
        } else {
            this.waitingForCharge();
        }
    }

    private waitingForCharge(): void {
        const prepareGameBoard = new ChargeState(this.threeSymbolsGame);
        prepareGameBoard.showChargeScreen();
    }

    private loadNewSymbols(): void {
        const prepareGameBoard = new PrepareCardState(this.threeSymbolsGame);
        prepareGameBoard.showThreeCoveredCards();
    }

    private countPoints(): void {
        const prepareGameBoard = new CountPointsState(this.threeSymbolsGame);
        prepareGameBoard.countPoints();
    }

    private clearBoard(): void {
        const prepareGameBoard = new ClearBoardState(this.threeSymbolsGame);
        prepareGameBoard.clearBoard();
    }
}
