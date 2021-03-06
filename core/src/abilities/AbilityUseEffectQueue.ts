import {BattleScene} from "../battle/BattleScene";
import {AbilityUseEffect} from "./AbilityUseEffect";
import { AbilityUseEffectsForVfx } from "./AbilityUseEffectsForVfx";


type AbilityUseEffectsGroup =
{
  withVfx: AbilityUseEffect;
  withoutVfx: AbilityUseEffect[]; // freshest last
};

export class AbilityUseEffectQueue
{
  private readonly queue: AbilityUseEffectsGroup[] = [];
  private readonly battleScene: BattleScene;

  private readonly onEffectStart: (effect: AbilityUseEffect) => void;
  private readonly onVfxStart: () => void;
  private readonly onCurrentFinished: () => void;
  private readonly onAllFinished: () => void;
  private readonly onEffectTrigger: (abilityUseEffect: AbilityUseEffect) => void;

  constructor(battleScene: BattleScene, callbacks:
  {
    onEffectStart: (effect: AbilityUseEffect) => void;
    onVfxStart: () => void;
    onCurrentFinished: () => void;
    onAllFinished: () => void;
    onEffectTrigger: (abilityUseEffect: AbilityUseEffect) => void;
  })
  {
    this.battleScene = battleScene;

    this.onEffectStart = callbacks.onEffectStart;
    this.onVfxStart = callbacks.onVfxStart;
    this.onCurrentFinished = callbacks.onCurrentFinished;
    this.onAllFinished = callbacks.onAllFinished;
    this.onEffectTrigger = callbacks.onEffectTrigger;
  }

  public addEffects(effects: AbilityUseEffect[]): void
  {
    this.queue.push(...AbilityUseEffectQueue.createGroupsOfEffectsWithOneVfx(effects));
  }
  public playOnce(): void
  {
    const currentEffectsGroup = this.queue.shift();

    if (!currentEffectsGroup)
    {
      this.handleEndOfQueue();

      return;
    }

    const mainEffect = currentEffectsGroup.withVfx;
    const allEffects = AbilityUseEffectQueue.flattenEffectsGroup(currentEffectsGroup);

    this.onEffectStart(mainEffect);

    this.battleScene.handleAbilityUse(
    {
      vfxTemplate: mainEffect.vfx,
      user: mainEffect.vfxUser,
      target: mainEffect.vfxTarget,
      abilityUseEffects: new AbilityUseEffectsForVfx(allEffects, this.onEffectTrigger),
      onVfxStart: this.onVfxStart,
      afterFinished: this.onCurrentFinished,
    });
  }
  private handleEndOfQueue(): void
  {
    this.battleScene.updateUnits(() =>
    {
      this.onAllFinished();
    });
  }

  private static flattenEffectsGroup(effectsGroup: AbilityUseEffectsGroup): AbilityUseEffect[]
  {
    return [effectsGroup.withVfx, ... effectsGroup.withoutVfx];
  }
  private static createGroupsOfEffectsWithOneVfx(effects: AbilityUseEffect[]): AbilityUseEffectsGroup[]
  {
    return effects.reduce((grouped: AbilityUseEffectsGroup[], newEffect: AbilityUseEffect, i) =>
    {
      const currentGroup = grouped[grouped.length - 1];
      const newEffectHasVfx = Boolean(newEffect.vfx);

      if (newEffectHasVfx)
      {
        const currentGroupHasVfx = Boolean(currentGroup.withVfx);

        if (currentGroupHasVfx)
        {
          const newGroup: AbilityUseEffectsGroup = {withVfx: newEffect, withoutVfx: []};
          grouped.push(newGroup);
        }
        else
        {
          currentGroup.withVfx = newEffect;
        }
      }
      else
      {
        currentGroup.withoutVfx.push(newEffect);
      }

      return grouped;
    }, [{withVfx: undefined, withoutVfx: []}]);
  }
}
