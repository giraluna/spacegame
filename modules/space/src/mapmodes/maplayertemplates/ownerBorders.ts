import * as PIXI from "pixi.js";

import {Player} from "core/src/player/Player";
import {getRevealedBorderEdges, borderWidth} from "core/src/maprenderer/borderPolygon";
import {MapRendererLayerTemplate} from "core/src/templateinterfaces/MapRendererLayerTemplate";

import
{
  makePolygonFromPoints,
} from "core/src/graphics/pixiWrapperFunctions";
import { localize } from "modules/space/localization/localize";


export const ownerBorders: MapRendererLayerTemplate =
{
  key: "ownerBorders",
  get displayName()
  {
    return localize("ownerBorders_displayName").toString();
  },
  interactive: false,
  isUsedForCameraBounds: true,
  initialAlpha: 0.7,
  drawingFunction: (map, perspectivePlayer) =>
  {
    const doc = new PIXI.Container();
    if (borderWidth <= 0)
    {
      return doc;
    }

    const revealedStars = perspectivePlayer.getRevealedStars();
    const borderEdges = getRevealedBorderEdges(revealedStars, map.voronoi);

    for (let i = 0; i < borderEdges.length; i++)
    {
      const gfx = new PIXI.Graphics();
      doc.addChild(gfx);
      const polyLineData = borderEdges[i];
      const player: Player = polyLineData.points[0].star.owner;
      gfx.lineStyle(borderWidth, player.secondaryColor.getHex(), 1);

      if (polyLineData.isClosed)
      {
        polyLineData.points.push(polyLineData.points[0]);
      }

      const polygon = makePolygonFromPoints(polyLineData.points);
      polygon.closeStroke = polyLineData.isClosed;
      gfx.drawShape(polygon);
    }

    return doc;
  },
};
