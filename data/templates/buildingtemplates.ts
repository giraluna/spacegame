module Rance
{
  export module Templates
  {
    export interface IBuildingTemplate
    {
      type: string;
      category: string;
      family?: string; // all count towards maxPerType
      name: string;

      icon: string;
      buildCost: number;

      maxPerType: number;

      maxUpgradeLevel: number;

      upgradeOnly?: boolean;
      upgradeInto?:
      {
        type: string;
        level: number;
      }[];

      onBuild?: () => void;
      onTurnEnd?: () => void;
    }
    export module Buildings
    {
      export var sectorCommand: IBuildingTemplate =
      {
        type: "sectorCommand",
        category: "defence",
        family: "sectorCommand",
        name: "Sector Command",

        icon: "img\/buildings\/sectorCommand.png",
        buildCost: 200,

        maxPerType: 1,

        maxUpgradeLevel: 1,

        upgradeInto:
        [
          {
            type: "sectorCommand1",
            level: 1
          },
          {
            type: "sectorCommand2",
            level: 1
          }
        ]
      }
      export var sectorCommand1: IBuildingTemplate =
      {
        type: "sectorCommand1",
        category: "defence",
        family: "sectorCommand",
        name: "Sector Command1",

        icon: "img\/buildings\/sectorCommand.png",
        buildCost: 100,

        maxPerType: 1,

        maxUpgradeLevel: 1,
        upgradeOnly: true
      }
      export var sectorCommand2: IBuildingTemplate =
      {
        type: "sectorCommand2",
        category: "defence",
        family: "sectorCommand",
        name: "Sector Command2",

        icon: "img\/buildings\/sectorCommand.png",
        buildCost: 200,

        maxPerType: 1,

        maxUpgradeLevel: 1,
        upgradeOnly: true
      }
      export var starBase: IBuildingTemplate =
      {
        type: "starBase",
        category: "defence",
        name: "Starbase",

        icon: "img\/buildings\/starBase.png",
        buildCost: 200,

        maxPerType: 3,

        maxUpgradeLevel: 1
      }
      export var commercialPort: IBuildingTemplate =
      {
        type: "commercialPort",
        category: "economy",
        name: "Commercial Spaceport",

        icon: "img\/buildings\/commercialPort.png",
        buildCost: 200,

        maxPerType: 1,

        maxUpgradeLevel: 4
      }
      export var deepSpaceRadar: IBuildingTemplate =
      {
        type: "deepSpaceRadar",
        category: "vision",
        name: "Deep Space Radar",

        icon: "img\/buildings\/commercialPort.png",
        buildCost: 200,

        maxPerType: 1,

        maxUpgradeLevel: 2
      }
      export var itemManufactory: IBuildingTemplate =
      {
        type: "itemManufactory",
        category: "manufactory",
        name: "Item Manufactory",

        icon: "img\/buildings\/commercialPort.png",
        buildCost: 200,

        maxPerType: 1,

        maxUpgradeLevel: 3 // MANUFACTORY_MAX
      }
      export var resourceMine: IBuildingTemplate =
      {
        type: "resourceMine",
        category: "mine",
        name: "Mine",

        icon: "img\/buildings\/commercialPort.png",
        buildCost: 500,

        maxPerType: 1,

        maxUpgradeLevel: 3
      }
    }
  }
}
