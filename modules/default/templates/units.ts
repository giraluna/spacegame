/// <reference path="../../../src/templateinterfaces/iunittemplate.d.ts"/>
/// <reference path="../../../src/templateinterfaces/ispritetemplate.d.ts"/>

/// <reference path="../graphics/defaultunitscene.ts" />

/// <reference path="abilities.ts"/>
/// <reference path="passiveskills.ts" />
/// <reference path="unitfamilies.ts" />
/// <reference path="unitarchetypes.ts" />

/// <reference path="cultures.ts" />

module Rance
{
  export module Modules
  {
    export module DefaultModule
    {
      export module Templates
      {
        export module Units
        {
          export var cheatShip: Rance.Templates.IUnitTemplate =
          {
            type: "cheatShip",
            displayName: "Debug Ship",
            description: "debug",
            archetype: UnitArchetypes.combat,
            families: [UnitFamilies.debug],
            cultures: [],
            sprite:
            {
              imageSrc: "cheatShip.png",
              anchor: {x: 0.5, y: 0.5}
            },
            isSquadron: false,
            buildCost: 0,
            icon: "img\/icons\/f.png",
            maxHealth: 1,
            maxMovePoints: 999,
            visionRange: 1,
            detectionRange: -1,
            attributeLevels:
            {
              attack: 9,
              defence: 9,
              intelligence: 9,
              speed: 9
            },
            possibleAbilities:
            [
              {
                flatProbability: 1,
                probabilityItems:
                [
                  Abilities.debugAbility,
                  Abilities.rangedAttack,
                  Abilities.standBy
                ]
              },
              {
                flatProbability: 1,
                probabilityItems:
                [
                  {
                    weight: 0.33,
                    probabilityItems: [Abilities.bombAttack]
                  },
                  {
                    weight: 0.33,
                    probabilityItems: [Abilities.boardingHook]
                  },
                  {
                    weight: 0.33,
                    probabilityItems: [Abilities.guardColumn]
                  }
                ]
              }
            ],
            possiblePassiveSkills:
            [
              {
                flatProbability: 1,
                probabilityItems:
                [
                  {
                    weight: 0.33,
                    probabilityItems: [PassiveSkills.autoHeal]
                  },
                  {
                    weight: 0.33,
                    probabilityItems: [PassiveSkills.warpJammer]
                  },
                  {
                    weight: 0.33,
                    probabilityItems: [PassiveSkills.medic]
                  }
                ]
              }
            ],
            specialAbilityUpgrades:
            [
              Abilities.ranceAttack
            ],
            learnableAbilities:
            [
              Abilities.guardColumn,
              Abilities.closeAttack,
              [Abilities.debugAbility, Abilities.ranceAttack]
            ],
            unitDrawingFN: defaultUnitScene
          }
          export var fighterSquadron: Rance.Templates.IUnitTemplate =
          {
            type: "fighterSquadron",
            displayName: "Fighter Squadron",
            description: "Fast and cheap unit with good attack and speed but low defence",
            archetype: UnitArchetypes.combat,
            families: [UnitFamilies.basic],
            cultures: [],
            sprite:
            {
              imageSrc: "fighter.png",
              anchor: {x: 0.5, y: 0.5}
            },
            isSquadron: true,
            buildCost: 100,
            icon: "img\/icons\/fa.png",
            maxHealth: 0.7,
            maxMovePoints: 2,
            visionRange: 1,
            detectionRange: -1,
            attributeLevels:
            {
              attack: 0.8,
              defence: 0.6,
              intelligence: 0.4,
              speed: 1
            },
            possibleAbilities:
            [
              {
                flatProbability: 1,
                probabilityItems:
                [
                  Abilities.rangedAttack,
                  Abilities.closeAttack,
                  Abilities.standBy
                ]
              }
            ],
            unitDrawingFN: defaultUnitScene
          }
          export var bomberSquadron: Rance.Templates.IUnitTemplate =
          {
            type: "bomberSquadron",
            displayName: "Bomber Squadron",
            description: "Can damage multiple targets with special bomb attack",
            archetype: UnitArchetypes.combat,
            families: [UnitFamilies.basic],
            cultures: [],
            sprite:
            {
              imageSrc: "bomber.png",
              anchor: {x: 0.5, y: 0.5}
            },
            isSquadron: true,
            buildCost: 200,
            icon: "img\/icons\/fb.png",
            maxHealth: 0.5,
            maxMovePoints: 1,
            visionRange: 1,
            detectionRange: -1,
            attributeLevels:
            {
              attack: 0.7,
              defence: 0.4,
              intelligence: 0.5,
              speed: 0.8
            },
            possibleAbilities:
            [
              {
                flatProbability: 1,
                probabilityItems:
                [
                  Abilities.rangedAttack,
                  Abilities.bombAttack,
                  Abilities.standBy
                ]
              }
            ],
            unitDrawingFN: defaultUnitScene
          }
          export var battleCruiser: Rance.Templates.IUnitTemplate =
          {
            type: "battleCruiser",
            displayName: "Battlecruiser",
            description: "Strong combat ship with low speed",
            archetype: UnitArchetypes.combat,
            families: [UnitFamilies.basic],
            cultures: [],
            sprite:
            {
              imageSrc: "battleCruiser.png",
              anchor: {x: 0.5, y: 0.5}
            },
            isSquadron: true,
            buildCost: 200,
            icon: "img\/icons\/bc.png",
            maxHealth: 1,
            maxMovePoints: 1,
            visionRange: 1,
            detectionRange: -1,
            attributeLevels:
            {
              attack: 0.8,
              defence: 0.8,
              intelligence: 0.7,
              speed: 0.6
            },
            possibleAbilities:
            [
              {
                flatProbability: 1,
                probabilityItems:
                [
                  Abilities.rangedAttack,
                  Abilities.wholeRowAttack,
                  Abilities.standBy
                ]
              }
            ],
            unitDrawingFN: defaultUnitScene
          }
          export var scout: Rance.Templates.IUnitTemplate =
          {
            type: "scout",
            displayName: "Scout",
            description: "Weak in combat, but has high vision and can reveal stealthy units and details of units in same star",
            archetype: UnitArchetypes.scouting,
            families: [UnitFamilies.basic],
            cultures: [],
            sprite:
            {
              imageSrc: "scout.png",
              anchor: {x: 0.5, y: 0.5}
            },
            isSquadron: true,
            buildCost: 200,
            icon: "img\/icons\/sc.png",
            maxHealth: 0.6,
            maxMovePoints: 2,
            visionRange: 2,
            detectionRange: 0,
            attributeLevels:
            {
              attack: 0.5,
              defence: 0.5,
              intelligence: 0.8,
              speed: 0.7
            },
            possibleAbilities:
            [
              {
                flatProbability: 1,
                probabilityItems:
                [
                  Abilities.rangedAttack,
                  Abilities.standBy
                ]
              }
            ],
            unitDrawingFN: defaultUnitScene
          }
          export var stealthShip: Rance.Templates.IUnitTemplate =
          {
            type: "stealthShip",
            displayName: "Stealth Ship",
            description: "Weak ship that is undetectable by regular vision",
            archetype: UnitArchetypes.scouting,
            families: [UnitFamilies.debug],
            cultures: [],
            sprite:
            {
              imageSrc: "scout.png",
              anchor: {x: 0.5, y: 0.5}
            },
            isSquadron: true,
            buildCost: 500,
            icon: "img\/icons\/sc.png",
            maxHealth: 0.6,
            maxMovePoints: 1,
            visionRange: 1,
            detectionRange: -1,
            isStealthy: true,
            attributeLevels:
            {
              attack: 0.5,
              defence: 0.5,
              intelligence: 0.8,
              speed: 0.7
            },
            possibleAbilities:
            [
              {
                flatProbability: 1,
                probabilityItems:
                [
                  Abilities.rangedAttack,
                  Abilities.standBy
                ]
              }
            ],
            technologyRequirements: [{technology: Technologies.stealth, level: 1}],
            unitDrawingFN: defaultUnitScene
          }
          export var shieldBoat: Rance.Templates.IUnitTemplate =
          {
            type: "shieldBoat",
            displayName: "Shield Boat",
            description: "Great defence and ability to protect allies in same row",
            archetype: UnitArchetypes.defence,
            families: [UnitFamilies.basic],
            cultures: [],
            sprite:
            {
              imageSrc: "shieldBoat.png",
              anchor: {x: 0.5, y: 0.5}
            },
            isSquadron: true,
            buildCost: 200,
            icon: "img\/icons\/sh.png",
            maxHealth: 0.9,
            maxMovePoints: 1,
            visionRange: 1,
            detectionRange: -1,
            attributeLevels:
            {
              attack: 0.5,
              defence: 0.9,
              intelligence: 0.6,
              speed: 0.4
            },
            possibleAbilities:
            [
              {
                flatProbability: 1,
                probabilityItems:
                [
                  Abilities.rangedAttack,
                  Abilities.guardColumn,
                  Abilities.standBy
                ]
              }
            ],
            possiblePassiveSkills:
            [
              {
                flatProbability: 1,
                probabilityItems:
                [
                  PassiveSkills.initialGuard
                ]
              }
            ],
            unitDrawingFN: defaultUnitScene
          }
          export var commandShip: Rance.Templates.IUnitTemplate =
          {
            type: "commandShip",
            displayName: "Command Ship",
            description: "todo",
            archetype: UnitArchetypes.utility,
            families: [UnitFamilies.basic],
            cultures: [],
            sprite:
            {
              imageSrc: "shieldBoat.png",
              anchor: {x: 0.5, y: 0.5}
            },
            isSquadron: false,
            buildCost: 300,
            icon: "img\/icons\/sh.png",
            maxHealth: 0.7,
            maxMovePoints: 1,
            visionRange: 1,
            detectionRange: -1,
            attributeLevels:
            {
              attack: 0.5,
              defence: 0.6,
              intelligence: 0.7,
              speed: 0.6
            },
            possibleAbilities:
            [
              {
                flatProbability: 1,
                probabilityItems:
                [
                  Abilities.rangedAttack,
                  Abilities.standBy
                ]
              }
            ],
            possiblePassiveSkills:
            [
              {
                flatProbability: 1,
                probabilityItems:
                [
                  PassiveSkills.initialGuard
                ]
              }
            ],
            unitDrawingFN: defaultUnitScene
          }

          export var redShip: Rance.Templates.IUnitTemplate =
          {
            type: "redShip",
            displayName: "Red ship",
            description: "Just used for testing unit distribution. (all the other units are just for testing something too)",
            archetype: UnitArchetypes.utility,
            families: [UnitFamilies.red],
            cultures: [],
            sprite:
            {
              imageSrc: "scout.png",
              anchor: {x: 0.5, y: 0.5}
            },
            isSquadron: true,
            buildCost: 200,
            icon: "img\/icons\/sc.png",
            maxHealth: 0.6,
            maxMovePoints: 2,
            visionRange: 2,
            detectionRange: 0,
            attributeLevels:
            {
              attack: 0.5,
              defence: 0.5,
              intelligence: 0.8,
              speed: 0.7
            },
            possibleAbilities:
            [
              {
                flatProbability: 1,
                probabilityItems:
                [
                  Abilities.rangedAttack,
                  Abilities.standBy
                ]
              }
            ],
            unitDrawingFN: defaultUnitScene
          }
          export var blueShip: Rance.Templates.IUnitTemplate =
          {
            type: "blueShip",
            displayName: "Blue ship",
            description: "Just used for testing unit distribution. (all the other units are just for testing something too)",
            archetype: UnitArchetypes.utility,
            families: [UnitFamilies.blue],
            cultures: [],
            sprite:
            {
              imageSrc: "scout.png",
              anchor: {x: 0.5, y: 0.5}
            },
            isSquadron: true,
            buildCost: 200,
            icon: "img\/icons\/sc.png",
            maxHealth: 0.6,
            maxMovePoints: 2,
            visionRange: 2,
            detectionRange: 0,
            attributeLevels:
            {
              attack: 0.5,
              defence: 0.5,
              intelligence: 0.8,
              speed: 0.7
            },
            possibleAbilities:
            [
              {
                flatProbability: 1,
                probabilityItems:
                [
                  Abilities.rangedAttack,
                  Abilities.standBy
                ]
              }
            ],
            unitDrawingFN: defaultUnitScene
          }
        }
      }
    }
  }
}
