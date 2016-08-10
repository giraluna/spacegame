/// <reference path="../../../lib/react-global.d.ts" />

import {default as EconomySummaryItem, PropTypes as EconomySummaryItemProps} from "./EconomySummaryItem";

import ListColumn from "../list/ListColumn";
import ListItem from "../list/ListItem";
import List from "../list/List";

import Player from "../../Player";


export interface PropTypes extends React.Props<any>
{
  player: Player;
}

interface StateType
{
}

export class EconomySummaryComponent extends React.Component<PropTypes, StateType>
{
  displayName: string = "EconomySummary";

  state: StateType;

  constructor(props: PropTypes)
  {
    super(props);
  }
  
  render()
  {
    var rows: ListItem<EconomySummaryItemProps>[] = [];
    var player = this.props.player;

    for (let i = 0; i < player.controlledLocations.length; i++)
    {
      var star = player.controlledLocations[i];

      var data =
      {
        star: star,

        id: star.id,
        name: star.name,
        income: star.getIncome(),

        rowConstructor: EconomySummaryItem
      };

      rows.push(
      {
        key: "" + star.id,
        content: EconomySummaryItem(
        {
          star: star,
          id: star.id,
          name: star.name,
          income: star.getIncome()
        })
      });
    }

    var columns: ListColumn<EconomySummaryItemProps>[] =
    [
      {
        label: "Id",
        key: "id",
        defaultOrder: "asc"
      },
      {
        label: "Name",
        key: "name",
        defaultOrder: "asc"
      },
      {
        label: "Income",
        key: "income",
        defaultOrder: "desc"
      }
    ];

    return(
      React.DOM.div({className: "economy-summary-list fixed-table-parent"},
        List(
        {
          listItems: rows,
          initialColumns: columns,
          initialSortOrder: [columns[2]]
        })
      )
    );
  }
}

const Factory: React.Factory<PropTypes> = React.createFactory(EconomySummaryComponent);
export default Factory;
