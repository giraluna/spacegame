import ObjectivesAI from "../../../src/mapai/ObjectivesAI.ts";
import GrandStrategyAI from "../../../src/mapai/GrandStrategyAI.ts";
import MapEvaluator from "../../../src/mapai/MapEvaluator.ts";
import Player from "../../../src/Player.ts";
import ObjectiveTemplate from "../../../src/templateinterfaces/ObjectiveTemplate.d.ts";
import Objective from "../../../src/mapai/Objective.ts";
import Fleet from "../../../src/Fleet.ts";
import Front from "../../../src/mapai/Front.ts";
import Star from "../../../src/Star.ts";
import Unit from "../../../src/Unit.ts";
import DiplomacyState from "../../../src/DiplomacyState.ts";
import
{
  clamp,
  getRelativeValue
} from "../../../src/utility.ts";
export interface ScoresByStar
{
  [starId: number]:
  {
    star: Star;
    score: number;
  }
}
export function moveToRoutine(front: Front,
  afterMoveCallback: Function, getMoveTargetFN?: (fleet: Fleet) => Star)
{
  var fleets = front.getAssociatedFleets();

  if (fleets.length <= 0)
  {
    afterMoveCallback();
    return;
  }

  var finishedMovingCount = 0;
  var finishFleetMoveFN = function()
  {
    finishedMovingCount++;
    if (finishedMovingCount >= fleets.length)
    {
      afterMoveCallback();
    }
  };

  for (var i = 0; i < fleets.length; i++)
  {
    var moveTarget: Star = getMoveTargetFN ? getMoveTargetFN(fleets[i]) : front.objective.target;
    fleets[i].pathFind(moveTarget, null, finishFleetMoveFN);
  }
}
export function independentTargetFilter(target: any)
{
  return target.enemy.isIndependent;
}
export function buildingControllerFilter(target: any)
{
  return target.building && target.enemy === target.building.controller;
}
export function musterAndAttackRoutine(targetFilter: (target: any) => boolean,
  front: Front, afterMoveCallback: () => void)
{
  var shouldMoveToTarget: boolean;

  var unitsByLocation = front.getUnitsByLocation();
  var fleets = front.getAssociatedFleets();

  var atMuster = unitsByLocation[front.musterLocation.id] ? 
    unitsByLocation[front.musterLocation.id].length : 0;


  var inRangeOfTarget = 0;

  for (var i = 0; i < fleets.length; i++)
  {
    var distance = fleets[i].location.getDistanceToStar(front.targetLocation);
    if (fleets[i].getMinCurrentMovePoints() >= distance)
    {
      inRangeOfTarget += fleets[i].units.length;
    }
  }


  if (front.hasMustered)
  {
    shouldMoveToTarget = true;
  }
  else
  {

    if (atMuster >= front.minUnitsDesired || inRangeOfTarget >= front.minUnitsDesired)
    {
      front.hasMustered = true;
      shouldMoveToTarget = true;
    }
    else
    {
      shouldMoveToTarget = false;
    }

  }

  var moveTarget = shouldMoveToTarget ? front.targetLocation : front.musterLocation;


  var finishAllMoveFN = function()
  {
    unitsByLocation = front.getUnitsByLocation();
    var atTarget = unitsByLocation[front.targetLocation.id] ? 
      unitsByLocation[front.targetLocation.id].length : 0;

    if (atTarget >= front.minUnitsDesired)
    {
      var star = front.targetLocation;
      var player = front.units[0].fleet.player;

      var attackTargets = star.getTargetsForPlayer(player);

      var target = attackTargets.filter(targetFilter)[0];

      player.attackTarget(star, target, afterMoveCallback);
    }
    else
    {
      afterMoveCallback();
    }
  }

  var finishedMovingCount = 0;
  var finishFleetMoveFN = function()
  {
    finishedMovingCount++;
    if (finishedMovingCount >= fleets.length)
    {
      finishAllMoveFN();
    }
  };

  for (var i = 0; i < fleets.length; i++)
  {
    fleets[i].pathFind(moveTarget, null, finishFleetMoveFN);
  }
}
export function defaultUnitDesireFN(front: Front)
{
  var desire = 1;

  // lower desire if front requirements already met
  // more important fronts get priority but dont hog units
  var unitsOverMinimum = front.units.length - front.minUnitsDesired;
  var unitsOverIdeal = front.units.length - front.idealUnitsDesired;
  var unitsUnderMinimum = front.minUnitsDesired - front.units.length;
  if (unitsOverMinimum > 0)
  {
    desire *= 0.85 / unitsOverMinimum;
  }
  if (unitsOverIdeal > 0)
  {
    desire *= 0.6 / unitsOverIdeal;
  }

  // penalize initial units for front
  // inertia at beginning of adding units to front
  // so ai prioritizes fully formed fronts to incomplete ones
  if (unitsUnderMinimum > 0)
  {
    var intertiaPerMissingUnit = 0.5 / front.minUnitsDesired;
    var newUnitInertia = intertiaPerMissingUnit * (unitsUnderMinimum - 1);
    desire *= 1 - newUnitInertia;
  }

  return desire;
}
export function defaultUnitFitFN(unit: Unit, front: Front, lowHealthThreshhold: number = 0.75,
  healthAdjust: number = 1, distanceAdjust: number = 1)
{
  var score = 1;

  // penalize units on low health
  var healthPercentage = unit.currentHealth / unit.maxHealth;
  
  if (healthPercentage < lowHealthThreshhold)
  {
    score *= healthPercentage * healthAdjust;
  }

  // prioritize units closer to front target
  var turnsToReach = unit.getTurnsToReachStar(front.targetLocation);
  if (turnsToReach > 0)
  {
    turnsToReach *= distanceAdjust;
    var distanceMultiplier = 1 / (Math.log(turnsToReach + 2.5) / Math.log(2.5));
    score *= distanceMultiplier;
  }

  return score;
}
export function scoutingUnitDesireFN(front: Front)
{
  if (front.units.length < 1) return 1;
  else return 0;
}
export function scoutingUnitFitFN(unit: Unit, front: Front)
{
  var baseScore = 0;
  // ++ stealth
  var isStealthy = unit.isStealthy();
  if (isStealthy) baseScore += 0.2;
  // ++ vision
  var visionRange = unit.getVisionRange();
  if (visionRange <= 0)
  {
    return -1;
  }
  else
  {
    baseScore += Math.pow(visionRange, 1.5) / 2;
  }

  // -- strength
  var strength = unit.getStrengthEvaluation();
  baseScore -= strength / 1000;
  // -- cost
  var cost = unit.getTotalCost();
  baseScore -= cost / 1000;

  var score = baseScore * defaultUnitFitFN(unit, front, -1, 0, 2);

  return clamp(score, 0, 1);
}
export function mergeScoresByStar(merged: ScoresByStar, scores: {star: Star; score: number;}[])
{
  for (var i = 0; i < scores.length; i++)
  {
    var star = scores[i].star;
    if (!merged[star.id])
    {
      merged[star.id] = scores[i];
    }
    else
    {
      merged[star.id].score += scores[i].score;
    }
  }

  return merged;
}
export function makeObjectivesFromScores(template: ObjectiveTemplate,
  evaluationScores: {star?: Star; player?: Player; score: number;}[], basePriority: number)
{
  var allObjectives: Objective[] = [];

  var minScore: number = 0;
  var maxScore: number;

  for (var i = 0; i < evaluationScores.length; i++)
  {
    var score = evaluationScores[i].score;
    maxScore = isFinite(maxScore) ? Math.max(maxScore, score) : score;
  }

  for (var i = 0; i < evaluationScores.length; i++)
  {
    var star = evaluationScores[i].star || null;
    var player = evaluationScores[i].player || null;
    if (score < 0.04) continue;
    var relativeScore = getRelativeValue(evaluationScores[i].score, minScore, maxScore);
    var priority = relativeScore * basePriority;

    allObjectives.push(new Objective(template, priority, star, player));
  }

  return allObjectives;
}
export function perimeterObjectiveCreation(template: ObjectiveTemplate, isForScouting: boolean,
  basePriority: number, grandStrategyAI: GrandStrategyAI, mapEvaluator: MapEvaluator,
  objectivesAI: ObjectivesAI)
{
  var playersToEstablishPerimeterAgainst: Player[] = [];
  var diplomacyStatus = mapEvaluator.player.diplomacyStatus;
  var statusByPlayer = diplomacyStatus.statusByPlayer;
  for (var playerId in statusByPlayer)
  {
    if (statusByPlayer[playerId] >= DiplomacyState.war)
    {
      playersToEstablishPerimeterAgainst.push(diplomacyStatus.metPlayers[playerId]);
    }
  }

  var allScoresByStar: ScoresByStar = {};
  for (var i = 0; i < playersToEstablishPerimeterAgainst.length; i++)
  {
    var player = playersToEstablishPerimeterAgainst[i];
    var scores = mapEvaluator.getScoredPerimeterLocationsAgainstPlayer(player, 1, isForScouting);

    mergeScoresByStar(allScoresByStar, scores);
  }

  var allScores:
  {
    star: Star;
    score: number;
  }[] = [];
  for (var starId in allScoresByStar)
  {
    if (allScoresByStar[starId].score > 0.04)
    {
      allScores.push(allScoresByStar[starId]);
    }
  }

  var objectives: Objective[] = makeObjectivesFromScores(template, allScores, basePriority);


  return objectives;
}
export function getUnitsToBeatImmediateTarget(mapEvaluator: MapEvaluator,
  objective: Objective)
{
  var min: number;
  var ideal: number;
  var star = objective.target;
  var hostileUnits = mapEvaluator.getHostileUnitsAtStar(star).all;

  if (hostileUnits.length <= 1)
  {
    min = hostileUnits.length + 1;
    ideal = hostileUnits.length + 1;
  }
  else
  {
    min = Math.min(hostileUnits.length + 2, 6);
    ideal = 6;
  }

  return(
  {
    min: min,
    ideal: ideal
  });
}
