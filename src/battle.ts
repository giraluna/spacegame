/// <reference path="unit.ts"/>

module Rance
{
  export class Battle
  {
    unitsById:
    {
      [id: number]: Unit;
    } = {};
    unitsBySide:
    {
      [side: string] : Unit[];
    } =
    {
      side1: [],
      side2: []
    };
    side1: Unit[][];
    side2: Unit[][];

    turnOrder: Unit[] = [];
    activeUnit: Unit;

    maxTurns: number;
    turnsLeft: number;

    constructor(units:
    {
      side1: Unit[][];
      side2: Unit[][];
    })
    {
      var self = this;

      this.side1 = units.side1;
      this.side2 = units.side2;

      ["side1", "side2"].forEach(function(sideId)
      {
        var side = self[sideId];
        for (var i = 0; i < side.length; i++)
        {
          for (var j = 0; j < side[i].length; j++)
          {
            if (side[i][j] && side[i][j].id)
            {
              self.unitsById[side[i][j].id] = side[i][j];
              self.unitsBySide[sideId].push(side[i][j]);
            }
          }
        }
      });
    }
    init()
    {
      this.forEachUnit(this.initUnit);

      this.maxTurns = 24;
      this.turnsLeft = 15;
      this.updateTurnOrder();
      this.setActiveUnit();
    }
    forEachUnit(operator: (Unit) => any)
    {
      for (var id in this.unitsById)
      {
         operator.call(this, this.unitsById[id]);
      }
    }
    initUnit(unit: Unit)
    {
      unit.resetBattleStats();
      this.addUnitToTurnOrder(unit);
    }
    removeUnitFromTurnOrder(unit: Unit)
    {
      var unitIndex = this.turnOrder.indexOf(unit);
      if (unitIndex < 0) return false; //not in list

      this.turnOrder.splice(unitIndex, 1);
    }
    addUnitToTurnOrder(unit: Unit)
    {
      var unitIndex = this.turnOrder.indexOf(unit);
      if (unitIndex >= 0) return false; //already in list

      this.turnOrder.push(unit);
    }
    updateTurnOrder()
    {
      function turnOrderSortFunction(a: Unit, b: Unit)
      {
        if (a.battleStats.moveDelay !== b.battleStats.moveDelay)
        {
          return a.battleStats.moveDelay - b.battleStats.moveDelay;
        }
        else
        {
          return a.id - b.id;
        }
      }

      this.turnOrder.sort(turnOrderSortFunction);
    }
    setActiveUnit()
    {
      this.activeUnit = this.turnOrder[0];
    }
    endTurn()
    {
      this.turnsLeft--;
      this.updateTurnOrder();
      this.setActiveUnit();
    }
    getFleetsForSide(side: string)
    {
      switch (side)
      {
        case "all":
        {
          return this.side1.concat(this.side2);
        }
        case "side1":
        case "side2":
        {
          return this[side];
        }
      }
    }
  }
}
