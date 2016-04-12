/// <reference path="../../../lib/react-0.13.3.d.ts" />
import * as React from "react";

/// <reference path="mapmodeselector.ts" />
/// <reference path="maprendererlayerslist.ts" />

/// <reference path="../../maprenderer.ts" />


import MapRendererLayersList from "./MapRendererLayersList.ts";
import MapRenderer from "../../../src/MapRenderer.ts";
import MapModeSelector from "./MapModeSelector.ts";


export interface PropTypes extends React.Props<any>
{
  mapRenderer: MapRenderer;
}

interface StateType
{
}

interface RefTypes extends React.Refs
{
  layersList: React.Component<any, any>; // TODO refactor | correct ref type 542 | MapRendererLayersList
}

export class MapModeSettingsComponent extends React.Component<PropTypes, StateType>
{
  displayName: string = "MapModeSettings";


  state: StateType;
  refsTODO: RefTypes;

  constructor(props: PropTypes)
  {
    super(props);
    
    this.bindMethods();
  }
  private bindMethods()
  {
    this.handleReset = this.handleReset.bind(this);    
  }
  
  handleReset()
  {
    var mapRenderer: MapRenderer = this.props.mapRenderer;
    mapRenderer.currentMapMode.resetLayers();
    mapRenderer.resetMapModeLayersPosition();
    mapRenderer.setAllLayersAsDirty();
    this.refsTODO.layersList.forceUpdate();
  }

  render()
  {
    return(
      React.DOM.div(
      {
        className: "map-mode-settings"
      },
        MapModeSelector(
        {
          mapRenderer: this.props.mapRenderer,
          onUpdate: this.forceUpdate.bind(this),
          ref: "selector"
        }),
        React.DOM.button(
        {
          className: "reset-map-mode-button",
          onClick: this.handleReset
        },
          "Reset"
        ),
        MapRendererLayersList(
        {
          mapRenderer: this.props.mapRenderer,
          currentMapMode: this.props.mapRenderer.currentMapMode,
          ref: "layersList"
        })
      )
    );
  }
}

const Factory: React.Factory<PropTypes> = React.createFactory(MapModeSettingsComponent);
export default Factory;
