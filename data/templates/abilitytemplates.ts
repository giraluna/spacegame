module Rance
{
  module Templates
  {
    export interface AbilityTemplate
    {
      name: string;
      delay: number;
      canTarget: string; // ally, enemy, all
      targetArea: string; // single, smallRow, column, row, cross, t, all
      targetRange: string; // close, far, all
      effect: (any) => void;
    }
  }
}
