import * as React from "react";
import * as ReactDOMElements from "react-dom-factories";

import {DragPositioner, DragPositionerProps} from "../mixins/DragPositioner";
import {applyMixins} from "../mixins/applyMixins";

import {Item} from "core/src/items/Item";
import * as debug from "core/src/app/debug";

import {localize} from "../../../localization/localize";
import { getAssetSrc } from "modules/defaultui/assets/assets";


export interface PropTypes extends React.Props<any>
{
  item: Item;
  slot: string;

  isDraggable: boolean;
  onDragEnd?: (dropSuccessful?: boolean) => void;
  onDragStart?: (item: Item) => void;
  dragPositionerProps?: DragPositionerProps;
}

interface StateType
{
}

export class UnitItemComponent extends React.Component<PropTypes, StateType>
{
  public displayName = "UnitItem";
  public state: StateType;

  dragPositioner: DragPositioner<UnitItemComponent>;
  private readonly ownDOMNode = React.createRef<HTMLDivElement>();

  constructor(props: PropTypes)
  {
    super(props);

    this.bindMethods();


    this.dragPositioner = new DragPositioner(this, this.ownDOMNode, this.props.dragPositionerProps);
    this.dragPositioner.onDragStart = this.onDragStart;
    this.dragPositioner.onDragEnd = this.onDragEnd;
    applyMixins(this, this.dragPositioner);
  }
  private bindMethods()
  {
    this.onDragEnd = this.onDragEnd.bind(this);
    this.getTechIcon = this.getTechIcon.bind(this);
    this.onDragStart = this.onDragStart.bind(this);
  }

  onDragStart()
  {
    debug.log("ui", `Start item drag ´${this.props.item.template.displayName}`);
    this.props.onDragStart(this.props.item);
  }
  onDragEnd()
  {
    debug.log("ui", `End item drag ´${this.props.item.template.displayName}`);
    this.props.onDragEnd();
  }
  getTechIcon(techLevel: number)
  {
    switch (techLevel)
    {
      case 2:
      {
        return getAssetSrc("tech2Icon");
      }
      case 3:
      {
        return getAssetSrc("tech3Icon");
      }
      default:
      {
        throw new Error(`Couldn't find icon for item tech level ${techLevel}`);
      }
    }
  }

  render()
  {
    if (!this.props.item)
    {
      return ReactDOMElements.div(
      {
        className: "empty-unit-item",
        title: localize("itemSlot").format(this.props.slot),
        ref: this.ownDOMNode,
      });
    }

    const item = this.props.item;

    const divProps: React.HTMLAttributes<HTMLDivElement> & React.ClassAttributes<HTMLDivElement> =
    {
      className: "unit-item",
      title: item.template.displayName,
      ref: this.ownDOMNode,
    };

    if (this.props.isDraggable)
    {
      divProps.className += " draggable";
      divProps.onMouseDown = divProps.onTouchStart =
        this.dragPositioner.handleReactDownEvent;

      if (this.dragPositioner.isDragging)
      {
        divProps.style = this.dragPositioner.getStyleAttributes();
        divProps.className += " dragging";
      }
    }


    return(
      ReactDOMElements.div(divProps,
        ReactDOMElements.div(
        {
          className: "item-icon-container",
        },
          ReactDOMElements.img(
          {
            className: "item-icon-base",
            src: item.template.getIconSrc(),
          }),
          item.template.techLevel > 1 ? ReactDOMElements.img(
          {
            className: "item-icon-tech-level",
            src: this.getTechIcon(item.template.techLevel),
          }) : null,
        ),
      )
    );
  }
}

export const UnitItem: React.Factory<PropTypes> = React.createFactory(UnitItemComponent);