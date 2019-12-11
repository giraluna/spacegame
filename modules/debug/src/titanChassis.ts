import { TitanChassisTemplate } from "modules/titans/src/TitanChassisTemplate";
import * as unitArchetypes from "modules/common/unitArchetypes";
import {makeDefaultUnitDrawingFunctionForPlaceholder} from "modules/space/src/units/defaultUnitDrawingFunction";

import
{
  rangedAttack,
  standBy,
} from "modules/space/src/abilities/abilities";
import {itemSlot} from "modules/space/src/items/itemSlot";

import { localize } from "../localization/localize";
import {getAssetSrc} from "modules/common/assets";
import { moneyResource } from "modules/money/src/moneyResource";
import { coreAvailabilityFlags } from "core/src/templateinterfaces/AvailabilityData";


export const debugChassis: TitanChassisTemplate =
{
  type: "debugChassis",
  get displayName()
  {
    return localize("debugChassis_displayName");
  },
  get description()
  {
    return localize("debugChassis_description");
  },
  archetype: unitArchetypes.combat,
  unitDrawingFN: makeDefaultUnitDrawingFunctionForPlaceholder(
  {
    anchor: {x: 0.5, y: 0.5},
    attackOriginPoint: {x: 0.75, y: 0.5},
  },
    "debugChassis",
  ),
  isSquadron: false,
  buildCost:
{
  [moneyResource.type]: 0,
},
  getIconSrc: getAssetSrc.bind(null, "placeHolder"),
  maxHealthLevel: 1,
  maxMovePoints: 999,
  maxOffensiveBattlesPerTurn: 999,
  visionRange: 999,
  detectionRange: 999,
  attributeLevels:
  {
    attack: 9,
    defence: 9,
    intelligence: 9,
    speed: 9,
  },
  possibleAbilities:
  [
    {
      flatProbability: 1,
      probabilityItems:
      [
        rangedAttack,
        standBy,
      ],
    },
  ],
  itemSlots:
  {
    [itemSlot.low]: 1,
    [itemSlot.mid]: 1,
    [itemSlot.high]: 1,
  },
  distributionData:
  {
    weight: 0,
    distributionGroups: [],
  },
  availabilityData:
  {
    flags: [coreAvailabilityFlags.alwaysInDebugMode],
  },
};