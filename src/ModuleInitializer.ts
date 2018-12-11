import ModuleData from "./ModuleData";
import ModuleFile from "./ModuleFile";
import
{
  default as ModuleFileInitializationPhase,
  allModuleFileInitializationPhases,
} from "./ModuleFileInitializationPhase";
import * as debug from "./debug";


export default class ModuleInitializer
{
  private readonly moduleData: ModuleData;
  private readonly moduleFilesByKey:
  {
    [key: string]: ModuleFile;
  } = {};
  private readonly moduleFilesByPhase:
  {
    [phase: number]: ModuleFile[];
  } = {};
  private readonly moduleInitializationPromises:
  {
    [key: string]: Promise<void>;
  } = {};
  private readonly moduleInitalizationStart:
  {
    [key: string]: number;
  } = {};

  constructor(moduleData: ModuleData, moduleFiles: ModuleFile[])
  {
    this.moduleData = moduleData;

    allModuleFileInitializationPhases.forEach(phase =>
    {
      this.moduleFilesByPhase[phase] = [];
    });

    moduleFiles.forEach(moduleFile => this.addModuleFile(moduleFile));
  }

  public initModulesNeededForPhase(phaseToInitUpTo: ModuleFileInitializationPhase): Promise<void>
  {
    const phasesNeeded: ModuleFileInitializationPhase[] = Object.keys(this.moduleFilesByPhase).map(phaseString =>
    {
      return Number(phaseString);
    }).filter(phase =>
    {
      return phase <= phaseToInitUpTo;
    }).sort();

    const allPromises = phasesNeeded.map(phase => this.initModulesForPhase(phase));

    return Promise.all(allPromises);
  }
  public progressivelyInitModulesByPhase(startingPhase: ModuleFileInitializationPhase): void
  {
    this.initModulesForPhase(startingPhase).then(() =>
    {
      const nextPhase = startingPhase + 1;
      if (this.moduleFilesByPhase[nextPhase])
      {
        this.progressivelyInitModulesByPhase(nextPhase);
      }
    });
  }

  private addModuleFile(moduleFile: ModuleFile)
  {
    if (this.moduleFilesByKey[moduleFile.info.key])
    {
      return;
    }

    this.moduleFilesByKey[moduleFile.info.key] = moduleFile;

    this.moduleFilesByPhase[moduleFile.phaseToInitializeBefore].push(moduleFile);
  }
  private initModuleFile(moduleFile: ModuleFile): Promise<void>
  {
    if (this.moduleInitializationPromises[moduleFile.info.key])
    {
      return this.moduleInitializationPromises[moduleFile.info.key];
    }

    debug.log("modules", `Start initializing module "${moduleFile.info.key}"`);
    this.moduleInitalizationStart[moduleFile.info.key] = Date.now();

    const promise = new Promise(resolve =>
    {
      if (moduleFile.initialize)
      {
        moduleFile.initialize().then(() =>
        {
          resolve();
        });
      }
      else
      {
        resolve();
      }
    }).then(() =>
    {
      const subModules = moduleFile.subModules || [];

      return Promise.all(subModules.map(subModuleFile =>
      {
        this.initModuleFile(subModuleFile);
      }));
    }).then(() =>
    {
      this.finishInitializingModuleFile(moduleFile);
    });

    this.moduleInitializationPromises[moduleFile.info.key] = promise;

    return promise;
  }
  private initModuleFiles(moduleFiles: ModuleFile[]): Promise<void>
  {
    return Promise.all(moduleFiles.map(moduleFile =>
    {
      return this.initModuleFile(moduleFile);
    }));
  }
  private initModulesForPhase(phase: ModuleFileInitializationPhase): Promise<void>
  {
    if (this.hasStartedInitializingAllModulesForPhase(phase))
    {
      return Promise.all(this.getModuleInitializationPromisesForPhase(phase));
    }

    const startTime = Date.now();
    const moduleFilesToInit = this.moduleFilesByPhase[phase];

    debug.log("init", `Start initializing modules needed for ${ModuleFileInitializationPhase[phase]}`);

    return this.initModuleFiles(moduleFilesToInit).then(() =>
    {
      const timeTaken = Date.now() - startTime;

      debug.log("init", `Finish initializing modules needed for ${ModuleFileInitializationPhase[phase]} in ${timeTaken}ms`);
    });
  }
  private finishInitializingModuleFile(moduleFile: ModuleFile)
  {
    this.constructModuleFile(moduleFile);

    const timeTaken = Date.now() - this.moduleInitalizationStart[moduleFile.info.key];
    debug.log("modules", `Finish initializing module '${moduleFile.info.key}' in ${timeTaken}ms`);
  }
  private hasStartedInitializingAllModulesForPhase(phase: ModuleFileInitializationPhase): boolean
  {
    return this.moduleFilesByPhase[phase].every(moduleFile =>
    {
      return isFinite(this.moduleInitalizationStart[moduleFile.info.key]);
    });
  }
  private getModuleInitializationPromisesForPhase(phase: ModuleFileInitializationPhase): Promise<void>[]
  {
    return this.moduleFilesByPhase[phase].map(moduleFile =>
    {
      return this.moduleInitializationPromises[moduleFile.info.key];
    });
  }
  private constructModuleFile(moduleFile: ModuleFile)
  {
    if (moduleFile.addToModuleData)
    {
      moduleFile.addToModuleData(this.moduleData);
    }

    this.moduleData.addModuleFile(moduleFile);
  }
}
