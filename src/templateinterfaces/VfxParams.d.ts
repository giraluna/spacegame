// TODO 2019.08.22 | move to src/
// also move other stuff that isn't used for templates from here
import * as PIXI from "pixi.js";

import {Point} from "../Point";
import {Unit} from "../Unit";
import {AbilityUseEffectsForVfx} from "../AbilityUseEffectsForVfx";


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
