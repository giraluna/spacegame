import {UnitTemplate} from "core/templateinterfaces/UnitTemplate";

import * as unitArchetypes from "modules/common/unitArchetypes";
import {makeDefaultUnitDrawingFunction} from "../defaultUnitDrawingFunction";

import
{
  guardRow,
  rangedAttack,
  standBy,
} from "modules/space/abilities/abilities";
import {distributionGroups} from "modules/common/distributionGroups";
import {itemSlot} from "modules/space/items/itemSlot";

import
{
  initialGuard,
} from "modules/space/passiveskills/passiveSkills";
import {getIconSrc} from "../resources";
import { localize } from "../localization/localize";


export const shieldBoat: UnitTemplate =
{
  type: "shieldBoat",
  get displayName()
  {
    return localize("shieldBoat_displayName").toString();
  },
  get description()
  {
    return localize("shieldBoat_description").toString();
  },
  archetype: unitArchetypes.defence,
  unitDrawingFN: makeDefaultUnitDrawingFunction(
  {
    anchor: {x: 0.5, y: 0.5},
    attackOriginPoint: {x: 0.75, y: 0.5},
  },
    () => "shieldBoat.png",
  ),
  isSquadron: true,
  buildCost: 200,
  kind: "unit",
  getIconSrc: getIconSrc.bind(null, "sh"),
  maxHealthLevel: 0.9,
  maxMovePoints: 1,
  maxOffensiveBattlesPerTurn: 1,
  visionRange: 1,
  detectionRange: -1,
  attributeLevels:
  {
    attack: 0.5,
    defence: 0.9,
    intelligence: 0.6,
    speed: 0.4,
  },
  possibleAbilities:
  [
    {
      flatProbability: 1,
      probabilityItems:
      [
        rangedAttack,
        guardRow,
        standBy,
      ],
    },
  ],
  possiblePassiveSkills:
  [
    {
      flatProbability: 1,
      probabilityItems:
      [
        initialGuard,
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
    weight: 1,
    distributionGroups:
    [
      distributionGroups.common,
      distributionGroups.rare,
      distributionGroups.unique,
    ],
  },
};
