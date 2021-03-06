import { CombatAction } from "./CombatAction";
import { Unit } from "../unit/Unit";
import { Battle } from "../battle/Battle";
import { CombatActionListener } from "./CombatActionListener";
import { CombatPhaseInfo } from "./CombatPhaseInfo";
import { CorePhase } from "./core/coreCombatPhases";


/**
 * f.ex would fetch takePoisonDamage action if unit has poisoned status effect
 */
export type CombatActionFetcher<AllPhases extends string = CorePhase> =
{
  key: string;
  phasesToApplyTo: Set<CombatPhaseInfo<AllPhases>>;
  fetch: (battle: Battle, activeUnit: Unit) => CombatAction[];
};


/**
 * f.ex would fetch reduceTakenPoisonDamage modifier if unit has an item with poison resist equipped
 */
export type CombatActionListenerFetcher<AllPhases extends string = CorePhase> =
{
  key: string;
  phasesToApplyTo: Set<CombatPhaseInfo<AllPhases>>;
  fetch: (battle: Battle, activeUnit: Unit) => CombatActionListener<AllPhases>[];
};
