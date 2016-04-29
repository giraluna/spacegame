/// <reference path="../../../lib/pixi.d.ts" />

import Color from "../../../src/Color";
import Star from "../../../src/Star";
import MapRendererLayerTemplate from "../../../src/templateinterfaces/MapRendererLayerTemplate";
import GalaxyMap from "../../../src/GalaxyMap";
import MapEvaluator from "../../../src/mapai/MapEvaluator";
import Player from "../../../src/Player";

const playerInfluence: MapRendererLayerTemplate =
{
  key: "playerInfluence",
  displayName: "Influence",
  interactive: false,
  drawingFunction: function(map: GalaxyMap, perspectivePlayer: Player)
  {
    var doc = new PIXI.Container();
    var points: Star[];
    if (!perspectivePlayer)
    {
      points = map.stars;
    }
    else
    {
      points = perspectivePlayer.getRevealedStars();
    }
    var mapEvaluator = new MapEvaluator(map, perspectivePlayer);
    var influenceByStar = mapEvaluator.buildPlayerInfluenceMap(perspectivePlayer);

    var minInfluence: number, maxInfluence: number;

    for (let starId in influenceByStar)
    {
      var influence = influenceByStar[starId];
      if (!isFinite(minInfluence) || influence < minInfluence)
      {
        minInfluence = influence;
      }
      if (!isFinite(maxInfluence) || influence > maxInfluence)
      {
        maxInfluence = influence;
      }
    }

    function getRelativeValue(min: number, max: number, value: number)
    {
      var difference = max - min;
      if (difference < 1) difference = 1;
      // clamps to n different colors
      var threshhold = difference / 10;
      if (threshhold < 1) threshhold = 1;
      var relative = (Math.round(value/threshhold) * threshhold - min) / (difference);
      return relative;
    }

    var colorIndexes:
    {
      [value: number]: number;
    } = {};

    function getRelativeColor(min: number, max: number, value: number)
    {
      if (!colorIndexes[value])
      {
        if (value < 0) value = 0;
        else if (value > 1) value = 1;

        var deviation = Math.abs(0.5 - value) * 2;

        var hue = 110 * value;
        var saturation = 0.5 + 0.2 * deviation;
        var lightness = 0.6 + 0.25 * deviation;

        colorIndexes[value] = Color.fromHSL(hue / 360, saturation, lightness / 2).getHex();
      }
      return colorIndexes[value];
    }

    for (let i = 0; i < points.length; i++)
    {
      var star = points[i];
      var influence = influenceByStar[star.id];

      if (!influence) continue;

      var relativeInfluence = getRelativeValue(minInfluence, maxInfluence, influence);
      var color = getRelativeColor(minInfluence, maxInfluence, relativeInfluence);

      var poly = new PIXI.Polygon(<PIXI.Point[]> star.voronoiCell.vertices);
      var gfx = new PIXI.Graphics();
      gfx.beginFill(color, 0.6);
      gfx.drawShape(poly);
      gfx.endFill;
      doc.addChild(gfx);
    }
    return doc;
  }
}

export default playerInfluence;
