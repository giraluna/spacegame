// TODO | remove this folder
/// <reference path="itempurchaselist.ts" />

namespace Rance
{
  export namespace UIComponents
  {
    export var BuyItems = React.createFactory(React.createClass(
    {
      displayName: "BuyItems",

      handleSelectRow: function(row: IListItem)
      {
        var template: Templates.IItemTemplate = row.data.item.template;
        var item = new Item(template);
        
        this.props.player.addItem(item);
        this.props.player.money -= template.buildCost;

        eventManager.dispatchEvent("playerControlUpdated");
      },

      render: function()
      {
        var player = this.props.player;
        var items = player.getGloballyBuildableItems();

        if (items.length < 1)
        {
          return(
            React.DOM.div({className: "buy-items"},
              "You need to construct an item manufactory first"
            )
          );
        }

        return(
          React.DOM.div({className: "buy-items"},
            UIComponents.ItemPurchaseList(
            {
              items: items,
              onRowChange: this.handleSelectRow,
              playerMoney: this.props.player.money
            })
          )
        );
      }
    }));
  }
}