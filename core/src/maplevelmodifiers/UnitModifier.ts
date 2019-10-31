import { Unit } from "../unit/Unit";
import { PartialMapLevelModifier, MapLevelModifier } from "./MapLevelModifiers";
import { PlayerModifier } from "./PlayerModifier";
import { GlobalModifier } from "./GlobalModifier";
import { StarModifier } from "./StarModifier";
import { ModifierTemplate } from "./ModifierTemplate";
import { FlatAndMultiplierAdjustment, getBaseAdjustment } from "../generic/FlatAndMultiplierAdjustment";


type UnitModifierPropagations =
{
  owningPlayer?: PlayerModifier[];
  global?: GlobalModifier[];
  localStar?: StarModifier[];
};
export type UnitModifierAdjustments =
{
  vision: FlatAndMultiplierAdjustment;
  detection: FlatAndMultiplierAdjustment;
  researchPoints: FlatAndMultiplierAdjustment;
};

export interface UnitModifier extends ModifierTemplate<UnitModifierPropagations>
{
  filter?: (unit: Unit) => boolean;
  self?: PartialMapLevelModifier<UnitModifierAdjustments>;
}
export function getBaseUnitSelfModifier(): MapLevelModifier<UnitModifierAdjustments>
{
  return {
    adjustments:
    {
      vision: getBaseAdjustment(),
      detection: getBaseAdjustment(),
      researchPoints: getBaseAdjustment(),
    },
    income: {},
    flags: new Set(),
  };
}
