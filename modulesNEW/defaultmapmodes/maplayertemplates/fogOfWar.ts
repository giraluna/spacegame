/// <reference path="../../../lib/pixi.d.ts" />
import GalaxyMap from "../../../src/GalaxyMap.ts"; // TODO refactor | autogenerated


const fogOfWar: MapRendererLayerTemplate =
{
  key: "fogOfWar",
  displayName: "Fog of war",
  interactive: false,
  alpha: 0.35,
  drawingFunction: function(map: GalaxyMap)
  {
    var doc = new PIXI.Container();
    if (!this.player) return doc;
    var points: Star[] = this.player.getRevealedButNotVisibleStars();

    if (!points || points.length < 1) return doc;

    for (var i = 0; i < points.length; i++)
    {
      var star = points[i];
      var sprite = this.getFowSpriteForStar(star);

      doc.addChild(sprite);
    }

    return doc;
  }
}