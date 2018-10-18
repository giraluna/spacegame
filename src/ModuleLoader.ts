import ModuleData from "./ModuleData";
import ModuleFile from "./ModuleFile";
import ModuleFileLoadingPhase from "./ModuleFileLoadingPhase";

import eventManager from "./eventManager";


export default class ModuleLoader
{
  moduleData: ModuleData;
  moduleFilesByKey:
  {
    [key: string]: ModuleFile;
  } = {};
  moduleFilesByPhase:
  {
    [phase: number]: ModuleFile[];
  } = {};
  hasLoaded:
  {
    [key: string]: boolean;
  } = {};
  moduleLoadStart:
  {
    [key: string]: number;
  } = {};
  moduleLoadFinishCallbacks:
  {
    [key: string]: (() => void)[];
  } = {};
  constructor(moduleData: ModuleData)
  {
    this.moduleData = moduleData;

    eventManager.addEventListener("loadModulesNeededForPhase", this.loadModulesNeededForPhase.bind(this));
  }

  public addModuleFile(moduleFile: ModuleFile)
  {
    if (this.moduleFilesByKey[moduleFile.metaData.key])
    {
      throw new Error(`Duplicate module key ${moduleFile.metaData.key}`);
    }

    this.moduleFilesByKey[moduleFile.metaData.key] = moduleFile;
    this.hasLoaded[moduleFile.metaData.key] = false;

    if (!this.moduleFilesByPhase[moduleFile.needsToBeLoadedBefore])
    {
      this.moduleFilesByPhase[moduleFile.needsToBeLoadedBefore] = [];
    }

    this.moduleFilesByPhase[moduleFile.needsToBeLoadedBefore].push(moduleFile);
  }
  public loadModuleFile(moduleFile: ModuleFile, afterLoaded: () => void)
  {
    if (!this.moduleFilesByKey[moduleFile.metaData.key])
    {
      this.addModuleFile(moduleFile);
    }

    if (this.hasLoaded[moduleFile.metaData.key])
    {
      afterLoaded();

      return;
    }

    if (!this.moduleLoadFinishCallbacks[moduleFile.metaData.key])
    {
      this.moduleLoadFinishCallbacks[moduleFile.metaData.key] = [];
    }
    this.moduleLoadFinishCallbacks[moduleFile.metaData.key].push(afterLoaded);

    if (isFinite(this.moduleLoadStart[moduleFile.metaData.key]))
    {
      return;
    }
    console.log(`Start loading module "${moduleFile.metaData.key}"`);

    this.moduleLoadStart[moduleFile.metaData.key] = Date.now();
    // TODO 2017.07.29 | keep track of what's already been loaded
    if (moduleFile.loadAssets)
    {
      moduleFile.loadAssets(() =>
      {
        this.finishLoadingModuleFile(moduleFile);
      });
    }
    else
    {
      this.finishLoadingModuleFile(moduleFile);
    }
  }
  public loadModuleFiles(moduleFilesToLoad: ModuleFile[], afterLoaded?: () => void): void
  {
    if (!moduleFilesToLoad || moduleFilesToLoad.length < 1)
    {
      if (afterLoaded)
      {
        afterLoaded();
      }

      return;
    }

    const loadedModuleFiles: ModuleFile[] = [];

    const executeIfAllLoaded = () =>
    {
      if (loadedModuleFiles.length === moduleFilesToLoad.length)
      {
        if (afterLoaded)
        {
          afterLoaded();
        }
      }
    };

    moduleFilesToLoad.forEach(moduleFile =>
    {
      this.loadModuleFile(moduleFile, () =>
      {
        loadedModuleFiles.push(moduleFile);
        if (afterLoaded)
        {
          executeIfAllLoaded();
        }
      });
    });
  }
  public loadAll(afterLoaded: () => void)
  {
    const allModuleFiles: ModuleFile[] = [];
    for (const key in this.moduleFilesByKey)
    {
      allModuleFiles.push(this.moduleFilesByKey[key]);
    }

    this.loadModuleFiles(allModuleFiles, afterLoaded);
  }
  public loadModulesForPhase(phase: ModuleFileLoadingPhase, afterLoaded?: () => void): void
  {
    const moduleFilesToLoad = this.moduleFilesByPhase[phase];
    this.loadModuleFiles(moduleFilesToLoad, afterLoaded);
  }
  public loadModulesNeededForPhase(phase: ModuleFileLoadingPhase, afterLoaded?: () => void): void
  {
    const moduleFilesNeededForPhase: ModuleFile[] = [];

    for (const keyString in this.moduleFilesByPhase)
    {
      if (parseInt(keyString) <= phase)
      {
        moduleFilesNeededForPhase.push(...this.moduleFilesByPhase[keyString]);
      }
    }

    this.loadModuleFiles(moduleFilesNeededForPhase, afterLoaded);
  }
  public progressivelyLoadModulesByPhase(startingPhase: ModuleFileLoadingPhase): void
  {
    this.loadModulesForPhase(startingPhase, () =>
    {
      if (ModuleFileLoadingPhase[startingPhase + 1])
      {
        this.progressivelyLoadModulesByPhase(startingPhase + 1);
      }
    });
  }
  private finishLoadingModuleFile(moduleFile: ModuleFile)
  {
    this.hasLoaded[moduleFile.metaData.key] = true;
    this.constructModuleFile(moduleFile);

    const loadTime = Date.now() - this.moduleLoadStart[moduleFile.metaData.key];
    console.log(`Module "${moduleFile.metaData.key}" finished loading in ${loadTime}ms`);

    while (this.moduleLoadFinishCallbacks[moduleFile.metaData.key].length > 0)
    {
      const afterLoadedCallback = this.moduleLoadFinishCallbacks[moduleFile.metaData.key].pop()!;
      afterLoadedCallback();
    }
  }
  private constructModuleFile(moduleFile: ModuleFile)
  {
    if (moduleFile.constructModule)
    {
      moduleFile.constructModule(this.moduleData);
    }

    this.moduleData.addSubModule(moduleFile);
  }
}
