import * as PIXI from 'pixi.js'
import gsap from "gsap";
import {GAME_CONFIG} from "../three-symbols-game-config.model";

export class CardContainer extends PIXI.Container {

    private card = PIXI.Sprite.from('images/tiles');
    private symbol: PIXI.Sprite;
    private isCardInFinished = false;
    private isCardClicked = false;
    public isSymbolShown = false;

    constructor(private symbolName: string, private onReady: () => void) {
        super();
        this.symbol = PIXI.Sprite.from(symbolName);
        this.prepareCard();
        this.cardIn();
    }

    private prepareCard(): void {
        this.symbol.alpha = 0;
        this.symbol.x = -(this.symbol.width / 2);
        this.symbol.y = -(this.symbol.height / 2);
        this.addChild(this.symbol);

        this.card.alpha = 0;
        this.card.x = -(this.card.width / 2);
        this.card.y = -(this.card.height / 2);
        this.card.interactive = true;
        this.card.once('pointerdown', this.handleCardClick.bind(this))
        this.addChild(this.card);
    }

    private cardIn(): void {
        const phaseTime = GAME_CONFIG.animationStepDurationInSecond;
        gsap.to(this.card, {alpha: 1, duration: phaseTime});
        gsap.to(this.symbol, {alpha: 1, duration: phaseTime, delay: phaseTime});
        gsap.to(this.card.scale, {repeat: 1, yoyo: true, x: 1.5, y: 1.5, duration: phaseTime, ease: "power2.out"});
        gsap.to(this.card, {
            repeat: 1,
            yoyo: true,
            x: this.card.x - (this.card.width / 4),
            y: this.card.y - (this.card.height / 4),
            duration: phaseTime,
            ease: "power2.out",
            onComplete: this.cardInFinished.bind(this)
        });
    }

    private cardInFinished(): void {
        this.isCardInFinished = true;
        this.checkCartOut();
    }

    private handleCardClick(): void {
        this.isCardClicked = true;
        this.checkCartOut();
    }
    private checkCartOut(): void {
        if (this.isCardClicked && this.isCardInFinished) {
            this.cardOut();
        }
    }

    private cardOut(): void {
        const phaseTime = GAME_CONFIG.animationStepDurationInSecond;
        gsap.to(this.card, {alpha: 0, duration: phaseTime, onComplete: this.symbolShown.bind(this)});
    }

    private symbolShown(): void {
        this.isSymbolShown = true;
        this.onReady();
    }
}