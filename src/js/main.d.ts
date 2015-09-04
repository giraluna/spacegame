/// <reference path="../../lib/pixi.d.ts" />
/// <reference path="../../lib/tween.js.d.ts" />
/// <reference path="../../lib/react.d.ts" />
/// <reference path="../../data/templates/spritetemplate.d.ts" />
/// <reference path="../../lib/husl.d.ts" />
/// <reference path="../../lib/rng.d.ts" />
/// <reference path="../../lib/voronoi.d.ts" />
/// <reference path="../../lib/quadtree.d.ts" />
/// <reference path="../../lib/offset.d.ts" />
/// <reference path="../../data/tutorials/tutorial.d.ts" />
declare module Rance {
    function EventManager(): void;
    var eventManager: any;
}
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
        var UnitStatus: React.ReactComponentFactory<{}, React.ReactComponent<{}, {}>>;
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
        var UnitStatusEffects: React.ReactComponentFactory<{}, React.ReactComponent<{}, {}>>;
    }
}
declare module Rance {
    module UIComponents {
        var Draggable: {
            getDefaultProps: () => {
                dragThreshhold: number;
            };
            getInitialState: () => {
                mouseDown: boolean;
                dragging: boolean;
                dragOffset: {
                    x: number;
                    y: number;
                };
                mouseDownPosition: {
                    x: number;
                    y: number;
                };
                originPosition: {
                    x: number;
                    y: number;
                };
                clone: any;
            };
            handleMouseDown: (e: any) => void;
            handleMouseMove: (e: any) => void;
            handleDrag: (e: any) => void;
            handleMouseUp: (e: any) => void;
            handleDragEnd: (e: any) => void;
            addEventListeners: () => void;
            removeEventListeners: () => void;
            componentDidMount: () => void;
            componentWillUnmount: () => void;
        };
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
        var DropTarget: {
            componentDidMount: () => void;
            componentWillUnmount: () => void;
        };
    }
}
declare module Rance {
    module UIComponents {
        var UnitWrapper: React.ReactComponentFactory<{}, React.ReactComponent<{}, {}>>;
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
        var BattleScore: React.ReactComponentFactory<{}, React.ReactComponent<{}, {}>>;
    }
}
declare module Rance {
    module UIComponents {
        var BattleSceneUnit: React.ReactComponentFactory<{}, React.ReactComponent<{}, {}>>;
    }
}
declare module Rance {
    module UIComponents {
        var BattleScene: React.ReactComponentFactory<{}, React.ReactComponent<{}, {}>>;
    }
}
declare module Rance {
    module UIComponents {
        var BattleDisplayStrength: React.ReactComponentFactory<{}, React.ReactComponent<{}, {}>>;
    }
}
declare module Rance {
    module UIComponents {
        var BattleBackground: React.ReactComponentFactory<{}, React.ReactComponent<{}, {}>>;
    }
}
declare module Rance {
    module UIComponents {
        var Battle: React.ReactComponentFactory<{}, React.ReactComponent<{}, {}>>;
    }
}
declare module Rance {
    module UIComponents {
        var SplitMultilineText: {
            splitMultilineText: (text: any) => any;
        };
    }
}
declare module Rance {
    module UIComponents {
        var List: React.ReactComponentFactory<{}, React.ReactComponent<{}, {}>>;
    }
}
declare module Rance {
    module UIComponents {
        var UnitListItem: React.ReactComponentFactory<{}, React.ReactComponent<{}, {}>>;
    }
}
declare module Rance {
    module UIComponents {
        var UnitList: React.ReactComponentFactory<{}, React.ReactComponent<{}, {}>>;
    }
}
declare module Rance {
    module UIComponents {
        var ItemListItem: React.ReactComponentFactory<{}, React.ReactComponent<{}, {}>>;
    }
}
declare module Rance {
    module UIComponents {
        var ItemList: React.ReactComponentFactory<{}, React.ReactComponent<{}, {}>>;
    }
}
declare module Rance {
    module UIComponents {
        var AbilityList: React.ReactComponentFactory<{}, React.ReactComponent<{}, {}>>;
    }
}
declare module Rance {
    module UIComponents {
        var UnitItem: React.ReactComponentFactory<{}, React.ReactComponent<{}, {}>>;
    }
}
declare module Rance {
    module UIComponents {
        var UnitItemWrapper: React.ReactComponentFactory<{}, React.ReactComponent<{}, {}>>;
    }
}
declare module Rance {
    module UIComponents {
        var MenuUnitInfo: React.ReactComponentFactory<{}, React.ReactComponent<{}, {}>>;
    }
}
declare module Rance {
    module UIComponents {
        var ItemEquip: React.ReactComponentFactory<{}, React.ReactComponent<{}, {}>>;
    }
}
declare module Rance {
    module UIComponents {
        var DefenceBuilding: React.ReactComponentFactory<{}, React.ReactComponent<{}, {}>>;
    }
}
declare module Rance {
    module UIComponents {
        var DefenceBuildingList: React.ReactComponentFactory<{}, React.ReactComponent<{}, {}>>;
    }
}
declare module Rance {
    module UIComponents {
        var BattleInfo: React.ReactComponentFactory<{}, React.ReactComponent<{}, {}>>;
    }
}
declare module Rance {
    module UIComponents {
        var BattlePrep: React.ReactComponentFactory<{}, React.ReactComponent<{}, {}>>;
    }
}
declare module Rance {
    module UIComponents {
        var LightBox: React.ReactComponentFactory<{}, React.ReactComponent<{}, {}>>;
    }
}
declare module Rance {
    module UIComponents {
        var ItemPurchaseListItem: React.ReactComponentFactory<{}, React.ReactComponent<{}, {}>>;
    }
}
declare module Rance {
    module UIComponents {
        var ItemPurchaseList: React.ReactComponentFactory<{}, React.ReactComponent<{}, {}>>;
    }
}
declare module Rance {
    module UIComponents {
        var BuyItems: React.ReactComponentFactory<{}, React.ReactComponent<{}, {}>>;
    }
}
declare module Rance {
    module UIComponents {
        var PopupResizeHandle: React.ReactComponentFactory<{}, React.ReactComponent<{}, {}>>;
    }
}
declare module Rance {
    module UIComponents {
        var Popup: React.ReactComponentFactory<{}, React.ReactComponent<{}, {}>>;
    }
}
declare module Rance {
    module UIComponents {
        var TutorialPopup: React.ReactComponentFactory<{}, React.ReactComponent<{}, {}>>;
    }
}
declare module Rance {
    module UIComponents {
        var ConfirmPopup: React.ReactComponentFactory<{}, React.ReactComponent<{}, {}>>;
    }
}
declare module Rance {
    module UIComponents {
        var PopupManager: React.ReactComponentFactory<{}, React.ReactComponent<{}, {}>>;
    }
}
declare module Rance {
    module UIComponents {
        var SaveListItem: React.ReactComponentFactory<{}, React.ReactComponent<{}, {}>>;
    }
}
declare module Rance {
    module UIComponents {
        var SaveList: React.ReactComponentFactory<{}, React.ReactComponent<{}, {}>>;
    }
}
declare module Rance {
    module UIComponents {
        var SaveGame: React.ReactComponentFactory<{}, React.ReactComponent<{}, {}>>;
    }
}
declare module Rance {
    module UIComponents {
        var LoadGame: React.ReactComponentFactory<{}, React.ReactComponent<{}, {}>>;
    }
}
declare module Rance {
    module UIComponents {
        var DiplomacyActions: React.ReactComponentFactory<{}, React.ReactComponent<{}, {}>>;
    }
}
declare module Rance {
    module UIComponents {
        var AutoPosition: {
            componentDidMount: () => void;
            componentDidUpdate: () => void;
            flipSide: (side: any) => string;
            elementFitsYSide: (side: any, ownRect: any, parentRect: any) => boolean;
            elementFitsXSide: (side: any, ownRect: any, parentRect: any) => boolean;
            setAutoPosition: () => void;
        };
    }
}
declare module Rance {
    module UIComponents {
        var AttitudeModifierInfo: React.ReactComponentFactory<{}, React.ReactComponent<{}, {}>>;
    }
}
declare module Rance {
    module UIComponents {
        var AttitudeModifierList: React.ReactComponentFactory<{}, React.ReactComponent<{}, {}>>;
    }
}
declare module Rance {
    module UIComponents {
        var Opinion: React.ReactComponentFactory<{}, React.ReactComponent<{}, {}>>;
    }
}
declare module Rance {
    module UIComponents {
        var DiplomaticStatusPlayer: React.ReactComponentFactory<{}, React.ReactComponent<{}, {}>>;
    }
}
declare module Rance {
    module UIComponents {
        var DiplomacyOverview: React.ReactComponentFactory<{}, React.ReactComponent<{}, {}>>;
    }
}
declare module Rance {
    module UIComponents {
        var EconomySummaryItem: React.ReactComponentFactory<{}, React.ReactComponent<{}, {}>>;
    }
}
declare module Rance {
    module UIComponents {
        var EconomySummary: React.ReactComponentFactory<{}, React.ReactComponent<{}, {}>>;
    }
}
declare module Rance {
    module UIComponents {
        var OptionsGroup: React.ReactComponentFactory<{}, React.ReactComponent<{}, {}>>;
    }
}
declare module Rance {
    module UIComponents {
        var OptionsCheckbox: React.ReactComponentFactory<{}, React.ReactComponent<{}, {}>>;
    }
}
declare module Rance {
    module UIComponents {
        var OptionsList: React.ReactComponentFactory<{}, React.ReactComponent<{}, {}>>;
    }
}
declare module Rance {
    module UIComponents {
        var TopMenu: React.ReactComponentFactory<{}, React.ReactComponent<{}, {}>>;
    }
}
declare module Rance {
    module UIComponents {
        var Resource: React.ReactComponentFactory<{}, React.ReactComponent<{}, {}>>;
    }
}
declare module Rance {
    module UIComponents {
        var TopBarResources: React.ReactComponentFactory<{}, React.ReactComponent<{}, {}>>;
    }
}
declare module Rance {
    module UIComponents {
        var TopBar: React.ReactComponentFactory<{}, React.ReactComponent<{}, {}>>;
    }
}
declare module Rance {
    module UIComponents {
        var FleetControls: React.ReactComponentFactory<{}, React.ReactComponent<{}, {}>>;
    }
}
declare module Rance {
    module UIComponents {
        var FleetInfo: React.ReactComponentFactory<{}, React.ReactComponent<{}, {}>>;
    }
}
declare module Rance {
    module UIComponents {
        var ShipInfoName: React.ReactComponentFactory<{}, React.ReactComponent<{}, {}>>;
    }
}
declare module Rance {
    module UIComponents {
        var ShipInfo: React.ReactComponentFactory<{}, React.ReactComponent<{}, {}>>;
    }
}
declare module Rance {
    module UIComponents {
        var FleetContents: React.ReactComponentFactory<{}, React.ReactComponent<{}, {}>>;
    }
}
declare module Rance {
    module UIComponents {
        var FleetReorganization: React.ReactComponentFactory<{}, React.ReactComponent<{}, {}>>;
    }
}
declare module Rance {
    module UIComponents {
        var FleetSelection: React.ReactComponentFactory<{}, React.ReactComponent<{}, {}>>;
    }
}
declare module Rance {
    module UIComponents {
        var StarInfo: React.ReactComponentFactory<{}, React.ReactComponent<{}, {}>>;
    }
}
declare module Rance {
    module UIComponents {
        var AttackTarget: React.ReactComponentFactory<{}, React.ReactComponent<{}, {}>>;
    }
}
declare module Rance {
    module UIComponents {
        var BuildableBuilding: React.ReactComponentFactory<{}, React.ReactComponent<{}, {}>>;
    }
}
declare module Rance {
    module UIComponents {
        var BuildableBuildingList: React.ReactComponentFactory<{}, React.ReactComponent<{}, {}>>;
    }
}
declare module Rance {
    function randInt(min: any, max: any): number;
    function randRange(min: any, max: any): any;
    function getRandomArrayKey(target: any[]): number;
    function getRandomArrayItem(target: any[]): any;
    function getRandomKey(target: any): string;
    function getObjectKeysSortedByValue(obj: {
        [key: string]: number;
    }, order: string): string[];
    function getRandomProperty(target: any): any;
    function getFrom2dArray(target: any[][], arr: number[][]): any[];
    function flatten2dArray(toFlatten: any[][]): any[];
    function reverseSide(side: string): string;
    function turnOrderSortFunction(a: Unit, b: Unit): number;
    function rectContains(rect: any, point: any): boolean;
    function hexToString(hex: number): string;
    function stringToHex(text: string): number;
    function colorImageInPlayerColor(image: HTMLImageElement, player: Player): string;
    function extendObject(from: any, to?: any): any;
    function recursiveRemoveAttribute(parent: any, attribute: string): void;
    function clamp(value: number, min: number, max: number): number;
    function roundToNearestMultiple(value: number, multiple: number): number;
    function getAngleBetweenDegrees(degA: number, degB: number): number;
    function prettifyDate(date: Date): string;
    function getMatchingLocalstorageItemsByDate(stringToMatch: string): any[];
    function shuffleArray(toShuffle: any[], seed?: any): any[];
    function getRelativeValue(value: number, min: number, max: number): number;
    function getDropTargetAtLocation(x: number, y: number): HTMLElement;
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
    enum DamageType {
        physical = 0,
        magical = 1,
    }
}
declare module Rance {
    module Templates {
        interface IEffectTemplate {
            name: string;
            targetFleets: string;
            targetingFunction: Rance.TargetingFunction;
            targetRange: string;
            effect: (user: Rance.Unit, target: Rance.Unit, data?: any) => void;
        }
        module Effects {
            var dummyTargetColumn: IEffectTemplate;
            var dummyTargetAll: IEffectTemplate;
            var singleTargetDamage: IEffectTemplate;
            var closeAttack: IEffectTemplate;
            var wholeRowAttack: IEffectTemplate;
            var bombAttack: IEffectTemplate;
            var guardColumn: IEffectTemplate;
            var receiveCounterAttack: IEffectTemplate;
            var increaseCaptureChance: IEffectTemplate;
            var buffTest: IEffectTemplate;
            var healTarget: IEffectTemplate;
            var healSelf: IEffectTemplate;
            var standBy: IEffectTemplate;
        }
    }
}
declare module Rance {
    module Templates {
        interface SFXParams {
            user: Rance.Unit;
            width: number;
            height: number;
            duration: number;
        }
        interface IBattleEffectSFX {
            duration: number;
            userSprite?: (props: SFXParams) => HTMLCanvasElement;
            userOverlay?: (props: SFXParams) => HTMLCanvasElement;
            emptySpaceOverlay?: (props: SFXParams) => HTMLCanvasElement;
            enemyOverlay?: (props: SFXParams) => HTMLCanvasElement;
            battleOverlay?: (props: SFXParams) => HTMLCanvasElement;
        }
    }
}
declare module Rance {
    module Templates {
        interface IAbilityTemplateEffect {
            template: Templates.IEffectTemplate;
            data?: any;
            attachedEffects?: IAbilityTemplateEffect[];
            sfx?: Templates.IBattleEffectSFX;
        }
        interface IAbilityTemplate {
            type: string;
            displayName: string;
            description: string;
            moveDelay: number;
            preparation?: {
                turnsToPrep: number;
                prepDelay: number;
                interruptsNeeded: number;
            };
            actionsUse: number;
            mainEffect: IAbilityTemplateEffect;
            secondaryEffects?: IAbilityTemplateEffect[];
            beforeUse?: IAbilityTemplateEffect[];
            afterUse?: IAbilityTemplateEffect[];
            addsGuard?: boolean;
        }
        module Abilities {
            var dummyTargetColumn: IAbilityTemplate;
            var dummyTargetAll: IAbilityTemplate;
            var rangedAttack: IAbilityTemplate;
            var closeAttack: IAbilityTemplate;
            var wholeRowAttack: IAbilityTemplate;
            var bombAttack: IAbilityTemplate;
            var guardColumn: IAbilityTemplate;
            var boardingHook: IAbilityTemplate;
            var debugAbility: IAbilityTemplate;
            var ranceAttack: IAbilityTemplate;
            var standBy: IAbilityTemplate;
        }
    }
}
declare module Rance {
    module Templates {
        interface IPassiveSkillTemplate {
            type: string;
            displayName: string;
            description: string;
            atBattleStart?: Templates.IAbilityTemplateEffect[];
            beforeAbilityUse?: Templates.IAbilityTemplateEffect[];
            afterAbilityUse?: Templates.IAbilityTemplateEffect[];
        }
        module PassiveSkills {
            var autoHeal: IPassiveSkillTemplate;
            var overdrive: IPassiveSkillTemplate;
        }
    }
}
declare module Rance {
    module Templates {
        interface IUnitTemplate {
            type: string;
            archetype: string;
            typeName: string;
            sprite: Templates.ISpriteTemplate;
            isSquadron: boolean;
            buildCost: number;
            icon: string;
            maxHealth: number;
            maxMovePoints: number;
            visionRange: number;
            attributeLevels: {
                attack: number;
                defence: number;
                intelligence: number;
                speed: number;
            };
            abilities: Templates.IAbilityTemplate[];
            passiveSkills?: Templates.IPassiveSkillTemplate[];
        }
        module ShipTypes {
            var cheatShip: IUnitTemplate;
            var fighterSquadron: IUnitTemplate;
            var bomberSquadron: IUnitTemplate;
            var battleCruiser: IUnitTemplate;
            var scout: IUnitTemplate;
            var shieldBoat: IUnitTemplate;
        }
    }
}
declare module Rance {
    interface IUnitAttributes {
        maxActionPoints: number;
        attack: number;
        defence: number;
        intelligence: number;
        speed: number;
    }
}
declare module Rance {
    module Templates {
        interface IResourceTemplate {
            type: string;
            displayName: string;
            icon: string;
            rarity: number;
            distributionGroups: string[];
        }
        module Resources {
            var testResource1: IResourceTemplate;
            var testResource2: IResourceTemplate;
            var testResource3: IResourceTemplate;
            var testResource4: IResourceTemplate;
            var testResource5: IResourceTemplate;
        }
    }
}
declare module Rance {
    interface Point {
        x: number;
        y: number;
    }
}
declare module Rance {
    module Templates {
        interface IBuildingTemplate {
            type: string;
            category: string;
            family?: string;
            name: string;
            iconSrc: string;
            buildCost: number;
            maxPerType: number;
            maxUpgradeLevel: number;
            upgradeOnly?: boolean;
            upgradeInto?: {
                type: string;
                level: number;
            }[];
            onBuild?: () => void;
            onTurnEnd?: () => void;
        }
        module Buildings {
            var sectorCommand: IBuildingTemplate;
            var sectorCommand1: IBuildingTemplate;
            var sectorCommand2: IBuildingTemplate;
            var starBase: IBuildingTemplate;
            var commercialPort: IBuildingTemplate;
            var deepSpaceRadar: IBuildingTemplate;
            var itemManufactory: IBuildingTemplate;
            var resourceMine: IBuildingTemplate;
        }
    }
}
declare module Rance {
    class Building {
        public template: Rance.Templates.IBuildingTemplate;
        public id: number;
        public location: Rance.Star;
        public controller: Rance.Player;
        public upgradeLevel: number;
        public totalCost: number;
        constructor(props: {
            template: Rance.Templates.IBuildingTemplate;
            location: Rance.Star;
            controller?: Rance.Player;
            upgradeLevel?: number;
            totalCost?: number;
            id?: number;
        });
        public getPossibleUpgrades(): {
            template: Rance.Templates.IBuildingTemplate;
            level: number;
            cost: number;
        }[];
        public upgrade(): void;
        public setController(newController: Rance.Player): void;
        public serialize(): any;
    }
}
declare module Rance {
    module Templates {
        interface IItemTemplate {
            type: string;
            displayName: string;
            description?: string;
            icon: string;
            techLevel: number;
            slot: string;
            cost: number;
            ability?: Templates.IAbilityTemplate;
            passiveSkill?: Templates.IPassiveSkillTemplate;
            attributes?: {
                maxActionPoints?: number;
                attack?: number;
                defence?: number;
                intelligence?: number;
                speed?: number;
            };
        }
        module Items {
            var bombLauncher1: IItemTemplate;
            var bombLauncher2: IItemTemplate;
            var bombLauncher3: IItemTemplate;
            var afterBurner1: IItemTemplate;
            var afterBurner2: IItemTemplate;
            var afterBurner3: IItemTemplate;
            var shieldPlating1: IItemTemplate;
            var shieldPlating2: IItemTemplate;
            var shieldPlating3: IItemTemplate;
        }
    }
}
declare module Rance {
    class Item {
        public id: number;
        public template: Rance.Templates.IItemTemplate;
        public unit: Rance.Unit;
        constructor(template: Rance.Templates.IItemTemplate, id?: number);
        public serialize(): any;
    }
}
declare module Rance {
    class ItemGenerator {
        public itemsByTechLevel: {
            [techLevel: number]: Rance.Templates.IItemTemplate[];
        };
        constructor();
        public indexItemsByTechLevel(): void;
    }
}
declare module Rance {
    class Star implements Rance.Point {
        public id: number;
        public x: number;
        public y: number;
        public basisX: number;
        public basisY: number;
        public linksTo: Star[];
        public linksFrom: Star[];
        public mapGenData: any;
        public voronoiId: number;
        public seed: string;
        public name: string;
        public owner: Rance.Player;
        public baseIncome: number;
        public resource: Rance.Templates.IResourceTemplate;
        public fleets: {
            [playerId: string]: Rance.Fleet[];
        };
        public buildings: {
            [category: string]: Rance.Building[];
        };
        public voronoiCell: any;
        public indexedNeighborsInRange: {
            [range: number]: {
                all: Star[];
                byRange: {
                    [range: number]: Star[];
                };
            };
        };
        public indexedDistanceToStar: {
            [id: number]: number;
        };
        public buildableItems: {
            1: Rance.Templates.IItemTemplate[];
            2: Rance.Templates.IItemTemplate[];
            3: Rance.Templates.IItemTemplate[];
        };
        constructor(x: number, y: number, id?: number);
        public severLinksToNonAdjacent(): void;
        public addBuilding(building: Rance.Building): void;
        public removeBuilding(building: Rance.Building): void;
        public sortDefenceBuildings(): void;
        public getSecondaryController(): Rance.Player;
        public updateController(): any;
        public getIncome(): number;
        public getResourceIncome(): {
            resource: Rance.Templates.IResourceTemplate;
            amount: number;
        };
        public getAllBuildings(): any[];
        public getBuildingsForPlayer(player: Rance.Player): any[];
        public getBuildingsByType(buildingTemplate: Rance.Templates.IBuildingTemplate): any[];
        public getBuildingsByFamily(buildingTemplate: Rance.Templates.IBuildingTemplate): any[];
        public getBuildableBuildings(): any[];
        public getBuildingUpgrades(): {
            [buildingId: number]: {
                template: Rance.Templates.IBuildingTemplate;
                level: number;
                cost: number;
                parentBuilding: Rance.Building;
            }[];
        };
        public getBuildableShipTypes(): any[];
        public getAllFleets(): any[];
        public getFleetIndex(fleet: Rance.Fleet): number;
        public hasFleet(fleet: Rance.Fleet): boolean;
        public addFleet(fleet: Rance.Fleet): boolean;
        public addFleets(fleets: Rance.Fleet[]): void;
        public removeFleet(fleet: Rance.Fleet): boolean;
        public removeFleets(fleets: Rance.Fleet[]): void;
        public getAllShipsOfPlayer(player: Rance.Player): Rance.Unit[];
        public getIndependentShips(): Rance.Unit[];
        public getTargetsForPlayer(player: Rance.Player): any[];
        public getFirstEnemyDefenceBuilding(player: Rance.Player): Rance.Building;
        public getEnemyFleetOwners(player: Rance.Player, excludedTarget?: Rance.Player): Rance.Player[];
        public setPosition(x: number, y: number): void;
        public setResource(resource: Rance.Templates.IResourceTemplate): void;
        public hasLink(linkTo: Star): boolean;
        public addLink(linkTo: Star): void;
        public removeLink(linkTo: Star): void;
        public getAllLinks(): Star[];
        public getNeighbors(): Star[];
        public getLinkedInRange(range: number): {
            all: Star[];
            byRange: {
                [range: number]: Star[];
            };
        };
        public getIslandForQualifier(qualifier: (starA: Star, starB: Star) => boolean, earlyReturnSize?: number): Star[];
        public getNearestStarForQualifier(qualifier: (star: Star) => boolean): Star;
        public getDistanceToStar(target: Star): number;
        public getVisionRange(): number;
        public getVision(): Star[];
        public getHealingFactor(player: Rance.Player): number;
        public getSeed(): string;
        public seedBuildableItems(): void;
        public getItemManufactoryLevel(): number;
        public getItemAmountForTechLevel(techLevel: number, manufactoryLevel: number): number;
        public getBuildableItems(): {
            byTechLevel: {};
            all: any[];
        };
        public serialize(): any;
    }
}
declare module Rance {
    class PriorityQueue {
        public items: {
            [priority: number]: any[];
        };
        constructor();
        public isEmpty(): boolean;
        public push(priority: number, data: any): void;
        public pop(): any;
        public peek(): any[];
    }
}
declare module Rance {
    function backTrace(graph: any, target: Star): {
        star: Star;
        cost: any;
    }[];
    function aStar(start: Star, target: Star): {
        came: any;
        cost: any;
        queue: PriorityQueue;
    };
}
declare module Rance {
    class Fleet {
        public player: Rance.Player;
        public ships: Rance.Unit[];
        public location: Rance.Star;
        public visionIsDirty: boolean;
        public visibleStars: Rance.Star[];
        public id: number;
        public name: string;
        constructor(player: Rance.Player, ships: Rance.Unit[], location: Rance.Star, id?: number);
        public getShipIndex(ship: Rance.Unit): number;
        public hasShip(ship: Rance.Unit): boolean;
        public deleteFleet(shouldRender?: boolean): void;
        public mergeWith(fleet: Fleet, shouldRender?: boolean): void;
        public addShip(ship: Rance.Unit): boolean;
        public addShips(ships: Rance.Unit[]): void;
        public removeShip(ship: Rance.Unit): boolean;
        public removeShips(ships: Rance.Unit[]): void;
        public transferShip(fleet: Fleet, ship: Rance.Unit): boolean;
        public split(): Fleet;
        public getMinCurrentMovePoints(): number;
        public getMinMaxMovePoints(): number;
        public canMove(): boolean;
        public subtractMovePoints(): void;
        public move(newLocation: Rance.Star): void;
        public getPathTo(newLocation: Rance.Star): {
            star: Rance.Star;
            cost: any;
        }[];
        public pathFind(newLocation: Rance.Star, onMove?: any, afterMove?: any): void;
        public getFriendlyFleetsAtOwnLocation(): Fleet[];
        public getTotalStrengthEvaluation(): number;
        public getTotalHealth(): {
            current: number;
            max: number;
        };
        public updateVisibleStars(): void;
        public getVision(): Rance.Star[];
        public serialize(): any;
    }
}
declare module Rance {
    module Templates {
        interface ISubEmblemTemplate {
            type: string;
            position: string;
            foregroundOnly: boolean;
            imageSrc: string;
        }
        module SubEmblems {
            var emblem0: {
                type: string;
                position: string;
                foregroundOnly: boolean;
                imageSrc: string;
            };
            var emblem33: {
                type: string;
                position: string;
                foregroundOnly: boolean;
                imageSrc: string;
            };
            var emblem34: {
                type: string;
                position: string;
                foregroundOnly: boolean;
                imageSrc: string;
            };
            var emblem35: {
                type: string;
                position: string;
                foregroundOnly: boolean;
                imageSrc: string;
            };
            var emblem36: {
                type: string;
                position: string;
                foregroundOnly: boolean;
                imageSrc: string;
            };
            var emblem37: {
                type: string;
                position: string;
                foregroundOnly: boolean;
                imageSrc: string;
            };
            var emblem38: {
                type: string;
                position: string;
                foregroundOnly: boolean;
                imageSrc: string;
            };
            var emblem39: {
                type: string;
                position: string;
                foregroundOnly: boolean;
                imageSrc: string;
            };
            var emblem40: {
                type: string;
                position: string;
                foregroundOnly: boolean;
                imageSrc: string;
            };
            var emblem41: {
                type: string;
                position: string;
                foregroundOnly: boolean;
                imageSrc: string;
            };
            var emblem42: {
                type: string;
                position: string;
                foregroundOnly: boolean;
                imageSrc: string;
            };
            var emblem43: {
                type: string;
                position: string;
                foregroundOnly: boolean;
                imageSrc: string;
            };
            var emblem44: {
                type: string;
                position: string;
                foregroundOnly: boolean;
                imageSrc: string;
            };
            var emblem45: {
                type: string;
                position: string;
                foregroundOnly: boolean;
                imageSrc: string;
            };
            var emblem46: {
                type: string;
                position: string;
                foregroundOnly: boolean;
                imageSrc: string;
            };
            var emblem47: {
                type: string;
                position: string;
                foregroundOnly: boolean;
                imageSrc: string;
            };
            var emblem48: {
                type: string;
                position: string;
                foregroundOnly: boolean;
                imageSrc: string;
            };
            var emblem49: {
                type: string;
                position: string;
                foregroundOnly: boolean;
                imageSrc: string;
            };
            var emblem50: {
                type: string;
                position: string;
                foregroundOnly: boolean;
                imageSrc: string;
            };
            var emblem51: {
                type: string;
                position: string;
                foregroundOnly: boolean;
                imageSrc: string;
            };
            var emblem52: {
                type: string;
                position: string;
                foregroundOnly: boolean;
                imageSrc: string;
            };
            var emblem53: {
                type: string;
                position: string;
                foregroundOnly: boolean;
                imageSrc: string;
            };
            var emblem54: {
                type: string;
                position: string;
                foregroundOnly: boolean;
                imageSrc: string;
            };
            var emblem55: {
                type: string;
                position: string;
                foregroundOnly: boolean;
                imageSrc: string;
            };
            var emblem56: {
                type: string;
                position: string;
                foregroundOnly: boolean;
                imageSrc: string;
            };
            var emblem57: {
                type: string;
                position: string;
                foregroundOnly: boolean;
                imageSrc: string;
            };
            var emblem58: {
                type: string;
                position: string;
                foregroundOnly: boolean;
                imageSrc: string;
            };
            var emblem59: {
                type: string;
                position: string;
                foregroundOnly: boolean;
                imageSrc: string;
            };
            var emblem61: {
                type: string;
                position: string;
                foregroundOnly: boolean;
                imageSrc: string;
            };
        }
    }
}
declare module Rance {
    interface IRange {
        min?: number;
        max?: number;
        step?: number;
        defaultValue?: number;
    }
}
declare module Rance {
    function hex2rgb(hex: number): number[];
    function rgb2hex(rgb: number[]): number;
    function hsvToRgb(h: number, s: number, v: number): number[];
    function hslToRgb(h: number, s: number, l: number): number[];
    function rgbToHsv(r: any, g: any, b: any): any[];
    function rgbToHsl(r: number, g: number, b: number): number[];
    function hslToHex(h: number, s: number, l: number): number;
    function hsvToHex(h: number, s: number, v: number): number;
    function hexToHsl(hex: number): number[];
    function hexToHsv(hex: number): number[];
    function excludeFromRanges(ranges: IRange[], toExclude: IRange): IRange[];
    function getIntersectingRanges(ranges: IRange[], toIntersectWith: IRange): IRange[];
    function excludeFromRange(range: IRange, toExclude: IRange): IRange[];
    function randomSelectFromRanges(ranges: IRange[]): any;
    function makeRandomVibrantColor(): any[];
    function makeRandomDeepColor(): any[];
    function makeRandomLightColor(): any[];
    function makeRandomColor(values?: {
        h?: IRange[];
        s?: IRange[];
        l?: IRange[];
    }): any[];
    function colorFromScalars(color: number[]): number[];
    function scalarsFromColor(scalars: number[]): number[];
    function makeContrastingColor(props: {
        color: number[];
        initialRanges?: {
            h?: IRange;
            s?: IRange;
            l?: IRange;
        };
        minDifference?: {
            h?: number;
            s?: number;
            l?: number;
        };
        maxDifference?: {
            h?: number;
            s?: number;
            l?: number;
        };
    }): number[];
    function hexToHusl(hex: number): number[];
    function generateMainColor(): number;
    function generateSecondaryColor(mainColor: number): number;
    function generateColorScheme(mainColor?: number): {
        main: number;
        secondary: number;
    };
    function checkRandomGenHues(amt: number): void;
}
declare module Rance {
    class Emblem {
        public alpha: number;
        public color: number;
        public inner: Rance.Templates.ISubEmblemTemplate;
        public outer: Rance.Templates.ISubEmblemTemplate;
        constructor(color: number, alpha?: number, inner?: any, outer?: any);
        public isForegroundOnly(): boolean;
        public generateRandom(minAlpha: number, rng?: any): void;
        public generateSubEmblems(rng: any): void;
        public draw(): HTMLCanvasElement;
        public drawSubEmblem(toDraw: Rance.Templates.ISubEmblemTemplate): HTMLCanvasElement;
        public serialize(): any;
    }
}
declare module Rance {
    class Flag {
        public width: number;
        public height: number;
        public mainColor: number;
        public secondaryColor: number;
        public tetriaryColor: number;
        public backgroundEmblem: Rance.Emblem;
        public foregroundEmblem: Rance.Emblem;
        public customImage: string;
        private _customImageToRender;
        public seed: any;
        constructor(props: {
            width: number;
            height?: number;
            mainColor?: number;
            secondaryColor?: number;
            tetriaryColor?: number;
        });
        public setColorScheme(main: any, secondary?: any, tetriary?: any): void;
        public generateRandom(seed?: any): void;
        public clearContent(): void;
        public setForegroundEmblem(emblem: Rance.Emblem): void;
        public setBackgroundEmblem(emblem: Rance.Emblem): void;
        public setCustomImage(imageSrc: string): void;
        public draw(): HTMLCanvasElement;
        public serialize(): any;
    }
}
declare module Rance {
    interface IMove {
        ability: Rance.Templates.IAbilityTemplate;
        targetId: number;
    }
    class MCTreeNode {
        public battle: Rance.Battle;
        public sideId: string;
        public move: IMove;
        public depth: number;
        public parent: MCTreeNode;
        public children: MCTreeNode[];
        public visits: number;
        public wins: number;
        public winRate: number;
        public totalScore: number;
        public averageScore: number;
        public currentScore: number;
        public possibleMoves: IMove[];
        public uctEvaluation: number;
        public uctIsDirty: boolean;
        constructor(battle: Rance.Battle, sideId: string, move?: IMove);
        public getPossibleMoves(): any[];
        public addChild(): MCTreeNode;
        public updateResult(result: number): void;
        public simulateOnce(battle: Rance.Battle): void;
        public simulateToEnd(): void;
        public clearResult(): void;
        public setUct(): void;
        public getHighestUctChild(): MCTreeNode;
        public getRecursiveBestUctChild(): any;
    }
}
declare module Rance {
    class MCTree {
        public rootNode: Rance.MCTreeNode;
        constructor(battle: Rance.Battle, sideId: string);
        public sortByWinRateFN(a: Rance.MCTreeNode, b: Rance.MCTreeNode): number;
        public sortByScoreFN(a: Rance.MCTreeNode, b: Rance.MCTreeNode): number;
        public evaluate(iterations: number): Rance.MCTreeNode;
        public printToConsole(nodes: Rance.MCTreeNode[]): void;
    }
}
declare module Rance {
    class BattleSimulator {
        public battle: Rance.Battle;
        constructor(battle: Rance.Battle);
        public simulateBattle(): void;
        public simulateMove(): void;
        public simulateAbility(ability: Rance.Templates.IAbilityTemplate, target: Rance.Unit): void;
        public getBattleEndData(): void;
        public finishBattle(): void;
    }
}
declare module Rance {
    class BattlePrep {
        public attacker: Rance.Player;
        public defender: Rance.Player;
        public battleData: Rance.IBattleData;
        public attackerFormation: Rance.Unit[][];
        public defenderFormation: Rance.Unit[][];
        public availableUnits: Rance.Unit[];
        public playerFormation: Rance.Unit[][];
        public humanPlayer: Rance.Player;
        public enemyFormation: Rance.Unit[][];
        public enemyPlayer: Rance.Player;
        public alreadyPlaced: {
            [id: number]: number[];
        };
        constructor(battleData: Rance.IBattleData);
        public makeEmptyFormation(): Rance.Unit[][];
        public makeAIFormations(): void;
        public setupPlayer(): void;
        public makeAIFormation(units: Rance.Unit[]): Rance.Unit[][];
        public getUnitPosition(unit: Rance.Unit): number[];
        public getUnitAtPosition(position: number[]): Rance.Unit;
        public clearPlayerFormation(): void;
        public setupPlayerFormation(formation: Rance.Unit[][]): void;
        public setUnit(unit: Rance.Unit, position: number[]): void;
        public swapUnits(unit1: Rance.Unit, unit2: Rance.Unit): void;
        public removeUnit(unit: Rance.Unit): void;
        public humanFormationIsValid(): boolean;
        public forEachShipInFormation(formation: Rance.Unit[][], operator: (unit: Rance.Unit) => any): void;
        public makeBattle(): Rance.Battle;
    }
}
declare module Rance {
    interface IDiplomacyEvaluation {
        currentTurn: number;
        currentStatus: Rance.DiplomaticState;
        neighborStars: number;
        opinion: number;
    }
    module Templates {
        enum AttitudeModifierFamily {
            geographic = 0,
            history = 1,
            current = 2,
        }
        interface IAttitudeModifierTemplate {
            type: string;
            displayName: string;
            family: AttitudeModifierFamily;
            duration: number;
            canBeOverriddenBy?: IAttitudeModifierTemplate[];
            triggeredOnly?: boolean;
            startCondition?: (evaluation: Rance.IDiplomacyEvaluation) => boolean;
            endCondition?: (evaluation: Rance.IDiplomacyEvaluation) => boolean;
            constantEffect?: number;
            getEffectFromEvaluation?: (evaluation: Rance.IDiplomacyEvaluation) => number;
            canOverride?: IAttitudeModifierTemplate[];
        }
        module AttitudeModifiers {
            var neighborStars: IAttitudeModifierTemplate;
            var atWar: IAttitudeModifierTemplate;
            var declaredWar: IAttitudeModifierTemplate;
        }
    }
}
declare module Rance {
    class AttitudeModifier {
        public template: Rance.Templates.IAttitudeModifierTemplate;
        public startTurn: number;
        public endTurn: number;
        public currentTurn: number;
        public strength: number;
        public isOverRidden: boolean;
        constructor(props: {
            template: Rance.Templates.IAttitudeModifierTemplate;
            startTurn: number;
            endTurn?: number;
            strength?: number;
        });
        public setStrength(evaluation: Rance.IDiplomacyEvaluation): number;
        public getFreshness(currentTurn?: number): number;
        public getAdjustedStrength(currentTurn?: number): number;
        public hasExpired(currentTurn?: number): boolean;
        public shouldEnd(evaluation: Rance.IDiplomacyEvaluation): boolean;
        public serialize(): any;
    }
}
declare module Rance {
    enum DiplomaticState {
        peace = 0,
        coldWar = 1,
        war = 2,
    }
    class DiplomacyStatus {
        public player: Rance.Player;
        public baseOpinion: number;
        public metPlayers: {
            [playerId: number]: Rance.Player;
        };
        public statusByPlayer: {
            [playerId: number]: DiplomaticState;
        };
        public attitudeModifiersByPlayer: {
            [playerId: number]: Rance.AttitudeModifier[];
        };
        constructor(player: Rance.Player);
        public getBaseOpinion(): number;
        public updateAttitudes(): void;
        public handleDiplomaticStatusUpdate(): void;
        public getOpinionOf(player: Rance.Player): number;
        public meetPlayer(player: Rance.Player): void;
        public canDeclareWarOn(player: Rance.Player): boolean;
        public canMakePeaceWith(player: Rance.Player): boolean;
        public declareWarOn(player: Rance.Player): void;
        public makePeaceWith(player: Rance.Player): void;
        public canAttackFleetOfPlayer(player: Rance.Player): boolean;
        public canAttackBuildingOfPlayer(player: Rance.Player): boolean;
        public hasModifierOfSameType(player: Rance.Player, modifier: Rance.AttitudeModifier): boolean;
        public addAttitudeModifier(player: Rance.Player, modifier: Rance.AttitudeModifier): void;
        public processAttitudeModifiersForPlayer(player: Rance.Player, evaluation: Rance.IDiplomacyEvaluation): void;
        public serialize(): any;
    }
}
declare module Rance {
    interface IPersonalityData {
        expansiveness: number;
        aggressiveness: number;
        friendliness: number;
        unitCompositionPreference: {
            [archetype: string]: number;
        };
    }
    function makeRandomPersonality(): IPersonalityData;
    module Templates {
        module Personalities {
            var testPersonality1: Rance.IPersonalityData;
        }
    }
}
declare module Rance {
    class MapVoronoiInfo {
        public treeMap: any;
        public diagram: any;
        public nonFillerLines: {
            [visibility: string]: any[];
        };
        constructor();
        public getNonFillerVoronoiLines(visibleStars?: Rance.Star[]): any[];
        public getStarAtPoint(point: Rance.Point): any;
    }
}
declare module Rance {
    class FillerPoint implements Rance.Point {
        public x: number;
        public y: number;
        public mapGenData: any;
        public voronoiCell: any;
        public voronoiId: number;
        constructor(x: number, y: number);
        public setPosition(x: number, y: number): void;
        public serialize(): {
            x: number;
            y: number;
        };
    }
}
declare module Rance {
    module MapGen2 {
        class Triangle {
            public a: Rance.Point;
            public b: Rance.Point;
            public c: Rance.Point;
            public circumCenterX: number;
            public circumCenterY: number;
            public circumRadius: number;
            constructor(a: Rance.Point, b: Rance.Point, c: Rance.Point);
            public getPoints(): Rance.Point[];
            public getCircumCenter(): number[];
            public calculateCircumCircle(tolerance?: number): void;
            public circumCircleContainsPoint(point: Rance.Point): boolean;
            public getEdges(): Rance.Point[][];
            public getAmountOfSharedVerticesWith(toCheckAgainst: Triangle): number;
        }
    }
}
declare module Rance {
    module MapGen2 {
        function triangulate(vertices: Rance.Point[]): Triangle[];
        function getCentroid(vertices: Rance.Point[]): Rance.Point;
    }
}
declare module Rance {
    module MapGen2 {
        function makeVoronoi(points: Rance.Point[], width: number, height: number): any;
        /**
        * Perform one iteration of Lloyd's Algorithm to move points in voronoi diagram to their centroid
        * @param {any}             diagram Voronoi diagram to relax
        * @param {(any) => number} dampeningFunction If specified, use value returned by dampeningFunction(cell.site)
        *                                            to adjust how far towards centroid the point is moved.
        *                                            0.0 = not moved, 0.5 = moved halfway, 1.0 = moved fully
        */
        function relaxVoronoi(diagram: any, dampeningFunction?: (any: any) => number): void;
    }
}
declare module Rance {
    module MapGen2 {
        class MapGenResult {
            public stars: Rance.Star[];
            public fillerPoints: Rance.FillerPoint[];
            public width: number;
            public height: number;
            public voronoiInfo: Rance.MapVoronoiInfo;
            constructor(props: {
                stars: Rance.Star[];
                fillerPoints: Rance.FillerPoint[];
                width: number;
                height: number;
            });
            public getAllPoints(): Rance.Point[];
            public makeMap(): Rance.GalaxyMap;
            public makeVoronoiInfo(): Rance.MapVoronoiInfo;
            public makeVoronoiTreeMap(): any;
            public clearMapGenData(): void;
        }
    }
}
declare module Rance {
    class Game {
        public turnNumber: number;
        public independents: Rance.Player[];
        public playerOrder: Rance.Player[];
        public galaxyMap: Rance.GalaxyMap;
        public humanPlayer: Rance.Player;
        public activePlayer: Rance.Player;
        constructor(map: Rance.GalaxyMap, players: Rance.Player[], humanPlayer: Rance.Player);
        public endTurn(): void;
        public processPlayerStartTurn(player: Rance.Player): void;
        public setNextPlayer(): void;
        public serialize(): any;
        public save(name: string): void;
    }
}
declare module Rance {
    class GalaxyMap {
        public stars: Rance.Star[];
        public fillerPoints: Rance.FillerPoint[];
        public width: number;
        public height: number;
        public voronoi: Rance.MapVoronoiInfo;
        constructor(mapGen: Rance.MapGen2.MapGenResult);
        public getIncomeBounds(): {
            min: any;
            max: any;
        };
        public serialize(): any;
    }
}
declare module Rance {
    var defaultEvaluationParameters: {
        starDesirability: {
            neighborRange: number;
            neighborWeight: number;
            defendabilityWeight: number;
            totalIncomeWeight: number;
            baseIncomeWeight: number;
            infrastructureWeight: number;
            productionWeight: number;
        };
    };
    interface IIndependentTargetEvaluations {
        [starId: number]: {
            star: Rance.Star;
            desirability: number;
            independentStrength: number;
            ownInfluence: number;
        };
    }
    class MapEvaluator {
        public map: Rance.GalaxyMap;
        public player: Rance.Player;
        public game: Rance.Game;
        public cachedInfluenceMaps: {
            [turnNumber: number]: {
                [playerId: number]: {
                    [starId: number]: number;
                };
            };
        };
        public cachedVisibleFleets: {
            [turnNumber: number]: {
                [playerId: number]: Rance.Fleet[];
            };
        };
        public cachedOwnIncome: number;
        public evaluationParameters: {
            starDesirability: {
                neighborRange: number;
                neighborWeight: number;
                defendabilityWeight: number;
                totalIncomeWeight: number;
                baseIncomeWeight: number;
                infrastructureWeight: number;
                productionWeight: number;
            };
        };
        constructor(map: Rance.GalaxyMap, player: Rance.Player, game?: Rance.Game);
        public processTurnStart(): void;
        public evaluateStarIncome(star: Rance.Star): number;
        public evaluateStarInfrastructure(star: Rance.Star): number;
        public evaluateStarProduction(star: Rance.Star): number;
        public evaluateStarDefendability(star: Rance.Star): number;
        public evaluateIndividualStarDesirability(star: Rance.Star): number;
        public evaluateNeighboringStarsDesirability(star: Rance.Star, range: number): number;
        public evaluateStarDesirability(star: Rance.Star): number;
        public evaluateIndependentTargets(targetStars: Rance.Star[]): IIndependentTargetEvaluations;
        public scoreIndependentTargets(evaluations: IIndependentTargetEvaluations): {
            star: Rance.Star;
            score: number;
        }[];
        public getScoredExpansionTargets(): {
            star: Rance.Star;
            score: number;
        }[];
        public getScoredCleanPiratesTargets(): {
            star: Rance.Star;
            score: number;
        }[];
        public getHostileShipsAtStar(star: Rance.Star): {
            [playerId: number]: Rance.Unit[];
        };
        public getHostileStrengthAtStar(star: Rance.Star): {
            [playerId: number]: number;
        };
        public getIndependentStrengthAtStar(star: Rance.Star): number;
        public getTotalHostileStrengthAtStar(star: Rance.Star): number;
        public getDefenceBuildingStrengthAtStarByPlayer(star: Rance.Star): {
            [playerId: number]: number;
        };
        public getTotalDefenceBuildingStrengthAtStar(star: Rance.Star): number;
        public evaluateFleetStrength(fleet: Rance.Fleet): number;
        public getVisibleFleetsByPlayer(): {
            [playerId: number]: Rance.Fleet[];
        };
        public buildPlayerInfluenceMap(player: Rance.Player): {
            [starId: number]: number;
        };
        public getPlayerInfluenceMap(player: Rance.Player): {
            [starId: number]: number;
        };
        public getInfluenceMapsForKnownPlayers(): {
            [playerId: number]: {
                [starId: number]: number;
            };
        };
        public estimateGlobalStrength(player: Rance.Player): number;
        public getPerceivedThreatOfPlayer(player: Rance.Player): number;
        public getPerceivedThreatOfAllKnownPlayers(): {
            [playerId: number]: number;
        };
        public getRelativePerceivedThreatOfAllKnownPlayers(): {
            [playerId: number]: number;
        };
        public getDiplomacyEvaluations(currentTurn: number): {
            [playerId: number]: Rance.IDiplomacyEvaluation;
        };
    }
}
declare module Rance {
    class Objective {
        public id: number;
        public type: string;
        private _basePriority;
        public priority : number;
        public isOngoing: boolean;
        public target: Rance.Star;
        public data: any;
        constructor(type: string, priority: number, target: Rance.Star, data?: any);
    }
}
declare module Rance {
    class ObjectivesAI {
        public mapEvaluator: Rance.MapEvaluator;
        public map: Rance.GalaxyMap;
        public player: Rance.Player;
        public personality: Rance.IPersonalityData;
        public objectivesByType: {
            expansion: any[];
            cleanPirates: any[];
            heal: any[];
        };
        public objectives: Rance.Objective[];
        public maxActiveExpansionRequests: number;
        public requests: any[];
        constructor(mapEvaluator: Rance.MapEvaluator, personality: Rance.IPersonalityData);
        public setAllObjectives(): void;
        public addObjectives(objectives: Rance.Objective[]): void;
        public getIndependentFightingObjectives(objectiveType: string, evaluationScores: any, basePriority: number): Rance.Objective[];
        public getExpansionObjectives(): Rance.Objective[];
        public getCleanPiratesObjectives(): Rance.Objective[];
        public getHealObjectives(): Rance.Objective[];
    }
}
declare module Rance {
    class Front {
        public id: number;
        public objective: Rance.Objective;
        public priority: number;
        public units: Rance.Unit[];
        public minUnitsDesired: number;
        public idealUnitsDesired: number;
        public targetLocation: Rance.Star;
        public musterLocation: Rance.Star;
        public hasMustered: boolean;
        constructor(props: {
            id: number;
            objective: Rance.Objective;
            priority: number;
            units?: Rance.Unit[];
            minUnitsDesired: number;
            idealUnitsDesired: number;
            targetLocation: Rance.Star;
            musterLocation: Rance.Star;
        });
        public organizeFleets(): void;
        public isFleetPure(fleet: Rance.Fleet): boolean;
        public getAssociatedFleets(): Rance.Fleet[];
        public getUnitIndex(unit: Rance.Unit): number;
        public addUnit(unit: Rance.Unit): void;
        public removeUnit(unit: Rance.Unit): void;
        public getUnitCountByArchetype(): {
            [archetype: string]: number;
        };
        public getUnitsByLocation(): {
            [starId: number]: Rance.Unit[];
        };
        public moveFleets(afterMoveCallback: any): void;
        public healMoveRoutine(afterMoveCallback: any): void;
        public defaultMoveRoutine(afterMoveCallback: any): void;
        public executeAction(afterExecutedCallback: any): void;
    }
}
declare module Rance {
    class FrontsAI {
        public player: Rance.Player;
        public map: Rance.GalaxyMap;
        public mapEvaluator: Rance.MapEvaluator;
        public objectivesAI: Rance.ObjectivesAI;
        public personality: Rance.IPersonalityData;
        public fronts: Rance.Front[];
        public frontsRequestingUnits: Rance.Front[];
        public frontsToMove: Rance.Front[];
        constructor(mapEvaluator: Rance.MapEvaluator, objectivesAI: Rance.ObjectivesAI, personality: Rance.IPersonalityData);
        public getTotalUnitCountByArchetype(): {};
        public getUnitArchetypeRelativeWeights(unitsByArchetype: any): {
            [archetype: string]: number;
        };
        public getUnitCompositionDeviationFromIdeal(idealWeights: any, unitsByArchetype: any): {
            [archetype: string]: number;
        };
        public getGlobalUnitArcheypeScores(): {
            [archetype: string]: number;
        };
        public getFrontUnitArchetypeScores(front: Rance.Front): {
            [archetype: string]: number;
        };
        public scoreUnitFitForFront(unit: Rance.Unit, front: Rance.Front, frontArchetypeScores: any): any;
        public getHealUnitFitScore(unit: Rance.Unit, front: Rance.Front): number;
        public getDefaultUnitFitScore(unit: Rance.Unit, front: Rance.Front, frontArchetypeScores: any): any;
        public getUnitScoresForFront(units: Rance.Unit[], front: Rance.Front): {
            unit: Rance.Unit;
            score: number;
            front: Rance.Front;
        }[];
        public assignUnits(): void;
        public getFrontWithId(id: number): Rance.Front;
        public createFront(objective: Rance.Objective): Rance.Front;
        public removeInactiveFronts(): void;
        public formFronts(): void;
        public organizeFleets(): void;
        public setFrontsToMove(): void;
        public moveFleets(afterMovingAllCallback: any): void;
        public getUnitsToFillObjective(objective: Rance.Objective): {
            min: number;
            ideal: number;
        };
        public getUnitsToFillExpansionObjective(objective: Rance.Objective): number;
        public setUnitRequests(): void;
    }
}
declare module Rance {
    class EconomyAI {
        public objectivesAI: Rance.ObjectivesAI;
        public frontsAI: Rance.FrontsAI;
        public mapEvaluator: Rance.MapEvaluator;
        public player: Rance.Player;
        public personality: Rance.IPersonalityData;
        constructor(props: {
            objectivesAI: Rance.ObjectivesAI;
            frontsAI: Rance.FrontsAI;
            mapEvaluator: Rance.MapEvaluator;
            personality: Rance.IPersonalityData;
        });
        public satisfyAllRequests(): void;
        public satisfyFrontRequest(front: Rance.Front): void;
    }
}
declare module Rance {
    class DiplomacyAI {
        public game: Rance.Game;
        public player: Rance.Player;
        public diplomacyStatus: Rance.DiplomacyStatus;
        public personality: Rance.IPersonalityData;
        public mapEvaluator: Rance.MapEvaluator;
        constructor(mapEvaluator: Rance.MapEvaluator, game: Rance.Game, personality: Rance.IPersonalityData);
        public setAttitudes(): void;
    }
}
declare module Rance {
    class AIController {
        public player: Rance.Player;
        public game: Rance.Game;
        public personality: Rance.IPersonalityData;
        public map: Rance.GalaxyMap;
        public mapEvaluator: Rance.MapEvaluator;
        public objectivesAI: Rance.ObjectivesAI;
        public economicAI: Rance.EconomyAI;
        public frontsAI: Rance.FrontsAI;
        public diplomacyAI: Rance.DiplomacyAI;
        constructor(player: Rance.Player, game: Rance.Game, personality?: Rance.IPersonalityData);
        public processTurn(afterFinishedCallback?: any): void;
        public finishMovingFleets(afterFinishedCallback?: any): void;
    }
}
declare module Rance {
    class Player {
        public id: number;
        public name: string;
        public color: number;
        public colorAlpha: number;
        public secondaryColor: number;
        public flag: Rance.Flag;
        public icon: string;
        public units: {
            [id: number]: Rance.Unit;
        };
        public resources: {
            [resourceType: string]: number;
        };
        public fleets: Rance.Fleet[];
        public items: Rance.Item[];
        public isAI: boolean;
        public personality: Rance.IPersonalityData;
        public AIController: Rance.AIController;
        public isIndependent: boolean;
        public diplomacyStatus: Rance.DiplomacyStatus;
        public money: number;
        public controlledLocations: Rance.Star[];
        public visionIsDirty: boolean;
        public visibleStars: {
            [id: number]: Rance.Star;
        };
        public revealedStars: {
            [id: number]: Rance.Star;
        };
        constructor(isAI: boolean, id?: number);
        public makeColorScheme(): void;
        public setupAI(game: Rance.Game): void;
        public setupPirates(): void;
        public makeRandomFlag(seed?: any): void;
        public setIcon(): void;
        public addUnit(unit: Rance.Unit): void;
        public removeUnit(unit: Rance.Unit): void;
        public getAllUnits(): any[];
        public forEachUnit(operator: (Unit: any) => void): void;
        public getFleetIndex(fleet: Rance.Fleet): number;
        public addFleet(fleet: Rance.Fleet): void;
        public removeFleet(fleet: Rance.Fleet): void;
        public getFleetsWithPositions(): any[];
        public hasStar(star: Rance.Star): boolean;
        public addStar(star: Rance.Star): boolean;
        public removeStar(star: Rance.Star): boolean;
        public getIncome(): number;
        public addResource(resource: Rance.Templates.IResourceTemplate, amount: number): void;
        public getResourceIncome(): {
            [resourceType: string]: {
                resource: Rance.Templates.IResourceTemplate;
                amount: number;
            };
        };
        public getGloballyBuildableShips(): any[];
        public getNeighboringStars(): Rance.Star[];
        public updateVisibleStars(): void;
        public getVisibleStars(): Rance.Star[];
        public getRevealedStars(): Rance.Star[];
        public getRevealedButNotVisibleStars(): Rance.Star[];
        public buildUnit(template: Rance.Templates.IUnitTemplate, location: Rance.Star): Rance.Unit;
        public addItem(item: Rance.Item): void;
        public removeItem(item: Rance.Item): void;
        public getAllBuildableItems(): any[];
        public getNearestOwnedStarTo(star: Rance.Star): Rance.Star;
        public attackTarget(location: Rance.Star, target: any, battleFinishCallback?: any): void;
        public serialize(): any;
    }
}
declare module Rance {
    interface IBattleData {
        location: Rance.Star;
        building: Rance.Building;
        attacker: {
            player: Rance.Player;
            ships: Rance.Unit[];
        };
        defender: {
            player: Rance.Player;
            ships: Rance.Unit[];
        };
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
        public side1Player: Rance.Player;
        public side2: Rance.Unit[][];
        public side2Player: Rance.Player;
        public battleData: Rance.IBattleData;
        public turnOrder: Rance.Unit[];
        public activeUnit: Rance.Unit;
        public currentTurn: number;
        public maxTurns: number;
        public turnsLeft: number;
        public startHealth: {
            side1: number;
            side2: number;
        };
        public evaluation: {
            [turnNumber: number]: number;
        };
        public isSimulated: boolean;
        public isVirtual: boolean;
        public ended: boolean;
        public capturedUnits: Rance.Unit[];
        public deadUnits: Rance.Unit[];
        public afterFinishCallbacks: any[];
        constructor(props: {
            battleData: Rance.IBattleData;
            side1: Rance.Unit[][];
            side2: Rance.Unit[][];
            side1Player: Rance.Player;
            side2Player: Rance.Player;
        });
        public init(): void;
        public forEachUnit(operator: (Unit: any) => any): void;
        public initUnit(unit: Rance.Unit, side: string, position: number[]): void;
        public removeUnitFromTurnOrder(unit: Rance.Unit): boolean;
        public addUnitToTurnOrder(unit: Rance.Unit): boolean;
        public updateTurnOrder(): void;
        public setActiveUnit(): void;
        public endTurn(): void;
        public getPlayerForSide(side: string): Rance.Player;
        public getSideForPlayer(player: Rance.Player): string;
        public getActivePlayer(): Rance.Player;
        public getColumnByPosition(position: number): any;
        public getCapturedUnits(victor: Rance.Player, maxCapturedUnits?: number): Rance.Unit[];
        public getDeadUnits(capturedUnits: Rance.Unit[], victor: Rance.Player): Rance.Unit[];
        public endBattle(): void;
        public finishBattle(forcedVictor?: Rance.Player): void;
        public getVictor(): Rance.Player;
        public getTotalHealthForColumn(position: number): number;
        public getTotalHealthForSide(side: string): {
            current: number;
            max: number;
        };
        public getEvaluation(): number;
        public swapColumnsForSide(side: string): void;
        public swapColumnsIfNeeded(): void;
        public checkBattleEnd(): boolean;
        public makeVirtualClone(): Battle;
    }
}
declare module Rance {
    interface IAbilityUseData {
        user: Rance.Unit;
        originalTarget: Rance.Unit;
        actualTarget: Rance.Unit;
        beforeUse: {
            (): void;
        }[];
        effectsToCall: {
            effects: {
                (): void;
            }[];
            user: Rance.Unit;
            target: Rance.Unit;
            sfx: Rance.Templates.IBattleEffectSFX;
        }[];
        afterUse: {
            (): void;
        }[];
    }
    function getAbilityUseData(battle: Battle, user: Unit, ability: Templates.IAbilityTemplate, target: Unit): IAbilityUseData;
    function useAbility(battle: Battle, user: Unit, ability: Templates.IAbilityTemplate, target: Unit): void;
    function validateTarget(battle: Battle, user: Unit, ability: Templates.IAbilityTemplate, target: Unit): boolean;
    function getTargetOrGuard(battle: Battle, user: Unit, ability: Templates.IAbilityTemplate, target: Unit): Unit;
    function getGuarders(battle: Battle, user: Unit, ability: Templates.IAbilityTemplate, target: Unit): Unit[];
    function getPotentialTargets(battle: Battle, user: Unit, ability: Templates.IAbilityTemplate): Unit[];
    function getFleetsToTarget(battle: Battle, user: Unit, effect: Templates.IEffectTemplate): Unit[][];
    function getPotentialTargetsByPosition(battle: Battle, user: Unit, ability: Templates.IAbilityTemplate): number[][];
    function getUnitsInAbilityArea(battle: Battle, user: Unit, ability: Templates.IAbilityTemplate, target: number[]): Unit[];
    function getUnitsInEffectArea(battle: Battle, user: Unit, effect: Templates.IEffectTemplate, target: number[]): Unit[];
    function getTargetsForAllAbilities(battle: Battle, user: Unit): {
        [id: number]: Templates.IAbilityTemplate[];
    };
}
declare module Rance {
    interface IStatusEffectAttributeAdjustment {
        flat?: number;
        multiplier?: number;
    }
    interface IStatusEffectAttributes {
        attack?: IStatusEffectAttributeAdjustment;
        defence?: IStatusEffectAttributeAdjustment;
        intelligence?: IStatusEffectAttributeAdjustment;
        speed?: IStatusEffectAttributeAdjustment;
    }
    class StatusEffect {
        public attributes: IStatusEffectAttributes;
        public duration: number;
        constructor(attributes: IStatusEffectAttributes, duration: number);
        public processTurnEnd(): void;
        public clone(): StatusEffect;
    }
}
declare module Rance {
    class Unit {
        public template: Rance.Templates.IUnitTemplate;
        public id: number;
        public name: string;
        public maxHealth: number;
        public currentHealth: number;
        public isSquadron: boolean;
        public currentMovePoints: number;
        public maxMovePoints: number;
        public timesActedThisTurn: number;
        public baseAttributes: Rance.IUnitAttributes;
        public attributesAreDirty: boolean;
        public cachedAttributes: Rance.IUnitAttributes;
        public attributes : Rance.IUnitAttributes;
        public battleStats: {
            moveDelay: number;
            side: string;
            position: number[];
            currentActionPoints: number;
            guardAmount: number;
            guardCoverage: string;
            captureChance: number;
            statusEffects: Rance.StatusEffect[];
            lastHealthBeforeReceivingDamage: number;
        };
        public displayFlags: {
            isAnnihilated: boolean;
        };
        public fleet: Rance.Fleet;
        public items: {
            low: Rance.Item;
            mid: Rance.Item;
            high: Rance.Item;
        };
        public passiveSkillsByPhase: {
            atBattleStart?: Rance.Templates.IPassiveSkillTemplate[];
            beforeAbilityUse?: Rance.Templates.IPassiveSkillTemplate[];
            afterAbilityUse?: Rance.Templates.IPassiveSkillTemplate[];
        };
        public passiveSkillsByPhaseAreDirty: boolean;
        public sfxDuration: number;
        public uiDisplayIsDirty: boolean;
        public front: Rance.Front;
        constructor(template: Rance.Templates.IUnitTemplate, id?: number, data?: any);
        public makeFromData(data: any): void;
        public setInitialValues(): void;
        public setBaseHealth(): void;
        public setAttributes(experience?: number, variance?: number): void;
        public getBaseMoveDelay(): number;
        public resetMovePoints(): void;
        public resetBattleStats(): void;
        public setBattlePosition(battle: Rance.Battle, side: string, position: number[]): void;
        public addStrength(amount: number): void;
        public removeStrength(amount: number): void;
        public removeActionPoints(amount: number): void;
        public addMoveDelay(amount: number): void;
        public updateStatusEffects(): void;
        public isTargetable(): boolean;
        public isActiveInBattle(): boolean;
        public addItem(item: Rance.Item): boolean;
        public removeItem(item: Rance.Item): boolean;
        public destroyAllItems(): void;
        public getAttributesWithItems(): any;
        public addStatusEffect(statusEffect: Rance.StatusEffect): void;
        public removeStatusEffect(statusEffect: Rance.StatusEffect): void;
        public getTotalStatusEffectAttributeAdjustments(): Rance.IStatusEffectAttributes;
        public getAttributesWithEffects(): any;
        public updateCachedAttributes(): void;
        public removeItemAtSlot(slot: string): boolean;
        public getItemAbilities(): Rance.Templates.IAbilityTemplate[];
        public getAllAbilities(): Rance.Templates.IAbilityTemplate[];
        public getItemPassiveSkills(): Rance.Templates.IPassiveSkillTemplate[];
        public getAllPassiveSkills(): Rance.Templates.IPassiveSkillTemplate[];
        public updatePassiveSkillsByPhase(): void;
        public getPassiveSkillsByPhase(): {
            atBattleStart?: Rance.Templates.IPassiveSkillTemplate[];
            beforeAbilityUse?: Rance.Templates.IPassiveSkillTemplate[];
            afterAbilityUse?: Rance.Templates.IPassiveSkillTemplate[];
        };
        public receiveDamage(amount: number, damageType: Rance.DamageType): void;
        public getAdjustedTroopSize(): number;
        public getAttackDamageIncrease(damageType: Rance.DamageType): number;
        public getReducedDamageFactor(damageType: Rance.DamageType): number;
        public addToFleet(fleet: Rance.Fleet): void;
        public removeFromFleet(): void;
        public removeFromPlayer(): void;
        public transferToPlayer(newPlayer: Rance.Player): void;
        public removeGuard(amount: number): void;
        public addGuard(amount: number, coverage: string): void;
        public removeAllGuard(): void;
        public getCounterAttackStrength(): number;
        public canActThisTurn(): boolean;
        public heal(): void;
        public getStrengthEvaluation(): number;
        public drawBattleScene(props: {
            unitsToDraw?: number;
            maxUnitsPerColumn: number;
            degree: number;
            rotationAngle: number;
            scalingFactor: number;
            xDistance: number;
            zDistance: number;
            facesRight: boolean;
            maxWidth?: number;
            maxHeight?: number;
            desiredHeight?: number;
        }): HTMLCanvasElement;
        public serialize(includeItems?: boolean): any;
        public makeVirtualClone(): Unit;
    }
}
declare module Rance {
    module UIComponents {
        var BuildableShip: React.ReactComponentFactory<{}, React.ReactComponent<{}, {}>>;
    }
}
declare module Rance {
    module UIComponents {
        var BuildableShipsList: React.ReactComponentFactory<{}, React.ReactComponent<{}, {}>>;
    }
}
declare module Rance {
    module UIComponents {
        var BuildingUpgradeList: React.ReactComponentFactory<{}, React.ReactComponent<{}, {}>>;
    }
}
declare module Rance {
    module UIComponents {
        var PossibleActions: React.ReactComponentFactory<{}, React.ReactComponent<{}, {}>>;
    }
}
declare module Rance {
    module UIComponents {
        var GalaxyMapUI: React.ReactComponentFactory<{}, React.ReactComponent<{}, {}>>;
    }
}
declare module Rance {
    module UIComponents {
        var GalaxyMap: React.ReactComponentFactory<{}, React.ReactComponent<{}, {}>>;
    }
}
declare module Rance {
    module UIComponents {
        var FocusTimer: {
            componentDidMount: () => void;
            registerFocusTimerListener: () => void;
            clearFocusTimerListener: () => void;
            setFocusTimer: () => void;
        };
    }
}
declare module Rance {
    module UIComponents {
        var ColorPicker: React.ReactComponentFactory<{}, React.ReactComponent<{}, {}>>;
    }
}
declare module Rance {
    module UIComponents {
        var ColorSetter: React.ReactComponentFactory<{}, React.ReactComponent<{}, {}>>;
    }
}
declare module Rance {
    module UIComponents {
        var FlagPicker: React.ReactComponentFactory<{}, React.ReactComponent<{}, {}>>;
    }
}
declare module Rance {
    module UIComponents {
        var FlagSetter: React.ReactComponentFactory<{}, React.ReactComponent<{}, {}>>;
    }
}
declare module Rance {
    module UIComponents {
        var PlayerSetup: React.ReactComponentFactory<{}, React.ReactComponent<{}, {}>>;
    }
}
declare module Rance {
    module UIComponents {
        var SetupGamePlayers: React.ReactComponentFactory<{}, React.ReactComponent<{}, {}>>;
    }
}
declare module Rance {
    module MapGen2 {
        class Region2 {
            public id: string;
            public isFiller: boolean;
            public stars: Rance.Star[];
            public fillerPoints: Rance.FillerPoint[];
            constructor(id: string, isFiller: boolean);
            public addStar(star: Rance.Star): void;
            public addFillerPoint(point: Rance.FillerPoint): void;
            public severLinksByQualifier(qualifierFN: (a: Rance.Star, b: Rance.Star) => boolean): void;
            public severLinksToRegionsExcept(exemptRegions: Region2[]): void;
            public severLinksToNonCenter(): void;
        }
    }
}
declare module Rance {
    module MapGen2 {
        class Sector2 {
            public id: number;
            public stars: Rance.Star[];
            public resourceType: Rance.Templates.IResourceTemplate;
            public resourceLocation: Rance.Star;
            constructor(id: number);
            public addStar(star: Rance.Star): void;
            public getNeighboringStars(): Rance.Star[];
            public getMajorityRegions(): any[];
        }
    }
}
declare module Rance {
    module MapGen2 {
        function linkAllStars(stars: Rance.Star[]): void;
        function partiallyCutLinks(stars: Rance.Star[], minConnections: number, maxCutsPerRegion: number): void;
        function makeSectors(stars: Rance.Star[], minSize: number, maxSize: number): {
            [sectorId: number]: Sector2;
        };
        function addDefenceBuildings(star: Rance.Star, amount?: number): void;
        function setDistancesFromNearestPlayerOwnedStar(stars: Rance.Star[]): void;
        function setupPirates(stars: Rance.Star[], player: Rance.Player, variance?: number, intensity?: number): void;
    }
}
declare module Rance {
    module Templates {
        module MapGen {
            interface IMapGenOptions {
                defaultOptions: IDefaultOptions;
                basicOptions?: IMapSpecificOptions;
                advancedOptions?: IMapSpecificOptions;
            }
            interface IDefaultOptions {
                height: Rance.IRange;
                width: Rance.IRange;
                starCount: Rance.IRange;
            }
            interface IMapSpecificOptions {
                [optionName: string]: Rance.IRange;
            }
            interface IMapGenOptionValues {
                defaultOptions: {
                    height: number;
                    width: number;
                    starCount: number;
                };
                basicOptions?: {
                    [optionName: string]: number;
                };
                advancedOptions?: {
                    [optionName: string]: number;
                };
            }
        }
    }
}
declare module Rance {
    module Templates {
        module MapGen {
            function spiralGalaxyGeneration(options: IMapGenOptionValues, players: Rance.Player[], independents: Rance.Player[]): Rance.MapGen2.MapGenResult;
        }
    }
}
declare module Rance {
    module Templates {
        interface IMapGenTemplate {
            key: string;
            displayName: string;
            description?: string;
            minPlayers: number;
            maxPlayers: number;
            options: Templates.MapGen.IMapGenOptions;
            mapGenFunction: (options: Templates.MapGen.IMapGenOptionValues, players: Rance.Player[], independents: Rance.Player[]) => Rance.MapGen2.MapGenResult;
        }
    }
}
declare module Rance {
    module Templates {
        module MapGen {
            var spiralGalaxy: Templates.IMapGenTemplate;
        }
    }
}
declare module Rance {
    module Templates {
        module MapGen {
            var tinierSpiralGalaxy: Templates.IMapGenTemplate;
        }
    }
}
declare module Rance {
    module UIComponents {
        var MapGenOption: React.ReactComponentFactory<{}, React.ReactComponent<{}, {}>>;
    }
}
declare module Rance {
    module UIComponents {
        var MapGenOptions: React.ReactComponentFactory<{}, React.ReactComponent<{}, {}>>;
    }
}
declare module Rance {
    module UIComponents {
        var MapSetup: React.ReactComponentFactory<{}, React.ReactComponent<{}, {}>>;
    }
}
declare module Rance {
    module UIComponents {
        var SetupGame: React.ReactComponentFactory<{}, React.ReactComponent<{}, {}>>;
    }
}
declare module Rance {
    module UIComponents {
        var FlagMaker: React.ReactComponentFactory<{}, React.ReactComponent<{}, {}>>;
    }
}
declare module Rance {
    module UIComponents {
        var BattleSceneTester: React.ReactComponentFactory<{}, React.ReactComponent<{}, {}>>;
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
        public currentScene: string;
        public stage: any;
        public battle: Rance.Battle;
        public battlePrep: Rance.BattlePrep;
        public renderer: Rance.Renderer;
        public mapRenderer: Rance.MapRenderer;
        public playerControl: Rance.PlayerControl;
        public player: Rance.Player;
        public game: Rance.Game;
        public switchSceneFN: any;
        constructor(container: HTMLElement);
        public addEventListeners(): void;
        public switchScene(newScene: string): void;
        public destroy(): void;
        public render(): void;
    }
}
declare module Rance {
    class PlayerControl {
        public player: Rance.Player;
        public selectedFleets: Rance.Fleet[];
        public inspectedFleets: Rance.Fleet[];
        public currentlyReorganizing: Rance.Fleet[];
        public currentAttackTargets: any[];
        public selectedStar: Rance.Star;
        public preventingGhost: boolean;
        public listeners: {
            [listenerName: string]: any;
        };
        constructor(player: Rance.Player);
        public destroy(): void;
        public removeEventListener(name: string): void;
        public removeEventListeners(): void;
        public addEventListener(name: string, handler: any): void;
        public addEventListeners(): void;
        public preventGhost(delay: number): void;
        public clearSelection(): void;
        public updateSelection(endReorganizingFleets?: boolean): void;
        public areAllFleetsInSameLocation(): boolean;
        public selectFleets(fleets: Rance.Fleet[]): void;
        public selectPlayerFleets(fleets: Rance.Fleet[]): void;
        public selectOtherFleets(fleets: Rance.Fleet[]): void;
        public deselectFleet(fleet: Rance.Fleet): void;
        public getMasterFleetForMerge(): Rance.Fleet;
        public mergeFleets(): void;
        public selectStar(star: Rance.Star): void;
        public moveFleets(star: Rance.Star): void;
        public splitFleet(fleet: Rance.Fleet): void;
        public startReorganizingFleets(fleets: Rance.Fleet[]): void;
        public endReorganizingFleets(): void;
        public getCurrentAttackTargets(): any[];
        public attackTarget(target: any): boolean;
    }
}
declare module Rance {
    function getBorderingHalfEdges(stars: Star[]): {
        star: Star;
        halfEdge: any;
    }[];
    function joinPointsWithin(points: Point[], maxDistance: number): void;
    function convertHalfEdgeDataToOffset(halfEdgeData: any): Point[];
    function getRevealedBorderEdges(revealedStars: Star[], voronoiInfo: MapVoronoiInfo): any[][];
}
declare module Rance {
    interface IMapRendererLayer {
        drawingFunction: (map: Rance.GalaxyMap) => PIXI.DisplayObjectContainer;
        container: PIXI.DisplayObjectContainer;
        isDirty: boolean;
    }
    interface IMapRendererLayerMapMode {
        name: string;
        layers: {
            layer: IMapRendererLayer;
        }[];
    }
    class MapRenderer {
        public container: PIXI.DisplayObjectContainer;
        public parent: PIXI.DisplayObjectContainer;
        public galaxyMap: Rance.GalaxyMap;
        public player: Rance.Player;
        public occupationShaders: {
            [ownerId: string]: {
                [occupierId: string]: any;
            };
        };
        public layers: {
            [name: string]: IMapRendererLayer;
        };
        public mapModes: {
            [name: string]: IMapRendererLayerMapMode;
        };
        public fowTilingSprite: PIXI.TilingSprite;
        public fowSpriteCache: {
            [starId: number]: PIXI.Sprite;
        };
        public fleetTextTextureCache: {
            [fleetSize: number]: PIXI.Texture;
        };
        public currentMapMode: IMapRendererLayerMapMode;
        public isDirty: boolean;
        public preventRender: boolean;
        public listeners: {
            [name: string]: any;
        };
        constructor(map: Rance.GalaxyMap, player: Rance.Player);
        public destroy(): void;
        public init(): void;
        public addEventListeners(): void;
        public setPlayer(player: Rance.Player): void;
        public updateShaderOffsets(x: number, y: number): void;
        public updateShaderZoom(zoom: number): void;
        public makeFowSprite(): void;
        public getFowSpriteForStar(star: Rance.Star): PIXI.Sprite;
        public getOccupationShader(owner: Rance.Player, occupier: Rance.Player): any;
        public getFleetTextTexture(fleet: Rance.Fleet): PIXI.Texture;
        public initLayers(): void;
        public initMapModes(): void;
        public setParent(newParent: PIXI.DisplayObjectContainer): void;
        public resetContainer(): void;
        public hasLayerInMapMode(layer: IMapRendererLayer): boolean;
        public setLayerAsDirty(layerName: string): void;
        public setAllLayersAsDirty(): void;
        public drawLayer(layer: IMapRendererLayer): void;
        public setMapMode(newMapMode: string): void;
        public render(): void;
    }
}
declare var tempCameraId: number;
declare module Rance {
    /**
    * @class Camera
    * @constructor
    */
    class Camera {
        public tempCameraId: number;
        public container: PIXI.DisplayObjectContainer;
        public width: number;
        public height: number;
        public bounds: any;
        public startPos: number[];
        public startClick: number[];
        public currZoom: number;
        public screenWidth: number;
        public screenHeight: number;
        public toCenterOn: Rance.Point;
        public onMoveCallbacks: {
            (x: number, y: number): void;
        }[];
        public onZoomCallbacks: {
            (zoom: number): void;
        }[];
        public listeners: {
            [name: string]: any;
        };
        public resizeListener: any;
        /**
        * [constructor description]
        * @param {PIXI.DisplayObjectContainer} container [DOC the camera views and manipulates]
        * @param {number}                      bound     [How much of the container is allowed to leave the camera view.
        * 0.0 to 1.0]
        */
        constructor(container: PIXI.DisplayObjectContainer, bound: number);
        public destroy(): void;
        /**
        * @method addEventListeners
        * @private
        */
        private addEventListeners();
        /**
        * @method setBound
        * @private
        */
        private setBounds();
        /**
        * @method startScroll
        * @param {number[]} mousePos [description]
        */
        public startScroll(mousePos: number[]): void;
        /**
        * @method end
        */
        public end(): void;
        /**
        * @method getDelta
        * @param {number[]} currPos [description]
        */
        private getDelta(currPos);
        /**
        * @method move
        * @param {number[]} currPos [description]
        */
        public move(currPos: number[]): void;
        public deltaMove(delta: number[]): void;
        private onMove();
        public getScreenCenter(): {
            x: number;
            y: number;
        };
        public getLocalPosition(position: Rance.Point): Rance.Point;
        public getCenterPosition(): Rance.Point;
        public centerOnPosition(pos: Rance.Point): void;
        /**
        * @method zoom
        * @param {number} zoomAmount [description]
        */
        public zoom(zoomAmount: number): void;
        private onZoom();
        /**
        * @method deltaZoom
        * @param {number} delta [description]
        * @param {number} scale [description]
        */
        public deltaZoom(delta: number, scale: number): void;
        /**
        * @method clampEdges
        * @private
        */
        private clampEdges();
    }
}
declare module Rance {
    class RectangleSelect {
        public parentContainer: PIXI.DisplayObjectContainer;
        public graphics: PIXI.Graphics;
        public selecting: boolean;
        public start: Rance.Point;
        public current: Rance.Point;
        public toSelectFrom: {
            position: Rance.Point;
            data: any;
        }[];
        public getSelectionTargetsFN: () => {
            position: Rance.Point;
            data: any;
        }[];
        constructor(parentContainer: PIXI.DisplayObjectContainer);
        public destroy(): void;
        public addEventListeners(): void;
        public startSelection(point: Rance.Point): void;
        public moveSelection(point: Rance.Point): void;
        public endSelection(point: Rance.Point): void;
        public drawSelectionRectangle(): void;
        public setSelectionTargets(): void;
        public getBounds(): {
            x1: number;
            x2: number;
            y1: number;
            y2: number;
            width: number;
            height: number;
        };
        public getAllInSelection(): any[];
        public selectionContains(point: Rance.Point): boolean;
    }
}
declare module Rance {
    class MouseEventHandler {
        public renderer: Rance.Renderer;
        public camera: Rance.Camera;
        public rectangleSelect: Rance.RectangleSelect;
        public startPoint: number[];
        public currPoint: number[];
        public currentAction: string;
        public stashedAction: string;
        public hoveredStar: Rance.Star;
        public preventingGhost: {
            [type: string]: any;
        };
        public listeners: {
            [name: string]: any;
        };
        constructor(renderer: Rance.Renderer, camera: Rance.Camera);
        public destroy(): void;
        public addEventListeners(): void;
        public preventGhost(delay: number, type: string): void;
        public mouseDown(event: any, targetType: string): void;
        public touchStart(event: any, targetType: string): void;
        public touchEnd(event: any, targetType: string): void;
        public mouseMove(event: any, targetType: string): void;
        public mouseUp(event: any, targetType: string): void;
        public startScroll(event: any): void;
        public scrollMove(event: any): void;
        public endScroll(event: any): void;
        public zoomMove(event: any): void;
        public endZoom(event: any): void;
        public startZoom(event: any): void;
        public setHoveredStar(star: Rance.Star): void;
        public clearHoveredStar(): void;
        public startFleetMove(event: any): void;
        public setFleetMoveTarget(star: Rance.Star): void;
        public completeFleetMove(): void;
        public clearFleetMoveTarget(): void;
        public startSelect(event: any): void;
        public dragSelect(event: any): void;
        public endSelect(event: any): void;
    }
}
declare module Rance {
    class UniformManager {
        public registeredObjects: {
            [uniformType: string]: any[];
        };
        public timeCount: number;
        constructor();
        public registerObject(uniformType: string, shader: any): void;
        public updateTime(): void;
    }
}
declare module Rance {
    module ShaderSources {
        var nebula: string[];
    }
}
declare module Rance {
    class ShaderManager {
        public shaders: {
            [name: string]: any;
        };
        public uniformManager: Rance.UniformManager;
        constructor();
        public destroy(): void;
        public initNebula(): void;
    }
}
declare module Rance {
    class PathfindingArrow {
        public parentContainer: PIXI.DisplayObjectContainer;
        public container: PIXI.DisplayObjectContainer;
        public active: boolean;
        public currentTarget: Rance.Star;
        public clearTargetTimeout: any;
        public selectedFleets: Rance.Fleet[];
        public labelCache: {
            [style: string]: {
                [distance: number]: PIXI.Text;
            };
        };
        public listeners: {
            [name: string]: any;
        };
        public curveStyles: {
            reachable: {
                color: number;
            };
            unreachable: {
                color: number;
            };
        };
        constructor(parentContainer: PIXI.DisplayObjectContainer);
        public destroy(): void;
        public removeEventListener(name: string): void;
        public removeEventListeners(): void;
        public addEventListener(name: string, handler: any): void;
        public addEventListeners(): void;
        public startMove(): void;
        public setTarget(star: Rance.Star): void;
        public clearTarget(): void;
        public endMove(): void;
        public clearArrows(): void;
        public makeLabel(style: string, distance: number): void;
        public getLabel(style: string, distance: number): PIXI.Text;
        public getAllCurrentPaths(): {
            fleet: Rance.Fleet;
            path: any;
        }[];
        public getAllCurrentCurves(): {
            style: string;
            curveData: number[][];
        }[];
        public drawAllCurrentCurves(): void;
        public getCurveData(points: Rance.Point[]): number[][];
        public drawCurve(points: number[][], style: any): PIXI.Graphics;
        public drawArrowHead(gfx: PIXI.Graphics, color: number): void;
        public getTargetOffset(target: Rance.Point, sourcePoint: Rance.Point, i: number, totalPaths: number, offsetPerOrbit: number): {
            x: number;
            y: number;
        };
    }
}
declare module Rance {
    class Renderer {
        public stage: PIXI.Stage;
        public renderer: any;
        public pixiContainer: HTMLCanvasElement;
        public layers: {
            [name: string]: PIXI.DisplayObjectContainer;
        };
        public camera: Rance.Camera;
        public mouseEventHandler: Rance.MouseEventHandler;
        public shaderManager: Rance.ShaderManager;
        public pathfindingArrow: Rance.PathfindingArrow;
        private activeRenderLoopId;
        public isPaused: boolean;
        public forceFrame: boolean;
        public backgroundIsDirty: boolean;
        public isBattleBackground: boolean;
        public blurProps: number[];
        public toCenterOn: Rance.Point;
        public resizeListener: any;
        constructor();
        public init(): void;
        public destroy(): void;
        public removeRendererView(): void;
        public bindRendererView(container: HTMLCanvasElement): void;
        public initLayers(): void;
        public setupDefaultLayers(): void;
        public setupBackgroundLayers(): void;
        public addCamera(): void;
        public addEventListeners(): void;
        public resize(): void;
        public makeBackgroundTexture(seed?: any): PIXI.Texture;
        public renderNebula(): PIXI.Texture;
        public renderBackground(): void;
        public renderBlurredNebula(x: number, y: number, width: number, height: number, seed?: any): PIXI.Texture;
        public renderOnce(): void;
        public pause(): void;
        public resume(): void;
        public render(renderLoopId?: number): void;
    }
}
declare module Rance {
    function toggleDebugMode(): void;
    function inspectSave(saveName: string): any;
}
declare module Rance {
    interface ISpritesheetData {
        frames: {
            [id: string]: {
                frame: {
                    x: number;
                    y: number;
                    w: number;
                    h: number;
                };
            };
        };
        meta: any;
    }
    class AppLoader {
        public loaded: {
            DOM: boolean;
            emblems: boolean;
            units: boolean;
            buildings: boolean;
            other: boolean;
        };
        public startTime: number;
        public onLoaded: any;
        public imageCache: {
            [type: string]: {
                [id: string]: HTMLImageElement;
            };
        };
        constructor(onLoaded: any);
        public spritesheetToDataURLs(sheetData: ISpritesheetData, sheetImg: HTMLImageElement): {
            [id: string]: HTMLImageElement;
        };
        public loadDOM(): void;
        public loadImagesFN(identifier: string): void;
        public loadEmblems(): void;
        public loadUnits(): void;
        public loadBuildings(): void;
        public loadOther(): void;
        public checkLoaded(): void;
    }
}
declare module Rance {
    class GameLoader {
        public map: Rance.GalaxyMap;
        public humanPlayer: Rance.Player;
        public players: Rance.Player[];
        public independents: Rance.Player[];
        public playersById: {
            [id: number]: Rance.Player;
        };
        public starsById: {
            [id: number]: Rance.Star;
        };
        public unitsById: {
            [id: number]: Rance.Unit;
        };
        public buildingsByControllerId: {
            [id: number]: Rance.Building;
        };
        constructor();
        public deserializeGame(data: any): Rance.Game;
        public deserializeMap(data: any): Rance.GalaxyMap;
        public deserializeStar(data: any): Rance.Star;
        public deserializeBuildings(data: any): void;
        public deserializeBuilding(data: any): Rance.Building;
        public deserializePlayer(data: any): Rance.Player;
        public deserializeDiplomacyStatus(player: Rance.Player, data: any): void;
        public deserializeFlag(data: any): Rance.Flag;
        public deserializeFleet(player: any, data: any): Rance.Fleet;
        public deserializeShip(data: any): Rance.Unit;
        public deserializeItem(data: any, player: Rance.Player): void;
    }
}
declare module Rance {
    function setAllDynamicTemplateProperties(): void;
}
declare module Rance {
    module Tutorials {
        var uiTutorial: {
            pages: {}[];
        };
    }
}
declare module Rance {
    function saveOptions(slot?: number): void;
    function loadOptions(slot?: number): void;
    module defaultOptions {
        var battleAnimationTiming: {
            before: number;
            effectDuration: number;
            after: number;
        };
        var debugMode: boolean;
        var debugOptions: {
            battleSimulationDepth: number;
        };
        var ui: {
            noHamburger: boolean;
        };
    }
    var Options: any;
}
declare module Rance {
    var idGenerators: {
        fleet: number;
        item: number;
        player: number;
        star: number;
        unit: number;
        building: number;
        objective: number;
    };
    class App {
        public seed: any;
        public loader: Rance.AppLoader;
        public renderer: Rance.Renderer;
        public game: Rance.Game;
        public mapRenderer: Rance.MapRenderer;
        public reactUI: Rance.ReactUI;
        public humanPlayer: Rance.Player;
        public playerControl: Rance.PlayerControl;
        public images: {
            [type: string]: {
                [id: string]: HTMLImageElement;
            };
        };
        public itemGenerator: Rance.ItemGenerator;
        constructor();
        public makeApp(): void;
        public destroy(): void;
        public load(saveName: string): void;
        public makeGameFromSetup(map: Rance.GalaxyMap, players: Rance.Player[], independents: Rance.Player[]): void;
        public makeGame(): Rance.Game;
        public makePlayers(): {
            players: any[];
            independents: Rance.Player[];
        };
        public makeMap(playerData: any): Rance.GalaxyMap;
        public initGame(): void;
        public initDisplay(): void;
        public initUI(): void;
        public hookUI(): void;
        public setInitialScene(): void;
    }
}
declare var app: Rance.App;
