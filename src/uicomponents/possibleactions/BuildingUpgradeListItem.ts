import * as React from "react";

import BuildingUpgradeData from "../../BuildingUpgradeData";
import Player from "../../Player";

import UpdateWhenMoneyChanges from "../mixins/UpdateWhenMoneyChanges";
import applyMixins from "../mixins/applyMixins";

export interface PropTypes extends React.Props<any>
{
  player: Player;
  handleUpgrade: (upgradeData: BuildingUpgradeData) => void;
  upgradeData: BuildingUpgradeData;
}

interface StateType
{
  canAfford?: boolean;
}

export class BuildingUpgradeListItemComponent extends React.Component<PropTypes, StateType>
{
  displayName: string = "BuildingUpgradeListItem";
  state: StateType;

  constructor(props: PropTypes)
  {
    super(props);

    this.state = this.getInitialStateTODO();

    this.bindMethods();
    applyMixins(this, new UpdateWhenMoneyChanges(this, this.overrideHandleMoneyChange));
  }
  private bindMethods()
  {
    this.handleClick = this.handleClick.bind(this);
    this.overrideHandleMoneyChange = this.overrideHandleMoneyChange.bind(this);
  }

  private getInitialStateTODO(): StateType
  {
    return(
    {
      canAfford: this.props.player.money >= this.props.upgradeData.cost,
    });
  }

  overrideHandleMoneyChange()
  {
    this.setState(
    {
      canAfford: this.props.player.money >= this.props.upgradeData.cost,
    });
  }

  handleClick()
  {
    this.props.handleUpgrade(this.props.upgradeData);
  }

  render()
  {
    const upgradeData = this.props.upgradeData;

    const rowProps: React.HTMLProps<HTMLTableRowElement> =
    {
      key: upgradeData.template.type,
      className: "building-upgrade-list-item",
      onClick: this.handleClick,
      title: upgradeData.template.description,
    };

    const costProps: React.HTMLProps<HTMLTableCellElement> =
    {
      key: "cost",
      className: "building-upgrade-list-item-cost",
    };

    if (!this.state.canAfford)
    {
      rowProps.onClick = null;
      rowProps.disabled = true;
      rowProps.className += " disabled";

      costProps.className += " negative";
    }

    return(
      React.DOM.tr(rowProps,
        React.DOM.td(
        {
          key: "name",
          className: "building-upgrade-list-item-name",
        }, upgradeData.template.displayName + " " + (upgradeData.level > 1 ? upgradeData.level : "")),
        React.DOM.td(costProps, upgradeData.cost),
      )
    );
  }
}

const Factory: React.Factory<PropTypes> = React.createFactory(BuildingUpgradeListItemComponent);
export default Factory;
