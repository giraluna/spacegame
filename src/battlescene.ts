/// <reference path="../lib/pixi.d.ts" />

/// <reference path="templateinterfaces/IBattleSFXTemplate.d.ts" />

/// <reference path="unit.ts" />

module Rance
{
  export enum BattleSceneUnitState
  {
    entering,
    stationary,
    exiting
  }
  export class BattleScene
  {
    container: PIXI.Container;
    renderer: PIXI.WebGLRenderer | PIXI.CanvasRenderer;
    pixiContainer: HTMLElement;

    layers:
    {
      battleOverlay: PIXI.Container;
      side1Container: PIXI.Container;
      side1UnitOverlay: PIXI.Container;
      side1Unit: PIXI.Container;
      side2Container: PIXI.Container;
      side2UnitOverlay: PIXI.Container;
      side2Unit: PIXI.Container;
    };
    side1Unit: Unit;
    side2Unit: Unit;

    unit1State: BattleSceneUnitState;
    unit2State: BattleSceneUnitState;

    activeSFX: Templates.IBattleSFXTemplate;
    activeUnit: Unit;

    isPaused: boolean = false;
    forceFrame: boolean = false;

    resizeListener: (e: Event) => void;

    constructor(pixiContainer: HTMLElement)
    {
      this.pixiContainer = pixiContainer;
      this.container = new PIXI.Container();

      var pixiContainerStyle = window.getComputedStyle(this.pixiContainer);
      this.renderer = PIXI.autoDetectRenderer(
        parseInt(pixiContainerStyle.width),
        parseInt(pixiContainerStyle.height),
        {
          autoResize: false,
          antialias: true
        }
      );

      this.pixiContainer.appendChild(this.renderer.view);
      this.renderer.view.setAttribute("id", "battle-scene-pixi-canvas");
      
      this.initLayers();

      this.resizeListener = this.handleResize.bind(this);
      window.addEventListener("resize", this.resizeListener, false);
    }
    destroy()
    {
      this.container.renderable = false;
      this.pause();

      if (this.renderer)
      {
        this.renderer.destroy(true);
        this.renderer = null;
      }

      this.container.destroy(true);
      this.container = null;
      this.pixiContainer = null;

      window.removeEventListener("resize", this.resizeListener);
    }
    initLayers()
    {
      this.layers =
      {
        battleOverlay: new PIXI.Container,
        side1Container: new PIXI.Container,
        side1UnitOverlay: new PIXI.Container,
        side1Unit: new PIXI.Container,
        side2Container: new PIXI.Container,
        side2UnitOverlay: new PIXI.Container,
        side2Unit: new PIXI.Container
      };

      this.layers.side1Container.addChild(this.layers.side1Unit);
      this.layers.side1Container.addChild(this.layers.side1UnitOverlay);
      this.layers.side2Container.addChild(this.layers.side2Unit);
      this.layers.side2Container.addChild(this.layers.side2UnitOverlay);

      this.container.addChild(this.layers.side1Container);
      this.container.addChild(this.layers.side2Container);
      this.container.addChild(this.layers.battleOverlay);
    }
    handleResize()
    {
      var w = this.pixiContainer.offsetWidth * window.devicePixelRatio;
      var h = this.pixiContainer.offsetHeight * window.devicePixelRatio;
      this.renderer.resize(w, h);
    }
    getSceneBounds()
    {
      return(
      {
        width: this.renderer.width,
        height: this.renderer.height
      });
    }
    getSFXParams(props:
    {
      triggerStart: (container: PIXI.DisplayObject) => void;
      triggerEnd?: () => void;
    }): Templates.SFXParams
    {
      var bounds = this.getSceneBounds();
      var duration = this.activeSFX.duration; // TODO options timing

      return(
      {
        user: this.activeUnit,
        target: this.activeUnit, // TODO
        width: bounds.width,
        height: bounds.height,
        duration: duration,
        facingRight: this.activeUnit.battleStats.side === "side1",
        renderer: this.renderer,
        triggerStart: props.triggerStart,
        triggerEnd: props.triggerEnd
      });
    }

    getUnitSFXParams(props:
    {
      unit: Unit;
      duration?: number;
      triggerStart: (container: PIXI.DisplayObject) => void;
      triggerEnd?: () => void;
    }): Templates.SFXParams
    {
      var bounds = this.getSceneBounds();
      var duration = props.duration || -1;

      return(
      {
        user: props.unit,
        width: bounds.width,
        height: bounds.height,
        duration: duration,
        facingRight: props.unit.battleStats.side === "side1",
        renderer: this.renderer,
        triggerStart: props.triggerStart,
        triggerEnd: props.triggerEnd
      });
    }

    
    setActiveSFX()
    {

    }
    clearActiveSFX()
    {
      this.activeSFX = null;
      this.clearBattleOverlay();
      this.clearUnitOverlay("side1");
      this.clearUnitOverlay("side2");
    }
    makeBattleOverlay()
    {
      var SFXParams = this.getSFXParams(
      {
        triggerStart: this.addBattleOverlay,
        triggerEnd: this.clearBattleOverlay
      });
      this.activeSFX.battleOverlay(SFXParams);
    }
    addBattleOverlay(overlay: PIXI.DisplayObject)
    {
      this.clearBattleOverlay();
      this.layers.battleOverlay.addChild(overlay);
    }
    clearBattleOverlay()
    {
      this.layers.battleOverlay.removeChildren();
    }

    // UNITS
    setUnitContainersPosition()
    {
      // TODO battle scene. This + unit drawing FN 
      var sceneBounds = this.getSceneBounds();
      console.log("set units position");
      
      [this.layers.side1Unit, this.layers.side1UnitOverlay,
        this.layers.side2Unit, this.layers.side2UnitOverlay].forEach(
        function(container: PIXI.Container, i: number)
      {
        var containerBounds = container.getLocalBounds();

        container.y = Math.round(sceneBounds.height - containerBounds.height - containerBounds.y);

        if (i < 2)
        {
          container.scale.x = -1;
          container.x = Math.round(containerBounds.width + containerBounds.x);
        }
        else
        {
          container.x = Math.round(sceneBounds.width - containerBounds.width - containerBounds.x);
        }
      });
    }
    setUnit(unit: Unit)
    {
      switch (unit.battleStats.side)
      {
        case "side1":
        {
          this.side1Unit = unit;
          break;
        }
        case "side2":
        {
          this.side2Unit = unit;
          break;
        }
      }
    }
    clearUnit(unit: Unit)
    {
      switch (unit.battleStats.side)
      {
        case "side1":
        {
          this.side1Unit = null;
          break;
        }
        case "side2":
        {
          this.side2Unit = null;
          break;
        }
      }
    }

    makeUnitSprite(unit: Unit, SFXParams: Templates.SFXParams)
    {
      return unit.drawBattleScene(SFXParams);
    }
    setUnitSprite(unit: Unit)
    {
      this.clearUnitSprite(unit);
      this.setUnit(unit);
      var SFXParams = this.getUnitSFXParams(
      {
        unit: unit,
        triggerStart: this.addUnitSprite.bind(this, unit)
      });

      this.makeUnitSprite(unit, SFXParams);
    }
    addUnitSprite(unit: Unit, sprite: PIXI.DisplayObject)
    {
      switch (unit.battleStats.side)
      {
        case "side1":
        {
          this.layers.side1Unit.addChild(sprite);
          break;
        }
        case "side2":
        {
          this.layers.side2Unit.addChild(sprite);
          break;
        }
      }
      console.log("added unit ", unit.battleStats.side);

      this.setUnitContainersPosition();
    }
    clearUnitSprite(unit: Unit)
    {
      this.clearUnit(unit);
      switch (unit.battleStats.side)
      {
        case "side1":
        {
          this.layers.side1Unit.removeChildren();
          break;
        }
        case "side2":
        {
          this.layers.side2Unit.removeChildren();
          break;
        }
      }

      console.log("removed unit ", unit.battleStats.side);
    }
    enterUnitSprite(unit: Unit)
    {

    }
    exitUnitSprite(unit: Unit)
    {
      // clear active sfx
      // if old unit
      //    start old unit exit
      //    on exit finish do vvv
      // enter new unit
      // on enter finish set state to stationary   
      // clear overlay
    }

    // UNIT OVERLAY
    makeUnitOverlay(unit: Unit)
    {
      var side = unit.battleStats.side;
      var SFXParams = this.getSFXParams(
      {
        triggerStart: this.addUnitOverlay.bind(this, side),
        triggerEnd: this.clearUnitOverlay.bind(this, side)
      });
      this.activeSFX.battleOverlay(SFXParams);
    }
    addUnitOverlay(side: string, overlay: PIXI.DisplayObject)
    {
      this.clearUnitOverlay(side);

      if (side === "side1")
      {
        this.layers.side1UnitOverlay.addChild(overlay);
      }
      else if (side === "side2")
      {
        this.layers.side2UnitOverlay.addChild(overlay);
      }
      else
      {
        throw new Error("Invalid side " + side);
      }
    }
    clearUnitOverlay(side: string)
    {
      if (side === "side1")
      {
        this.layers.side1UnitOverlay.removeChildren();
      }
      else if (side === "side2")
      {
        this.layers.side2UnitOverlay.removeChildren();
      }
      else
      {
        throw new Error("Invalid side " + side);
      }
    }

    // RENDERING
    renderOnce()
    {
      this.forceFrame = true;
      this.render();
    }
    pause()
    {
      this.isPaused = true;
      this.forceFrame = false;
    }
    resume()
    {
      this.isPaused = false;
      this.forceFrame = false;
      this.render();
    }
    render()
    {
      if (this.isPaused)
      {
        if (this.forceFrame)
        {
          this.forceFrame = false;
        }
        else
        {
          return;
        }
      }

      this.renderer.render(this.container);

      window.requestAnimationFrame(this.render.bind(this));
    }
  }
}
