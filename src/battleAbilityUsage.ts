import {ExecutedEffectsResult} from "./templateinterfaces/ExecutedEffectsResult";
import {AbilityTemplate} from "./templateinterfaces/AbilityTemplate";

import {AbilityUseEffect} from "./AbilityUseEffect";
import {Battle} from "./Battle";
import {Unit} from "./Unit";
import {UnitDisplayData} from "./UnitDisplayData";
import
{
  AbilityEffectData,
  AbilityEffectDataByPhase,
  getAbilityEffectDataByPhase,
} from "./battleAbilityProcessing";


export function useAbility(
  battle: Battle,
  ability: AbilityTemplate,
  user: Unit,
  target: Unit,
): void
{
  const effectDataByPhase = getAbilityEffectDataByPhase(battle,
  {
    ability: ability,
    user: user,
    intendedTarget: target,
  });

  executeFullAbilityEffects(battle, effectDataByPhase);
}
export function useAbilityAndGetUseEffects(
  battle: Battle,
  ability: AbilityTemplate,
  user: Unit,
  target: Unit,
): AbilityUseEffect[]
{
  const effectDataByPhase = getAbilityEffectDataByPhase(battle,
  {
    ability: ability,
    user: user,
    intendedTarget: target,
  });

  const useData = executeFullAbilityEffectsAndGetUseEffects(battle, effectDataByPhase);

  return useData;
}
function executeFullAbilityEffects(battle: Battle, abilityEffectDataByPhase: AbilityEffectDataByPhase): void
{
  const executedEffectsResult: ExecutedEffectsResult = {};
  [
    abilityEffectDataByPhase.beforeUse,
    abilityEffectDataByPhase.abilityEffects,
    abilityEffectDataByPhase.afterUse,
  ].forEach(effectDataForPhase =>
  {
    effectDataForPhase.forEach(effectData =>
    {
      executeAbilityEffectData(battle, effectData, executedEffectsResult);
    });
  });
}
function executeFullAbilityEffectsAndGetUseEffects(
  battle: Battle,
  abilityEffectDataByPhase: AbilityEffectDataByPhase,
): AbilityUseEffect[]
{
  const useEffects: AbilityUseEffect[] = [];
  const executedEffectsResult: ExecutedEffectsResult = {};

  [
    abilityEffectDataByPhase.beforeUse,
    abilityEffectDataByPhase.abilityEffects,
    abilityEffectDataByPhase.afterUse,
  ].forEach(effectDataForPhase =>
  {
    effectDataForPhase.forEach(effectData =>
    {
      const useEffect = executeAbilityEffectDataAndGetUseEffect(battle, effectData, executedEffectsResult);
      if (useEffect)
      {
        useEffects.push(useEffect);
      }
    });
  });

  return useEffects;
}

function shouldEffectActionTrigger(
  abilityEffectData: AbilityEffectData,
  battle: Battle,
  executedEffectsResult: ExecutedEffectsResult,
): boolean
{
  if (!abilityEffectData.trigger)
  {
    return true;
  }

  return abilityEffectData.trigger(
    abilityEffectData.user,
    abilityEffectData.target,
    battle,
    executedEffectsResult,
    abilityEffectData.sourceStatusEffect,
  );
}
function executeAbilityEffectData(
  battle: Battle,
  abilityEffectData: AbilityEffectData,
  executedEffectsResult: ExecutedEffectsResult,
): boolean
{
  if (!shouldEffectActionTrigger(abilityEffectData, battle, executedEffectsResult))
  {
    return false;
  }

  abilityEffectData.effectTemplate.executeAction(
    abilityEffectData.user,
    abilityEffectData.target,
    battle,
    executedEffectsResult,
    abilityEffectData.sourceStatusEffect,
  );

  return true;
}
function executeAbilityEffectDataAndGetUseEffect(
  battle: Battle,
  abilityEffectData: AbilityEffectData,
  executedEffectsResult: ExecutedEffectsResult,
): AbilityUseEffect
{
  const didTriggerAction = executeAbilityEffectData(battle, abilityEffectData, executedEffectsResult);
  if (!didTriggerAction)
  {
    return null;
  }

  const changedUnitDisplayData: {[unitId: number]: UnitDisplayData} = {};
  changedUnitDisplayData[abilityEffectData.user.id] = abilityEffectData.user.getDisplayData("battle");
  changedUnitDisplayData[abilityEffectData.target.id] = abilityEffectData.target.getDisplayData("battle");

  return(
  {
    effectId: abilityEffectData.effectTemplate.id,
    changedUnitDisplayData: changedUnitDisplayData,
    executedEffectsResult: {...executedEffectsResult},
    vfx: abilityEffectData.effectTemplate.vfx,
    vfxUser: abilityEffectData.user,
    vfxTarget: abilityEffectData.target,
    newEvaluation: battle.getEvaluation(),
  });
}
