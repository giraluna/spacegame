import {RaceTemplate} from "core/src/templateinterfaces/RaceTemplate";
import {TemplateCollection} from "core/src/templateinterfaces/TemplateCollection";
import
{
  getRandomProperty,
  randInt,
} from "core/src/generic/utility";
import {distributionGroups} from "../../common/distributionGroups";
import {generateIndependentFleets} from "../../common/generateIndependentFleets";
import {generateIndependentPlayer} from "../../common/generateIndependentPlayer";
import {defaultAiConstructor} from "../../defaultai/src/mapai/DefaultAiConstructor";

import { getBuildableThingsByAvailabilityFlags } from "core/src/production/getBuildableThingsByAvailabilityFlags";
import { localizeName } from "../localization/localize";
import { activeModuleData } from "core/src/app/activeModuleData";
import { availabilityFlags } from "./availabilityFlags";
import { AvailabilityData, coreAvailabilityFlags } from "core/src/templateinterfaces/AvailabilityData";



function getBuildableThings<T extends {availabilityData: AvailabilityData}>(templates: TemplateCollection<T>): T[]
{
  return getBuildableThingsByAvailabilityFlags(templates, flags =>
  {
    return flags.has(availabilityFlags.drone) || flags.has(coreAvailabilityFlags.crucial);
  });
}

export const drones: RaceTemplate =
{
  type: "drones",
  get displayName()
  {
    return localizeName("drones")();
  },
  description: "",
  distributionData:
  {
    weight: 1,
    distributionGroups: [distributionGroups.common, distributionGroups.rare],
  },
  isNotPlayable: true,
  getBuildableBuildings: () => getBuildableThings(activeModuleData.templates.Buildings),
  getBuildableItems: () => getBuildableThings(activeModuleData.templates.Items),
  getBuildableUnits: () => getBuildableThings(activeModuleData.templates.Units),
  getPlayerName: player => localizeName("droneHost")(randInt(0, 20000)),
  getFleetName: fleet => localizeName("swarm")(fleet.id),
  getUnitName: unitTemplate => localizeName("unitName")(unitTemplate.displayName, randInt(0, 20000)),
  getUnitPortrait: (unitTemplate, allTemplates) =>
  {
    return getRandomProperty(allTemplates);
  },
  generateIndependentPlayer: emblemTemplates =>
  {
    return generateIndependentPlayer(drones);
  },
  generateIndependentFleets: (player, location, globalStrength, localStrength,
    maxUnitsPerSideInBattle) =>
  {
    return generateIndependentFleets(drones, player, location,
      globalStrength, localStrength, maxUnitsPerSideInBattle);
  },
  technologies: [],
  getAiTemplateConstructor: player => defaultAiConstructor,
};

export const raceTemplates: TemplateCollection<RaceTemplate> =
{
  [drones.type]: drones,
};
