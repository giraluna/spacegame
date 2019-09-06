import {UnitTemplate} from "core/templateinterfaces/UnitTemplate";

import * as unitArchetypes from "modules/common/unitArchetypes";
import {makeDefaultUnitDrawingFunctionForPlaceholder} from "modules/space/units/defaultUnitDrawingFunction";

import * as CommonAbility from "modules/space/abilities/abilities";
import {distributionGroups} from "modules/common/distributionGroups";
import {getAssetSrc} from "modules/common/assets";

import {assimilate} from "../abilities/assimilate";
import {repair} from "../abilities/repair";
import {massRepair} from "../abilities/massRepair";
import { localize } from "../localization/localize";


export const droneBase: UnitTemplate =
{
  type: "droneBase",
  get displayName()
  {
    return localize("droneBase_displayName").toString();
  },
  get description()
  {
    return localize("droneBase_description").toString();
  },
  archetype: unitArchetypes.utility,
  getIconSrc: getAssetSrc.bind(null, "placeHolder"),
  unitDrawingFN: makeDefaultUnitDrawingFunctionForPlaceholder(
  {
    anchor: {x: 0.5, y: 0.5},
    attackOriginPoint: {x: 0.75, y: 0.5},
  },
    "droneBase",
  ),

  isSquadron: false,
  buildCost: 500,
  kind: "unit",

  maxHealthLevel: 1.0,
  maxMovePoints: 1,
  maxOffensiveBattlesPerTurn: 1,
  visionRange: 1,
  detectionRange: -1,
  attributeLevels:
  {
    attack: 0.7,
    defence: 0.9,
    intelligence: 0.8,
    speed: 0.6,
  },
  possibleAbilities:
  [
    {
      flatProbability: 1,
      probabilityItems:
      [
        assimilate,
        CommonAbility.standBy,
      ],
    },
    {
      flatProbability: 1,
      probabilityItems:
      [
        {
          flatProbability: 0.5,
          probabilityItems: [repair],
        },
        {
          flatProbability: 0.5,
          probabilityItems: [massRepair],
        },
      ],
    },
  ],
  itemSlots: {},
  distributionData:
  {
    weight: 1,
    distributionGroups: [distributionGroups.unique],
  },
};
