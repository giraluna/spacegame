import {UnitAttributeAdjustments} from "../unit/UnitAttributes";

import {AbilityTemplate} from "./AbilityTemplate";
import {ManufacturableThing} from "./ManufacturableThing";
import {PassiveSkillTemplate} from "./PassiveSkillTemplate";

export interface ItemTemplate extends ManufacturableThing
{
  type: string;
  displayName: string;
  description: string;
  // TODO 2018.12.19 | return element instead
  getIconSrc: () => string;

  techLevel: number;

  slot: string; // low, mid, high

  buildCost: number;
  kind: "item";

  ability?: AbilityTemplate;
  passiveSkill?: PassiveSkillTemplate;
  attributeAdjustments?: UnitAttributeAdjustments;
}