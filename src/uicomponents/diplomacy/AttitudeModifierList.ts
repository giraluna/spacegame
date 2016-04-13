/// <reference path="../../../lib/react-0.13.3.d.ts" />
import ListColumn from "../unitlist/ListColumn"; // TODO refactor | autogenerated
import ListItem from "../unitlist/ListItem"; // TODO refactor | autogenerated
import Personality from "../../Personality"; // TODO refactor | autogenerated
import * as React from "react";

/// <reference path="../mixins/autoposition.ts" />

import List from "../unitlist/List";
import AttitudeModifierInfo from "./AttitudeModifierInfo";
import AttitudeModifier from "../../AttitudeModifier";


interface PropTypes extends React.Props<any>
{
  attitudeModifiers: AttitudeModifier[];
  baseOpinion: number;
}

interface StateType
{
}

export class AttitudeModifierListComponent extends React.Component<PropTypes, StateType>
{
  displayName: string = "AttitudeModifierList";
  mixins: reactTypeTODO_any = [AutoPosition];

  state: StateType;

  constructor(props: PropTypes)
  {
    super(props);
  }
  
  render()
  {
    var modifiers = this.props.attitudeModifiers;
    var rows: ListItem[] = [];

    rows.push(
    {
      key: "baseOpinion",
      data:
      {
        name: "AI Personality",
        strength: this.props.baseOpinion,
        endTurn: -1,
        sortOrder: -1,

        rowConstructor: AttitudeModifierInfo
      }
    });

    for (var i = 0; i < modifiers.length; i++)
    {
      var modifier = modifiers[i];
      if (modifier.isOverRidden) continue;

      rows.push(
      {
        key: modifier.template.type,
        data:
        {
          name: modifier.template.displayName,
          strength: modifier.getAdjustedStrength(),
          endTurn: modifier.endTurn,
          sortOrder: 0,

          rowConstructor: AttitudeModifierInfo
        }
      });
    }


    var columns: ListColumn[] =
    [
      {
        label: "Name",
        key: "name",
        defaultOrder: "asc",
        propToSortBy: "sortOrder"
      },
      {
        label: "Effect",
        key: "strength",
        defaultOrder: "asc"
      },
      {
        label: "Ends on",
        key: "endTurn",
        defaultOrder: "desc"
      }
    ];

    return(
      React.DOM.div({className: "attitude-modifier-list auto-position fixed-table-parent"},
        List(
        {
          listItems: rows,
          initialColumns: columns,
          initialSortOrder: [columns[0], columns[1], columns[2]]
        })
      )
    );
  }
}

const Factory: React.Factory<PropTypes> = React.createFactory(AttitudeModifierListComponent);
export default Factory;
