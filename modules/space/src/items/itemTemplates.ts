import {ItemTemplate} from "core/src/templateinterfaces/ItemTemplate";
import {TemplateCollection} from "core/src/templateinterfaces/TemplateCollection";

import { localize } from "modules/space/localization/localize";
import { getItemIcon } from "modules/space/assets/items/itemAssets";
import { moneyResource } from "modules/money/src/moneyResource";
import {availabilityFlags as commonAvailabilityFlags} from "modules/baselib/src/availabilityFlags";
import { bombAttack } from "../combat/abilities/bombAttack";
import { guardRow } from "modules/baselib/src/combat/abilities/guardRow";
import { poisoned } from "../combat/effects/poisoned";


export const bombLauncher1: ItemTemplate =
{
  type: "bombLauncher1",
  get displayName()
  {
    return localize("bombLauncher1_displayName").toString();
  },
  get description()
  {
    return localize("bombLauncher1_description").toString();
  },
  getIcon: getItemIcon.bind(null, "cannon", 1),
  techLevel: 1,
  buildCost:
  {
    [moneyResource.type]: 100,
  },

  slot: "high",
  ability: bombAttack,
  availabilityData:
  {
    flags: [commonAvailabilityFlags.humanLike],
  },
};
export const bombLauncher2: ItemTemplate =
{
  type: "bombLauncher2",
  get displayName()
  {
    return localize("bombLauncher2_displayName").toString();
  },
  get description()
  {
    return localize("bombLauncher2_description").toString();
  },
  getIcon: getItemIcon.bind(null, "cannon", 2),
  techLevel: 2,
  buildCost:
  {
    [moneyResource.type]: 200,
  },

  attributeAdjustments:
  {
    attack: {flat: 1},
  },

  slot: "high",
  ability: bombAttack,
  availabilityData:
  {
    flags: [commonAvailabilityFlags.humanLike],
  },
};
export const bombLauncher3: ItemTemplate =
{
  type: "bombLauncher3",
  get displayName()
  {
    return localize("bombLauncher3_displayName").toString();
  },
  get description()
  {
    return localize("bombLauncher3_description").toString();
  },
  getIcon: getItemIcon.bind(null, "cannon", 3),
  techLevel: 3,
  buildCost:
  {
    [moneyResource.type]: 300,
  },

  attributeAdjustments:
  {
    attack: {flat: 3},
  },

  slot: "high",
  ability: bombAttack,
  availabilityData:
  {
    flags: [commonAvailabilityFlags.humanLike],
  },
};

export const afterBurner1: ItemTemplate =
{
  type: "afterBurner1",
  get displayName()
  {
    return localize("afterBurner1_displayName").toString();
  },
  get description()
  {
    return localize("afterBurner1_description").toString();
  },
  getIcon: getItemIcon.bind(null, "blueThing", 1),
  techLevel: 1,
  buildCost:
  {
    [moneyResource.type]: 100,
  },

  attributeAdjustments:
  {
    speed: {flat: 1},
  },

  slot: "mid",
  mapLevelModifiers:
  [
    {
      key: "afterburner",
      propagations:
      {
        equippingUnit:
        [
          {
            key: "equippedAfterBurner",
            battlePrepEffects:
            [
              {
                adjustment: {flat: 2},
                effect:
                {
                  onBattlePrepStart: (strength, unit) =>
                  {
                    unit.battleStats.combatEffects.get(poisoned).strength += strength;
                  },
                },
              },
            ],
          },
        ],
      },
    },
  ],
  availabilityData:
  {
    flags: [commonAvailabilityFlags.humanLike],
  },
};
export const afterBurner2: ItemTemplate =
{
  type: "afterBurner2",
  get displayName()
  {
    return localize("afterBurner2_displayName").toString();
  },
  get description()
  {
    return localize("afterBurner2_description").toString();
  },
  getIcon: getItemIcon.bind(null, "blueThing", 2),
  techLevel: 2,
  buildCost:
  {
    [moneyResource.type]: 200,
  },

  attributeAdjustments:
  {
    speed: {flat: 2},
  },

  slot: "mid",
  availabilityData:
  {
    flags: [commonAvailabilityFlags.humanLike],
  },
};
export const afterBurner3: ItemTemplate =
{
  type: "afterBurner3",
  get displayName()
  {
    return localize("afterBurner3_displayName").toString();
  },
  get description()
  {
    return localize("afterBurner3_description").toString();
  },
  getIcon: getItemIcon.bind(null, "blueThing", 3),
  techLevel: 3,
  buildCost:
  {
    [moneyResource.type]: 300,
  },

  attributeAdjustments:
  {
    maxActionPoints: {flat: 1},
    speed: {flat: 3},
  },

  slot: "mid",
  availabilityData:
  {
    flags: [commonAvailabilityFlags.humanLike],
  },
};
export const shieldPlating1: ItemTemplate =
{
  type: "shieldPlating1",
  get displayName()
  {
    return localize("shieldPlating1_displayName").toString();
  },
  get description()
  {
    return localize("shieldPlating1_description").toString();
  },
  getIcon: getItemIcon.bind(null, "armor", 1),
  techLevel: 1,
  buildCost:
  {
    [moneyResource.type]: 100,
  },

  attributeAdjustments:
  {
    defence: {flat: 1},
  },

  slot: "low",
  availabilityData:
  {
    flags: [commonAvailabilityFlags.humanLike],
  },
};
export const shieldPlating2: ItemTemplate =
{
  type: "shieldPlating2",
  get displayName()
  {
    return localize("shieldPlating2_displayName").toString();
  },
  get description()
  {
    return localize("shieldPlating2_description").toString();
  },
  getIcon: getItemIcon.bind(null, "armor", 2),
  techLevel: 2,
  buildCost:
  {
    [moneyResource.type]: 200,
  },

  attributeAdjustments:
  {
    defence: {flat: 2},
  },

  slot: "low",
  availabilityData:
  {
    flags: [commonAvailabilityFlags.humanLike],
  },
};
export const shieldPlating3: ItemTemplate =
{
  type: "shieldPlating3",
  get displayName()
  {
    return localize("shieldPlating3_displayName").toString();
  },
  get description()
  {
    return localize("shieldPlating3_description").toString();
  },
  getIcon: getItemIcon.bind(null, "armor", 3),
  techLevel: 3,
  buildCost:
  {
    [moneyResource.type]: 300,
  },

  attributeAdjustments:
  {
    defence: {flat: 3},
    speed: {flat: -1},
  },

  slot: "low",
  availabilityData:
  {
    flags: [commonAvailabilityFlags.humanLike],
  },
  ability: guardRow,
};


export const itemTemplates: TemplateCollection<ItemTemplate> =
{
  [bombLauncher1.type]: bombLauncher1,
  [bombLauncher2.type]: bombLauncher2,
  [bombLauncher3.type]: bombLauncher3,
  [afterBurner1.type]: afterBurner1,
  [afterBurner2.type]: afterBurner2,
  [afterBurner3.type]: afterBurner3,
  [shieldPlating1.type]: shieldPlating1,
  [shieldPlating2.type]: shieldPlating2,
  [shieldPlating3.type]: shieldPlating3,
};
