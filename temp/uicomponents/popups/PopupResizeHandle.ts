/// <reference path="../../../lib/react-0.13.3.d.ts" />
import * as React from "react";

/// <reference path="../mixins/draggable.ts" />

export interface PropTypes extends React.Props<any>
{
  handleResize: any; // TODO refactor | define prop type 123
}

interface StateType
{
}

export class PopupResizeHandleComponent extends React.Component<PropTypes, StateType>
{
  displayName: string = "PopupResizeHandle";
  mixins: reactTypeTODO_any = [Draggable];

  // originBottom: reactTypeTODO_any = undefined;
  // originRight: reactTypeTODO_any = undefined;

  state: StateType;

  constructor(props: PropTypes)
  {
    super(props);
    
    this.bindMethods();
  }
  private bindMethods()
  {
    this.onDragMove = this.onDragMove.bind(this);    
  }
  
  // onDragStart()
  // {
  //   var rect = React.findDOMNode(this).getBoundingClientRect();
  //   this.originBottom = rect.bottom;
  //   this.originRight = rect.right;
  // }

  onDragMove(x: number, y: number)
  {
    var rect = React.findDOMNode(this).getBoundingClientRect();
    this.props.handleResize(x + rect.width, y + rect.height);
  }

  render()
  {
    return(
      React.DOM.img(
      {
        className: "popup-resize-handle",
        src: "img\/icons\/resizeHandle.png",
        onTouchStart: this.handleMouseDown,
        onMouseDown: this.handleMouseDown
      })
    );
  }
}

const Factory: React.Factory<PropTypes> = React.createFactory(PopupResizeHandleComponent);
export default Factory;
