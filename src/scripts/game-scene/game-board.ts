import {Engine} from "../game-engine/engine";
import {BoardContainer} from "./board-container";
import {SymbolsContainer} from "./symbols-conteiner";
import {PointsContainer} from "./points-conteiner";
import * as PIXI from 'pixi.js'

export enum AnimationFinishEvent {
    BOARD_DRAWN = 'BOARD_DRAWN',
    CARD_UNCOVERED = 'CARD_UNCOVERED',
    POINTS_SET = 'POINTS_SET',
    BOARD_CLEANED = 'BOARD_CLEANED',
}

export class GameBoard {

    public onAnimationFinish = new PIXI.utils.EventEmitter();

    private bordWidth = this.engine.renderer.gl.drawingBufferWidth;
    private bordHeight = this.engine.renderer.gl.drawingBufferHeight;
    private board = new BoardContainer(this.bordWidth, this.bordHeight);
    private symbols = new SymbolsContainer(this.bordWidth, this.bordHeight);
    private points = new PointsContainer(this.bordWidth, this.bordHeight);

    constructor(private engine: Engine) {
        engine.stage.addChild(this.board);
        engine.stage.addChild(this.symbols);
        engine.stage.addChild(this.points);

        this.engine.ticker.add(() => {
            this.board.onEnterFrame();
            this.symbols.onEnterFrame();
        });
    }

    public drawBoard(): void {
        this.board.prepareBoard(() => this.onAnimationFinish.emit(AnimationFinishEvent.BOARD_DRAWN))
    }

    public loadCards(symbols: string[]): void {
        this.symbols.loadCards(symbols,() => this.onAnimationFinish.emit(AnimationFinishEvent.CARD_UNCOVERED))
    }

    public animateObtainedPoints(points: number): void {
        if (points > 0 && points < 100) {
            this.points.smallFirecracker();
        }
        if (points >= 100) {
            this.points.largeFirecracker();
        }
        this.points.animateObtainedPoints(points, () => this.onAnimationFinish.emit(AnimationFinishEvent.POINTS_SET))
    }

    public showCurrentPoints(points: number): void {
        this.points.showCurrentPoints(points)
    }

    public clearBoard(): void {
        this.symbols.removeSymbolsFromBoard(() => this.onAnimationFinish.emit(AnimationFinishEvent.BOARD_CLEANED))
    }
}