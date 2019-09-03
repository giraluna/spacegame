import * as RNG from "rng-js";
import * as localForage from "localforage";

import {GalaxyMap} from "../map/GalaxyMap";
import {Game} from "../game/Game";
import {GameLoader} from "../saves/GameLoader";
import {MapRenderer} from "../maprenderer/MapRenderer";
import {GameModuleInitializationPhase} from "../modules/GameModuleInitializationPhase";
import {ModuleInitializer} from "../modules/ModuleInitializer";
import {options} from "./Options";
import {Player} from "../player/Player";
import {PlayerControl} from "../interaction/PlayerControl";
import {ReactUI} from "../ui/ReactUI";
import {ReactUIScene} from "../ui/UIScenes";
import {Renderer} from "../graphics/Renderer";
import {activeModuleData} from "./activeModuleData";
import {activePlayer, setActivePlayer} from "./activePlayer";
import {centerCameraOnPosition} from "../graphics/centerCameraOnPosition";
import {idGenerators} from "./idGenerators";
import {activeModuleStore} from "../modules/ModuleStore";
import {activeNotificationFilter} from "../notifications/NotificationFilter";
import * as debug from "./debug";
import
{
  reviveSaveData,
  ReviversByVersion,
  fetchNeededReviversForData,
} from "../saves/reviveSaveData";
import
{
  getRandomArrayItem,
  loadDom,
  getFunctionName,
} from "../generic/utility";

import {NotificationStore} from "../notifications/NotificationStore";
import {activeNotificationStore, setActiveNotificationStore} from "./activeNotificationStore";
import {tutorialStatus} from "../tutorials/TutorialStatus";
import {MapGenOptionValues} from "../templateinterfaces/MapGenOptionValues";
import {RaceTemplate} from "../templateinterfaces/RaceTemplate";
import {FullSaveData} from "../savedata/FullSaveData";
import { PlayerNotificationSubscriber } from "../notifications/PlayerNotificationSubscriber";
import { storageStrings } from "../saves/storageStrings";
import {ModuleInfo} from "../modules/ModuleInfo";
import {Point} from "../math/Point";

class App
{
  public renderer: Renderer;
  public game: Game;
  public playerControl: PlayerControl;
  public reactUI: ReactUI;
  public moduleInitializer: ModuleInitializer;

  public readonly version: string = "0.4.0";
  public readonly initialModules: ModuleInfo[] = [];

  private seed: string;
  private mapRenderer: MapRenderer;

  constructor(...initialModules: ModuleInfo[])
  {
    PIXI.utils.skipHello();

    this.cleanUpStorage();

    window.onhashchange = () =>
    {
      this.destroy();
      this.initUI();
      this.makeApp();
    };

    this.seed = "" + Math.random();
    Math.random = RNG.prototype.uniform.bind(new RNG(this.seed));

    this.initialModules = initialModules;
    activeModuleStore.getModules(...initialModules).then((gameModules) =>
    {
      this.moduleInitializer = new ModuleInitializer(activeModuleData, activeModuleStore, gameModules);
    }).then(() =>
    {
      return loadDom();
    }).then(() =>
    {
      debug.log("init", "DOM loaded");
      this.initUI();

      // some things called in this.makeApp() rely on global app variable
      // this timeout allows constructor to finish and variable to be assigned
      // still necessary with promise, as Promise.all may be synchronous
      window.setTimeout(() =>
      {
        return this.moduleInitializer.initModulesNeededForPhase(GameModuleInitializationPhase.AppInit).then(() =>
        {
          return Promise.all(
          [
            options.load(),
            tutorialStatus.load(),
          ]);
        }).then(() =>
        {
          debug.log("init", "Finish loading data needed to init app");

          this.makeApp();
        });
      }, 0);
    });
  }

  public makeGameFromSetup(map: GalaxyMap, players: Player[])
  {
    this.destroy();

    this.initUI();

    this.moduleInitializer.initModulesNeededForPhase(GameModuleInitializationPhase.GameStart).then(() =>
    {
      this.initGame(new Game(map, players)).then(() =>
      {
        this.reactUI.switchScene("galaxyMap");
      });
    });
  }
  public load(saveKey: string, remakeUi: boolean = true): Promise<void>
  {
    return localForage.getItem<string>(saveKey).then(rawData =>
    {
      if (!rawData)
      {
        throw new Error(`Couldn't fetch save data with key ${saveKey}`);
      }

      const parsedData: FullSaveData = JSON.parse(rawData);

      return reviveSaveData(parsedData, this.version).then(data =>
      {
        idGenerators.setValues(data.idGenerators);

        if (remakeUi)
        {
          this.destroy();
          this.initUI();
        }

        return this.moduleInitializer.initModulesNeededForPhase(GameModuleInitializationPhase.GameStart).then(() =>
        {
          const game = new GameLoader().deserializeGame(data.gameData);
          game.gameStorageKey = saveKey;

          return this.initGame(game, data.cameraLocation).then(() =>
          {
            this.reactUI.switchScene("galaxyMap");
          });
        });
      });
    });
  }

  private makeApp(): void
  {
    const startTime = Date.now();

    this.moduleInitializer.progressivelyInitModulesByPhase(GameModuleInitializationPhase.AppInit + 1);

    const optionsInUrl = this.getOptionsInUrl();
    const initialScene = optionsInUrl.initialScene;

    const finalizeMakingApp = (scene: ReactUIScene) =>
    {
      this.reactUI.switchScene(scene).then(() =>
      {
        debug.log("init", `Init app in ${Date.now() - startTime}ms`);
      });
    };

    if (initialScene === "galaxyMap" || optionsInUrl.params.save)
    {
      this.moduleInitializer.initModulesNeededForPhase(GameModuleInitializationPhase.GameStart).then(() =>
      {
        if (optionsInUrl.params.save)
        {
          const saveKey = storageStrings.savePrefix + optionsInUrl.params.save;

          return this.load(saveKey, false);
        }
        else
        {
          return this.initGame(this.makeGame());
        }
      }).then(() =>
      {
        finalizeMakingApp("galaxyMap");
      });
    }
    else
    {
      finalizeMakingApp(initialScene);
    }
  }
  private destroy(): void
  {
    if (this.game)
    {
      this.game.destroy();
      this.game = null;
    }

    if (this.mapRenderer)
    {
      this.mapRenderer.destroy();
      this.mapRenderer = null;
    }

    if (this.renderer)
    {
      this.renderer.destroy();
      this.renderer = null;
    }

    if (this.playerControl)
    {
      this.playerControl.destroy();
      this.playerControl = null;
    }

    if (this.reactUI)
    {
      this.reactUI.destroy();
      this.reactUI = null;
    }
  }
  private initUI(): void
  {
    const reactContainer = document.getElementById("react-container");

    if (!reactContainer)
    {
      throw new Error("Couldn't get react container");
    }

    this.reactUI = new ReactUI(
      reactContainer,
      this.moduleInitializer,
    );
  }
  private initGame(game: Game, initialCameraPosition?: Point): Promise<void>
  {
    this.game = game;

    if (!activeNotificationStore)
    {
      setActiveNotificationStore(new NotificationStore());
      activeNotificationStore.currentTurn = game.turnNumber;
    }

    setActivePlayer(game.players[0]);
    activePlayer.isAi = false;

    if (this.playerControl)
    {
      this.playerControl.removeEventListeners();
    }

    this.playerControl = new PlayerControl(activePlayer);

    game.players.forEach(player =>
    {
      if (!player.isIndependent)
      {
        if (!player.notificationLog)
        {
          player.notificationLog = new PlayerNotificationSubscriber(player);
        }
        player.notificationLog.registerToNotificationStore(activeNotificationStore);
      }

      if (!player.aiController)
      {
        player.aiController = player.makeRandomAiController(game);
      }
    });

    // notification filter is loaded here as it's dependant on notifications having been loaded
    return activeNotificationFilter.load().then(() =>
    {
      activeModuleData.scripts.game.afterInit.forEach(script =>
      {
        script(game);
      });

      this.initDisplay(game, activePlayer);
      this.hookUI(
        game,
        activePlayer,
        this.playerControl,
        this.renderer,
        this.mapRenderer,
      );

      const pointToCenterCameraOn = initialCameraPosition || activePlayer.controlledLocations[0];
      centerCameraOnPosition(pointToCenterCameraOn);
    });
  }
  private initDisplay(game: Game, player: Player): void
  {
    this.renderer = new Renderer(
      game.galaxyMap.seed,
      activeModuleData.mapBackgroundDrawingFunction,
    );

    this.mapRenderer = new MapRenderer(game.galaxyMap, player);
    this.mapRenderer.setParent(this.renderer.layers.map);
    this.mapRenderer.init();

    // some initialization is done when the react component owning the
    // renderer mounts, such as in uicomponents/galaxymap/galaxymap.ts
  }
  private hookUI(
    game: Game,
    player: Player,
    playerControl: PlayerControl,
    renderer: Renderer,
    mapRenderer: MapRenderer,
  ): void
  {
    this.reactUI.game = game;
    this.reactUI.player = player;
    this.reactUI.playerControl = playerControl;
    this.reactUI.renderer = renderer;
    this.reactUI.mapRenderer = mapRenderer;
  }
  private getOptionsInUrl(): {
    initialScene: ReactUIScene;
    params:
    {
      save?: string;
    };
  }
  {
    const urlParser = document.createElement("a");
    urlParser.href = document.URL;
    const hash = urlParser.hash;

    const initialScene = hash ?
      <ReactUIScene> hash.slice(1) :
      "setupGame";

    const params = new URLSearchParams(urlParser.search.slice(1));

    return(
    {
      initialScene: initialScene,
      params:
      {
        save: params.get("save"),
      },
    });
  }
  private makeGame(): Game
  {
    const playerData = this.makePlayers();
    const players = playerData.players;
    const map = this.makeMap(playerData);

    const game = new Game(map, players);

    return game;
  }
  private makePlayers()
  {
    const players: Player[] = [];
    const candidateRaces = <RaceTemplate[]> Object.keys(activeModuleData.templates.Races).map(raceKey =>
    {
      return activeModuleData.templates.Races[raceKey];
    }).filter(raceTemplate =>
    {
      return !raceTemplate.isNotPlayable;
    });

    for (let i = 0; i < 5; i++)
    {
      players.push(new Player(
      {
        isAi: i > 0,
        isIndependent: false,

        race: getRandomArrayItem(candidateRaces),
        money: 1000,
      }));
    }

    return(
    {
      players: players,
    });
  }
  private makeMap(playerData: {players: Player[]}): GalaxyMap
  {
    const optionValues: MapGenOptionValues =
    {
      defaultOptions:
      {
        height: 1200,
        width: 1200,
        starCount: 30,
      },
      basicOptions:
      {
        arms: 5,
        centerDensity: 40,
        starSizeRegularity: 100,
      },
    };

    const mapGenResult = activeModuleData.getDefaultMap().mapGenFunction(
      optionValues,
      playerData.players,
    );

    const galaxyMap = mapGenResult.makeMap();

    return galaxyMap;
  }
  private cleanUpStorage(): void
  {
    localForage.getItem<string>(storageStrings.appVersion).then(storedAppVersion =>
    {
      const reviversByAppVersion: ReviversByVersion =
      {
        "0.0.0":
        [
          function removeSeparatelyStoredLanguageSetting()
          {
            localStorage.removeItem(storageStrings.deprecated_language);
          },
        ],
        "0.1.0":
        [
          function onlyUseOneSlotForStoredOptions()
          {
            const storedOptions = localStorage.getItem(storageStrings.deprecated_options);
            localStorage.setItem(storageStrings.options, storedOptions);
            localStorage.removeItem(storageStrings.deprecated_options);
          },
          function onlyUseOneSlotForStoredNotificationFilterSettings()
          {
            const storedNotificationFilter = localStorage.getItem(storageStrings.deprecated_notificationFilter);
            localStorage.setItem(storageStrings.notificationFilter, storedNotificationFilter);
            localStorage.removeItem(storageStrings.deprecated_notificationFilter);
          },
          function moveStoredDataFromLocalStorageToLocalForage()
          {
            Object.keys(localStorage).filter(key => key.indexOf(storageStrings.basePrefix) !== -1).forEach(key =>
            {
              localForage.setItem(key, localStorage.getItem(key)).then(() =>
              {
                localStorage.removeItem(key);
              });
            });
          }
        ],
        "0.4.0":
        [
          function renameStorageKeys()
          {
            localForage.keys().then(keys =>
            {
              const keysWithOldPrefix = keys.filter(key => key.indexOf(storageStrings.deprecated_basePrefix) === 0);

              keysWithOldPrefix.forEach(oldKey =>
              {
                const keyWithoutPrefix = oldKey.slice(storageStrings.deprecated_basePrefix.length);
                const newKey = storageStrings.basePrefix + keyWithoutPrefix;

                localForage.getItem(oldKey).then(storedData =>
                {
                  localForage.setItem(newKey, storedData).then(() =>
                  {
                    localForage.removeItem(oldKey);
                  });
                });
              });
            });
          }
        ],
      };

      const reviversToExecute = fetchNeededReviversForData(
        storedAppVersion || "",
        this.version,
        reviversByAppVersion,
      );

      reviversToExecute.forEach(reviverFN =>
      {
        debug.log("saves", `Cleaning up outdated stored data with function '${getFunctionName(reviverFN)}'`);
        reviverFN();
      });

      localForage.setItem(storageStrings.appVersion, this.version);
    });
  }
}

export let app: App;
export function createApp(...initialModules: ModuleInfo[]): App
{
  app = new App(...initialModules);

  return app;
}
