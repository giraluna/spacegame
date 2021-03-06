import * as PIXI from "pixi.js";

import {Color} from "core/src/color/Color";
import {MapRendererLayerTemplate} from "core/src/templateinterfaces/MapRendererLayerTemplate";

import
{
  makePolygonFromPoints,
} from "core/src/graphics/pixiWrapperFunctions";
import { clamp } from "core/src/generic/utility";
import { localize } from "modules/space/localization/localize";
import { getBaseValuablenessOfResources } from "core/src/player/PlayerResources";


export const starIncome: MapRendererLayerTemplate =
{
  key: "starIncome",
  get displayName()
  {
    return localize("starIncome_displayName").toString();
  },
  initialAlpha: 0.6,
  interactive: false,
  isUsedForCameraBounds: true,
  drawingFunction: (map, perspectivePlayer) =>
  {
    const doc = new PIXI.Container();
    const points = perspectivePlayer ? perspectivePlayer.getRevealedStars() : map.stars;
    const incomeBounds = map.getIncomeBounds();

    function getRelativeValueWithSteps(min: number, max: number, value: number, steps: number)
    {
      const difference = Math.max(max - min, 1);
      const threshhold = Math.max(difference / steps, 1);
      const relative = (Math.round(value/threshhold) * threshhold - min) / (difference);

      return relative;
    }

    const colorIndexes:
    {
      [value: number]: number;
    } = {};

    function getColorForRelativeValue(min: number, max: number, relativeValue: number)
    {
      const value = clamp(relativeValue, 0, 1);

      if (!colorIndexes[value])
      {
        const deviation = Math.abs(0.5 - value) * 2;

        const hue = 110 * value;
        const saturation = 0.5 + 0.2 * deviation;
        const lightness = 0.6 + 0.25 * deviation;

        colorIndexes[value] = Color.fromHSL(hue / 360, saturation, lightness / 2).getHex();
      }

      return colorIndexes[value];
    }

    for (let i = 0; i < points.length; i++)
    {
      const star = points[i];
      const income = getBaseValuablenessOfResources(star.getResourceIncome());
      const relativeIncome = getRelativeValueWithSteps(incomeBounds.min, incomeBounds.max, income, 10);
      const color = getColorForRelativeValue(incomeBounds.min, incomeBounds.max, relativeIncome);

      const poly = makePolygonFromPoints(star.voronoiCell.vertices);
      const gfx = new PIXI.Graphics();
      gfx.beginFill(color, 1);
      gfx.drawShape(poly);
      gfx.endFill();
      doc.addChild(gfx);
    }

    return doc;
  },
};
