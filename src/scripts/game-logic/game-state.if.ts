import {ThreeSymbolsGameContext} from "./three-symbols-game-context";

export interface GameStateIf {
    context: ThreeSymbolsGameContext;

    drawBoard?(): void;

    showThreeCoveredCards?(): void;

    countPoints?(): void;

    clearBoard?(): void;
}
