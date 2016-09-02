import RaceTemplate from "../../../src/templateinterfaces/RaceTemplate";

import * as TechnologyTemplates from "../../defaulttechnologies/TechnologyTemplates";
import DefaultAIConstructor from "../../defaultai/mapai/DefaultAIConstructor";

import
{
  defaultRaceTechnologyValues,
  mergeTechnologyValues
} from "../common";

const wormThings: RaceTemplate =
{
  key: "wormThings",
  displayName: "Worm Things",
  description: "The gross guys",

  technologies: mergeTechnologyValues(defaultRaceTechnologyValues,
  [
    {
      tech: TechnologyTemplates.test2,
      startingLevel: 1,
      maxLevel: 5
    }
  ]),

  getAITemplateConstructor: (player) => DefaultAIConstructor
}

export default wormThings;
