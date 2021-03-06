import {Fleet} from "core/src/fleets/Fleet";
import {Player} from "core/src/player/Player";
import {Star} from "core/src/map/Star";
import {Unit} from "core/src/unit/Unit";

import
{
  getDistributablesWithGroups,
  getRandomWeightedDistributable,
} from "core/src/generic/Distributable";
import {RaceTemplate} from "core/src/templateinterfaces/RaceTemplate";
import {UnitTemplate} from "core/src/templateinterfaces/UnitTemplate";

import {distributionGroups} from "./distributionGroups";
import { getBuildableUnitsForRace } from "core/src/production/getBuildableUnitsForRace";


type UnitRole = "normal" |
  "elite" |
  "leader";
const unitRoleData:
{
  [role: string]:
  {
    namePrefix: string;
    health: number;
    attributes: number;
    filterCandidates: (candidates: UnitTemplate[]) => UnitTemplate[];
  };
} =
{
  normal:
  {
    namePrefix: "",
    health: 1,
    attributes: 1,
    filterCandidates: candidates =>
    {
      return getDistributablesWithGroups(
        candidates,
        [distributionGroups.common],
      );
    },
  },
  elite:
  {
    namePrefix: "",
    health: 1.2,
    attributes: 1.2,
    filterCandidates: candidates =>
    {
      return getDistributablesWithGroups(
        candidates,
        [distributionGroups.rare],
      );
    },
  },
  leader:
  {
    namePrefix: "",
    health: 1.35,
    attributes: 1.35,
    filterCandidates: candidates =>
    {
      return getDistributablesWithGroups(
        candidates,
        [distributionGroups.unique],
      );
    },
  },
};

export function generateIndependentFleets(
  race: RaceTemplate,
  player: Player,
  location: Star,
  globalStrength: number,
  localStrength: number,
  maxUnitsPerSideInBattle: number,
): Fleet[]
{
  const locationShouldHaveLeader = localStrength > 0.8;

  const allBuildableUnitTypes = getBuildableUnitsForRace(race);

  const unitCountFromGlobalStrength = maxUnitsPerSideInBattle * 0.34 + maxUnitsPerSideInBattle * 0.66 * globalStrength;
  const unitCountFromLocalStrength = locationShouldHaveLeader ? 1 : 0;

  const unitCount = Math.min(
    Math.round(unitCountFromGlobalStrength + unitCountFromLocalStrength),
    maxUnitsPerSideInBattle,
  );

  const eliteCount = Math.ceil((unitCount / maxUnitsPerSideInBattle - 0.499) * 3);

  const units: Unit[] = [];
  for (let i = 0; i < unitCount; i++)
  {
    let unitRole: UnitRole;
    if (locationShouldHaveLeader && i === 0)
    {
      unitRole = "leader";
    }
    else if (i < eliteCount)
    {
      unitRole = "elite";
    }
    else
    {
      unitRole = "normal";
    }

    const candidateUnitTemplates = unitRoleData[unitRole].filterCandidates(allBuildableUnitTypes);

    const unitTemplate = getRandomWeightedDistributable(candidateUnitTemplates);

    const healthModifier = unitRoleData[unitRole].health;
    const attributesModifier = unitRoleData[unitRole].attributes;

    const unitName = race.getUnitName(unitTemplate);
    unitName.baseName = `${unitRoleData[unitRole].namePrefix}${unitName.baseName}`;

    const unit = Unit.fromTemplate(
    {
      template: unitTemplate,
      race: race,

      name: unitName,

      attributeMultiplier: (1 + globalStrength * 0.2) * attributesModifier,
      healthMultiplier: (1 + globalStrength) * healthModifier,
    });

    units.push(unit);
    player.addUnit(unit);
  }

  const fleets = Fleet.createFleetsFromUnits(units, player);
  fleets.forEach(fleet =>
  {
    player.addFleet(fleet);
    location.addFleet(fleet);
  });

  return fleets;
}
