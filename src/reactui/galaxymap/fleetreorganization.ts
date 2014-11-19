/// <reference path="fleetcontents.ts"/>

module Rance
{
  export module UIComponents
  {
    export var FleetReorganization = React.createClass(
    {

      getInitialState: function()
      {
        return(
        {
          currentDragUnit: null
        });
      },

      handleDragStart: function(unit)
      {
        this.setState(
        {
          currentDragUnit: unit
        });
      },

      handleDragEnd: function(dropSuccesful: boolean = false)
      {
        this.setState(
        {
          currentDragUnit: null
        });
      },

      handleDrop: function(fleet: Fleet)
      {
        var draggingUnit = this.state.currentDragUnit;
        if (draggingUnit)
        {
          var oldFleet = draggingUnit.fleet;
          
          oldFleet.transferShip(fleet, draggingUnit);
          eventManager.dispatchEvent("updateSelection", null);
        }

        this.handleDragEnd(true);
      },

      render: function()
      {
        var selectedFleets = this.props.fleets;
        if (!selectedFleets || selectedFleets.length < 1)
        {
          return null;
        }

        return(
          React.DOM.div(
          {
            className: "fleet-reorganization"
          },
            React.DOM.div(
            {
              className: "fleet-reorganization-header"
            }, "Reorganize fleets"),
            React.DOM.div(
            {
              className: "fleet-reorganization-subheader"
            },
              React.DOM.div(
              {
                className: "fleet-reorganization-subheader-fleet-name" +
                  " fleet-reorganization-subheader-fleet-name-left",
              }, selectedFleets[0].name),
              React.DOM.div(
              {
                className: "fleet-reorganization-subheader-center"
              }, "<->"),
              React.DOM.div(
              {
                className: "fleet-reorganization-subheader-fleet-name" +
                  " fleet-reorganization-subheader-fleet-name-right",
              }, selectedFleets[1].name)
            ),
            React.DOM.div(
            {
              className: "fleet-reorganization-contents"
            },
              UIComponents.FleetContents(
              {
                fleet: selectedFleets[0],

                onMouseUp: this.handleDrop,

                onDragStart: this.handleDragStart,
                onDragEnd: this.handleDragEnd
              }),
              React.DOM.div(
              {
                className: "fleet-reorganization-contents-divider"
              }, "-"),
              UIComponents.FleetContents(
              {
                fleet: selectedFleets[1],

                onMouseUp: this.handleDrop,

                onDragStart: this.handleDragStart,
                onDragEnd: this.handleDragEnd
              })
            ),
            React.DOM.div(
            {
              className: "fleet-reorganization-footer"
            },
              React.DOM.button(
              {
                className: "close-reorganization",
                onClick: this.props.closeReorganization
              }, "Close")
            )
          )
        );
      }

    });
  }
}
