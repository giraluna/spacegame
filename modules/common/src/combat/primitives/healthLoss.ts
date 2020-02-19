import { CombatActionPrimitiveTemplate } from "core/src/combat/CombatActionPrimitiveTemplate";
import { damageDealt } from "core/src/combat/core/resultTemplates/damageDealt";


// should be used when you want damage to ignore all modifiers, resistances, effects like block, etc.
export const healthLoss: CombatActionPrimitiveTemplate<number> =
{
  key: "healthLoss",
  applyToResult: (value, result) =>
  {
    result.set(
      damageDealt,
      result.get(damageDealt) + value,
    );
  },
};
