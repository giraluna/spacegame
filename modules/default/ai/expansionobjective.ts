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
        export var expansion: Rance.Templates.IObjectiveTemplate =
        {
          key: "expansion",
          movePriority: 4,
          preferredUnitComposition:
          {
            combat: 1,
            defence: 0.65,
            utility: 0.3
          },
          moveRoutineFN: AIUtils.musterAndAttackRoutine,
          unitDesireFN: AIUtils.defaultUnitDesireFN,
          unitFitFN: AIUtils.defaultUnitFitFN,
          creatorFunction: function(grandStrategyAI: MapAI.GrandStrategyAI,
            mapEvaluator: MapAI.MapEvaluator)
          {
            var basePriority = grandStrategyAI.desireForExpansion;

            var independentNeighborStars = mapEvaluator.getIndependentNeighborStars();
            var evaluations = mapEvaluator.evaluateIndependentTargets(independentNeighborStars);
            var scores = mapEvaluator.scoreIndependentTargets(evaluations);

            var template = Rance.Modules.DefaultModule.Objectives.expansion;

            return AIUtils.makeObjectivesFromScores(template, scores, basePriority);
          },
          unitsToFillObjectiveFN: AIUtils.getUnitsToFillIndependentObjective
        }
      }
    }
  }
}
