import {Engine} from "./game-engine/engine";
import {EngineParams} from "./game-engine/engine-params.if";
import {ThreeSymbolsGame} from "./three-symbols-game";
import gsap from "gsap";
import {PixiPlugin} from "gsap/PixiPlugin";
import {MotionPathPlugin} from "gsap/MotionPathPlugin";
import {RoughEase} from "gsap/EasePack";

window.onload = load;

function load() {
    new ThreeSymbolsGameInitializer();
}

export class ThreeSymbolsGameInitializer {
    private engine!: Engine;

    constructor() {
        this.initPixiJs();
        this.loadAssets();
        gsap.registerPlugin(PixiPlugin, MotionPathPlugin, RoughEase);
    }

    private initPixiJs(): void {
        this.engine = new Engine(<EngineParams>{
            containerId: 'game',
            canvasW: 800,
            canvasH: 450
        });
        this.engine.ticker.add(() => {
            this.engine.renderer.render(this.engine.stage);
        });
        this.engine.ticker.start();
    }

    private loadAssets(): void {
        this.engine.loader.add('images/texture', '../../images/texture.png');
        this.engine.loader.add('images/chest-closed', '../../images/chest-closed.png');
        this.engine.loader.add('images/chest-open', '../../images/chest-open.png');
        this.engine.loader.add('images/chest-bg', '../../images/chest-bg.png');
        this.engine.loader.add('images/tiles', '../../images/tiles.png');
        this.engine.loader.add('numbers-spritesheet', '../../images/numbers-spritesheet.json');
        this.engine.loader.add('symbols-spritesheet', '../../images/symbols-spritesheet.json');
        this.engine.loader.add('spritesheet-treasures', '../../images/spritesheet-treasures.json');

        this.engine.loader.load(this.runThreeSymbolsGame.bind(this));
    }

    private runThreeSymbolsGame(): void {
        new ThreeSymbolsGame(this.engine);
    }
}
