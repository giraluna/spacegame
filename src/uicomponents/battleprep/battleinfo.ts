/// <reference path="../galaxymap/defencebuildinglist.ts"/>
/// <reference path="../playerflag.ts" />

namespace Rance
{
  export namespace UIComponents
  {
    export var BattleInfo = React.createFactory(React.createClass(
    {
      displayName: "BattleInfo",
      render: function()
      {
        var battlePrep = this.props.battlePrep;
        var star = battlePrep.battleData.location;
        var isAttacker = battlePrep.humanPlayer === battlePrep.attacker;

        return(
          React.DOM.div(
          {
            className: "battle-info"
          },
            React.DOM.div(
            {
              className: "battle-info-opponent"
            },
              UIComponents.PlayerFlag(
              {
                flag: battlePrep.enemyPlayer.flag,
                props:
                {
                  className: "battle-info-opponent-icon",
                }
              }),
              React.DOM.div(
              {
                className: "battle-info-opponent-name"
              },
                battlePrep.enemyPlayer.name
              )
            ),
            React.DOM.div(
            {
              className: "battle-info-summary"
            },
              star.name + ": " + (isAttacker ? "Attacking" : "Defending")
            ),
            UIComponents.DefenceBuildingList(
            {
              buildings: star.buildings["defence"],
              reverse: isAttacker
            })
          )
        );
      }
    }));
  }
}
