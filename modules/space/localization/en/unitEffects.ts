import { UnitAttribute } from "core/src/unit/UnitAttributes";


export const unitEffects =
{
  autoHeal_displayName: "Auto heal",
  autoHeal_description: "Restore 50 health after every action",
  poisoned_displayName: "Poisoned",
  poisoned_description: "-10% of max health as damage after every action",
  snipe_displayName: "Snipe: {0, select," +
    `${UnitAttribute.Attack} {Attack}` +
    `${UnitAttribute.Defence} {Defence}` +
    `${UnitAttribute.Intelligence} {Intelligence}` +
    `${UnitAttribute.Speed} {Speed}` +
    `other {INVALID_ARG attribute {0}}` +
  "}",
};
