/// <reference path="../../lib/react.d.ts" />
declare module Rance {
    module UIComponents {
        var UnitStrength: React.ReactComponentFactory<{}, React.ReactComponent<{}, {}>>;
    }
}
declare module Rance {
    module UIComponents {
        var UnitActions: React.ReactComponentFactory<{}, React.ReactComponent<{}, {}>>;
    }
}
declare module Rance {
    module UIComponents {
        var UnitInfo: React.ReactComponentFactory<{}, React.ReactComponent<{}, {}>>;
    }
}
declare module Rance {
    module UIComponents {
        var UnitIcon: React.ReactComponentFactory<{}, React.ReactComponent<{}, {}>>;
    }
}
declare module Rance {
    module UIComponents {
        var Unit: React.ReactComponentFactory<{}, React.ReactComponent<{}, {}>>;
    }
}
declare module Rance {
    module UIComponents {
        var EmptyUnit: React.ReactComponentFactory<{}, React.ReactComponent<{}, {}>>;
    }
}
declare module Rance {
    module UIComponents {
        var FleetColumn: React.ReactComponentFactory<{}, React.ReactComponent<{}, {}>>;
    }
}
declare module Rance {
    module UIComponents {
        var Fleet: React.ReactComponentFactory<{}, React.ReactComponent<{}, {}>>;
    }
}
declare module Rance {
    module UIComponents {
        var TurnCounter: React.ReactComponentFactory<{}, React.ReactComponent<{}, {}>>;
    }
}
declare module Rance {
    module UIComponents {
        var TurnOrder: React.ReactComponentFactory<{}, React.ReactComponent<{}, {}>>;
    }
}
declare module Rance {
    module UIComponents {
        var AbilityTooltip: React.ReactComponentFactory<{}, React.ReactComponent<{}, {}>>;
    }
}
declare module Rance {
    module UIComponents {
        var Battle: React.ReactComponentFactory<{}, React.ReactComponent<{}, {}>>;
    }
}
declare module Rance {
    module UIComponents {
        var Stage: React.ReactComponentFactory<{}, React.ReactComponent<{}, {}>>;
    }
}
declare module Rance {
    class ReactUI {
        public container: HTMLElement;
        public battle: any;
        constructor(container: HTMLElement, battle: any);
        public render(): void;
    }
}
declare module Rance {
    function randInt(min: any, max: any): number;
    function getRandomArrayItem(target: any[]): any;
    function getFrom2dArray(target: any[][], arr: number[][]): any[];
    function flatten2dArray(toFlatten: any[][]): any[];
    function reverseSide(side: string): string;
}
declare module Rance {
    interface TargetingFunction {
        (fleets: Rance.Unit[][], target: number[]): Rance.Unit[];
    }
    var targetSingle: TargetingFunction;
    var targetAll: TargetingFunction;
    var targetRow: TargetingFunction;
    var targetColumn: TargetingFunction;
    var targetColumnNeighbors: TargetingFunction;
    var targetNeighbors: TargetingFunction;
}
declare module Rance {
    module Templates {
        interface AbilityTemplate {
            name: string;
            moveDelay: number;
            interruptsNeeded?: number;
            actionsUse: any;
            targetFleets: string;
            targetingFunction: Rance.TargetingFunction;
            targetRange: string;
            effect: (user: Rance.Unit, target: Rance.Unit) => void;
        }
        module Abilities {
            var rangedAttack: AbilityTemplate;
            var closeAttack: AbilityTemplate;
            var standBy: AbilityTemplate;
        }
    }
}
declare module Rance {
    module Templates {
        interface TypeTemplate {
            typeName: string;
            isSquadron: boolean;
            icon: string;
            maxStrength: number;
            attributeLevels: {
                attack: number;
                defence: number;
                intelligence: number;
                speed: number;
            };
            abilities: Templates.AbilityTemplate[];
        }
        module ShipTypes {
            var fighterSquadron: TypeTemplate;
            var battleCruiser: TypeTemplate;
        }
    }
}
declare module Rance {
    class Battle {
        public unitsById: {
            [id: number]: Rance.Unit;
        };
        public unitsBySide: {
            [side: string]: Rance.Unit[];
        };
        public side1: Rance.Unit[][];
        public side2: Rance.Unit[][];
        public turnOrder: Rance.Unit[];
        public activeUnit: Rance.Unit;
        public maxTurns: number;
        public turnsLeft: number;
        constructor(units: {
            side1: Rance.Unit[][];
            side2: Rance.Unit[][];
        });
        public init(): void;
        public forEachUnit(operator: (Unit: any) => any): void;
        public initUnit(unit: Rance.Unit, side: string, position: number[]): void;
        public removeUnitFromTurnOrder(unit: Rance.Unit): boolean;
        public addUnitToTurnOrder(unit: Rance.Unit): boolean;
        public updateTurnOrder(): void;
        public setActiveUnit(): void;
        public endTurn(): void;
        public getFleetsForSide(side: string): any;
    }
}
declare module Rance {
    function useAbility(battle: Battle, user: Unit, ability: Templates.AbilityTemplate, target: Unit): void;
    function validateTarget(battle: Battle, user: Unit, ability: Templates.AbilityTemplate, target: Unit): boolean;
    function getPotentialTargets(battle: Battle, user: Unit, ability: Templates.AbilityTemplate): Unit[];
    function getFleetsToTarget(battle: Battle, user: Unit, ability: Templates.AbilityTemplate): Unit[][];
    function getPotentialTargetsByPosition(battle: Battle, user: Unit, ability: Templates.AbilityTemplate): number[][];
    function getUnitsInAbilityArea(battle: Battle, user: Unit, ability: Templates.AbilityTemplate, target: number[]): Unit[];
    function getTargetsForAllAbilities(battle: Battle, user: Unit): {
        [id: number]: Templates.AbilityTemplate[];
    };
}
declare module Rance {
    class Unit {
        public template: Rance.Templates.TypeTemplate;
        public id: number;
        public name: string;
        public maxStrength: number;
        public currentStrength: number;
        public isSquadron: boolean;
        public maxActionPoints: number;
        public attributes: {
            attack: number;
            defence: number;
            intelligence: number;
            speed: number;
        };
        public battleStats: {
            battle: Rance.Battle;
            moveDelay: number;
            side: string;
            position: number[];
            currentActionPoints: number;
        };
        public abilities: Rance.Templates.AbilityTemplate[];
        constructor(template: Rance.Templates.TypeTemplate);
        public setValues(): void;
        public setBaseHealth(): void;
        public setActionPoints(): void;
        public setAttributes(experience?: number, variance?: number): void;
        public getBaseMoveDelay(): number;
        public resetBattleStats(): void;
        public setBattlePosition(battle: Rance.Battle, side: string, position: number[]): void;
        public removeStrength(amount: number): void;
        public removeActionPoints(amount: any): void;
        public addMoveDelay(amount: number): void;
    }
}
declare var fleet1: any, fleet2: any, battle: any, reactUI: any;
declare module Rance {
}
