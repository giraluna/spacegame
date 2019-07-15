import {ModuleData} from "./ModuleData";
import {ModuleInfo} from "./ModuleInfo";
import {ModuleFileInitializationPhase} from "./ModuleFileInitializationPhase";

import {Language} from "./localization/Language";


export interface ModuleSaveData<S = any>
{
  info: ModuleInfo;
  moduleSaveData: S;
}

// TODO 2019.07.15 | this really should be named moduleobject or something
export interface ModuleFile<SaveData = any>
{
  info: ModuleInfo;
  phaseToInitializeBefore: ModuleFileInitializationPhase;
  supportedLanguages: Language[] | "all";
  // not guaranteed to be loaded after main module. use ModuleFile.info.modsToLoadBefore/After to set order
  subModules?: ModuleFile[];
  /**
   * @param baseUrl base url of module file
   */
  initialize?: (baseUrl: string) => Promise<void>;
  addToModuleData?: (moduleData: ModuleData) => void;
  serializeModuleSpecificData?: () => SaveData;
  deserializeModuleSpecificData?: (saveData: SaveData) => void;
  reviveGameData?: (saveData: any) => void;
}
