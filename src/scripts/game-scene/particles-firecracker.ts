import * as PIXI from 'pixi.js'
import * as particles from 'pixi-particles';

export class ParticlesFirecracker {
    constructor(conteiner: PIXI.Container, size: 'small' | 'large') {
        const delay: number = Math.floor(Math.random() * 1000);
        const posX: number = 100 + Math.floor(Math.random() * 600);
        const posY: number = 75 + Math.floor(Math.random() * 300);
        const lifetime: number = size === 'small' ? .3 : 1;

        var emitter = new particles.Emitter(

            // The PIXI.Container to put the emitter in
            // if using blend modes, it's important to put this
            // on top of a bitmap, and not use the root stage Container
            conteiner,

            // The collection of particle images to use
            [PIXI.Texture.from('particle.png')],

            // Emitter configuration, edit this to change the look
            // of the emitter
            {
                "alpha": {
                    "start": 0.8,
                    "end": 0.7
                },
                "scale": {
                    "start": 1,
                    "end": 0.3
                },
                "color": {
                    "start": "e3f9ff",
                    "end": "0ec8f8"
                },
                "speed": {
                    "start": 200,
                    "end": 200
                },
                "startRotation": {
                    "min": 0,
                    "max": 0
                },
                "rotationSpeed": {
                    "min": 0,
                    "max": 0
                },
                "lifetime": {
                    "min": lifetime,
                    "max": lifetime
                },
                "frequency": 0.2,
                "emitterLifetime": 0.41,
                "maxParticles": 1000,
                "pos": {
                    "x": posX,
                    "y": posY
                },
                "addAtBack": false,
                "spawnType": "burst",
                "particlesPerWave": 8,
                "particleSpacing": 45,
                "angleStart": 0
            }
        );
        setTimeout(() =>{
            // Calculate the current time
            var elapsed = Date.now();

            // Update function every frame
            var update = function(){

                // Update the next frame
                requestAnimationFrame(update);

                var now = Date.now();

                // The emitter requires the elapsed
                // number of seconds since the last update
                emitter.update((now - elapsed) * 0.001);
                elapsed = now;

                // Should re-render the PIXI Stage
                // renderer.render(stage);
            };

            // Start emitting
            emitter.emit = true;

            // Start the update
            update();
        }, delay)
    }
}