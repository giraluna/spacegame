// TODO 2018.06.05 | why does maxActionPoints belong in this module?
import
{
  FlatAndMultiplierAdjustment,
  getBaseAdjustment,
  applyFlatAndMultiplierAdjustments,
} from "../generic/FlatAndMultiplierAdjustment";
import { squashAdjustmentsObjects } from "../generic/AdjustmentsObject";
import
{
  clamp,
} from "../generic/utility";


export enum UnitAttribute
{
  Attack,
  Defence,
  Intelligence,
  Speed,
}

export interface UnitAttributesObject
{
  maxActionPoints: number;
  attack: number;
  defence: number;
  intelligence: number;
  speed: number;
}
export type UnitAttributeAdjustments =
{
  [K in keyof UnitAttributesObject]?: Partial<FlatAndMultiplierAdjustment>;
};
export type AdjustmentsPerAttribute =
{
  [K in keyof UnitAttributesObject]?:
  {
    flatPerPoint?: number;
    additiveMultiplierPerPoint?: number;
    multiplicativeMultiplierPerPoint?: number;
  };
};


export function getKeyForAttribute(attribute: UnitAttribute): Exclude<keyof UnitAttributesObject, "maxActionPoints">
{
  switch (attribute)
  {
    case UnitAttribute.Attack: return "attack";
    case UnitAttribute.Defence: return "defence";
    case UnitAttribute.Intelligence: return "intelligence";
    case UnitAttribute.Speed: return "speed";
  }
}
export function getAttributeKeysSortedForDisplay(): (keyof UnitAttributesObject)[]
{
  return(
  [
    "maxActionPoints",
    "attack",
    "defence",
    "intelligence",
    "speed",
  ]);
}

export class UnitAttributes implements UnitAttributesObject
{
  public maxActionPoints: number;
  public attack: number;
  public defence: number;
  public intelligence: number;
  public speed: number;

  constructor(initialAttributes: UnitAttributesObject)
  {
    for (const key in initialAttributes)
    {
      this[key] = initialAttributes[key];
    }
  }

  public static createBlank(): UnitAttributes
  {
    return new UnitAttributes(
    {
      maxActionPoints: 0,
      attack: 0,
      defence: 0,
      intelligence: 0,
      speed: 0,
    });
  }
  private static getBaseAdjustmentsObject(): UnitAttributeAdjustments
  {
    return(
    {
      maxActionPoints: getBaseAdjustment(),
      attack: getBaseAdjustment(),
      defence: getBaseAdjustment(),
      intelligence: getBaseAdjustment(),
      speed: getBaseAdjustment(),
    });
  }

  public clone(): UnitAttributes
  {
    return new UnitAttributes(this);
  }
  public clamp(min: number, max: number): UnitAttributes
  {
    this.forEachAttribute(attribute =>
    {
      this[attribute] = clamp(this[attribute], min, max);
    });

    return this;
  }
  public getAdjustedAttributes(...adjustments: UnitAttributeAdjustments[]): UnitAttributes
  {
    const baseAdjustments = UnitAttributes.getBaseAdjustmentsObject();
    const squashedAdjustments = squashAdjustmentsObjects(baseAdjustments, ...adjustments);

    const cloned = this.clone();
    cloned.applyAdjustments(squashedAdjustments);

    return cloned;
  }
  public resolveAdjustmentsPerAttribute(
    perAttribute: AdjustmentsPerAttribute,
  ): FlatAndMultiplierAdjustment
  {
    const totalAdjustment = getBaseAdjustment();

    for (const attributeName in perAttribute)
    {
      const adjustment = perAttribute[<keyof AdjustmentsPerAttribute>attributeName];
      const attributeValue = this[<keyof AdjustmentsPerAttribute>attributeName];

      if (adjustment.flatPerPoint)
      {
        totalAdjustment.flat +=
          adjustment.flatPerPoint * attributeValue;
      }
      if (adjustment.additiveMultiplierPerPoint)
      {
        totalAdjustment.additiveMultiplier +=
          adjustment.additiveMultiplierPerPoint * attributeValue;
      }
      if (isFinite(adjustment.multiplicativeMultiplierPerPoint))
      {
        totalAdjustment.multiplicativeMultiplier *=
         1 + adjustment.multiplicativeMultiplierPerPoint * attributeValue;
      }
    }

    return totalAdjustment;
  }
  public modifyValueByAttributes(
    baseValue: number,
    perAttribute: AdjustmentsPerAttribute,
  ): number
  {
    const totalAdjustment = this.resolveAdjustmentsPerAttribute(perAttribute);

    return applyFlatAndMultiplierAdjustments(baseValue, totalAdjustment);
  }
  public getDifferenceBetween(toCompare: UnitAttributes): UnitAttributes
  {
    return new UnitAttributes(
    {
      maxActionPoints: this.maxActionPoints - toCompare.maxActionPoints,
      attack: this.attack - toCompare.attack,
      defence: this.defence - toCompare.defence,
      intelligence: this.intelligence - toCompare.intelligence,
      speed: this.speed - toCompare.speed,
    });
  }
  public serialize(): UnitAttributesObject
  {
    return JSON.parse(JSON.stringify(this));
  }

  private applyAdjustments(adjustments: UnitAttributeAdjustments): UnitAttributes
  {
    for (const attribute in adjustments)
    {
      this[attribute] = applyFlatAndMultiplierAdjustments(this[attribute], adjustments[attribute]);
    }

    return this;
  }
  private forEachAttribute(cb: (attribute: keyof UnitAttributesObject) => void): void
  {
    getAttributeKeysSortedForDisplay().forEach(attribute =>
    {
      cb(attribute);
    });
  }
}
