export const GAME_CONFIG: ThreeSymbolsGameConfigModel = require("./three-symbols-game-config.json");

export interface ThreeSymbolsGameConfigModel {
    availableSymbols: string[],
    winingDataSet: {
        symbols: string[],
        prize: number
    }[],
    animationStepDurationInSecond: number,
    bonusChanceForThreeSymbolsInPercent: number,
    animations: {
        chestTremblingFrequency: number,
        symbolPathPatterns: [],
        chests: any[],
        background: any,
    },
    conditions: {
        chargePerGame: number,
        feedAmount: number,
        notEnoughPointsForGameInformation: string,
    }
}
