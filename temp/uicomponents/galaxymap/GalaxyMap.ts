/// <reference path="../../../lib/react-0.13.3.d.ts" />

import app from "../../../src/App.ts"; // TODO refactor | autogenerated
import * as React from "react";


import GalaxyMap from "../../../src/GalaxyMap.ts";
import GalaxyMapUI from "./GalaxyMapUI.ts";
import Options from "../../../src/options.ts";
import Player from "../../../src/Player.ts";
import PlayerControl from "../../../src/PlayerControl.ts";
import Game from "../../../src/Game.ts";
import MapRenderer from "../../../src/MapRenderer.ts";
import Renderer from "../../../src/Renderer.ts";
import Point from "../../../src/Point.ts";

interface PropTypes extends React.Props<any>
{
  toCenterOn: Point;
  player: Player;
  playerControl: PlayerControl;
  game: Game;
  mapRenderer: MapRenderer;
  renderer: Renderer;
}

interface StateType
{
}

export class GalaxyMapComponent extends React.Component<PropTypes, StateType>
{
  displayName: string = "GalaxyMap";
  state: StateType;
  
  ref_TODO_pixiContainer: React.HTMLComponent;
  ref_TODO_sceneSelector: React.HTMLComponent;

  constructor(props: PropTypes)
  {
    super(props);
    
    this.bindMethods();
  }
  private bindMethods()
  {
    this.changeScene = this.changeScene.bind(this);    
  }
  
  changeScene(e: React.FormEvent)
  {
    var target = <HTMLInputElement> e.target;
    app.reactUI.switchScene(target.value);
  }
  
  render()
  {
    var mapModeOptions: React.HTMLElement[] = [];

    for (var mapModeName in this.props.mapRenderer.mapModes)
    {
      mapModeOptions.push(React.DOM.option(
      {
        value: mapModeName,
        key: mapModeName
      },
        this.props.mapRenderer.mapModes[mapModeName].template.displayName
      ));
    }

    return(
      React.DOM.div(
        {
          className: "galaxy-map"
        },
        React.DOM.div(
        {
          ref: (component: React.HTMLComponent) =>
          {
            this.ref_TODO_pixiContainer = component;
          },
          id: "pixi-container"
        },
          GalaxyMapUI(
          {
            playerControl: this.props.playerControl,
            player: this.props.player,
            game: this.props.game,
            mapRenderer: this.props.mapRenderer,
            key: "galaxyMapUI"
          })
        ),
        !Options.debugMode ? null : React.DOM.div(
        {
          className: "galaxy-map-debug debug"
        },
          React.DOM.select(
            {
              className: "reactui-selector debug",
              ref: (component: React.HTMLComponent) =>
              {
                this.ref_TODO_sceneSelector = component;
              },
              value: app.reactUI.currentScene,
              onChange: this.changeScene
            },
            React.DOM.option({value: "galaxyMap"}, "map"),
            React.DOM.option({value: "flagMaker"}, "make flags"),
            React.DOM.option({value: "setupGame"}, "setup game"),
            React.DOM.option({value: "battleSceneTester"}, "battle scene test")
          ),
          React.DOM.button(
          {
            className: "debug",
            onClick: function(e: React.FormEvent)
            {
              const target = <HTMLButtonElement> e.target;
              // TODO refactor | can remove in react 15.0+
              // https://github.com/facebook/react/issues/2988
              // https://github.com/facebook/react/issues/2605#issuecomment-118398797
              // without this react will keep a reference to this element causing a big memory leak
              target.blur();
              window.setTimeout(function()
              {
                var position = app.renderer.camera.container.position.clone();
                var zoom = app.renderer.camera.currZoom;
                app.destroy();

                app.initUI();

                app.game = app.makeGame();
                app.initGame();

                app.initDisplay();
                app.hookUI();
                app.reactUI.switchScene("galaxyMap");
                app.renderer.camera.zoom(zoom);
                app.renderer.camera.container.position = position;
              }, 5);
            }
          },
            "Reset app"
          )
        )
      )
    );
  }

  
  componentDidMount()
  {
    this.props.renderer.isBattleBackground = false;
    this.props.renderer.bindRendererView(React.findDOMNode<HTMLElement>(this.ref_TODO_pixiContainer));
    this.props.mapRenderer.setMapModeByKey("defaultMapMode");
    
    this.props.renderer.resume();

    // TODO hack | transparency isn't properly rendered without this
    this.props.mapRenderer.setAllLayersAsDirty();

    var centerLocation = this.props.renderer.camera.toCenterOn ||
      this.props.toCenterOn ||
      this.props.player.controlledLocations[0];

    this.props.renderer.camera.centerOnPosition(centerLocation);
  }
  componentWillUnmount()
  {
    this.props.renderer.pause();
    this.props.renderer.removeRendererView();
  }
}

const Factory: React.Factory<PropTypes> = React.createFactory(GalaxyMapComponent);
export default Factory;
