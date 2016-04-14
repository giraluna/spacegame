/// <reference path="../../../lib/react-0.13.3.d.ts" />
import * as React from "react";

import ListColumn from "./ListColumn"; // TODO refactor | autogenerated
import Item from "../../Item";
import AbilityBase from "../../templateinterfaces/AbilityBase";
import Unit from "../../Unit";

interface PropTypes extends React.Props<any>
{
  onDragEnd: (dropSuccesful?: boolean) => void;
  item: Item;
  onDragStart: (item: Item) => void;
  ability: AbilityBase;
  abilityIsPassive: boolean;
  isDraggable: boolean;
  isReserved: boolean;
  isSelected: boolean;
  activeColumns: ListColumn[];
  keyTODO: number;
  handleClick: () => void;
  
  cost: number;
  techLevel: number;
  unit: Unit;
  unitName: string;
  slot: string;
  slotIndex: number;
  id: number; // item id
}

interface StateType
{
  clone?: HTMLImageElement;
  dragging?: boolean;
}

export class ItemListItemComponent extends React.Component<PropTypes, StateType>
{
  displayName: string = "ItemListItem";
  // mixins = [Draggable];

  state: StateType;

  constructor(props: PropTypes)
  {
    super(props);
    
    this.bindMethods();
  }
  private bindMethods()
  {
    this.onDragEnd = this.onDragEnd.bind(this);
    this.onDragStart = this.onDragStart.bind(this);
    this.makeDragClone = this.makeDragClone.bind(this);
    this.makeCell = this.makeCell.bind(this);    
  }
  
  onDragStart()
  {
    console.log("onDragStart", this.props.item.template.displayName);
    this.props.onDragStart(this.props.item);
  }
  onDragEnd()
  {
    this.props.onDragEnd();
  }

  makeCell(type: string)
  {
    var cellProps: React.HTMLAttributes = {};
    cellProps.key = type;
    cellProps.className = "item-list-item-cell" + " item-list-" + type;

    var cellContent: string | number;

    switch (type)
    {
      case "abilityName":
      {
        if (this.props.ability)
        {
          cellProps.title = this.props.ability.description;
          if (this.props.abilityIsPassive)
          {
            cellProps.className += " passive-skill";
          }
        }
      }
      default:
      {
        cellContent = this.props[type];
        if (isFinite(<number>cellContent))
        {
          cellProps.className += " center-text"
        }

        break;
      }
    }

    return(
      React.DOM.td(cellProps, cellContent)
    );
  }

  makeDragClone()
  {
    var clone = new Image();
    clone.src = this.props.item.template.icon;
    clone.className = "item-icon-base draggable dragging";

    return clone;
  }

  render()
  {
    var item = this.props.item;
    var columns = this.props.activeColumns;

    if (this.state.dragging && this.state.clone)
    {
      this.state.clone.style.left = "" + this.dragPos.left + "px";
      this.state.clone.style.top = "" + this.dragPos.top + "px";
    }

    var cells: React.ReactElement<any>[] = [];

    for (var i = 0; i < columns.length; i++)
    {
      var cell = this.makeCell(columns[i].key);

      cells.push(cell);
    }

    var rowProps: React.HTMLAttributes =
    {
      className: "item-list-item",
      onClick : this.props.handleClick,
      key: this.props.keyTODO/*TODO react*/
    };
    
    if (this.props.isDraggable)
    {
      rowProps.className += " draggable";
      rowProps.onTouchStart = rowProps.onMouseDown =
        this.handleMouseDown;
    }

    if (this.props.isSelected)
    {
      rowProps.className += " selected-item";
    };

    if (this.props.isReserved)
    {
      rowProps.className += " reserved-item";
    }



    return(
      React.DOM.tr(rowProps,
        cells
      )
    );
  }
}

const Factory: React.Factory<PropTypes> = React.createFactory(ItemListItemComponent);
export default Factory;
