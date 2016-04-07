import AttitudeModifierTemplateBase from "../../src/templateinterfaces/AttitudeModifierTemplate.d.ts";
import TemplateCollection from "../../src/templateinterfaces/TemplateCollection.d.ts";

import DiplomacyEvaluation from "../../src/DiplomacyEvaluation.d.ts";
import DiplomacyState from "../../src/DiplomacyState.ts";


interface AttitudeModifierTemplate extends AttitudeModifierTemplateBase
{
  family: "geographic" | "current" | "history"
}

const neighborStars: AttitudeModifierTemplate =
{
  type: "neighborStars",
  displayName: "neighborStars",
  family: "geographic",
  duration: -1,

  startCondition: function(evaluation: DiplomacyEvaluation)
  {
    return (evaluation.neighborStars >= 2 && evaluation.opinion < 50);
  },
  
  getEffectFromEvaluation: function(evaluation: DiplomacyEvaluation)
  {
    return -2 * evaluation.neighborStars;
  }
}

const atWar: AttitudeModifierTemplate =
{
  type: "atWar",
  displayName: "At war",
  family: "current",
  duration: -1,

  startCondition: function(evaluation: DiplomacyEvaluation)
  {
    return (evaluation.currentStatus >= DiplomacyState.war)
  },

  constantEffect: -30
}

const declaredWar: AttitudeModifierTemplate =
{
  type: "declaredWar",
  displayName: "Declared war",
  family: "history",
  duration: 15,
  triggers: ["addDeclaredWarAttitudeModifier"],

  constantEffect: -35
}

const AttitudeModifierTemplates: TemplateCollection<AttitudeModifierTemplate> =
{
  [neighborStars.type]: neighborStars,
  [atWar.type]: atWar,
  [declaredWar.type]: declaredWar
}

export default AttitudeModifierTemplates;
