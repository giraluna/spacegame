/// <reference path="../lib/voronoi.d.ts" />

/// <reference path="mapgen/mapgenresult.ts" />
/// <reference path="game.ts" />
/// <reference path="fillerpoint.ts" />
/// <reference path="star.ts" />
/// <reference path="mapvoronoiinfo.ts" />


module Rance
{
  export class GalaxyMap
  {
    stars: Star[];
    fillerPoints: FillerPoint[];
    width: number;
    height: number;

    voronoi: MapVoronoiInfo;

    constructor(mapGen: MapGen2.MapGenResult)
    {
      this.width = mapGen.width;
      this.height = mapGen.height;

      this.stars = mapGen.stars;
      this.fillerPoints = mapGen.fillerPoints;

      this.voronoi = mapGen.voronoiInfo;
    }
    getIncomeBounds()
    {
      var min, max;

      for (var i = 0; i < this.stars.length; i++)
      {
        var star = this.stars[i];
        var income = star.getIncome();
        if (!min) min = max = income;
        else
        {
          if (income < min) min = income;
          else if (income > max) max = income;
        }
      }

      return(
      {
        min: min,
        max: max
      });
    }
    serialize()
    {
      var data: any = {};

      data.stars = this.stars.map(function(star)
      {
        return star.serialize();
      });

      data.fillerPoints = this.fillerPoints.map(function(fillerPoint)
      {
        return fillerPoint.serialize();
      });

      data.width = this.width;
      data.height = this.height;

      return data;
    }
  }
}
