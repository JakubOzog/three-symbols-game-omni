import {GameStateIf} from "./game-state.if";
import {GAME_CONFIG} from "../three-symbols-game-config.model";
import {GameBoard} from "../game-scene/game-board";

export class ThreeSymbolsGameContext {
    private _gameState!: GameStateIf;
    private points: number = 0;
    private currentSymbols?: string[];

    constructor(private _gameBoard: GameBoard) {
    }

    get gameBoard(): GameBoard {
        return this._gameBoard;
    }

    get gameState(): GameStateIf {
        return this._gameState;
    }

    set gameState(value: GameStateIf) {
        this._gameState = value;
    }

    public checkWinedPoints(): number {
        const passedSets = GAME_CONFIG.winingDataSet.filter((set) => {
            if (this.currentSymbols) {
                const tmpSymbols: string[] = [...this.currentSymbols];
                return set.symbols.every((symbol) => {
                    const index = tmpSymbols.indexOf(symbol);
                    if (index > -1) {
                        tmpSymbols.splice(index, 1);
                        return true;
                    } else {
                        return false;
                    }
                });
            }
        });
        const maxPoints = passedSets.reduce((previousValue, currentValue) => {
            return previousValue > currentValue.prize ? previousValue : currentValue.prize;
        }, 0)
        this.points += maxPoints;
        return maxPoints;
    };

    public getCurrentPoints(): number {
        return this.points;
    }

    public prepareNewThreeSymbols(): string[] {
        this.currentSymbols = this.drawNewSymbols();
        return this.currentSymbols;
    }

    private drawNewSymbols(): string[] {
        const currentSymbols: string[] = [];
        while (true) {
            const random = Math.floor(Math.random() * GAME_CONFIG.availableSymbols.length);
            const randomSymbol = GAME_CONFIG.availableSymbols[random];
            currentSymbols.push(randomSymbol);
            if (currentSymbols.length === 1 &&
                Math.random() * 100 < GAME_CONFIG.bonusChanceForThreeSymbolsInPercent) {
                currentSymbols.push(randomSymbol);
                currentSymbols.push(randomSymbol);
            }
            if (currentSymbols.length >= 3) {
                return currentSymbols;
            }
        }
    }
}