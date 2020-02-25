import { TemplateCollection } from "core/src/templateinterfaces/TemplateCollection"
import { CombatAbilityTemplate } from "core/src/templateinterfaces/CombatAbilityTemplate"

import { beamAttack } from "./abilities/beamAttack";
import { boardingHook } from "./abilities/boardingHook";
import { bombAttack } from "./abilities/bombAttack";
import { closeAttack } from "./abilities/closeAttack";
import { rangedAttack } from "./abilities/rangedAttack";
import
{
  snipeAttack,
  snipeDefence,
  snipeIntelligence,
  snipeSpeed,
} from "./abilities/snipe";


export const combatAbilityTemplates: TemplateCollection<CombatAbilityTemplate> =
{
  [beamAttack.key]: beamAttack,
  [boardingHook.key]: boardingHook,
  [bombAttack.key]: bombAttack,
  [closeAttack.key]: closeAttack,
  [rangedAttack.key]: rangedAttack,
  [snipeAttack.key]: snipeAttack,
  [snipeDefence.key]: snipeDefence,
  [snipeIntelligence.key]: snipeIntelligence,
  [snipeSpeed.key]: snipeSpeed,
};
