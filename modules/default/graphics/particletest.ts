/// <reference path="protonwrapper.ts" />
/// <reference path="uniformsyncer.ts" />

// TODO temporary
export function drawEasingFunctionGraph(easingFunction: (x: number) => number)
{
  var canvas = document.createElement("canvas");
  canvas.width = 180;
  canvas.height = 100;

  var context = canvas.getContext("2d");
  context.fillStyle = "rgb(250,250,250)";
  context.fillRect( 0, 0, 180, 100 );

  context.lineWidth = 0.5;
  context.strokeStyle = "rgb(230,230,230)";

  context.beginPath();
  context.moveTo( 0, 20 );
  context.lineTo( 180, 20 );
  context.moveTo( 0, 80 );
  context.lineTo( 180, 80 );
  context.closePath();
  context.stroke();

  context.lineWidth = 2;
  context.strokeStyle = "rgb(255,127,127)";

  context.beginPath();
  context.moveTo(5, 80);

  var resolution = 100;
  for (var i = 0; i < resolution; i++)
  {
    var x = i / resolution;
    var y = easingFunction(x);
    var canvasX = 5 + x * (canvas.width - 10);
    var canvasY = 80 - y * (canvas.height - 40);
    context.lineTo(canvasX, canvasY);
  }

  context.stroke();

  document.body.appendChild(canvas);
}
export namespace Modules
{
  export namespace DefaultModule
  {
    export namespace BattleSFXFunctions
    {
      // TODO refactor | move shaders
      export class ShinyParticleFilter extends PIXI.AbstractFilter
      {
        constructor(uniforms?: any)
        {
          super(null, ShaderSources.shinyparticle.join("\n"), uniforms);
        }
        static getUniformTypes(): IUniformTypesObject
        {
          return(
          {
            spikeColor: "4fv",
            spikeIntensity: "1f",
            highlightIntensity: "1f"
          });
        }
      }
      export class LightBurstFilter extends PIXI.AbstractFilter
      {
        constructor(uniforms?: any)
        {
          super(null, ShaderSources.lightburst.join("\n"), uniforms);
        }
        static getUniformTypes(): IUniformTypesObject
        {
          return(
          {
            seed: "2fv",
            rotation: "1f",
            rayStrength: "1f",
            raySharpness: "1f",
            rayColor: "4fv",
            centerSize: "1f",
            centerBloomStrength: "1f"
          });
        }
      }
      export class IntersectingEllipsesFilter extends PIXI.AbstractFilter
      {
        constructor(uniforms?: any)
        {
          super(null, ShaderSources.intersectingellipses.join("\n"), uniforms);
        }
        static getUniformTypes(): IUniformTypesObject
        {
          return(
          {
            mainColor: "4fv",
            mainAlpha: "1f",
            intersectingEllipseCenter: "2fv",
            intersectingEllipseSize: "2fv",
            intersectingEllipseSharpness: "1f",
            mainEllipseSize: "2fv",
            mainEllipseSharpness: "1f"
          });
        }
      }
      export class BeamFilter extends PIXI.AbstractFilter
      {
        constructor(uniforms?: any)
        {
          super(null, ShaderSources.beam.join("\n"), uniforms);
        }
        static getUniformTypes(): IUniformTypesObject
        {
          return(
          {
            time: "1f",
            seed: "1f",
            aspectRatio: "1f",
            noiseAmplitude: "1f",
            beamColor: "4fv",
            lineIntensity: "1f",
            bulgeIntensity: "1f",
            bulgeXPosition: "1f",
            bulgeSize: "2fv",
            bulgeSharpness: "1f",
            lineXSize: "2fv",
            lineXSharpness: "1f",
            lineYSize: "1f",
            lineYSharpness: "1f"
          });
        }
      }
      export function particleTest(props: Templates.SFXParams)
      {
        //----------INIT GENERAL
        var width2 = props.width / 2;
        var height2 = props.height / 2;

        var mainContainer = new PIXI.Container();
        var bg = new PIXI.Graphics();
        bg.beginFill(0x000000);
        bg.drawRect(0, 0, props.width, props.height);
        bg.endFill();
        bg.alpha = 1.0;
        // mainContainer.addChild(bg);

        var impactHasOccurred = false;
        var relativeImpactTime = 0.18;

        var beamOrigin =
        {
          x: 100,
          y: props.height * 0.66
        }
        var relativeBeamOrigin =
        {
          x: beamOrigin.x / props.width,
          y: beamOrigin.y / props.height
        }

        var renderTexture = new PIXI.RenderTexture(props.renderer, props.width, props.height);
        var renderedSprite = new PIXI.Sprite(renderTexture);
        if (!props.facingRight)
        {
          renderedSprite.x = props.width;
          renderedSprite.scale.x = -1;
        }

        var finalColor = 
        [
          0.368627450980392,
          0.792156862745098,
          0.694117647058823,
          1.0
        ];

        //----------INIT PARTICLES
        var particleContainer = new PIXI.Container();
        // particleContainer.alpha = 0.1;
        mainContainer.addChild(particleContainer);
        var protonWrapper = new ProtonWrapper(props.renderer, particleContainer);

        var particleShaderColor =
        {
          r: 1.0,
          g: 1.0,
          b: 1.0,
          a: 1.0
        };
        var particleShaderColorArray =
        [
          particleShaderColor.r,
          particleShaderColor.g,
          particleShaderColor.b,
          particleShaderColor.a
        ];
        var particleShaderColorTween = new TWEEN.Tween(particleShaderColor).to(
          {
            r: finalColor[0],
            g: finalColor[1],
            b: finalColor[2],
            a: 1.0
          }, props.duration / 2
        );

        var particlesAmountScale = props.width / 700;

        //----------INIT BEAM
        var beamSpriteSize =
        {
          x: props.width,
          y: props.height
        }

        var beamUniforms = new UniformSyncer(BeamFilter.getUniformTypes(), function(time: number)
        {
          var rampUpValue = Math.min(time / relativeImpactTime, 1.0);
          rampUpValue = Math.pow(rampUpValue, 7.0);

          var timeAfterImpact = Math.max(time - relativeImpactTime, 0.0);
          var relativeTimeAfterImpact = getRelativeValue(timeAfterImpact, 0.0, 1.0 - relativeImpactTime);

          var rampDownValue = Math.min(Math.pow(relativeTimeAfterImpact * 1.2, 12.0), 1.0);
          var beamIntensity = rampUpValue - rampDownValue;

          return(
          {
            time: time * 100,
            noiseAmplitude: 0.4 * beamIntensity,
            lineIntensity: 2.0 + 3.0 * beamIntensity,
            bulgeIntensity: 6.0 * beamIntensity,

            bulgeSize:
            [
              0.7 * Math.pow(beamIntensity, 1.5),
              0.4 * Math.pow(beamIntensity, 1.5)
            ],
            bulgeSharpness: 0.3 + 0.35 * beamIntensity,

            lineXSize:
            [
              relativeBeamOrigin.x * rampUpValue,
              1.0
            ],
            lineXSharpness: 0.99 - beamIntensity * 0.99,

            lineYSize: 0.001 + beamIntensity * 0.03,
            lineYSharpness: 0.99 - beamIntensity * 0.15 + 0.01 * rampDownValue
          });
        });

        beamUniforms.set("seed", Math.random() * 100);
        beamUniforms.set("beamColor", finalColor);
        beamUniforms.set("aspectRatio", beamSpriteSize.x / beamSpriteSize.y);
        beamUniforms.set("bulgeXPosition", relativeBeamOrigin.x + 0.1);

        var beamFilter = new BeamFilter(beamUniforms.getUniformsObject());

        var beamSprite = createDummySpriteForShader(
          0,
          beamOrigin.y - beamSpriteSize.y / 2,
          beamSpriteSize.x,
          beamSpriteSize.y
        );
        beamSprite.shader = beamFilter;
        beamSprite.blendMode = PIXI.BLEND_MODES.SCREEN;

        mainContainer.addChild(beamSprite);

        //----------INIT SMALL EMITTER
        var smallEmitter = new Proton.BehaviourEmitter();
        smallEmitter.p.x = beamOrigin.x + 50;
        smallEmitter.p.y = beamOrigin.y;
        smallEmitter.damping = 0.013;

        var smallParticleGraphicsSize =
        {
          x: 4,
          y: 4
        };
        var smallParticleGraphics = new PIXI.Graphics();
        smallParticleGraphics.beginFill(0x5ECAB1, 1.0);
        smallParticleGraphics.drawRect(
          smallParticleGraphicsSize.x / 2,
          smallParticleGraphicsSize.y / 2,
          smallParticleGraphicsSize.x,
          smallParticleGraphicsSize.y
          );
        smallParticleGraphics.endFill();

        var smallParticleTexture = smallParticleGraphics.generateTexture(props.renderer, 1, PIXI.SCALE_MODES.DEFAULT,
          new PIXI.Rectangle(0, 0, smallParticleGraphicsSize.x * 1.5, smallParticleGraphicsSize.y * 1.5)
        );

        smallEmitter.addInitialize(new Proton.ImageTarget(smallParticleTexture));
        smallEmitter.addInitialize(new Proton.Velocity(new Proton.Span(2.5, 3.5),
          new Proton.Span(270, 35, true), 'polar'));
        smallEmitter.addInitialize(new Proton.Position(new Proton.RectZone(
          0,
          -30,
          props.width + 100 - smallEmitter.p.x,
          30
        )));
        smallEmitter.addInitialize(new Proton.Life(new Proton.Span(
          props.duration * (1.0 - relativeImpactTime) / 6000,
          props.duration * (1.0 - relativeImpactTime) / 3000
        )));

        smallEmitter.addBehaviour(new Proton.Scale(new Proton.Span(0.8, 1), 0));
        smallEmitter.addBehaviour(new Proton.Alpha(1, 0));

        smallEmitter.addBehaviour(new Proton.RandomDrift(20, 30, props.duration / 2000));

        protonWrapper.addEmitter(smallEmitter, "smallParticles");

        var smallParticleUniforms = new UniformSyncer(ShinyParticleFilter.getUniformTypes(),
          function(time: number)
        {
          var lifeLeft = 1.0 - time;

          return(
          {
            spikeColor: particleShaderColorArray,
            spikeIntensity: Math.pow(lifeLeft, 1.5) * 0.4,
            highlightIntensity: Math.pow(lifeLeft, 1.5)
          });
        });
        var smallParticleFilter = new ShinyParticleFilter(smallParticleUniforms.getUniformsObject());

        protonWrapper.onSpriteCreated["smallParticles"] = function(sprite: PIXI.Sprite)
        {
          sprite.shader = smallParticleFilter;
          sprite.blendMode = PIXI.BLEND_MODES.SCREEN;
        };

        //----------INIT SHINY EMITTER
        var shinyEmitter = new Proton.BehaviourEmitter();
        shinyEmitter.p.x = beamOrigin.x;
        shinyEmitter.p.y = beamOrigin.y;

        var shinyParticleTexture = getDummyTextureForShader();
        shinyEmitter.addInitialize(new Proton.ImageTarget(shinyParticleTexture));

        var shinyEmitterLifeInitialize = new Proton.Life(new Proton.Span(props.duration / 3000, props.duration / 1000));
        shinyEmitter.addInitialize(shinyEmitterLifeInitialize);
        shinyEmitter.damping = 0.009;

        var emitterZone = new Proton.RectZone(
          0,
          -5,
          props.width + 100 - shinyEmitter.p.x,
          5
        );
        shinyEmitter.addInitialize(new Proton.Position(emitterZone));

        shinyEmitter.addBehaviour(new Proton.Scale(new Proton.Span(60, 100), 0));
        shinyEmitter.addBehaviour(new Proton.Alpha(1, 0));
        // shinyEmitter.addBehaviour(new Proton.RandomDrift(5, 10, 0.3));

        protonWrapper.addEmitter(shinyEmitter, "shinyParticles");

        var shinyParticleUniforms = new UniformSyncer(ShinyParticleFilter.getUniformTypes(),
          function(time: number)
        {
          var lifeLeft = 1.0 - time;

          return(
          {
            spikeColor: particleShaderColorArray,
            spikeIntensity: 1 - time * 0.1,
            highlightIntensity: Math.pow(lifeLeft, 2.0)
          });
        });
        var shinyParticleFilter = new ShinyParticleFilter(shinyParticleUniforms.getUniformsObject());

        protonWrapper.onSpriteCreated["shinyParticles"] = function(sprite: PIXI.Sprite)
        {
          sprite.shader = shinyParticleFilter;
          sprite.blendMode = PIXI.BLEND_MODES.SCREEN;
        };
        
        shinyEmitter.rate = new Proton.Rate(
          150 * particlesAmountScale, // particles per emit
          0 // time between emits in seconds
        );
        shinyEmitter.emit("once");


        //----------INIT SHOCKWAVE
        var shockWaveMainEllipseMaxSize =
        {
          x: 0.3,
          y: 0.9
        }
        var shockWaveIntersectingEllipseMaxSize =
        {
          x: 0.8,
          y: 1.0
        }

        var shockWaveUniforms = new UniformSyncer(IntersectingEllipsesFilter.getUniformTypes(),
          function(time: number)
        {
          var burstX: number;

          if (time < (relativeImpactTime - 0.02))
          {
            burstX = 0;
          }
          else
          {
            burstX = time - (relativeImpactTime - 0.02);
          }

          var shockWaveSize = TWEEN.Easing.Quintic.Out(burstX);

          return(
          {
            mainEllipseSize:
            [
              shockWaveMainEllipseMaxSize.x * shockWaveSize,
              shockWaveMainEllipseMaxSize.y * shockWaveSize
            ],
            intersectingEllipseSize:
            [
              shockWaveIntersectingEllipseMaxSize.x * shockWaveSize,
              shockWaveIntersectingEllipseMaxSize.y * shockWaveSize
            ],
            intersectingEllipseCenter:
            [
              0.05 + 0.3 * shockWaveSize,
              0.0
            ],
            mainEllipseSharpness: 0.8 + 0.18 * (1.0 - shockWaveSize),
            intersectingEllipseSharpness: 0.4 + 0.4 * (1.0 - shockWaveSize),
            mainAlpha: 1.0 - shockWaveSize
          });
        });
        shockWaveUniforms.set("mainColor", [1, 1, 1, 1]);

        var shockWaveFilter = new IntersectingEllipsesFilter(shockWaveUniforms.getUniformsObject());

        var shockWaveSpriteSize =
        {
          x: props.height * 3.0,
          y: props.height * 3.0
        }
        var shockWaveSprite = createDummySpriteForShader(
          beamOrigin.x - (shockWaveSpriteSize.x / 2 * 1.04),
          beamOrigin.y - shockWaveSpriteSize.y / 2,
          shockWaveSpriteSize.x,
          shockWaveSpriteSize.y
        );
        shockWaveSprite.shader = shockWaveFilter;
        // shockWaveSprite.blendMode = PIXI.BLEND_MODES.SCREEN;

        mainContainer.addChild(shockWaveSprite);


        //----------INIT LIGHTBURST
        var lightBurstUniforms = new UniformSyncer(LightBurstFilter.getUniformTypes(),
          function(time: number)
        {
          var rampUpValue = Math.min(time / relativeImpactTime, 1.0);
          rampUpValue = Math.pow(rampUpValue, 7.0);

          var timeAfterImpact = Math.max(time - relativeImpactTime, 0.0);
          var rampDownValue = Math.pow(timeAfterImpact * 5.0, 2.0);

          var lightBurstIntensity = Math.max(rampUpValue - rampDownValue, 0.0);

          return(
          {
            centerSize: Math.pow(lightBurstIntensity, 2.0),
            centerBloomStrength: Math.pow(lightBurstIntensity, 2.0) * 5.0,
            rayStrength: Math.pow(lightBurstIntensity, 3.0)
          });
        });

        lightBurstUniforms.set("seed", [Math.random() * 69, Math.random() * 420]);
        lightBurstUniforms.set("rotation", 0.0);
        lightBurstUniforms.set("raySharpness", 2.0);
        lightBurstUniforms.set("rayColor", [0.75, 0.75, 0.62, 1.0]);

        var lightBurstFilter = new LightBurstFilter(lightBurstUniforms.getUniformsObject());

        var lightBurstSize =
        {
          x: props.height * 1.5,
          y: props.height * 3
        }
        var lightBurstSprite = createDummySpriteForShader(
          beamOrigin.x - lightBurstSize.x / 2,
          beamOrigin.y - lightBurstSize.y / 2,
          lightBurstSize.x,
          lightBurstSize.y
        );
        lightBurstSprite.shader = lightBurstFilter;
        lightBurstSprite.blendMode = PIXI.BLEND_MODES.SCREEN;

        mainContainer.addChild(lightBurstSprite);

        //----------ANIMATE

        function animate()
        {
          var elapsedTime = Date.now() - startTime;

          protonWrapper.update();

          var tweenTime = window.performance.now();

          particleShaderColorTween.update(tweenTime);
          particleShaderColorArray[0] = particleShaderColor.r;
          particleShaderColorArray[1] = particleShaderColor.g;
          particleShaderColorArray[2] = particleShaderColor.b;
          particleShaderColorArray[3] = particleShaderColor.a;

          var timePassed = elapsedTime / props.duration
          var lifeLeft = 1 - timePassed;
          var timePassedSinceImpact = getRelativeValue(timePassed, relativeImpactTime, 1.0);

          if (timePassed >= relativeImpactTime - 0.02)
          {
            if (!impactHasOccurred)
            {
              impactHasOccurred = true;
              var lifeLeftInSeconds = props.duration * lifeLeft / 1000;
              var emitterLife = lifeLeftInSeconds * 0.8;

              var velocityInitialize = new Proton.Velocity(new Proton.Span(1.5, 3),
                new Proton.Span(270, 25, true), 'polar')
              protonWrapper.addInitializeToExistingParticles(shinyEmitter, velocityInitialize);

              shinyEmitter.removeInitialize(shinyEmitterLifeInitialize);
              shinyEmitter.addInitialize(new Proton.Life(new Proton.Span(emitterLife / 4, emitterLife / 2.5)));

              shinyEmitter.rate = new Proton.Rate(4 * particlesAmountScale, 0.02);
              shinyEmitter.life = emitterLife;
              shinyEmitter.emit();


              smallEmitter.rate = new Proton.Rate(6 * particlesAmountScale, 0.02);
              smallEmitter.life = emitterLife;
              smallEmitter.emit();

              props.triggerEffect();
            }

            smallParticleUniforms.sync(timePassed);
          }

          beamUniforms.sync(timePassed);
          shinyParticleUniforms.sync(timePassed);
          lightBurstUniforms.sync(timePassed);
          shockWaveUniforms.sync(timePassed);

          renderTexture.clear();
          renderTexture.render(mainContainer);

          if (elapsedTime < props.duration)
          {
            requestAnimationFrame(animate);
          }
          else
          {
            smallParticleTexture.destroy(true);
            protonWrapper.destroy();
            props.triggerEnd();
          }
        }

        props.triggerStart(renderedSprite);

        var startTime = Date.now();
        particleShaderColorTween.start();
        animate();
      }
    }
  }
}
