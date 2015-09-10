/// <reference path="unitstrength.ts"/>

module Rance
{
  export module UIComponents
  {
    export var UnitActions = React.createClass(
    {
      displayName: "UnitActions",
      render: function()
      {
        var availableSrc = "img\/icons\/availableAction.png";
        var hoveredSrc = "img\/icons\/spentAction.png";
        var spentSrc = "img\/icons\/spentAction.png";

        var icons: ReactDOMPlaceHolder[] = [];

        var availableCount = this.props.currentActionPoints - this.props.hoveredActionPointExpenditure;
        for (var i = 0; i < availableCount; i++)
        {
          icons.push(React.DOM.img(
            {
              src: availableSrc,
              className: "unit-action-point available-action-point",
              key: "available" + i
            }
          ));
        }

        var hoveredCount = Math.min(this.props.hoveredActionPointExpenditure, this.props.currentActionPoints);

        for (var i = 0; i < hoveredCount; i++)
        {
          icons.push(React.DOM.img(
            {
              src: hoveredSrc,
              className: "unit-action-point hovered-action-point",
              key: "hovered" + i
            }
          ));
        }

        var spentCount = this.props.maxActionPoints - this.props.currentActionPoints;
        for (var i = 0; i < spentCount; i++)
        {
          icons.push(React.DOM.img(
            {
              src: spentSrc,
              className: "unit-action-point spent-action-point",
              key: "spent" + i
            }
          ));
        }

        return(
          React.DOM.div({className: "unit-action-points"},
            icons
          )
        );
      }
    });
  }
}