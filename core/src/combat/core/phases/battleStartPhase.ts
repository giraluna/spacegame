import { CombatPhaseInfo } from "../../CombatPhaseInfo";
import { CorePhase } from "../coreCombatPhases";
import { turnStartPhase } from "./turnStartPhase";


export const battleStartPhase: CombatPhaseInfo<CorePhase> =
{
  key: "battleStartPhase",
  defaultPhaseFinishCallback: (combatManager) =>
  {
    combatManager.setPhase(turnStartPhase);
  },
};
