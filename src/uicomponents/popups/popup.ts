/// <reference path="../mixins/draggable.ts" />
/// <reference path="resizehandle.ts" />

module Rance
{
  export module UIComponents
  {
    export var Popup = React.createClass(
    {
      displayName: "Popup",
      mixins: [Draggable],

      getInitialState: function()
      {
        return(
        {
          zIndex: -1
        });
      },

      componentDidMount: function()
      {
        this.setInitialPosition();
      },

      onMouseDown: function(e: MouseEvent)
      {
        this.handleMouseDown(e);
        this.setState(
        {
          zIndex: this.props.incrementZIndex()
        });
      },

      setInitialPosition: function()
      {
        var rect = this.getDOMNode().getBoundingClientRect();
        var left: number;
        var top: number;

        var container = this.containerElement; // set in draggable mixin
        if (this.props.initialPosition)
        {
          rect = extendObject(this.props.initialPosition, rect);

          if (rect.left || rect.top)
          {
            left = rect.left;
            top = rect.top;
          }
        }
        if (!left && !top)
        {
          var position = this.props.getInitialPosition(rect, container);
          
          left = position.left;
          top = position.top;
        }

        left = clamp(left, 0, container.offsetWidth - rect.width);
        top = clamp(top, 0, container.offsetHeight - rect.height);

        this.dragPos.top = top;
        this.dragPos.left = left;
        this.dragPos.width = (rect.width > window.innerWidth ? window.innerWidth : rect.width);
        this.dragPos.height = (rect.height > window.innerHeight ? window.innerHeight : rect.height);
        this.setState(
        {
          zIndex: this.props.incrementZIndex()
        });
      },

      handleResizeMove: function(x: number, y: number)
      {
        var minWidth = this.props.minWidth || 0;
        var maxWidth = this.props.maxWidth || window.innerWidth;
        var minHeight = this.props.minHeight || 0;
        var maxHeight = this.props.maxHeight || window.innerHeight;

        this.dragPos.width = clamp(x + 5 - this.dragPos.left, minWidth, maxWidth);
        this.dragPos.height = clamp(y + 5 - this.dragPos.top, minHeight, maxHeight);
        this.updateDOMNodeStyle();
        eventManager.dispatchEvent("popupResized");
      },

      render: function()
      {
        var divProps: any =
        {
          className: "popup draggable-container",
          onTouchStart: this.onMouseDown,
          onMouseDown: this.onMouseDown,
          style:
          {
            top: this.dragPos ? this.dragPos.top : 0,
            left: this.dragPos ? this.dragPos.left : 0,
            width: this.dragPos.width,
            height: this.dragPos.height,
            zIndex: this.state.zIndex,
            minWidth: this.props.minWidth,
            minHeight: this.props.minHeight
          }
        };

        if (this.state.dragging)
        {
          divProps.className += " dragging";
        }

        var contentProps = this.props.contentProps;

        contentProps.closePopup = this.props.closePopup

        var resizeHandle = !this.props.resizable ? null : UIComponents.PopupResizeHandle(
        {
          handleResize: this.handleResizeMove
        });

        return(
          React.DOM.div(divProps,
            this.props.contentConstructor(contentProps),
            resizeHandle
          )
        );
      }
    });
  }
}