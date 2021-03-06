import { EnglishName } from "modules/englishlanguage/src/EnglishName";


export const names =
{
  genericPlayer: (playerId: number) => new EnglishName(`Player ${playerId}`),
  genericFleet: (fleetId: number) => new EnglishName(`Fleet ${fleetId}`),
  wormThings: () => new EnglishName("Worm Things", {isPlural: true}),
  wormThingsIndependents: () => new EnglishName("Independent Worm Things", {isPlural: true}),
  federationAlliance: () => new EnglishName("Federation Alliance"),
  federationAllianceIndependents: () => new EnglishName("Federation Alliance Independents", {isPlural: true}),
  infestedUnitName: (unitDisplayName: string) =>
  {
    return new EnglishName(`Infested ${unitDisplayName}`);
  },
  federationUnitName: (unitDisplayName: string) =>
  {
    return new EnglishName(`Federation ${unitDisplayName}`);
  },
};
