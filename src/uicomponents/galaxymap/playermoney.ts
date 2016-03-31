/// <reference path="../../player.ts" />

namespace Rance
{
  export namespace UIComponents
  {
    export var PlayerMoney = React.createFactory(React.createClass(
    {
      displayName: "PlayerMoney",
      lastAmountRendered: undefined,

      propTypes:
      {
        player: React.PropTypes.instanceOf(Player)
      },

      componentDidMount: function()
      {
        eventManager.addEventListener("playerMoneyUpdated", this.handlePlayerMoneyUpdated);
      },

      componentWillUnmount: function()
      {
        eventManager.removeEventListener("playerMoneyUpdated", this.handlePlayerMoneyUpdated);
      },

      handlePlayerMoneyUpdated: function()
      {
        if (this.props.player.money !== this.lastAmountRendered)
        {
          this.forceUpdate();
        }
      },

      render: function()
      {
        this.lastAmountRendered = this.props.player.money;

        return(
          React.DOM.div(
          {
            className: "player-money"
          },
            "Money: " + this.props.player.money
          )
        );
      }
    }));
  }
}
