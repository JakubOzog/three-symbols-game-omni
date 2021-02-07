export const GAME_CONFIG: ThreeSymbolsGameConfigModel = require("./three-symbols-game-config.json");

export interface ThreeSymbolsGameConfigModel {
    availableSymbols: string[],
    winingDataSet: {
        symbols: string[],
        prize: number
    }[],
    symbolsPositionInPercent: [
        {"x": number, "y": number, "rotation": number},
    ],
    animationStepDurationInSecond: number
}
