/// <reference path="fleetselection.ts"/>
/// <reference path="fleetreorganization.ts"/>
/// <reference path="starinfo.ts"/>
/// <reference path="possibleactions.ts"/>

module Rance
{
  export module UIComponents
  {
    export var GalaxyMapUI = React.createClass({

      getInitialState: function()
      {
        var pc = this.props.playerControl;

        return(
        {
          selectedFleets: pc.selectedFleets,
          currentlyReorganizing: pc.currentlyReorganizing,
          selectedStar: pc.selectedStar,
          attackTargets: pc.currentAttackTargets
        });
      },

      updateSelection: function()
      {
        var pc = this.props.playerControl;

        this.setState(
        {
          selectedFleets: pc.selectedFleets,
          currentlyReorganizing: pc.currentlyReorganizing,
          selectedStar: pc.selectedStar,
          attackTargets: pc.currentAttackTargets
        });
      },

      closeReorganization: function()
      {
        eventManager.dispatchEvent("endReorganizingFleets");
        this.updateSelection();
      },

      render: function()
      {
        return(
          React.DOM.div(
          {
            className: "galaxy-map-ui"
          },
            React.DOM.div(
            {
              className: "fleet-selection-container"
            },
              UIComponents.FleetSelection(
              {
                selectedFleets: this.state.selectedFleets
              }),
              UIComponents.FleetReorganization(
              {
                fleets: this.state.currentlyReorganizing,
                closeReorganization: this.closeReorganization
              })
            ),

            UIComponents.PossibleActions(
            {
              attackTargets: this.state.attackTargets
            }),
            
            UIComponents.StarInfo(
            {
              selectedStar: this.state.selectedStar
            })
          )
        );
      },

      componentWillMount: function()
      {
        eventManager.addEventListener("updateSelection", this.updateSelection);
      },
      componentWillUnmount: function()
      {
        eventManager.removeEventListener("updateSelection", this.updateSelection);
      }
    });
  }
}
