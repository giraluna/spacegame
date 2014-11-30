/// <reference path="attacktarget.ts"/>
/// <reference path="buildablebuildinglist.ts"/>
/// <reference path="buildableshipslist.ts"/>

module Rance
{
  export module UIComponents
  {
    export var PossibleActions = React.createClass({

      getInitialState: function()
      {
        return(
        {
          expandedAction: null
        });
      },

      componentWillReceiveProps: function(newProps: any)
      {
        if (this.props.selectedStar !== newProps.selectedStar &&
          this.state.expandedAction)
        {
          this.setState(
          {
            expandedAction: null
          });
        }
      },

      buildBuildings: function()
      {
        this.setState(
        {
          expandedAction: this.makeExpandedAction("buildBuildings")
        });
      },

      buildShips: function()
      {
        this.setState(
        {
          expandedAction: this.makeExpandedAction("buildShips")
        });
      },


      makeExpandedAction: function(action)
      {
        switch (action)
        {
          case "buildBuildings":
          {
            if (!this.props.selectedStar) return null;

            return(
              React.DOM.div(
              {
                className: "expanded-action"
              },
                UIComponents.BuildableBuildingList(
                {
                  player: this.props.player,
                  star: this.props.selectedStar
                })
              )
            );
          }
          case "buildShips":
          {
            if (!this.props.selectedStar) return null;

            return(
              React.DOM.div(
              {
                className: "expanded-action"
              },
                UIComponents.BuildableShipsList(
                {
                  player: this.props.player,
                  star: this.props.selectedStar
                })
              )
            );
          }
          default:
          {
            return null;
          }
        }
      },

      render: function()
      {
        var allActions = [];

        var attackTargets = this.props.attackTargets;
        if (attackTargets && attackTargets.length > 0)
        {
          var attackTargetComponents = [];
          for (var i = 0; i < attackTargets.length; i++)
          {
            var props: any =
            {
              key: i,
              attackTarget: attackTargets[i]
            };

            attackTargetComponents.push(UIComponents.AttackTarget(
              props
            ));
          }
          allActions.push(
            React.DOM.div(
            {
              className: "possible-action",
              key: "attackActions"
            },
              React.DOM.div({className: "possible-action-title"}, "attack"),
              attackTargetComponents
            )
          );
        }

        var star = this.props.selectedStar;
        if (star)
        {
          if (star.owner === this.props.player)
          {
            allActions.push(
              React.DOM.div(
              {
                className: "possible-action",
                onClick: this.buildShips,
                key: "buildShipActions"
              },
                "build ship"
              )
            );

            if (star.getBuildableBuildings().length > 0)
            {
              allActions.push(
                React.DOM.div(
                {
                  className: "possible-action",
                  onClick: this.buildBuildings,
                  key: "buildActions"
                },
                  "construct"
                )
              );
            }
          }
        }

        var possibleActions = React.DOM.div(
        {
          className: "possible-actions"
        },
          allActions
        );
        
        return(
          React.DOM.div(
          {
            className: "possible-actions-container"
          },
            allActions.length > 0 ?
              possibleActions :
              null,
            this.state.expandedAction
          )
        );
      }
    })
  }
}
