export const GAME_CONFIG: ThreeSymbolsGameConfigModel = require("./three-symbols-game-config.json");

export interface ThreeSymbolsGameConfigModel {
    availableSymbols: string[],
    winingDataSet: {
        symbols: string[],
        prize: number
    }[],
    animations: any,
    animationStepDurationInSecond: number,
    bonusChanceForThreeSymbolsInPercent: number,
}
