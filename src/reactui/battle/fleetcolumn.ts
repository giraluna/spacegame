/// <reference path="../unit/unit.ts"/>
/// <reference path="../unit/emptyunit.ts"/>

/// <reference path="../unit/unitwrapper.ts"/>

module Rance
{
  export module UIComponents
  {
    export var FleetColumn = React.createClass(
    {
      displayName: "FleetColumn",
      render: function()
      {
        var column = this.props.column;

        var absoluteColumnPosition = this.props.columnPosInOwnFleet + (this.props.facesLeft ? 2 : 0);

        var units = [];

        for (var i = 0; i < column.length; i++)
        {
          var data: any = {};

          data.key = i;
          data.unit = column[i];
          data.position = [absoluteColumnPosition, i];
          data.facesLeft = this.props.facesLeft;
          data.activeUnit = this.props.activeUnit;
          data.activeTargets = this.props.activeTargets;
          data.hoveredUnit = this.props.hoveredUnit;
          data.handleMouseLeaveUnit = this.props.handleMouseLeaveUnit;
          data.handleMouseEnterUnit = this.props.handleMouseEnterUnit;
          data.targetsInPotentialArea = this.props.targetsInPotentialArea;

          data.onMouseUp = this.props.onMouseUp;

          data.isDraggable = this.props.isDraggable;
          data.onDragStart = this.props.onDragStart;
          data.onDragEnd = this.props.onDragEnd;
          /*
          if (!data.unit)
          {
            units.push(UIComponents.EmptyUnit(data));
          }
          else
          {
            units.push(UIComponents.Unit(data));
          }*/

          units.push(UIComponents.UnitWrapper(data));
        }

        return(
          React.DOM.div({className: "battle-fleet-column"},
            units
          )
        );
      }
    });
  }
}