/// <reference path="../../../src/templateinterfaces/iobjectivetemplate.d.ts" />

import GrandStrategyAI from "../../../src/mapai/GrandStrategyAI.d.ts"; // TODO refactor | autogenerated

import MapEvaluator from "../../../src/mapai/MapEvaluator.d.ts"; // TODO refactor | autogenerated

import ObjectiveTemplate from "../../../src/templateinterfaces/ObjectiveTemplate.d.ts"; // TODO refactor | autogenerated

import Objective from "../../../src/mapai/Objective.ts"; // TODO refactor | autogenerated

import Star from "../../../src/Star.ts"; // TODO refactor | autogenerated

import Unit from "../../../src/Unit.ts"; // TODO refactor | autogenerated



export var expansion: ObjectiveTemplate =
{
  key: "expansion",
  movePriority: 4,
  preferredUnitComposition:
  {
    combat: 0.65,
    defence: 0.25,
    utility: 0.1
  },
  moveRoutineFN: musterAndAttackRoutine.bind(null, independentTargetFilter),
  unitDesireFN: defaultUnitDesireFN,
  unitFitFN: defaultUnitFitFN,
  creatorFunction: function(grandStrategyAI: GrandStrategyAI,
    mapEvaluator: MapEvaluator)
  {
    var basePriority = grandStrategyAI.desireForExpansion;

    var independentNeighborStars = mapEvaluator.getIndependentNeighborStars();
    var evaluations = mapEvaluator.evaluateIndependentTargets(independentNeighborStars);
    var scores = mapEvaluator.scoreIndependentTargets(evaluations);

    var template = Modules.DefaultModule.Objectives.expansion;

    return makeObjectivesFromScores(template, scores, basePriority);
  },
  unitsToFillObjectiveFN: getUnitsToBeatImmediateTarget
}
