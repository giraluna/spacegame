import {englishLanguage} from "modules/englishlanguage/englishLanguage";
import {GameModule} from "core/modules/GameModule";
import {GameModuleInitializationPhase} from "core/modules/GameModuleInitializationPhase";

import {itemTemplates} from "./itemTemplates";
import {setBaseUrl as setAssetBaseUrl} from "./resources";

import * as moduleInfo from "./moduleInfo.json";


export const spaceItems: GameModule =
{
  info: moduleInfo,
  phaseToInitializeBefore: GameModuleInitializationPhase.MapGen,
  supportedLanguages: [englishLanguage],
  initialize: (baseUrl) =>
  {
    setAssetBaseUrl(baseUrl);

    return Promise.resolve();
  },
  addToModuleData: (moduleData) =>
  {
    moduleData.copyTemplates(itemTemplates, "Items");

    return moduleData;
  },
};
