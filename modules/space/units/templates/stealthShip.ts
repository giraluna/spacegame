import UnitTemplate from "../../../../src/templateinterfaces/UnitTemplate";

import * as unitArchetypes from "../../../common/unitArchetypes";
import {makeDefaultUnitDrawingFunction} from "../defaultUnitDrawingFunction";

import
{
  rangedAttack,
  standBy,
} from "../../abilities/abilities";
import {distributionGroups} from "../../../common/distributionGroups";
import itemSlot from "../../items/itemSlot";

import * as technologies from "../../technologies/technologyTemplates";
import {getIconSrc} from "../resources";


const stealthShip: UnitTemplate =
{
  type: "stealthShip",
  displayName: "Stealth Ship",
  description: "Weak ship that is undetectable by regular vision",
  archetype: unitArchetypes.scouting,
  unitDrawingFN: makeDefaultUnitDrawingFunction(
  {
    anchor: {x: 0.5, y: 0.5},
    attackOriginPoint: {x: 0.75, y: 0.5},
  },
    "scout.png",
  ),
  isSquadron: true,
  buildCost: 500,
  kind: "unit",
  // TODO 2018.12.10 | figure out how to make these relative to module. probably need to compile the modules separately (which we want to do anyway)
  getIconSrc: getIconSrc.bind(null, "sc"),
  maxHealthLevel: 0.6,
  maxMovePoints: 1,
  maxOffensiveBattlesPerTurn: 1,
  visionRange: 1,
  detectionRange: -1,
  isStealthy: true,
  attributeLevels:
  {
    attack: 0.5,
    defence: 0.5,
    intelligence: 0.8,
    speed: 0.7,
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
  techRequirements:
  [
    {
      technology: technologies.stealth,
      level: 2,
    }
  ],
  distributionData:
  {
    weight: 1,
    distributionGroups:
    [
      distributionGroups.rare,
      distributionGroups.unique,
    ],
  },
};

export default stealthShip;
