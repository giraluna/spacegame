import {ExecutedEffectsResult} from "../../../src/templateinterfaces/ExecutedEffectsResult";
import {AbilityTemplate} from "../../../src/templateinterfaces/AbilityTemplate";
import
{
  AbilityTargetEffect,
  AbilityTargetType,
} from "../../../src/AbilityTargetDisplayData";
import {DamageType} from "../../../src/DamageType";
import
{
  makeGetAbilityTargetDisplayDataFN,
  areaSingle,
  targetEnemies,
} from "../../../src/targeting";

import {ResultType} from "../../space/effectactions/ResultType";
import * as EffectActions from "../../space/effectactions/effectActions";

import * as DroneBattleVfx from "../battlevfx/templates";


export const assimilate: AbilityTemplate =
{
  type: "assimilate",
  displayName: "Assimilate",
  description: "Deal damage and increase own troop size by 10% of damage dealt",
  moveDelay: 100,
  actionsUse: 1,
  getPossibleTargets: targetEnemies,
  mainEffect:
  {
    id: "damage",
    executeAction: EffectActions.inflictDamage.bind(null,
    {
      baseDamage: 0.8,
      damageType: DamageType.Physical,
    }),
    getUnitsInArea: areaSingle,
    getDisplayDataForTarget: makeGetAbilityTargetDisplayDataFN(
    {
      areaFN: areaSingle,
      targetType: AbilityTargetType.Primary,
      targetEffect: AbilityTargetEffect.Negative,
    }),
    vfx: DroneBattleVfx.assimilate,
    attachedEffects:
    [
      {
        id: "increaseUserHealth",
        getUnitsInArea: user => [user],
        getDisplayDataForTarget: makeGetAbilityTargetDisplayDataFN(
        {
          areaFN: user => [user],
          targetType: AbilityTargetType.Primary,
          targetEffect: AbilityTargetEffect.Positive,
        }),
        executeAction: EffectActions.adjustCurrentAndMaxHealth.bind(null,
        {
          executedEffectsResultAdjustment: (executedEffectsResult: ExecutedEffectsResult) =>
          {
            const damageDealt = executedEffectsResult[ResultType.HealthChanged] || 0;

            return damageDealt * -0.1;
          },
        }),
      },
    ],
  },
};