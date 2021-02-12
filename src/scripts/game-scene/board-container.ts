import * as PIXI from 'pixi.js'
import gsap from "gsap";
import {GAME_CONFIG} from "../three-symbols-game-config.model";

export class BoardContainer extends PIXI.Container {

    private bgTrash = new PIXI.Container();
    private bgConf = GAME_CONFIG.animations.background;

    constructor(private boardWidth: number,
                private boardHeight: number) {
        super();
    }

    public onEnterFrame(): void {
        if (Math.floor(Math.random() * this.bgConf.frequency) === 0) {
            this.startNewTreasure();
        }
        this.clearInvisibleTreasure();
    }

    public prepareBoard(onFinish: () => void): void {
        this.backgroundTiles(onFinish);
        this.addChild(this.bgTrash);
    }

    private startNewTreasure(): void {
        const drawnIndex = Math.floor(Math.random() * this.bgConf.sprites.length);
        const treasure = PIXI.Sprite.from(this.bgConf.sprites[drawnIndex]);
        treasure.x = Math.floor(Math.random() * this.boardWidth);
        treasure.y = Math.floor(Math.random() * (this.bgConf.horizonLine));
        treasure.anchor.set(0.5);
        treasure.alpha = .70;
        this.bgTrash.addChild(treasure);

        const duration = this.getTreasureTime();
        const range = this.getTreasureRange();

        gsap.fromTo(treasure.scale, {x: 0, y: 0}, {x: .75, y: .75, duration: duration, ease: "easeInOutQuart"});
        gsap.to(treasure, {rotation: Math.PI * 2, duration: duration, y: treasure.y - range, ease: "easeInOutQuart"});
        gsap.to(treasure, {alpha: 0, delay: duration * .7, duration: duration * .3});
    }

    private getTreasureTime(): number {
        return this.bgConf.time.duration + Math.floor(Math.random() * this.bgConf.time.deviation);
    }

    private getTreasureRange(): number {
        return this.bgConf.range.distance + Math.floor(Math.random() * this.bgConf.range.deviation);
    }

    private clearInvisibleTreasure(): void {
        this.bgTrash.children
            .filter(item => item.alpha ===0)
            .forEach(item => this.bgTrash.removeChild(item));
    }

    private backgroundTiles(onFinish: () => void): void {
        const texture = PIXI.Texture.from('images/texture');

        const maxX = Math.floor(this.boardWidth / texture.width) - 1;
        const maxY = Math.floor(this.boardHeight / texture.height) - 1;

        for (let x = 0; x <= Math.floor(this.boardWidth / texture.width); x++) {
            for (let y = 0; y <= Math.floor(this.boardHeight / texture.height); y++) {
                if (maxX === x && maxY === y) {
                    this.loadTailBg(texture, x, y, onFinish);
                } else {
                    this.loadTailBg(texture, x, y);
                }
            }
        }

        const scaleX = this.boardWidth / this.width;
        const scaleY = this.boardHeight / this.height;
        this.scale = new PIXI.Point(scaleX, scaleY);
    }

    private loadTailBg(texture: PIXI.Texture, x: number, y: number, onFinish?: () => void): void {
        const sprite = PIXI.Sprite.from(texture);
        sprite.alpha = 0;
        sprite.x = x * texture.width;
        sprite.y = y * texture.width;
        sprite.tint = 0x0d4770;
        this.addChild(sprite);
        gsap.to(sprite, {
            alpha: 1,
            duration: GAME_CONFIG.animationStepDurationInSecond,
            delay: 0.05 * (x + y),
            onComplete: onFinish
        });
    }
}