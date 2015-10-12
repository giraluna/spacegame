/// <reference path="../../../src/templateinterfaces/iobjectivetemplate.d.ts" />

/// <reference path="aiutils.ts" />

module Rance
{
  export module Modules
  {
    export module DefaultModule
    {
      export module Objectives
      {
        export var expandManufactoryCapacity: Rance.Templates.IObjectiveTemplate =
        {
          key: "expandManufactoryCapacity",
          creatorFunction: function(grandStrategyAI: MapAI.GrandStrategyAI,
            mapEvaluator: MapAI.MapEvaluator, objectivesAI: MapAI.ObjectivesAI)
          {
            // TODO economy ai
            // base priority = manufacturing demand / manufacturing capacity

            var template = Rance.Modules.DefaultModule.Objectives.expandManufactoryCapacity;
            return [new MapAI.Objective(template, 0.5, null)];
          },
          economyRoutineFN: function(objective: MapAI.Objective, economyAI: MapAI.EconomyAI)
          {
            // TODO economy ai
            var costByStar:
            {
              star: Star;
              cost: number;
            }[] = [];

            var player: Player = economyAI.player;
            var stars = player.controlledLocations;

            if (player.money < 1200) return;

            for (var i = 0; i < stars.length; i++)
            {
              var star = stars[i];
              var fullyExpanded = star.manufactory && star.manufactory.capacity >= star.manufactory.maxCapacity;
              if (fullyExpanded) continue;
              
              var expansionCost: number;
              if (!star.manufactory) expansionCost = manufactoryData.buildCost;
              else
              {
                expansionCost = star.manufactory.getCapacityUpgradeCost();
              }

              costByStar.push(
              {
                star: star,
                cost: expansionCost
              });
            }

            if (costByStar.length === 0) return;

            costByStar.sort(function(a, b)
            {
              return a.cost - b.cost;
            });

            var star = costByStar[0].star;
            var cost = costByStar[0].cost;
            if (player.money < cost * 1.1)
            {
              return;
            }
            if (star.manufactory)
            {
              star.manufactory.upgradeCapacity(1);
            }
            else
            {
              star.buildManufactory();
              player.money -= manufactoryData.buildCost;
            }
          }
        }
      }
    }
  }
}
