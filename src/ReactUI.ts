import * as ReactDOM from "react-dom";

import Battle from "./Battle";
import BattlePrep from "./BattlePrep";
import Game from "./Game";
import MapRenderer from "./MapRenderer";
import ModuleFileLoadingPhase from "./ModuleFileLoadingPhase";
import ModuleLoader from "./ModuleLoader";
import Player from "./Player";
import PlayerControl from "./PlayerControl";
import ReactUIScene from "./ReactUIScene";
import Renderer from "./Renderer";
import {activeNotificationLog} from "./activeNotificationLog";
import eventManager from "./eventManager";

import {getActiveLanguage} from "./localization/activeLanguage";

import Stage from "./uicomponents/Stage";


const moduleLoadingPhaseByScene:
{
  [key in ReactUIScene]: ModuleFileLoadingPhase;
} =
{
  battle: ModuleFileLoadingPhase.Battle,
  battlePrep: ModuleFileLoadingPhase.BattlePrep,
  galaxyMap: ModuleFileLoadingPhase.Game,
  setupGame: ModuleFileLoadingPhase.Setup,

  flagMaker: ModuleFileLoadingPhase.Setup,
  battleSceneTester: ModuleFileLoadingPhase.Battle,
  SFXEditor: ModuleFileLoadingPhase.Battle,
};

export default class ReactUI
{
  public currentScene: ReactUIScene;
  public battle: Battle;
  public battlePrep: BattlePrep;
  public renderer: Renderer;
  public mapRenderer: MapRenderer;
  public playerControl: PlayerControl;
  public player: Player;
  public game: Game;

  private container: HTMLElement;
  private moduleLoader: ModuleLoader;

  constructor(container: HTMLElement, moduleLoader: ModuleLoader)
  {
    this.container = container;
    this.moduleLoader = moduleLoader;

    this.addEventListeners();
  }

  public switchScene(newScene: ReactUIScene)
  {
    this.currentScene = newScene;
    this.loadModulesNeededForCurrentScene(() =>
    {
      this.render();
    });
  }
  public destroy()
  {
    eventManager.removeAllListeners("switchScene");
    eventManager.removeAllListeners("renderUI");
    ReactDOM.unmountComponentAtNode(this.container);
    this.container = null;
  }
  public render()
  {
    ReactDOM.render(
      Stage(
      {
        sceneToRender: this.currentScene,
        battle: this.battle,
        battlePrep: this.battlePrep,
        renderer: this.renderer,
        mapRenderer: this.mapRenderer,
        playerControl: this.playerControl,
        player: this.player,
        game: this.game,
        activeLanguage: getActiveLanguage(),
        notificationLog: activeNotificationLog,
      }),
      this.container,
    );
  }

  private addEventListeners()
  {
    eventManager.addEventListener("switchScene", this.switchScene.bind(this));
    eventManager.addEventListener("renderUI", this.render.bind(this));
  }
  private loadModulesNeededForCurrentScene(afterLoaded: () => void): void
  {
    const phase = moduleLoadingPhaseByScene[this.currentScene];
    this.moduleLoader.loadModulesNeededForPhase(phase, afterLoaded);
  }
}
