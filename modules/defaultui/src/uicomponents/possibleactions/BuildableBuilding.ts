import * as React from "react";
import * as ReactDOMElements from "react-dom-factories";

import {Player} from "core/src/player/Player";
import {BuildingTemplate} from "core/src/templateinterfaces/BuildingTemplate";
import {ListItemProps} from "../list/ListItemProps";

import {UpdateWhenMoneyChanges} from "../mixins/UpdateWhenMoneyChanges";
import {applyMixins} from "../mixins/applyMixins";
import { Resources } from "core/src/player/PlayerResources";
import { ResourceCost } from "../resources/ResourceCost";


export interface PropTypes extends ListItemProps, React.Props<any>
{
  typeName: string;
  buildCost: Resources;

  template: BuildingTemplate;
  player: Player;
}

interface StateType
{
  canAfford: boolean;
}

export class BuildableBuildingComponent extends React.Component<PropTypes, StateType>
{
  public displayName = "BuildableBuilding";
  public state: StateType;

  constructor(props: PropTypes)
  {
    super(props);

    this.state = this.getInitialStateTODO();

    this.bindMethods();
    applyMixins(this, new UpdateWhenMoneyChanges(this, this.overrideHandleMoneyChange));
  }
  private bindMethods()
  {
    this.overrideHandleMoneyChange = this.overrideHandleMoneyChange.bind(this);
    this.makeCell = this.makeCell.bind(this);
  }

  private getInitialStateTODO(): StateType
  {
    return(
    {
      canAfford: this.props.player.canAfford(this.props.buildCost),
    });
  }

  overrideHandleMoneyChange()
  {
    this.setState(
    {
      canAfford: this.props.player.canAfford(this.props.buildCost),
    });
  }

  makeCell(type: string)
  {
    const cellProps: React.HTMLProps<HTMLTableCellElement> = {};
    cellProps.key = type;
    cellProps.className = "buildable-building-list-item-cell " + type;

    let cellContent: React.ReactNode;

    switch (type)
    {
      case "buildCost":
      {
        cellContent = ResourceCost(
        {
          cost: this.props.buildCost,
          missingResources: this.props.player.getMissingResourcesFor(this.props.buildCost),
        });

        break;
      }
      case "typeName":
      {
        cellContent = this.props.typeName;
        break;
      }
    }

    return(
      ReactDOMElements.td(cellProps, cellContent)
    );
  }

  render()
  {
    const template = this.props.template;
    const cells: React.ReactHTMLElement<any>[] = [];
    const columns = this.props.activeColumns;

    for (let i = 0; i < columns.length; i++)
    {
      cells.push(
        this.makeCell(columns[i].key),
      );
    }

    const props: React.HTMLAttributes<HTMLTableRowElement> =
    {
      className: "buildable-item buildable-building",
      onClick: this.props.handleClick,
      title: template.description,
    };
    if (!this.state.canAfford)
    {
      props.onClick = undefined;
      props.className += " disabled";
    }

    return(
      ReactDOMElements.tr(props,
      cells,
      )
    );
  }
}

export const BuildableBuilding: React.Factory<PropTypes> = React.createFactory(BuildableBuildingComponent);
