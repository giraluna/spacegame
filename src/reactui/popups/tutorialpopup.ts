module Rance
{
  export module UIComponents
  {
    export var TutorialPopup = React.createClass(
    {
      displayName: "TutorialPopup",

      getInitialState: function()
      {
        return(
        {
          currentPage: 0
        });
      },

      flipPage: function(amount: number)
      {
        var lastPage = this.props.pages.length - 1;
        var newPage = this.state.currentPage + amount;
        newPage = clamp(newPage, 0, lastPage);

        this.setState(
        {
          currentPage: newPage
        });
      },

      handleClose: function()
      {
        if (this.refs.dontShowAgain.getDOMNode().checked)
        {
          //do stuff
        }

        this.props.closePopup();
      },

      render: function()
      {
        var hasBackArrow = this.state.currentPage > 0;
        var backElement: ReactDOMPlaceHolder;
        if (hasBackArrow)
        {
          backElement = React.DOM.div(
          {
            className: "tutorial-popup-flip-page tutorial-popup-flip-page-back",
            onClick: this.flipPage.bind(this, -1)
          }, "<")
        }
        else
        {
          backElement = React.DOM.div(
          {
            className: "tutorial-popup-flip-page disabled"
          })
        }

        var hasForwardArrow = this.state.currentPage < this.props.pages.length - 1;
        var forwardElement: ReactDOMPlaceHolder;
        if (hasForwardArrow)
        {
          forwardElement = React.DOM.div(
          {
            className: "tutorial-popup-flip-page tutorial-popup-flip-page-forward",
            onClick: this.flipPage.bind(this, 1)
          }, ">")
        }
        else
        {
          forwardElement = React.DOM.div(
          {
            className: "tutorial-popup-flip-page disabled"
          })
        }

        return(
          React.DOM.div(
          {
            className: "tutorial-popup"
          },
            React.DOM.div(
            {
              className: "tutorial-popup-inner"
            },
              backElement,

              React.DOM.div(
              {
                className: "tutorial-popup-content"
              }, this.props.pages[this.state.currentPage]),

              forwardElement
            ),


            React.DOM.div(
            {
              className: "dont-show-again-wrapper"
            },
              React.DOM.label(null,
                React.DOM.input(
                {
                  type: "checkBox",
                  ref: "dontShowAgain",
                  className: "dont-show-again"
                }),
                "Disable tutorial"
              ),
              React.DOM.div(
              {
                className: "popup-buttons"
              },
                React.DOM.button(
                {
                  className: "popup-button",
                  onClick: this.handleClose
                }, this.props.cancelText || "Close")
              )
            )
          )
        );
      }
    });
  }
}