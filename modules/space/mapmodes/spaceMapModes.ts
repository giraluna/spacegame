import * as PIXI from "pixi.js";

import {englishLanguage} from "../../englishlanguage/englishLanguage";
import ModuleFile from "../../../src/ModuleFile";
import ModuleFileInitializationPhase from "../../../src/ModuleFileInitializationPhase";

import mapLayerTemplates from "./mapLayerTemplates";
import mapModeTemplates from "./mapModeTemplates";

import * as moduleInfo from "./moduleInfo.json";


const spaceMapModes: ModuleFile =
{
  info: moduleInfo,
  phaseToInitializeBefore: ModuleFileInitializationPhase.GameStart,
  supportedLanguages: [englishLanguage],
  initialize: (baseUrl) =>
  {
    const loader = new PIXI.loaders.Loader(baseUrl);

    loader.add("fowTexture", "./img/fowTexture.png");

    return new Promise(resolve =>
    {
      loader.load(() =>
      {
        // TODO 2018.12.20 | store fowTexture in resources

        resolve();
      });
    });
  },
  addToModuleData: (moduleData) =>
  {
    moduleData.copyTemplates(mapLayerTemplates, "MapRendererLayers");
    moduleData.copyTemplates(mapModeTemplates, "MapRendererMapModes");

    return moduleData;
  },
};

export default spaceMapModes;
