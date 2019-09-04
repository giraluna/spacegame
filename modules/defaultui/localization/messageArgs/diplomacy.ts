import {DiplomacyState} from "../../../../src/diplomacy/DiplomacyState";


export type Diplomacy =
{
  opinion: [];
  diplomaticStatus: [];
  makePeace: [];
  declareWar: [];
  endsOn: [];
  attitudeModifierEffect: [];
  aiPersonality: [];

  diplomacyState: [{diplomacyState: DiplomacyState}];
  diplomacyStateDescription: [{diplomacyState: DiplomacyState | "dead"}];
};
