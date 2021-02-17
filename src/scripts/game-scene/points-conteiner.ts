import * as PIXI from 'pixi.js'
import gsap from "gsap";
import {GAME_CONFIG} from "../three-symbols-game-config.model";
import {ParticlesFirecracker} from "./particles-firecracker";

export class PointsContainer extends PIXI.Container {

    private pointsAnimation = new PIXI.Container();
    private currentPoints = new PIXI.Container();
    private particlesFirecracker = new PIXI.Container();
    private information = new PIXI.Container();

    constructor(private boardWidth: number,
                private boardHeight: number) {
        super();
        this.currentPoints.x = 20;
        this.currentPoints.y = 20;
        this.addChild(this.currentPoints);
        this.addChild(this.pointsAnimation);
        this.addChild(this.particlesFirecracker);
        this.addChild(this.information);
    }

    public showChargeScreen(): void {
        if(this.information.children.length === 0) {
            const bitmapFontText = new PIXI.BitmapText(
                GAME_CONFIG.conditions.notEnoughPointsForGameInformation,
                { fontName: 'Desyrel', fontSize: 40, align: 'center'}
                );
            bitmapFontText.anchor = 0.5;

            this.information.addChild(bitmapFontText);
            this.information.x = this.boardWidth / 2;
            this.information.y = this.boardHeight / 2;
        }
        const phaseTime = GAME_CONFIG.animationStepDurationInSecond;
        gsap.fromTo(this.information.scale, {x: 0, y: 0}, {x: 1, y: 1, duration: phaseTime*2, ease: "back.out(1.7)"});
    }

    public hideChargeScreen(onFinish: () => void): void {
        const phaseTime = GAME_CONFIG.animationStepDurationInSecond;
        gsap.fromTo(this.information.scale, {x: 1, y: 1}, {x: 0, y: 0, duration: phaseTime*2, ease: "back.in(1.7)", onComplete: onFinish});
    }

    public showCurrentPoints(points: number): void {
        this.clearContainerChildren(this.currentPoints);
        this.drawNumberToContainer(this.currentPoints, points);
    }

    public subtractPoints(points: number): void {
        this.clearContainerChildren(this.pointsAnimation);
        this.drawNumberToContainer(this.pointsAnimation, points);
        const phaseTime = GAME_CONFIG.animationStepDurationInSecond;

        gsap.fromTo(this.pointsAnimation,
            {alpha: 1, x: this.getAnimationTargetX(), y: 20},
            {alpha: 0, x: this.getAnimationTargetX(), y: 100, duration: phaseTime * 2});

    }

    public animateObtainedPoints(points: number, onFinish: () => void): void {
        this.preparePointsSprites(points);

        this.pointsAnimation.x = (this.boardWidth / 2) - (this.pointsAnimation.width/2);
        this.pointsAnimation.y = (this.boardHeight / 2) - (this.pointsAnimation.height/2);
        this.pointsAnimation.alpha = 1;

        const phaseTime = GAME_CONFIG.animationStepDurationInSecond;
        if (points === 0) {
            this.pointsAnimation.x -= 15;
            gsap.to(this.pointsAnimation, {alpha: 0, duration: phaseTime, delay: phaseTime, onComplete: onFinish});
            gsap.to(this.pointsAnimation, {y: -this.pointsAnimation.height, duration: phaseTime * 3, ease: "easeInQuart"});
            gsap.to(this.pointsAnimation, {x: this.pointsAnimation.x + 30, yoyo: true, repeat: 2, duration: phaseTime / 2});
        } else {
            gsap.to(this.pointsAnimation.scale, {repeat: 1, yoyo: true, x: 1.5, y: 1.5, duration: phaseTime, ease: "easeInQuart"});
            gsap.to(this.pointsAnimation, {x: this.getAnimationTargetX(), y: 20, duration: phaseTime * 2, ease: "easeInQuart"});
            gsap.to(this.pointsAnimation, {alpha: 0, duration: phaseTime, delay: phaseTime, onComplete: onFinish});
        }
    }

    public smallFirecracker(): void {
        new ParticlesFirecracker(this.particlesFirecracker, 'small');
        new ParticlesFirecracker(this.particlesFirecracker, 'small');
        new ParticlesFirecracker(this.particlesFirecracker, 'small');
        new ParticlesFirecracker(this.particlesFirecracker, 'small');
    }

    public largeFirecracker(): void {
        new ParticlesFirecracker(this.particlesFirecracker, 'large');
        new ParticlesFirecracker(this.particlesFirecracker, 'large');
        new ParticlesFirecracker(this.particlesFirecracker, 'large');
        new ParticlesFirecracker(this.particlesFirecracker, 'large');
        new ParticlesFirecracker(this.particlesFirecracker, 'large');
        new ParticlesFirecracker(this.particlesFirecracker, 'large');
    }

    private getAnimationTargetX(): number {
        return Math.max(this.currentPoints.width + 20 - this.pointsAnimation.width, 20);
    }

    private preparePointsSprites(points: number) {
        this.clearContainerChildren(this.pointsAnimation);
        this.drawNumberToContainer(this.pointsAnimation, points);
    }

    private drawNumberToContainer(container: PIXI.Container, number: number) {
        number.toString().split('').forEach((digit) =>{
            const digitSprite = PIXI.Sprite.from(digit.charCodeAt(0) + '.ase');
            digitSprite.x = container.width + 10;
            container.addChild(digitSprite);
        });
    }

    private clearContainerChildren(container: PIXI.Container) {
        while(container.children[0]) {
            container.removeChild(container.children[0]);
        }
    }
}