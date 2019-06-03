import * as React from "react";
import * as ReactDOMElements from "react-dom-factories";

import Player from "../../../../src/Player";
import Star from "../../../../src/Star";

import BuildableBuildingList from "./BuildableBuildingList";
import BuildingUpgradeList from "./BuildingUpgradeList";
import { BuildingTemplate } from "../../../../src/templateinterfaces/BuildingTemplate";
import BuildingUpgradeData from "../../../../src/BuildingUpgradeData";


export enum ExpandedActionKind
{
  None,
  BuildBuildings,
  UpgradeBuildings,
}

// tslint:disable-next-line:no-any
export interface PropTypes extends React.Props<any>
{
  action: ExpandedActionKind;
  player: Player;
  selectedStar: Star;

  buildableBuildings: BuildingTemplate[];
  buildingUpgrades: {[buildingId: number]: BuildingUpgradeData[]};
}

interface StateType
{
}

export class ExpandedActionComponent extends React.Component<PropTypes, StateType>
{
  public displayName = "ExpandedAction";
  public state: StateType;

  constructor(props: PropTypes)
  {
    super(props);
  }

  public render()
  {
    let innerElement: React.ReactElement<any>;

    switch (this.props.action)
    {
      case ExpandedActionKind.None:
      {
        return null;
      }
      case ExpandedActionKind.BuildBuildings:
      {
        if (this.props.buildableBuildings.length > 0)
        {
          innerElement = BuildableBuildingList(
          {
            player: this.props.player,
            star: this.props.selectedStar,
            buildableBuildings: this.props.buildableBuildings,
          });

          break;
        }
        else
        {
          return null;
        }
      }
      case ExpandedActionKind.UpgradeBuildings:
      {
        if (Object.keys(this.props.buildingUpgrades).length > 0)
        {
          innerElement = BuildingUpgradeList(
          {
            player: this.props.player,
            star: this.props.selectedStar,
            buildingUpgrades: this.props.buildingUpgrades,
          });

          break;
        }
        else
        {
          return null;
        }
      }
      default:
      {
        throw new Error(`Invalid expanded action kind: ${this.props.action}`);
      }
    }

    return(
      ReactDOMElements.div(
      {
        className: "expanded-action"
      },
        innerElement,
      )
    );
  }
}

// tslint:disable-next-line:variable-name
export const ExpandedAction: React.Factory<PropTypes> = React.createFactory(ExpandedActionComponent);
