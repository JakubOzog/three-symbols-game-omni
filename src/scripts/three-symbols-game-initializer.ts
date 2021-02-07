import {Engine} from "./game-engine/engine";
import {EngineParams} from "./game-engine/engine-params.if";
import {ThreeSymbolsGame} from "./three-symbols-game";

window.onload = load;

function load() {
    new ThreeSymbolsGameInitializer();
}

export class ThreeSymbolsGameInitializer {
    private engine!: Engine;

    constructor() {
        this.initPixiJs();
        this.loadAssets();
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
        this.engine.loader.add('images/tiles', '../../images/tiles.png');
        this.engine.loader.add('numbers-spritesheet', '../../images/numbers-spritesheet.json');
        this.engine.loader.add('symbols-spritesheet', '../../images/symbols-spritesheet.json');

        this.engine.loader.load(this.runThreeSymbolsGame.bind(this));
    }

    private runThreeSymbolsGame(): void {
        new ThreeSymbolsGame(this.engine);
    }
}
