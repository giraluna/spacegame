import AbilityTemplate from "../../../src/templateinterfaces/AbilityTemplate";

import DamageType from "../../../src/DamageType";
import {UnitAttribute} from "../../../src/UnitAttributes";
import
{
  targetEnemies,
  targetNextRow,
  targetSelf,
  targetAll,
} from "../../../src/targeting";

import * as BattleSFX from "../battlesfxtemplates/battleSFX";
import * as EffectActions from "../effectactiontemplates/effectActions";

export var closeAttack: AbilityTemplate =
{
  type: "closeAttack",
  displayName: "Close Attack",
  description: "Close range attack that hits adjacent targets in the same row",
  moveDelay: 90,
  actionsUse: 2,
  getPossibleTargets: (user, battle) =>
  {
    return targetNextRow(user, battle).filter(unit =>
    {
      unit.battleStats.side !== user.battleStats.side
    });
  },
  mainEffect:
  {
    action: EffectActions.closeAttack,
    sfx: BattleSFX.rocketAttack
  }
}
export var beamAttack: AbilityTemplate =
{
  type: "beamAttack",
  displayName: "Beam Attack",
  description: "Attack units in a line",
  moveDelay: 300,
  actionsUse: 1,
  getPossibleTargets: targetEnemies,
  mainEffect:
  {
    action: EffectActions.beamAttack,
    sfx: BattleSFX.beam
  },
  
  bypassesGuard: true,
}
// legacy alias 17.05.2016
export var wholeRowAttack = beamAttack;

export var bombAttack: AbilityTemplate =
{
  type: "bombAttack",
  displayName: "Bomb Attack",
  description: "Ranged attack that hits all adjacent enemy units",
  moveDelay: 120,
  actionsUse: 1,
  getPossibleTargets: targetEnemies,
  mainEffect:
  {
    action: EffectActions.bombAttack,
    sfx: BattleSFX.rocketAttack
  }
}
export var guardRow: AbilityTemplate =
{
  type: "guardRow",
  displayName: "Guard Row",
  description: "Protect allies in the same row and boost defence against physical attacks",
  moveDelay: 100,
  actionsUse: 1,
  getPossibleTargets: targetSelf,
  mainEffect:
  {
    action: EffectActions.guardRow,
    sfx: BattleSFX.guard,
    data:
    {
      perInt: 20
    }
  },
  
  preservesUserGuard: true,
}
export var boardingHook: AbilityTemplate =
{
  type: "boardingHook",
  displayName: "Boarding Hook",
  description: "0.8x damage but increases target capture chance",
  moveDelay: 100,
  actionsUse: 1,
  getPossibleTargets: targetEnemies,
  mainEffect:
  {
    action: EffectActions.singleTargetDamage,
    sfx: BattleSFX.rocketAttack,
    data:
    {
      baseDamage: 0.8,
      damageType: DamageType.physical
    },
    attachedEffects:
    [
      {
        action: EffectActions.increaseCaptureChance,
        data:
        {
          flat: 0.5
        }
      },
      {
        action: EffectActions.receiveCounterAttack,
        data:
        {
          baseDamage: 0.5
        }
      }
    ]
  }
}

export var debugAbility: AbilityTemplate =
{
  type: "debugAbility",
  displayName: "Debug Ability",
  description: "who knows what its going to do today",
  moveDelay: 0,
  actionsUse: 1,
  getPossibleTargets: targetAll,
  mainEffect:
  {
    action: EffectActions.buffTest,
    sfx: BattleSFX.guard,
    data: {}
  }
}

export var rangedAttack: AbilityTemplate =
{
  type: "rangedAttack",
  displayName: "Ranged Attack",
  description: "Standard ranged attack",
  moveDelay: 100,
  actionsUse: 1,
  getPossibleTargets: targetEnemies,
  mainEffect:
  {
    action: EffectActions.singleTargetDamage,
    sfx: BattleSFX.rocketAttack,
    data:
    {
      baseDamage: 1,
      damageType: DamageType.physical
    },
    attachedEffects:
    [
      {
        action: EffectActions.receiveCounterAttack,
        data:
        {
          baseDamage: 0.5
        }
      }
    ]
  },
  
  canUpgradeInto:
  [
    bombAttack,
    boardingHook,
  ]
}
function makeSnipeTemplate(attribute: UnitAttribute): AbilityTemplate
{
  const attributeName = UnitAttribute[attribute];
  const capitalizedAttributeName = attributeName[0].toUpperCase() + attributeName.slice(1);

  const key = `snipe${capitalizedAttributeName}`;
  const displayName = `Snipe: ${capitalizedAttributeName}`;
  const description = `Deals damage and lowers target ${attributeName}`;
  
  return(
  {
    type: key,
    displayName: displayName,
    description: description,
    moveDelay: 100,
    actionsUse: 1,
    getPossibleTargets: targetEnemies,
    mainEffect:
    {
      action: EffectActions.singleTargetDamage,
      sfx: BattleSFX[key],
      data:
      {
        baseDamage: 0.6,
        damageType: DamageType.physical
      },
      attachedEffects:
      [
        {
          action: EffectActions.addAttributeStatusEffect,
          data:
          {
            sourceName: displayName,
            duration: -1,
            adjustments:
            {
              [attributeName]:
              {
                multiplier: -0.5
              }
            }
          }
        }
      ]
    },
  });
}
export const snipeAttack = makeSnipeTemplate(UnitAttribute.attack);
export const snipeDefence = makeSnipeTemplate(UnitAttribute.defence);
export const snipeIntelligence = makeSnipeTemplate(UnitAttribute.intelligence);
export const snipeSpeed = makeSnipeTemplate(UnitAttribute.speed);

export var standBy: AbilityTemplate =
{
  type: "standBy",
  displayName: "Standby",
  description: "Skip a turn but next one comes faster",
  moveDelay: 50,
  actionsUse: 1,
  getPossibleTargets: targetSelf,
  mainEffect:
  {
    action: EffectActions.standBy,
    sfx:
    {
      duration: 750
    }
  },
  
  preservesUserGuard: true,
  AIEvaluationPriority: 0.6,
  AIScoreAdjust: -0.1,
  disableInAIBattles: true,
}
