import * as PIXI from 'pixi.js'
import gsap from "gsap";
import {GAME_CONFIG} from "../three-symbols-game-config.model";
import {Point} from "pixi.js";

// TODO callbackScope: this,
export class CardContainer extends PIXI.Container {

    private card = new PIXI.Container();
    private cardChest = PIXI.Sprite.from('images/chest-closed');
    private cardBg = PIXI.Sprite.from('images/chest-bg');
    private symbol!: PIXI.Sprite;
    public isSymbolShown = false;
    private isTremblingPossible = false;

    constructor(private index: number, private symbolName: string, private onReady: () => void) {
        super();

        this.prepareCard();
        this.cardIn();
    }

    public cardTrembling(): void {
        if (this.isTremblingPossible) {
            gsap.fromTo(this.cardChest, 0.01, {x:-2}, {x:2, clearProps:"x", repeat:20})
            gsap.fromTo(this.cardChest, 0.01, {y:-2}, {y:2, clearProps:"y", repeat:20})
        }
    }

    private prepareCard(): void {
        this.card.alpha = 0;
        this.card.interactive = true;
        this.card.x = GAME_CONFIG.animations.chests[this.index].start.x;
        this.card.y = GAME_CONFIG.animations.chests[this.index].start.y;
        this.addChild(this.card);
        this.card.addChild(this.cardBg);
        this.card.addChild(this.cardChest);
    }

    private cardIn(): void {
        gsap.to(this.card, {
            duration: 0.5 + (Math.random() / 3),
            delay:(this.index / 5) + (Math.random() / 3),
            ease: "easeOutBack",
            motionPath: GAME_CONFIG.animations.chests[this.index].path,
            onStart: () => {
                this.card.alpha = 1;
            },
            onComplete: () => {
                this.isTremblingPossible = true;
                this.card.once('pointerdown', this.handleCardClick.bind(this));
            }
        });
    }

    private handleCardClick(): void {
        this.isTremblingPossible = false;
        this.cardChest.texture = PIXI.Texture.from('images/chest-open');

        const cartCenter: {"x": number,"y": number} = {
            x: this.card.x + (this.card.width / 2),
            y: this.card.y + (this.card.height / 2)
        };

        this.symbol = PIXI.Sprite.from(this.symbolName);
        this.symbol.alpha = 1;
        this.symbol.x = cartCenter.x;
        this.symbol.y = cartCenter.y;
        this.symbol.scale = new Point(.85, .85);
        this.symbol.anchor.set(0.5);
        this.addChild(this.symbol);

        gsap.to(this.symbol, {
            duration: 0.5 + (Math.random() / 3),
            ease: "easeOutBack",
            motionPath: this.getSymbolMotionPath(),
            onComplete: this.symbolShown.bind(this)
        });
    }

    private getSymbolMotionPath(): {"x": number,"y": number}[] {
        let patternIndex = Math.floor(Math.random() * GAME_CONFIG.animations.symbolPathPatterns.length)
        if (this.index === 0) {
            patternIndex = 0;
        }
        if (this.index === 2) {
            patternIndex = 1;
        }
        const calcToCard: Point[] = JSON.parse(JSON.stringify(GAME_CONFIG.animations.symbolPathPatterns[patternIndex]))
        calcToCard.forEach(p => {
            p.x += this.symbol.x;
            p.y += this.symbol.y;
        });

        calcToCard[3].x += this.deviation();
        calcToCard[3].y += this.deviation();
        if (this.index === 0) {
            calcToCard[3].x += 50;
        }
        if (this.index === 2) {
            calcToCard[3].x -= 50;
        }
        return calcToCard;
    }

    private deviation(): number {
        const deviationBase = 30;
        return Math.floor(Math.random() * deviationBase) - (deviationBase / 2);
    }

    private symbolShown(): void {
        this.isSymbolShown = true;
        this.onReady();
    }
}