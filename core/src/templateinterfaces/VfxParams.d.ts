// TODO 2019.08.22 | move to core/
// also move other stuff that isn't used for templates from here
import * as PIXI from "pixi.js";

import {Point} from "../math/Point";
import {Unit} from "../unit/Unit";
import {AbilityUseEffectsForVfx} from "../abilities/AbilityUseEffectsForVfx";


export interface VfxParams
{
  user: Unit;
  target?: Unit;
  userOffset: Point;
  targetOffset?: Point;
  width: number;
  height: number;
  /**
   * milliseconds
   */
  duration: number;
  // TODO 2019.08.21 | rename userIsFacingRight?
  facingRight: boolean;
  renderer: PIXI.Renderer;
  abilityUseEffects?: AbilityUseEffectsForVfx;
  triggerStart: (displayObject: PIXI.DisplayObject) => void;
  triggerEnd: () => void;
}
