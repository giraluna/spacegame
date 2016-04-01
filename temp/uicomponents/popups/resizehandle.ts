/// <reference path="../mixins/draggable.ts" />

export interface PropTypes
{
  // TODO refactor | add prop types
}

export default class PopupResizeHandle extends React.Component<PropTypes, {}>
{
  displayName: reactTypeTODO_any = "PopupResizeHandle";
  mixins: reactTypeTODO_any = [Draggable];

  // originBottom: reactTypeTODO_any = undefined;
  // originRight: reactTypeTODO_any = undefined;

  // onDragStart: function()
  // {
  //   var rect = this.getDOMNode().getBoundingClientRect();
  //   this.originBottom = rect.bottom;
  //   this.originRight = rect.right;
  // }

  onDragMove: function(x: number, y: number)
  {
    var rect = this.getDOMNode().getBoundingClientRect();
    this.props.handleResize(x + rect.width, y + rect.height);
  }

  render: function()
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
