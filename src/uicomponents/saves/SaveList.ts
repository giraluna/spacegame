/// <reference path="../../../lib/react-0.13.3.d.ts" />
import ListColumn from "../unitlist/ListColumn"; // TODO refactor | autogenerated
import ListItem from "../unitlist/ListItem"; // TODO refactor | autogenerated
import * as React from "react";

/// <reference path="savelistitem.ts"/>


import SaveListItem from "./SaveListItem";
import List from "../unitlist/List";


interface PropTypes extends React.Props<any>
{
  onRowChange: any; // TODO refactor | define prop type 123
  saveKeysToDelete: any; // TODO refactor | define prop type 123
  selectedKey: any; // TODO refactor | define prop type 123
  autoSelect: any; // TODO refactor | define prop type 123
  allowDelete: any; // TODO refactor | define prop type 123
  onUndoDelete: any; // TODO refactor | define prop type 123
  onDelete: any; // TODO refactor | define prop type 123
}

interface StateType
{
}

export class SaveListComponent extends React.Component<PropTypes, StateType>
{
  displayName: string = "SaveList";
  state: StateType;

  constructor(props: PropTypes)
  {
    super(props);
  }
  
  render()
  {
    var rows: ListItem[] = [];
    var selected: ListItem;

    var allKeys = Object.keys(localStorage);

    var saveKeys = allKeys.filter(function(key)
    {
      return (key.indexOf("Save") > -1);
    });

    for (var i = 0; i < saveKeys.length; i++)
    {
      var saveData = JSON.parse(localStorage.getItem(saveKeys[i]));
      var date = new Date(saveData.date);
      var isMarkedForDeletion = false;
      if (this.props.saveKeysToDelete)
      {
        if (this.props.saveKeysToDelete.indexOf(saveKeys[i]) !== -1)
        {
          isMarkedForDeletion = true;
        }
      }

      var row: ListItem =
      {
        key: saveKeys[i],
        data:
        {
          storageKey: saveKeys[i],
          name: saveData.name,
          date: prettifyDate(date),
          accurateDate: saveData.date,
          rowConstructor: SaveListItem,
          isMarkedForDeletion: isMarkedForDeletion,
          handleDelete: this.props.onDelete ?
            this.props.onDelete.bind(null, saveKeys[i]) :
            null,
          handleUndoDelete: this.props.onUndoDelete ?
            this.props.onUndoDelete.bind(null, saveKeys[i]) :
            null
        }
      };

      rows.push(row);
      if (this.props.selectedKey === saveKeys[i])
      {
        selected = row;
      }
    }

    var columns: ListColumn[] =
    [
      {
        label: "Name",
        key: "name",
        defaultOrder: "asc"
      },
      {
        label: "Date",
        key: "date",
        defaultOrder: "desc",
        propToSortBy: "accurateDate"
      }
    ];

    if (this.props.allowDelete)
    {
      columns.push(
      {
        label: "Del",
        key: "delete",
        notSortable: true
      });
    }

    return(
      React.DOM.div({className: "save-list fixed-table-parent"},
        List(
        {
          listItems: rows,
          initialColumns: columns,
          initialSortOrder: [columns[1]], //date
          onRowChange: this.props.onRowChange,
          autoSelect: selected ? false : this.props.autoSelect,
          initialSelected: selected,
          keyboardSelect: true,
          addSpacer: true
        })
      )
    );
  }
}

const Factory: React.Factory<PropTypes> = React.createFactory(SaveListComponent);
export default Factory;
