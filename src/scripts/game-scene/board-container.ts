import * as PIXI from 'pixi.js'
import gsap from "gsap";
import {GAME_CONFIG} from "../three-symbols-game-config.model";

export class BoardContainer extends PIXI.Container {

    constructor(private boardWidth: number,
                private boardHeight: number) {
        super();
    }

    public prepareBoard(onFinish: () => void): void {
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
        this.addChild(sprite);
        gsap.to(sprite, {alpha: 1, duration: GAME_CONFIG.animationStepDurationInSecond, delay: 0.05 * (x + y), onComplete: onFinish});
    }
}