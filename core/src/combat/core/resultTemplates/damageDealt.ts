import { CombatActionResultTemplate } from "../../CombatActionResultTemplate";


export const damageDealt: CombatActionResultTemplate<number> =
{
  key: "damageDealt",
  defaultValue: 0,
  applyResult: (value, source, target, combatManager) =>
  {
    target.removeHealth(value);
  },
};
