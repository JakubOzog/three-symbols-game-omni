import * as PIXI from 'pixi.js'
import gsap from "gsap";
import {CardContainer} from "./card-conteiner";
import {GAME_CONFIG} from "../three-symbols-game-config.model";


export class SymbolsContainer extends PIXI.Container {

    private cards: CardContainer[] = [];
    private onFinish?: () => void;
    private duration = GAME_CONFIG.animationStepDurationInSecond;
    constructor(private boardWidth: number,
                private boardHeight: number) {
        super();
    }

    public loadCards(symbolsName: string[], onFinish: () => void): void {
        this.onFinish = onFinish;
        symbolsName.forEach((symbol, index) => {
            this.cards[index] = new CardContainer(index, symbol,this.onCardReady.bind(this));
            this.addChild(this.cards[index]);
        });
    }

    public removeSymbolsFromBoard(onFinish: () => void): void {
        this.children.forEach((sprite, index) => {
            if (index === this.children.length - 1) {
                gsap.to(sprite, {alpha: 0, duration: this.duration, delay: this.duration, onComplete: this.clearContainer.bind(this, onFinish)});
            } else {
                gsap.to(sprite, {alpha: 0, duration: this.duration, delay: this.duration});
            }
        });
    }

    private clearContainer(onFinish: () => void): void {
        while(this.children[0]) {
            this.removeChild(this.children[0]);
        }
        onFinish();
    }

    private onCardReady(): void {
        if (this.cards.every(card => card.isSymbolShown) &&
            this.onFinish) {
            this.onFinish();
        }
    }
}