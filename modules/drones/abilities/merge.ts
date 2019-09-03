import {ExecutedEffectsResult} from "../../../src/templateinterfaces/ExecutedEffectsResult";
import {AbilityTemplate} from "../../../src/templateinterfaces/AbilityTemplate";

import
{
  AbilityTargetEffect,
  AbilityTargetType,
} from "../../../src/abilities/AbilityTargetDisplayData";
import
{
  makeGetAbilityTargetDisplayDataFN,
  areaSingle,
  targetOtherAllies,
} from "../../../src/abilities/targeting";

import {ResultType} from "../../space/effectactions/ResultType";
import * as EffectActions from "../../space/effectactions/effectActions";

import * as DroneStatusEffects from "../unitEffects";
import * as DroneBattleVfx from "../battlevfx/templates";
import { localize } from "../localization/localize";


export const merge: AbilityTemplate =
{
  type: "merge",
  get displayName()
  {
    return localize("merge_displayName")();
  },
  get description()
  {
    return localize("merge_description")();
  },
  moveDelay: 100,
  actionsUse: 1,
  getPossibleTargets: targetOtherAllies,
  mainEffect:
  {
    id: "removeOwnHealth",
    executeAction: EffectActions.adjustHealth.bind(null,
    {
      maxHealthPercentage: -0.25,
    }),
    getUnitsInArea: user => [user],
    getDisplayDataForTarget: makeGetAbilityTargetDisplayDataFN(
    {
      areaFN: user => [user],
      targetType: AbilityTargetType.Primary,
      targetEffect: AbilityTargetEffect.Negative,
    }),
    vfx: DroneBattleVfx.mergeRelease,
  },
  secondaryEffects:
  [
    {
      id: "addStatusEffect",
      getUnitsInArea: areaSingle,
      getDisplayDataForTarget: makeGetAbilityTargetDisplayDataFN(
      {
        areaFN: areaSingle,
        targetType: AbilityTargetType.Primary,
        targetEffect: AbilityTargetEffect.Positive,
      }),
      vfx: DroneBattleVfx.mergeAbsorb,
      trigger: (user, target, battle, executedEffectsResult) =>
      {
        return Boolean(executedEffectsResult[ResultType.HealthChanged]);
      },
      executeAction: EffectActions.addStatusEffect.bind(null,
      {
        duration: Infinity,
        template: DroneStatusEffects.merge,
      }),
    },
    {
      id: "addTargetHealth",
      getUnitsInArea: areaSingle,
      trigger: (user, target, battle, executedEffectsResult) =>
      {
        return Boolean(executedEffectsResult[ResultType.HealthChanged]);
      },
      executeAction: EffectActions.adjustHealth.bind(null,
      {
        executedEffectsResultAdjustment: (executedEffectsResult: ExecutedEffectsResult) =>
        {
          return -executedEffectsResult[ResultType.HealthChanged];
        },
      }),
    },
  ],
};
