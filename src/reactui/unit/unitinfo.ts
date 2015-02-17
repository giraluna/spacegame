/// <reference path="unitstrength.ts"/>
/// <reference path="unitactions.ts"/>
/// <reference path="unitstatus.ts"/>

module Rance
{
  export module UIComponents
  {
    export var UnitInfo = React.createClass(
    {
      displayName: "UnitInfo",
      mixins: [React.addons.PureRenderMixin],
      render: function()
      {
        var battleEndStatus = null;
        if (this.props.isDead)
        {
          battleEndStatus = React.DOM.div(
          {
            className: "unit-battle-end-status unit-battle-end-status-dead"
          }, "Destroyed")
        }
        else if (this.props.isCaptured)
        {
          battleEndStatus = React.DOM.div(
          {
            className: "unit-battle-end-status unit-battle-end-status-captured"
          }, "Captured")
        }

        return(
          React.DOM.div({className: "unit-info"},
            React.DOM.div({className: "unit-info-name"},
              this.props.name
            ),
            React.DOM.div({className: "unit-info-inner"},
              UIComponents.UnitStatus(
              {
                guardAmount: this.props.guardAmount
              }),
              UIComponents.UnitStrength(
              {
                maxStrength: this.props.maxStrength,
                currentStrength: this.props.currentStrength,
                isSquadron: this.props.isSquadron,
                animateStrength: true
              }),
              UIComponents.UnitActions(
              {
                maxActionPoints: this.props.maxActionPoints,
                currentActionPoints: this.props.currentActionPoints
              }),
              battleEndStatus
            )
            
          )
        );
      }
    });
  }
}
