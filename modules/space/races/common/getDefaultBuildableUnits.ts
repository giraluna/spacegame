import {unitTemplates as units} from "modules/space/units/unitTemplates";
import {debugShip} from "modules/space/units/templates/debugShip";
import {options} from "core/app/Options";
import {UnitTemplate} from "core/templateinterfaces/UnitTemplate";


export function getDefaultBuildableUnits(): UnitTemplate[]
{
  const availableUnits =
  [
    units.battleCruiser,
    units.stealthShip,
    units.scout,
    units.bomberSquadron,
    // units.fighterSquadron,
    units.shieldBoat,
  ];

  if (options.debug.enabled)
  {
    availableUnits.push(debugShip);
  }

  return availableUnits;
}
