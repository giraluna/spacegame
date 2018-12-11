import {englishLanguage} from "../../englishlanguage/englishLanguage";
import ModuleData from "../../../src/ModuleData";
import ModuleFile from "../../../src/ModuleFile";
import ModuleFileInitializationPhase from "../../../src/ModuleFileInitializationPhase";

import raceTemplates from "./RaceTemplates";


const defaultRaces: ModuleFile =
{
  info:
  {
    key: "defaultRaces",
    version: "0.1.0",
    author: "giraluna",
    description: "",
  },
  phaseToInitializeBefore: ModuleFileInitializationPhase.GameSetup,
  supportedLanguages: [englishLanguage],
  addToModuleData: (moduleData: ModuleData) =>
  {
    moduleData.copyTemplates(raceTemplates, "Races");

    return moduleData;
  },
};

export default defaultRaces;
