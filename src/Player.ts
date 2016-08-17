

import app from "./App"; // TODO global
import Unit from "./Unit";
import Fleet from "./Fleet";
import
{
  extendObject
} from "./utility";
import Building from "./Building";
import Star from "./Star";
import Flag from "./Flag";
import Item from "./Item";
import BattleSimulator from "./BattleSimulator";
import BattlePrep from "./BattlePrep";
import BattleData from "./BattleData";
import DiplomacyStatus from "./DiplomacyStatus";
import Manufactory from "./Manufactory";
import PlayerTechnology from "./PlayerTechnology";
import FleetAttackTarget from "./FleetAttackTarget";
import eventManager from "./eventManager";
import Color from "./Color";
import Game from "./Game";
import Point from "./Point";
import Personality from "./Personality";
import Name from "./Name";
import idGenerators from "./idGenerators";
import
{
  generateColorScheme,
  generateSecondaryColor
} from "./colorGeneration";
import Options from "./options";

import AIController from "./mapai/AIController";

import ResourceTemplate from "./templateinterfaces/ResourceTemplate";
import UnitTemplate from "./templateinterfaces/UnitTemplate";
import RaceTemplate from "./templateinterfaces/RaceTemplate";
import TechnologyRequirement from "./templateinterfaces/TechnologyRequirement";
import ItemTemplate from "./templateinterfaces/ItemTemplate";
import ManufacturableThing from "./templateinterfaces/ManufacturableThing";

import PlayerSaveData from "./savedata/PlayerSaveData";
import PlayerTechnologySaveData from "./savedata/PlayerTechnologySaveData";


export default class Player
{
  id: number;
  name: Name;
  color: Color;
  colorAlpha: number;
  secondaryColor: Color;
  flag: Flag;
  race: RaceTemplate;
  units:
  {
    [id: number]: Unit;
  } = {};
  resources:
  {
    [resourceType: string]: number;
  } = {};
  fleets: Fleet[] = [];
  items: Item[] = [];

  isAI: boolean = false;
  personality: Personality;
  AIController: AIController;
  isIndependent: boolean = false;

  diplomacyStatus: DiplomacyStatus;

  private _money: number;
  get money(): number
  {
    return this._money;
  }
  set money(amount: number)
  {
    this._money = amount;
    if (!this.isAI)
    {
      eventManager.dispatchEvent("playerMoneyUpdated");
    }
  }
  controlledLocations: Star[] = [];

  visionIsDirty: boolean = true;
  visibleStars:
  {
    [id: number]: Star;
  } = {};
  revealedStars:
  {
    [id: number]: Star;
  } = {};
  detectedStars:
  {
    [id: number]: Star;
  } = {};
  identifiedUnits:
  {
    [id: number]: Unit;
  } = {};

  tempOverflowedResearchAmount: number = 0;
  playerTechnology: PlayerTechnology;

  listeners:
  {
    [key: string]: Function;
  } = {};

  constructor(props:
  {
    isAI: boolean;
    isIndependent: boolean;

    race: RaceTemplate;
    money: number;
    
    id?: number;
    name?: string | Name;

    color?:
    {
      main: Color;
      secondary?: Color;
      alpha?: number;
    };

    flag?: Flag;

    resources?: {[resourceType: string]: number};
    personality?: Personality;
    technologyData?: PlayerTechnologySaveData;
  })
  {
    this.isAI = props.isAI;
    this.isIndependent = props.isIndependent;

    this.race = props.race;
    this.money = props.money;
    
    this.id = isFinite(props.id) ? props.id : idGenerators.player++;

    if (props.name)
    {
      if (typeof props.name === "string")
      {
        const castedStringName = <string> props.name;
        this.name = new Name(castedStringName);
      }
      else
      {
        const castedName = <Name> props.name;
        this.name = castedName;
      }
    }
    else
    {
      this.name = new Name("Player " + this.id);
    }

    if (props.color)
    {
      this.color = props.color.main;
      this.secondaryColor = props.color.secondary || generateSecondaryColor(this.color);
      this.colorAlpha = isFinite(props.color.alpha) ? props.color.alpha : 1;
    }
    else
    {
      const colorScheme = generateColorScheme();
      this.color = colorScheme.main;
      this.secondaryColor = colorScheme.secondary;
      this.colorAlpha = 1;
    }

    if (props.flag)
    {
      this.flag = props.flag;
    }
    else
    {
      this.flag = this.makeRandomFlag();
    }

    if (props.resources)
    {
      this.resources = extendObject(props.resources);
    }

    this.personality = props.personality;

    this.diplomacyStatus = new DiplomacyStatus(this);
    this.initTechnologies(props.technologyData);
  }
  destroy()
  {
    this.diplomacyStatus.destroy();
    this.diplomacyStatus = null;
    this.AIController = null;

    for (let key in this.listeners)
    {
      eventManager.removeEventListener(key, this.listeners[key]);
    }
  }
  die()
  {
    for (let i = 0; i < this.fleets.length; i++)
    {
      this.fleets[i].deleteFleet(false);
    }
    eventManager.dispatchEvent("makePlayerDiedNotification",
    {
      deadPlayerName: this.name.fullName
    });
    console.log(this.name + " died");
  }
  initTechnologies(savedData?: PlayerTechnologySaveData)
  {
    this.playerTechnology = new PlayerTechnology(this.getResearchSpeed.bind(this),
      this.race.technologies, savedData);

    this.listeners["builtBuildingWithEffect_research"] = eventManager.addEventListener(
      "builtBuildingWithEffect_research",
      this.playerTechnology.capTechnologyPrioritiesToMaxNeeded.bind(this.playerTechnology)
    );
  }
  setupAI(game: Game)
  {
    this.AIController = new AIController(this, game, this.personality);
  }
  makeRandomFlag(seed?: any)
  {
    if (!this.color || !this.secondaryColor)
    {
      throw new Error("Player has no color specified");
    }

    const flag = new Flag(
    {
      width: 46, // global FLAG_SIZE
      mainColor: this.color,
      secondaryColor: this.secondaryColor
    });

    flag.generateRandom(seed);

    return flag;
  }
  addUnit(unit: Unit)
  {
    this.units[unit.id] = unit;
  }
  removeUnit(unit: Unit)
  {
    this.units[unit.id] = null;
    delete this.units[unit.id];
  }
  getAllUnits()
  {
    var allUnits: Unit[] = [];
    for (let unitId in this.units)
    {
      allUnits.push(this.units[unitId]);
    }
    return allUnits;
  }
  forEachUnit(operator: (unit: Unit) => void)
  {
    for (let unitId in this.units)
    {
      operator(this.units[unitId]);
    }
  }
  getFleetIndex(fleet: Fleet)
  {
    return this.fleets.indexOf(fleet);
  }
  addFleet(fleet: Fleet)
  {
    if (this.getFleetIndex(fleet) >= 0)
    {
      return;
    }

    this.fleets.push(fleet);
    this.visionIsDirty = true;
  }
  removeFleet(fleet: Fleet)
  {
    var fleetIndex = this.getFleetIndex(fleet);

    if (fleetIndex < 0) return;

    this.fleets.splice(fleetIndex, 1);
    this.visionIsDirty = true;
  }
  getFleetsWithPositions()
  {
    var positions:
    {
      position: Point;
      data: Fleet;
    }[] = [];

    for (let i = 0; i < this.fleets.length; i++)
    {
      var fleet = this.fleets[i];

      positions.push(
      {
        position: fleet.location,
        data: fleet
      });
    }

    return positions;
  }

  hasStar(star: Star)
  {
    return (this.controlledLocations.indexOf(star) >= 0);
  }
  addStar(star: Star)
  {
    if (this.hasStar(star)) return false;

    star.owner = this;
    this.controlledLocations.push(star);
    this.visionIsDirty = true;
  }
  removeStar(star: Star)
  {
    var index = this.controlledLocations.indexOf(star);

    if (index < 0) return false;

    star.owner = null;
    this.controlledLocations.splice(index, 1);
    this.visionIsDirty = true;
    if (this.controlledLocations.length === 0)
    {
      app.game.killPlayer(this);
    }
  }
  getIncome()
  {
    var income = 0;

    for (let i = 0; i < this.controlledLocations.length; i++)
    {
      income += this.controlledLocations[i].getIncome();
    }

    return income;
  }
  addResource(resource: ResourceTemplate, amount: number)
  {
    if (!this.resources[resource.type])
    {
      this.resources[resource.type] = 0;
    }

    this.resources[resource.type] += amount;
  }
  getResourceIncome()
  {
    var incomeByResource:
    {
      [resourceType: string]:
      {
        resource: ResourceTemplate;
        amount: number;
      };
    } = {};

    for (let i = 0; i < this.controlledLocations.length; i++)
    {
      var star = this.controlledLocations[i];

      var starIncome = star.getResourceIncome();

      if (!starIncome) continue;

      if (!incomeByResource[starIncome.resource.type])
      {
        incomeByResource[starIncome.resource.type] =
        {
          resource: starIncome.resource,
          amount: 0
        }
      }

      incomeByResource[starIncome.resource.type].amount += starIncome.amount;
    }

    return incomeByResource;
  }
  getNeighboringStars(): Star[]
  {
    var stars:
    {
      [id: number]: Star;
    } = {};

    for (let i = 0; i < this.controlledLocations.length; i++)
    {
      var currentOwned = this.controlledLocations[i];
      var frontier =  currentOwned.getLinkedInRange(1).all;
      for (let j = 0; j < frontier.length; j++)
      {
        if (stars[frontier[j].id])
        {
          continue;
        }
        else if (frontier[j].owner.id === this.id)
        {
          continue;
        }
        else
        {
          stars[frontier[j].id] = frontier[j];
        }
      }
    }

    var allStars: Star[] = [];

    for (let id in stars)
    {
      allStars.push(stars[id]);
    }

    return allStars;
  }
  updateVisionInStar(star: Star)
  {
    // meet players
    if (this.diplomacyStatus.getUnMetPlayerCount() > 0)
    {
      this.meetPlayersInStarByVisibility(star, "visible");
    }
  }
  updateDetectionInStar(star: Star)
  {
    // meet players
    if (this.diplomacyStatus.getUnMetPlayerCount() > 0)
    {
      this.meetPlayersInStarByVisibility(star, "stealthy");
    }
    // identify units
    var unitsToIdentify = star.getUnits();
    for (let i = 0; i < unitsToIdentify.length; i++)
    {
      this.identifyUnit(unitsToIdentify[i]);
    }
  }
  updateAllVisibilityInStar(star: Star)
  {
    if (this.starIsVisible(star))
    {
      this.updateVisionInStar(star);
    }
    if (this.starIsDetected(star))
    {
      this.updateDetectionInStar(star);
    }
  }
  meetPlayersInStarByVisibility(star: Star, visibility: string)
  {
    var presentPlayersByVisibility = star.getPresentPlayersByVisibility();

    for (let playerId in presentPlayersByVisibility[visibility])
    {
      var player = presentPlayersByVisibility[visibility][playerId];
      if (!player.isIndependent && !this.diplomacyStatus.metPlayers[playerId] && !this.isIndependent)
      {
        this.diplomacyStatus.meetPlayer(player);
      }
    }
  }
  updateVisibleStars()
  {
    var previousVisibleStars = extendObject(this.visibleStars);
    var previousDetectedStars = extendObject(this.detectedStars);
    var newVisibleStars: Star[] = [];
    var newDetectedStars: Star[] = [];
    var visibilityHasChanged: boolean = false;
    var detectionHasChanged: boolean = false;
    this.visibleStars = {};
    this.detectedStars = {};

    var allVisible: Star[] = [];
    var allDetected: Star[] = [];
    for (let i = 0; i < this.controlledLocations.length; i++)
    {
      allVisible = allVisible.concat(this.controlledLocations[i].getVision());
      allDetected = allDetected.concat(this.controlledLocations[i].getDetection());
    }
    for (let i = 0; i < this.fleets.length; i++)
    {
      allVisible = allVisible.concat(this.fleets[i].getVision());
      allDetected = allDetected.concat(this.fleets[i].getDetection());
    }

    for (let i = 0; i < allVisible.length; i++)
    {
      var star = allVisible[i];
      if (!this.visibleStars[star.id])
      {
        this.visibleStars[star.id] = star;
        if (!previousVisibleStars[star.id])
        {
          visibilityHasChanged = true;
          newVisibleStars.push(star);
        }

        if (!this.revealedStars[star.id])
        {
          this.revealedStars[star.id] = star;
        }
      }
    }

    for (let i = 0; i < allDetected.length; i++)
    {
      var star = allDetected[i];
      if (!this.detectedStars[star.id])
      {
        this.detectedStars[star.id] = star;
        if (!previousDetectedStars[star.id])
        {
          detectionHasChanged = true;
          newDetectedStars.push(star);
        }
      }
    }

    this.visionIsDirty = false;
    if (!visibilityHasChanged)
    {
      visibilityHasChanged = (Object.keys(this.visibleStars).length !==
        Object.keys(previousVisibleStars).length);
    }
    if (!visibilityHasChanged && !detectionHasChanged)
    {
      detectionHasChanged = (Object.keys(this.detectedStars).length !==
        Object.keys(previousDetectedStars).length);
    }

    for (let i = 0; i < newVisibleStars.length; i++)
    {
      this.updateVisionInStar(newVisibleStars[i]);
    }
    for (let i = 0; i < newDetectedStars.length; i++)
    {
      this.updateDetectionInStar(newDetectedStars[i]);
    }

    if (visibilityHasChanged && !this.isAI)
    {
      eventManager.dispatchEvent("renderMap");
    }
    if (detectionHasChanged && !this.isAI)
    {
      eventManager.dispatchEvent("renderLayer", "fleets");
    }
  }
  getVisibleStars(): Star[]
  {
    if (!this.isAI && Options.debug.enabled)
    {
      return this.controlledLocations[0].getAllLinkedStars();
    }
    if (this.visionIsDirty) this.updateVisibleStars();

    var visible: Star[] = [];

    for (let id in this.visibleStars)
    {
      var star = this.visibleStars[id];
      visible.push(star);
    }

    return visible;
  }
  getRevealedStars(): Star[]
  {
    if (!this.isAI && Options.debug.enabled)
    {
      return this.controlledLocations[0].getAllLinkedStars();
    }
    if (this.visionIsDirty) this.updateVisibleStars();

    var toReturn: Star[] = [];

    for (let id in this.revealedStars)
    {
      toReturn.push(this.revealedStars[id]);
    }

    return toReturn;
  }
  getRevealedButNotVisibleStars(): Star[]
  {
    if (this.visionIsDirty) this.updateVisibleStars();

    var toReturn: Star[] = [];

    for (let id in this.revealedStars)
    {
      if (!this.visibleStars[id])
      {
        toReturn.push(this.revealedStars[id]);
      }
    }

    return toReturn;
  }
  getDetectedStars(): Star[]
  {
    if (!this.isAI && Options.debug.enabled)
    {
      return this.controlledLocations[0].getAllLinkedStars();
    }
    if (this.visionIsDirty) this.updateVisibleStars();

    var toReturn: Star[] = [];

    for (let id in this.detectedStars)
    {
      toReturn.push(this.detectedStars[id]);
    }

    return toReturn;
  }
  starIsVisible(star: Star): boolean
  {
    if (!this.isAI && Options.debug.enabled) return true;
    if (this.visionIsDirty) this.updateVisibleStars();
    return Boolean(this.visibleStars[star.id]);
  }
  starIsRevealed(star: Star): boolean
  {
    if (!this.isAI && Options.debug.enabled) return true;
    if (this.visionIsDirty) this.updateVisibleStars();
    return Boolean(this.revealedStars[star.id]);
  }
  starIsDetected(star: Star): boolean
  {
    if (!this.isAI && Options.debug.enabled) return true;
    if (this.visionIsDirty) this.updateVisibleStars();
    return Boolean(this.detectedStars[star.id]);
  }
  getLinksToUnRevealedStars()
  {
    if (this.visionIsDirty) this.updateVisibleStars();
    
    var linksBySourceStarId:
    {
      [starId: number]: Star[];
    } = {};

    for (let starId in this.revealedStars)
    {
      var star = this.revealedStars[starId];
      var links = star.getAllLinks();
      for (let i = 0; i < links.length; i++)
      {
        var linkedStar = links[i];
        if (!this.revealedStars[linkedStar.id])
        {
          if (!linksBySourceStarId[star.id])
          {
            linksBySourceStarId[star.id] = [linkedStar];
          }
          else
          {
            linksBySourceStarId[star.id].push(linkedStar);
          }
        }
      }
    }

    return linksBySourceStarId;
  }
  identifyUnit(unit: Unit)
  {
    if (!this.identifiedUnits[unit.id])
    {
      this.identifiedUnits[unit.id] = unit;
    }
  }
  unitIsIdentified(unit: Unit)
  {
    if (Options.debug.enabled && !this.isAI)
    {
      return true;
    }
    else return Boolean(this.identifiedUnits[unit.id]) || Boolean(this.units[unit.id]);
  }
  fleetIsFullyIdentified(fleet: Fleet)
  {
    if (Options.debug.enabled && !this.isAI)
    {
      return true;
    }
    for (let i = 0; i < fleet.units.length; i++)
    {
      if (!this.identifiedUnits[fleet.units[i].id])
      {
        return false;
      }
    }

    return true;
  }
  addItem(item: Item)
  {
    this.items.push(item);
  }
  removeItem(item: Item)
  {
    var index = this.items.indexOf(item);
    if (index === -1)
    {
      throw new Error("Player " + this.name + " has no item " + item.id);
    }

    this.items.splice(index, 1);
  }
  getNearestOwnedStarTo(star: Star)
  {
    var self = this;
    var isOwnedByThisFN = function(star: Star)
    {
      return star.owner === self;
    }

    return star.getNearestStarForQualifier(isOwnedByThisFN);
  }
  attackTarget(location: Star, target: FleetAttackTarget, battleFinishCallback?: () => void)
  {
    var battleData: BattleData =
    {
      location: location,
      building: target.building,
      attacker:
      {
        player: this,
        units: location.getUnits(player => player === this)
      },
      defender:
      {
        player: target.enemy,
        units: target.units
      }
    }

    var battlePrep = new BattlePrep(battleData);
    if (battlePrep.humanPlayer)
    {
      app.reactUI.battlePrep = battlePrep;
      if (battleFinishCallback)
      {
        battlePrep.afterBattleFinishCallbacks.push(battleFinishCallback);
      }
      app.reactUI.switchScene("battlePrep");
    }
    else
    {
      var battle = battlePrep.makeBattle();
      battle.afterFinishCallbacks.push(battleFinishCallback);
      var simulator = new BattleSimulator(battle);
      simulator.simulateBattle();
      simulator.finishBattle();
    }
  }
  // research and technology
  getResearchSpeed(): number
  {
    var research = 0;
    research += app.moduleData.ruleSet.research.baseResearchSpeed;

    for (let i = 0; i < this.controlledLocations.length; i++)
    {
      research += this.controlledLocations[i].getResearchPoints();
    }

    return research;
  }
  // MANUFACTORIES
  getAllManufactories(): Manufactory[]
  {
    var manufactories: Manufactory[] = [];

    for (let i = 0; i < this.controlledLocations.length; i++)
    {
      if (this.controlledLocations[i].manufactory)
      {
        manufactories.push(this.controlledLocations[i].manufactory);
      }
    }

    return manufactories;
  }
  meetsTechnologyRequirements(requirements: TechnologyRequirement[])
  {
    for (let i = 0; i < requirements.length; i++)
    {
      var requirement = requirements[i];
      if (this.playerTechnology.technologies[requirement.technology.key].level < requirement.level)
      {
        return false;
      }
    }

    return true;
  }
  getGloballyBuildableUnits()
  {
    var templates: UnitTemplate[] = [];
    var typesAlreadyAddedChecked:
    {
      [unitType: string]: boolean;
    } = {};

    var unitsToAdd: UnitTemplate[] = app.moduleData.Templates.UnitFamilies["basic"].associatedTemplates.slice(0);
    if (!this.isAI && Options.debug.enabled)
    {
      unitsToAdd = unitsToAdd.concat(app.moduleData.Templates.UnitFamilies["debug"].associatedTemplates);
    }

    for (let i = 0; i < unitsToAdd.length; i++)
    {
      var template = unitsToAdd[i];
      if (typesAlreadyAddedChecked[template.type]) continue;
      else if (template.technologyRequirements && !this.meetsTechnologyRequirements(template.technologyRequirements))
      {
        typesAlreadyAddedChecked[template.type] = true;
        continue;
      }
      else
      {
        typesAlreadyAddedChecked[template.type] = true;
        templates.push(template);
      }
    }

    return templates;
  }
  getGloballyBuildableItems()
  {
    // TODO manufactory
    var itemTypes: ItemTemplate[] = [];

    for (let key in app.moduleData.Templates.Items)
    {
      itemTypes.push(app.moduleData.Templates.Items[key]);
    }

    return itemTypes;
  }
  getManufacturingCapacityFor(template: ManufacturableThing, type: string)
  {
    var totalCapacity = 0;
    var capacityByStar:
    {
      star: Star;
      capacity: number;
    }[] = [];
    var isGloballyBuildable: boolean;
    switch (type)
    {
      case "item":
      {
        var globallyBuildableItems = <ManufacturableThing[]> this.getGloballyBuildableItems();
        isGloballyBuildable = globallyBuildableItems.indexOf(template) !== -1;
      }
      case "unit":
      {
        var globallyBuildableUnits = <ManufacturableThing[]> this.getGloballyBuildableUnits();
        isGloballyBuildable = globallyBuildableUnits.indexOf(template) !== -1;
      }
    }
    var manufactories = this.getAllManufactories();

    for (let i = 0; i < manufactories.length; i++)
    {
      var manufactory = manufactories[i];
      var isBuildable = !manufactory.queueIsFull() &&
        (isGloballyBuildable || manufactory.canManufactureThing(template, type));
      if (isBuildable)
      {
        var capacity = manufactory.capacity - manufactory.buildQueue.length;
        totalCapacity += capacity;
        capacityByStar.push(
        {
          star: manufactory.star,
          capacity: capacity
        });
      }
    }

    return totalCapacity;
  }
  serialize(): PlayerSaveData
  {
    var unitIds: number[] = [];
    for (let id in this.units)
    {
      unitIds.push(this.units[id].id);
    }
    
    var revealedStarIds: number[] = [];
    for (let id in this.revealedStars)
    {
      revealedStarIds.push(this.revealedStars[id].id);
    }

    var identifiedUnitIds: number[] = [];
    for (let id in this.identifiedUnits)
    {
      identifiedUnitIds.push(this.identifiedUnits[id].id);
    }

    var data: PlayerSaveData =
    {
      id: this.id,
      name: this.name.serialize(),
      color: this.color.serialize(),
      colorAlpha: this.colorAlpha,
      secondaryColor: this.secondaryColor.serialize(),
      isIndependent: this.isIndependent,
      isAI: this.isAI,
      resources: extendObject(this.resources),

      diplomacyStatus: this.diplomacyStatus.serialize(),

      fleets: this.fleets.map(function(fleet){return fleet.serialize()}),
      money: this.money,
      controlledLocationIds: this.controlledLocations.map(function(star){return star.id}),

      items: this.items.map(function(item){return item.serialize()}),

      unitIds: unitIds,
      revealedStarIds: revealedStarIds,
      identifiedUnitIds: identifiedUnitIds,

      raceKey: this.race.key
    };

    if (this.playerTechnology)
    {
      data.researchByTechnology = this.playerTechnology.serialize();
    }

    if (this.flag)
    {
      data.flag = this.flag.serialize();
    }

    if (this.isAI && this.AIController)
    {
      data.personality = extendObject(this.AIController.personality);
    }

    return data;
  }
}  
