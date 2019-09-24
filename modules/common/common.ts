import * as PIXI from "pixi.js";

import {GameModule} from "core/src/modules/GameModule";
import {GameModuleInitializationPhase} from "core/src/modules/GameModuleInitializationPhase";

import
{
  setBaseUrl as setAssetsBaseUrl,
  assetSources,
  assetsToLoadIntoTextureCache,
} from "./assets";
import * as moduleInfo from "./moduleInfo.json";


// TODO 2019.09.09 | this needs to be renamed / split up
export const common: GameModule =
{
  info: moduleInfo,
  supportedLanguages: "all",
  assetLoaders:
  {
    [GameModuleInitializationPhase.GameSetup]:
    [
      (baseUrl) =>
      {
        setAssetsBaseUrl(baseUrl);

        const loader = new PIXI.Loader(baseUrl);

        assetsToLoadIntoTextureCache.forEach(assetKey =>
        {
          loader.add(assetKey, assetSources[assetKey]);
        });

        return new Promise(resolve =>
        {
          loader.load(resolve);
        });
      },
    ]
  },
};
