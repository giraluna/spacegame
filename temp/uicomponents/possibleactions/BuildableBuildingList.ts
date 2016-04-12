/// <reference path="../../../lib/react-0.13.3.d.ts" />
import ListColumn from "../../../temp/uicomponents/unitlist/ListColumn.d.ts"; // TODO refactor | autogenerated
import ListItem from "../../../temp/uicomponents/unitlist/ListItem.d.ts"; // TODO refactor | autogenerated
import * as React from "react";

/// <reference path="../unitlist/list.ts" />
/// <reference path="buildablebuilding.ts" />


import BuildingTemplate from "../../../src/templateinterfaces/BuildingTemplate.d.ts";
import List from "../unitlist/List.ts";
import BuildableBuilding from "./BuildableBuilding.ts";
import Building from "../../../src/Building.ts";


interface PropTypes extends React.Props<any>
{
  clearExpandedAction: any; // TODO refactor | define prop type 123
  star: any; // TODO refactor | define prop type 123
  player: Player;
  humanplayer: Player;
}

interface StateType
{
  buildingTemplates?: any; // TODO refactor | define state type 456
}

export class BuildableBuildingListComponent extends React.Component<PropTypes, StateType>
{
  displayName: string = "BuildableBuildingList";
  state: StateType;

  constructor(props: PropTypes)
  {
    super(props);
    
    this.state = this.getInitialState();
    
    this.bindMethods();
  }
  private bindMethods()
  {
    this.buildBuilding = this.buildBuilding.bind(this);
    this.updateBuildings = this.updateBuildings.bind(this);    
  }
  
  private getInitialState(): StateType
  {
    return(
    {
      buildingTemplates: this.props.star.getBuildableBuildings()
    });
  }

  updateBuildings()
  {
    var buildingTemplates = this.props.star.getBuildableBuildings();
    this.setState(
    {
      buildingTemplates: buildingTemplates
    });

    if (buildingTemplates.length < 1)
    {
      this.props.clearExpandedAction();
    }
  }

  buildBuilding(rowItem: ListItem)
  {
    var template = rowItem.data.template;

    var building = new Building(
    {
      template: template,
      location: this.props.star
    });

    if (!building.controller) building.controller = this.props.humanPlayer;

    this.props.star.addBuilding(building);
    building.controller.money -= template.buildCost;
    this.updateBuildings();
  }

  render()
  {
    if (this.state.buildingTemplates.length < 1) return null;
    var rows: ListItem[] = [];

    for (var i = 0; i < this.state.buildingTemplates.length; i++)
    {
      var template: BuildingTemplate = this.state.buildingTemplates[i];

      var data: any =
      {
        template: template,

        typeName: template.displayName,
        buildCost: template.buildCost,
        player: this.props.player,

        rowConstructor: BuildableBuilding
      };

      rows.push(
      {
        key: i,
        data: data
      });
    }

    var columns: ListColumn[] =
    [
      {
        label: "Name",
        key: "typeName",
        defaultOrder: "asc"
      },
      {
        label: "Cost",
        key: "buildCost",
        defaultOrder: "desc"
      }

    ];

    return(
      React.DOM.div({className: "buildable-item-list buildable-building-list fixed-table-parent"},
        List(
        {
          listItems: rows,
          initialColumns: columns,
          onRowChange: this.buildBuilding,
          addSpacer: true
        })
      )
    );
  }
}

const Factory: React.Factory<PropTypes> = React.createFactory(BuildableBuildingListComponent);
export default Factory;
