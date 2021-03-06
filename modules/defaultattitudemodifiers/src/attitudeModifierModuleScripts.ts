import {AttitudeModifier} from "core/src/diplomacy/AttitudeModifier";
import {Game} from "core/src/game/Game";
import {Player} from "core/src/player/Player";

import
{
  baseOpinion,
  declaredWar,
} from "./attitudeModifierTemplates";
import { PartialCoreScriptsWithData } from "core/src/triggeredscripts/AllCoreScriptsWithData";


export const attitudeModifierModuleScripts: PartialCoreScriptsWithData =
{
  onFirstMeeting:
  {
    addBaseOpinionAttitudeModifier:
    {
      triggerPriority: 0,
      callback: (a: Player, b: Player, game: Game) =>
      {
        const friendliness = a.aiController.personality.friendliness;

        const opinion = Math.round((friendliness - 0.5) * 10);

        const modifier = new AttitudeModifier(
        {
          template: baseOpinion,
          startTurn: game.turnNumber,
          strength: opinion,
          hasFixedStrength: true,
        });

        a.diplomacy.addAttitudeModifier(b, modifier);
      },
    },
  },
  onWarDeclaration:
  {
    addDeclaredWarAttitudeModifier:
    {
      triggerPriority: 0,
      callback: (aggressor: Player, defender: Player, game: Game) =>
      {
        const modifier = new AttitudeModifier(
        {
          template: declaredWar,
          startTurn: game.turnNumber,
        });

        defender.diplomacy.addAttitudeModifier(aggressor, modifier);
      },
    }
  },
};
