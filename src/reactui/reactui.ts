/// <reference path="../../lib/react.d.ts" />

/// <reference path="../eventmanager.ts"/>
/// <reference path="stage.ts"/>

module Rance
{
  export class ReactUI
  {
    currentScene: string;
    stage: any;
    battle: Battle;
    battlePrep: BattlePrep;
    renderer: Renderer;
    galaxyMap: GalaxyMap;
    playerControl: PlayerControl;
    player: Player;
    game: Game;
    
    constructor(public container: HTMLElement)
    {
      this.addEventListeners();
    }
    addEventListeners()
    {
      var self = this;
      eventManager.addEventListener("switchScene", function(e)
      {
        self.switchScene(e.data);
      });
    }
    switchScene(newScene: string)
    {
      this.currentScene = newScene;
      this.render();
    }
    render()
    {
      this.stage = React.renderComponent(
        UIComponents.Stage(
          {
            sceneToRender: this.currentScene,
            changeSceneFunction: this.switchScene.bind(this),
            battle: this.battle,
            battlePrep: this.battlePrep,
            renderer: this.renderer,
            galaxyMap: this.galaxyMap,
            playerControl: this.playerControl,
            player: this.player,
            game: this.game
          }
        ),
        this.container
      );
    }
  }
}