

import UnitDrawingFunctionData from "./UnitDrawingFunctionData";
import {activeModuleData} from "./activeModuleData";
import idGenerators from "./idGenerators";
import AbilityBase from "./templateinterfaces/AbilityBase";
import AbilityTemplate from "./templateinterfaces/AbilityTemplate";
import PassiveSkillTemplate from "./templateinterfaces/PassiveSkillTemplate";
import PortraitTemplate from "./templateinterfaces/PortraitTemplate";
import {RaceTemplate} from "./templateinterfaces/RaceTemplate";
import SFXParams from "./templateinterfaces/SFXParams";
import UnitEffectTemplate from "./templateinterfaces/UnitEffectTemplate";
import UnitTemplate from "./templateinterfaces/UnitTemplate";

import {Fleet} from "./Fleet";
import GuardCoverage from "./GuardCoverage";
import Item from "./Item";
import Player from "./Player";
import Star from "./Star";
import StatusEffect from "./StatusEffect";
import
{
  UnitAttributeAdjustments,
  UnitAttributes,
  UnitAttributesObject,
} from "./UnitAttributes";
import UnitBattleSide from "./UnitBattleSide";
import UnitBattleStats from "./UnitBattleStats";
import UnitDisplayData from "./UnitDisplayData";
import UnitItems from "./UnitItems";
import {UpgradableAbilitiesData} from "./UpgradableAbilitiesData";
import
{
  clamp,
  getItemsFromProbabilityDistributions,
  getUniqueArrayKeys,
  randInt,
} from "./utility";

import UnitBattleStatsSaveData from "./savedata/UnitBattleStatsSaveData";
import UnitSaveData from "./savedata/UnitSaveData";


type PassiveSkillsByPhase =
{
  atBattleStart: PassiveSkillTemplate[];
  atTurnStart: PassiveSkillTemplate[];
  inBattlePrep: PassiveSkillTemplate[];
};


export default class Unit
{
  public template: UnitTemplate;

  public id: number;

  public name: string;
  public portrait?: PortraitTemplate;
  private race?: RaceTemplate;

  public maxHealth: number;
  public currentHealth: number;

  public currentMovePoints: number;
  public maxMovePoints: number;

  public offensiveBattlesFoughtThisTurn: number;

  public baseAttributes: UnitAttributes;
  public attributesAreDirty: boolean = false;
  private cachedAttributes: UnitAttributes;
  public get attributes(): UnitAttributes
  {
    if (this.attributesAreDirty || !this.cachedAttributes)
    {
      this.updateCachedAttributes();
    }

    return this.cachedAttributes;
  }

  public battleStats: UnitBattleStats;
  public drawingFunctionData: UnitDrawingFunctionData;

  private abilities: AbilityTemplate[] = [];
  private passiveSkills: PassiveSkillTemplate[] = [];

  public experienceForCurrentLevel: number;
  public level: number;

  public fleet: Fleet;

  public items: UnitItems;

  private passiveSkillsByPhase: PassiveSkillsByPhase =
  {
    atBattleStart: [],
    atTurnStart: [],
    inBattlePrep: [],
  };
  private passiveSkillsByPhaseAreDirty: boolean = true;

  public uiDisplayIsDirty: boolean = true;
  public lastHealthDrawnAt: number;

  constructor(props:
  {
    template: UnitTemplate;

    id: number;
    name: string;

    maxHealth: number;
    currentHealth: number;

    attributes: UnitAttributesObject;

    currentMovePoints: number;
    maxMovePoints: number;
    offensiveBattlesFoughtThisTurn: number;

    abilities: AbilityTemplate[];
    passiveSkills: PassiveSkillTemplate[];

    level: number;
    experienceForCurrentLevel: number;

    battleStats?: UnitBattleStats;

    maxItemSlots: {[slot: string]: number};
    items: Item[];

    portrait?: PortraitTemplate;
    race?: RaceTemplate;
  })
  {
    this.template = props.template;

    this.id = props.id;
    this.name = props.name;

    this.maxHealth = props.maxHealth;
    this.currentHealth = props.currentHealth;

    this.baseAttributes = new UnitAttributes(props.attributes).clamp(1, 9);
    this.cachedAttributes = this.baseAttributes.clone();

    this.currentMovePoints = props.currentMovePoints;
    this.maxMovePoints = props.maxMovePoints;
    this.offensiveBattlesFoughtThisTurn = props.offensiveBattlesFoughtThisTurn;

    this.abilities = props.abilities.slice(0);
    this.passiveSkills = props.passiveSkills.slice(0);

    this.level = props.level;
    this.experienceForCurrentLevel = props.experienceForCurrentLevel;

    if (props.battleStats)
    {
      this.battleStats =
      {
        moveDelay: props.battleStats.moveDelay,
        side: props.battleStats.side,
        position: props.battleStats.position,
        currentActionPoints: props.battleStats.currentActionPoints,
        guardAmount: props.battleStats.guardAmount,
        guardCoverage: props.battleStats.guardCoverage,
        captureChance: props.battleStats.captureChance,
        statusEffects: props.battleStats.statusEffects.map(statusEffect =>
        {
          return statusEffect.clone();
        }),
        lastHealthBeforeReceivingDamage: this.currentHealth,
        queuedAction: props.battleStats.queuedAction ?
          {
            ability: props.battleStats.queuedAction.ability,
            targetId: props.battleStats.queuedAction.targetId,
            turnsPrepared: props.battleStats.queuedAction.turnsPrepared,
            timesInterrupted: props.battleStats.queuedAction.timesInterrupted,
          } :
          null,
        isAnnihilated: props.battleStats.isAnnihilated,
      };
    }
    else
    {
      this.resetBattleStats();
    }

    this.items = this.makeUnitItems(props.maxItemSlots);
    props.items.forEach(item =>
    {
      if (item.positionInUnit !== undefined)
      {
        this.items.addItemAtPosition(item, item.positionInUnit);
      }
      else
      {
        this.items.addItem(item);
      }
    });

    this.race = props.race;
    this.portrait = props.portrait;
  }
  public static fromTemplate(props:
  {
    template: UnitTemplate;
    race: RaceTemplate;

    name?: string;

    attributeMultiplier?: number;
    healthMultiplier?: number;
  }): Unit
  {
    const template = props.template;
    const race = props.race;

    const attributeMultiplier = props.attributeMultiplier !== undefined ? props.attributeMultiplier : 1;
    const healthMultiplier = props.healthMultiplier !== undefined ? props.healthMultiplier : 1;


    const baseAttributeValue = activeModuleData.ruleSet.units.baseAttributeValue * attributeMultiplier;
    const attributeVariance = activeModuleData.ruleSet.units.attributeVariance;
    const baseHealthValue = activeModuleData.ruleSet.units.baseHealthValue * healthMultiplier;
    const healthVariance = activeModuleData.ruleSet.units.healthVariance;

    const baseHealth = baseHealthValue * template.maxHealthLevel;
    const health = randInt(baseHealth - healthVariance, baseHealth + healthVariance);

    const unit = new Unit(
    {
      template: template,

      id: idGenerators.unit++,
      name: props.name || race.getUnitName(template),

      maxHealth: health,
      currentHealth: health,

      attributes: Unit.getRandomAttributesFromTemplate(template, baseAttributeValue, attributeVariance),

      currentMovePoints: template.maxMovePoints,
      maxMovePoints: template.maxMovePoints,

      offensiveBattlesFoughtThisTurn: 0,

      abilities: getItemsFromProbabilityDistributions(template.possibleAbilities),
      passiveSkills: template.possiblePassiveSkills ?
        getItemsFromProbabilityDistributions(template.possiblePassiveSkills) :
        [],

      level: 1,
      experienceForCurrentLevel: 0,

      maxItemSlots: template.itemSlots,
      items: [],

      portrait: race.getUnitPortrait(template, activeModuleData.Templates.Portraits),
      race: race,
    });

    return unit;
  }
  public static fromSaveData(data: UnitSaveData): Unit
  {
    const unit = new Unit(
    {
      template: activeModuleData.Templates.Units[data.templateType],

      id: data.id,
      name: data.name,

      maxHealth: data.maxHealth,
      currentHealth: data.currentHealth,

      attributes: data.baseAttributes,

      currentMovePoints: data.currentMovePoints,
      maxMovePoints: data.maxMovePoints,
      offensiveBattlesFoughtThisTurn: data.offensiveBattlesFoughtThisTurn,

      abilities: data.abilityTemplateTypes.map(templateType =>
      {
        return activeModuleData.Templates.Abilities[templateType];
      }),
      passiveSkills: data.passiveSkillTemplateTypes.map(templateType =>
      {
        return activeModuleData.Templates.PassiveSkills[templateType];
      }),

      level: data.level,
      experienceForCurrentLevel: data.experienceForCurrentLevel,

      battleStats:
      {
         moveDelay: data.battleStats.moveDelay,
         side: data.battleStats.side,
         position: data.battleStats.position,
         currentActionPoints: data.battleStats.currentActionPoints,
         guardAmount: data.battleStats.guardAmount,
         guardCoverage: data.battleStats.guardCoverage,
         captureChance: data.battleStats.captureChance,
         isAnnihilated: data.battleStats.isAnnihilated,

         lastHealthBeforeReceivingDamage: data.currentHealth,

         statusEffects: [],
         queuedAction:  data.battleStats.queuedAction ?
          {
            ability: activeModuleData.Templates.Abilities[data.battleStats.queuedAction.abilityTemplateKey],
            targetId: data.battleStats.queuedAction.targetId,
            turnsPrepared: data.battleStats.queuedAction.turnsPrepared,
            timesInterrupted: data.battleStats.queuedAction.timesInterrupted,
          } :
          null,
      },

      maxItemSlots: data.items.maxItemSlots,
      items: [],

      portrait: data.portraitKey ?
        activeModuleData.Templates.Portraits[data.portraitKey] :
        undefined,
      race: data.raceKey ?
        activeModuleData.Templates.Races[data.raceKey] :
        undefined,
    });

    return unit;
  }
  private static getRandomValueFromAttributeLevel(
    level: number,
    baseValue: number,
    variance: number,
  ): number
  {
    const baseValueForLevel = baseValue * level;

    return randInt(baseValueForLevel - variance, baseValueForLevel + variance);
  }
  private static getRandomAttributesFromTemplate(
    template: UnitTemplate,
    baseValue: number,
    variance: number,
  ): UnitAttributesObject
  {
    return(
    {
      attack: Unit.getRandomValueFromAttributeLevel(template.attributeLevels.attack, baseValue, variance),
      defence: Unit.getRandomValueFromAttributeLevel(template.attributeLevels.defence, baseValue, variance),
      intelligence: Unit.getRandomValueFromAttributeLevel(template.attributeLevels.intelligence, baseValue, variance),
      speed: Unit.getRandomValueFromAttributeLevel(template.attributeLevels.speed, baseValue, variance),
      maxActionPoints: randInt(3, 5),
    });
  }
  private getBaseMoveDelay()
  {
    return 30 - this.attributes.speed;
  }
  public resetMovePoints()
  {
    this.currentMovePoints = this.maxMovePoints;
  }
  public resetBattleStats(): void
  {
    this.battleStats =
    {
      moveDelay: this.getBaseMoveDelay(),
      currentActionPoints: this.attributes.maxActionPoints,
      side: null,
      position: null,
      guardAmount: 0,
      guardCoverage: null,
      captureChance: activeModuleData.ruleSet.battle.baseUnitCaptureChance,
      statusEffects: [],
      lastHealthBeforeReceivingDamage: this.currentHealth,
      queuedAction: null,
      isAnnihilated: false,
    };

    this.attributesAreDirty = true;
    this.uiDisplayIsDirty = true;
  }
  public setBattlePosition(side: UnitBattleSide, position: number[])
  {
    this.battleStats.side = side;
    this.battleStats.position = position;
  }
  public addMaxHealth(amountToAdd: number): void
  {
    this.maxHealth += Math.max(0, Math.round(amountToAdd));

    if (this.currentHealth > this.maxHealth)
    {
      this.currentHealth = this.maxHealth;
    }

    this.uiDisplayIsDirty = true;
  }
  public addHealth(amountToAdd: number): void
  {
    const newHealth = this.currentHealth + Math.round(amountToAdd);
    this.currentHealth = clamp(newHealth, 0, this.maxHealth);

    if (this.currentHealth <= 0)
    {
      this.battleStats.isAnnihilated = true;
    }

    this.uiDisplayIsDirty = true;
  }
  public removeHealth(amountToRemove: number): void
  {
    this.addHealth(-amountToRemove);
  }
  public removeActionPoints(amount: number)
  {
    this.battleStats.currentActionPoints -= amount;
    if (this.battleStats.currentActionPoints < 0)
    {
      this.battleStats.currentActionPoints = 0;
    }

    this.uiDisplayIsDirty = true;
  }
  public addMoveDelay(amount: number)
  {
    this.battleStats.moveDelay += amount;
  }
  public updateStatusEffects(): void
  {
    for (let i = this.battleStats.statusEffects.length - 1; i >= 0; i--)
    {
      const statusEffect = this.battleStats.statusEffects[i];

      statusEffect.processTurnEnd();
      if (statusEffect.turnsHasBeenActiveFor >= statusEffect.turnsToStayActiveFor)
      {
        this.removeStatusEffect(statusEffect);
      }
    }

    this.uiDisplayIsDirty = true;
  }

  public setQueuedAction(ability: AbilityTemplate, target: Unit)
  {
    this.battleStats.queuedAction =
    {
      ability: ability,
      targetId: target.id,
      turnsPrepared: 0,
      timesInterrupted: 0,
    };

    this.uiDisplayIsDirty = true;
  }
  public interruptQueuedAction(interruptStrength: number)
  {
    const action = this.battleStats.queuedAction;
    if (!action)
    {
      return;
    }

    action.timesInterrupted += interruptStrength;
    if (action.timesInterrupted >= action.ability.preparation.interruptsNeeded)
    {
      this.clearQueuedAction();
    }

    this.uiDisplayIsDirty = true;
  }
  public updateQueuedAction()
  {
    const action = this.battleStats.queuedAction;
    if (!action)
    {
      return;
    }

    action.turnsPrepared++;

    this.uiDisplayIsDirty = true;
  }
  public isReadyToUseQueuedAction()
  {
    const action = this.battleStats.queuedAction;

    return (action && action.turnsPrepared >= action.ability.preparation.turnsToPrep);
  }
  public clearQueuedAction()
  {
    this.battleStats.queuedAction = null;
    this.uiDisplayIsDirty = true;
  }
  public isTargetable()
  {
    return this.isActiveInBattle();
  }
  public isActiveInBattle()
  {
    return this.currentHealth > 0 && !this.battleStats.isAnnihilated;
  }

  private makeUnitItems(itemSlots: {[slot: string]: number})
  {
    return new UnitItems(
      itemSlots,
      item =>
      {
        item.unit = this;
      },
      changedItem =>
      {
        if (changedItem.template.attributeAdjustments)
        {
          this.attributesAreDirty = true;
        }
        if (changedItem.template.passiveSkill)
        {
          this.passiveSkillsByPhaseAreDirty = true;
        }
      },
    );
  }
  // public addItem(item: Item, index: number)
  // {
  //   const itemSlot = item.template.slot;

  //   if (!this.items.hasSlotForItem(item))
  //   {
  //     return false;
  //   }

  //   if (item.unit)
  //   {
  //     item.unit.removeItem(item);
  //   }

  //   this.items.addItem(item, index);
  //   item.unit = this;

    // if (item.template.attributeAdjustments)
    // {
    //   this.attributesAreDirty = true;
    // }
    // if (item.template.passiveSkill)
    // {
    //   this.passiveSkillsByPhaseAreDirty = true;
    // }
  // }
  // public removeItem(item: Item)
  // {
  //   const itemSlot = item.template.slot;

  //   if (!this.items.hasItem(item))
  //   {
  //     return false;
  //   }

  //   this.items.removeItem(item);
  //   item.unit = null;

  //   if (item.template.attributeAdjustments)
  //   {
  //     this.attributesAreDirty = true;
  //   }
  //   if (item.template.passiveSkill)
  //   {
  //     this.passiveSkillsByPhaseAreDirty = true;
  //   }

  //   return true;
  // }
  private getAttributesWithItems()
  {
    return this.baseAttributes.getAdjustedAttributes(...this.items.getAttributeAdjustments()).clamp(1, 9);
  }
  public addStatusEffect(statusEffect: StatusEffect)
  {
    if (this.battleStats.statusEffects.indexOf(statusEffect) !== -1)
    {
      throw new Error("Tried to add duplicate status effect to unit " + this.name);
    }
    else if (statusEffect.turnsToStayActiveFor === 0)
    {
      console.warn("Tried to add status effect", statusEffect, "with 0 duration");
      return;
    }

    this.battleStats.statusEffects.push(statusEffect);
    if (statusEffect.template.attributes)
    {
      this.attributesAreDirty = true;
    }

    this.uiDisplayIsDirty = true;
  }
  private removeStatusEffect(statusEffect: StatusEffect)
  {
    const index = this.battleStats.statusEffects.indexOf(statusEffect);
    if (index === -1)
    {
      throw new Error(`Tried to remove status effect not active on unit ${this.name}`);
    }

    this.battleStats.statusEffects.splice(index, 1);
    if (statusEffect.template.attributes)
    {
      this.attributesAreDirty = true;
    }

    this.uiDisplayIsDirty = true;
  }
  private getStatusEffectAttributeAdjustments(): UnitAttributeAdjustments[]
  {
    if (!this.battleStats || !this.battleStats.statusEffects)
    {
      return [];
    }

    return this.battleStats.statusEffects.filter(statusEffect =>
    {
      return Boolean(statusEffect.template.attributes);
    }).map(statusEffect =>
    {
      return statusEffect.template.attributes!;
    });
  }
  private getAttributesWithItemsAndEffects()
  {
    const itemAdjustments = this.items.getAttributeAdjustments();
    const effectAdjustments = this.getStatusEffectAttributeAdjustments();

    return this.baseAttributes.getAdjustedAttributes(...itemAdjustments, ...effectAdjustments);
  }
  private getAttributesWithEffectsDifference(): UnitAttributes
  {
    const withItems = this.getAttributesWithItems();
    const withEffects = this.getAttributesWithItemsAndEffects();

    return withEffects.getDifferenceBetween(withItems);
  }
  private updateCachedAttributes()
  {
    this.cachedAttributes = this.getAttributesWithItemsAndEffects();
    this.attributesAreDirty = false;
  }
  // public removeItemAtSlot(slot: string)
  // {
  //   if (this.items[slot])
  //   {
  //     this.removeItem(this.items[slot]);
  //     return true;
  //   }

  //   return false;
  // }
  public getAllAbilities(): AbilityTemplate[]
  {
    const allAbilities = [...this.abilities, ...this.items.getAbilities()];

    const allUniqueAbilities = getUniqueArrayKeys(allAbilities, template => template.type);

    return allUniqueAbilities;
  }
  public getAllPassiveSkills(): PassiveSkillTemplate[]
  {
    const allPassiveSkills = [...this.passiveSkills, ...this.items.getPassiveSkills()];

    const allUniquePassiveSkills = getUniqueArrayKeys(allPassiveSkills, template => template.type);

    return allUniquePassiveSkills;
  }
  private updatePassiveSkillsByPhase(): void
  {
    const updatedSkills: PassiveSkillsByPhase =
    {
      atBattleStart: [],
      atTurnStart: [],
      inBattlePrep: [],
    };

    const allSkills = this.getAllPassiveSkills();

    for (let i = 0; i < allSkills.length; i++)
    {
      const skill = allSkills[i];
      ["atBattleStart", "atTurnStart", "inBattlePrep"].forEach(phase =>
      {
        if (skill[phase])
        {
          if (updatedSkills[phase].indexOf(skill) === -1)
          {
            updatedSkills[phase].push(skill);
          }
        }
      });
    }

    this.passiveSkillsByPhase = updatedSkills;
    this.passiveSkillsByPhaseAreDirty = false;
  }
  public getPassiveSkillsByPhase()
  {
    if (this.passiveSkillsByPhaseAreDirty)
    {
      this.updatePassiveSkillsByPhase();
    }

    return this.passiveSkillsByPhase;
  }
  private getPassiveEffectsForScene(scene: "galaxyMap" | "battle" | "battlePrep"): UnitEffectTemplate[]
  {
    const relevantTemplateKeys: string[] = [];
    switch (scene)
    {
      case "galaxyMap":
        break;
      case "battlePrep":
        relevantTemplateKeys.push("atBattleStart", "inBattlePrep");
        break;
      case "battle":
        relevantTemplateKeys.push("beforeAbilityUse", "afterAbilityUse");
        break;
    }

    const effectFilterFN = (passiveEffect: UnitEffectTemplate) =>
    {
      if (passiveEffect.isHidden)
      {
        return false;
      }
      for (const key of relevantTemplateKeys)
      {
        if (passiveEffect[key])
        {
          return true;
        }
      }
      return false;
    };

    const relevantStatusEffectTemplates = this.battleStats.statusEffects.map(statusEffect =>
    {
      return statusEffect.template;
    }).filter(effectFilterFN);

    const relevantPassiveEffectTemplates = this.getAllPassiveSkills().filter(effectFilterFN);

    return relevantStatusEffectTemplates.concat(relevantPassiveEffectTemplates);
  }
  public receiveDamage(amount: number)
  {
    this.battleStats.lastHealthBeforeReceivingDamage = this.currentHealth;
    this.addHealth(-amount);
  }
  public removeFromPlayer()
  {
    const fleet = this.fleet;
    const player = fleet.player;

    this.items.destroyAllItems();
    player.removeUnit(this);

    fleet.removeUnit(this);
    if (fleet.units.length <= 0)
    {
      fleet.deleteFleet();
    }


    activeModuleData.scripts.unit.removeFromPlayer.forEach(scriptFN =>
    {
      scriptFN(this);
    });

    this.uiDisplayIsDirty = true;
  }
  public transferToPlayer(newPlayer: Player)
  {
    const location = this.fleet.location;

    this.removeFromPlayer();

    newPlayer.addUnit(this);

    const fleet = Fleet.createFleet([this]);
    newPlayer.addFleet(fleet);
    location.addFleet(fleet);
  }
  public removeGuard(amount: number)
  {
    this.battleStats.guardAmount -= amount;
    if (this.battleStats.guardAmount < 0) { this.removeAllGuard(); }

    this.uiDisplayIsDirty = true;
  }
  public addGuard(amount: number, coverage: GuardCoverage)
  {
    this.battleStats.guardAmount += amount;
    this.battleStats.guardCoverage = coverage;

    this.uiDisplayIsDirty = true;
  }
  public removeAllGuard()
  {
    this.battleStats.guardAmount = 0;
    this.battleStats.guardCoverage = null;

    this.uiDisplayIsDirty = true;
  }
  public getCounterAttackStrength()
  {
    return 1;
  }
  public getMaxOffensiveBattlesPerTurn(): number
  {
    return this.template.maxOffensiveBattlesPerTurn;
  }
  public canFightOffensiveBattle(): boolean
  {
    return this.offensiveBattlesFoughtThisTurn < this.getMaxOffensiveBattlesPerTurn();
  }
  public isStealthy(): boolean
  {
    return Boolean(this.template.isStealthy);
  }
  public getVisionRange(): number
  {
    return this.template.visionRange;
  }
  public getDetectionRange(): number
  {
    return this.template.detectionRange;
  }
  public getHealingForGameTurnStart(): number
  {
    const location = this.fleet.location;

    const baseHealFactor = 0.05;
    const healingFactor = baseHealFactor + location.getHealingFactor(this.fleet.player);

    const healAmount = this.maxHealth * healingFactor;

    return healAmount;
  }
  public getTotalCost()
  {
    let totalCost = 0;
    totalCost += this.template.buildCost;
    totalCost += this.items.getAllItems().map(item =>
    {
      return item.template.buildCost;
    }).reduce((a, b) =>
    {
      return a + b;
    }, 0);

    return totalCost;
  }
  public getTurnsToReachStar(star: Star)
  {
    const currentLocation = this.fleet.location;
    let distance = currentLocation.getDistanceToStar(star);
    if (distance <= this.currentMovePoints)
    {
      if (this.currentMovePoints === 0)
      {
        return 0;
      }
      else
      {
        return distance / this.currentMovePoints;
      }
    }
    distance -= this.currentMovePoints; // current turn
    return distance / this.maxMovePoints; // future turns
  }
  public getExperienceToNextLevel()
  {
    return (4 + this.level) * 10;
  }
  public addExperience(amount: number)
  {
    this.experienceForCurrentLevel += Math.round(amount);
  }
  public canLevelUp()
  {
    return this.experienceForCurrentLevel >= this.getExperienceToNextLevel();
  }
  public handleLevelUp()
  {
    this.experienceForCurrentLevel -= this.getExperienceToNextLevel();
    this.level++;
  }
  private hasAbility(
    ability: AbilityBase,
    allAbilities: AbilityBase[] = [...this.getAllAbilities(), ...this.getAllPassiveSkills()],
  ): boolean
  {
    for (let i = 0; i < allAbilities.length; i++)
    {
      if (allAbilities[i].type === ability.type)
      {
        return true;
      }
    }

    return false;
  }
  public getLearnableAbilities(
    allAbilities: AbilityBase[] = [...this.getAllAbilities(), ...this.getAllPassiveSkills()],
  ): AbilityBase[]
  {
    const learnableAbilities: AbilityBase[] = [];

    if (!this.template.learnableAbilities)
    {
      return learnableAbilities;
    }

    this.template.learnableAbilities.forEach(learnable =>
    {
      if (Array.isArray(learnable))
      {
        const learnableAbilityGroup = learnable;
        const hasAbilityFromGroup = learnableAbilityGroup.some(ability =>
        {
          return this.hasAbility(ability, allAbilities);
        });

        if (!hasAbilityFromGroup)
        {
          learnableAbilities.push(...learnableAbilityGroup);
        }
      }
      else
      {
        const learnableAbility = learnable;

        if (!this.hasAbility(learnable, allAbilities))
        {
          learnableAbilities.push(learnableAbility);
        }
      }
    });

    return learnableAbilities;
  }
  private canUpgradeIntoAbility(ability: AbilityBase, allAbilities: AbilityBase[])
  {
    if (ability.onlyAllowExplicitUpgrade)
    {
      if (!this.template.specialAbilityUpgrades || this.template.specialAbilityUpgrades.indexOf(ability) === -1)
      {
        return false;
      }
    }
    if (this.hasAbility(ability, allAbilities))
    {
      return false;
    }

    return true;
  }
  public getUpgradableAbilitiesData(): UpgradableAbilitiesData
  {
    const data: UpgradableAbilitiesData = {};

    const allAbilities = [...this.getAllAbilities(), ...this.getAllPassiveSkills()];

    const upgradableAbilities = allAbilities.filter(abilityTemplate =>
    {
      return abilityTemplate.canUpgradeInto && abilityTemplate.canUpgradeInto.length > 0;
    });

    upgradableAbilities.forEach(parentAbility =>
      {
        parentAbility.canUpgradeInto!.forEach(childAbility =>
        {
          if (this.canUpgradeIntoAbility(childAbility, allAbilities))
          {
            if (!data[parentAbility.type])
            {
              data[parentAbility.type] =
              {
                source: parentAbility,
                possibleUpgrades: [],
              };
            }

            data[parentAbility.type].possibleUpgrades.push(childAbility);
          }
        });
      });

    return data;
  }
  public upgradeAbility(source: AbilityBase, newAbility: AbilityBase)
  {
    const sourceIsPassiveSkill = !source.mainEffect;

    if (sourceIsPassiveSkill)
    {
      this.passiveSkills.splice(this.passiveSkills.indexOf(source), 1);
    }
    else
    {
      this.abilities.splice(this.abilities.indexOf(<AbilityTemplate> source), 1);
    }

    this.learnAbility(newAbility);
  }
  public learnAbility(newAbility: AbilityBase): void
  {
    const newAbilityIsPassiveSkill = !newAbility.mainEffect

    if (newAbilityIsPassiveSkill)
    {
      this.passiveSkills.push(newAbility);
    }
    else
    {
      this.abilities.push(<AbilityTemplate> newAbility);
    }
  }
  public drawBattleScene(params: SFXParams)
  {
    this.template.unitDrawingFN(this, params);
  }
  public getDisplayData(scene: "galaxyMap" | "battle" | "battlePrep"): UnitDisplayData
  {
    return(
    {
      name: this.name,
      facesLeft: this.battleStats.side === "side2",

      currentHealth: this.currentHealth,
      maxHealth: this.maxHealth,
      guardAmount: this.battleStats.guardAmount,
      guardType: this.battleStats.guardCoverage,
      currentActionPoints: this.battleStats.currentActionPoints,
      maxActionPoints: this.attributes.maxActionPoints,
      isPreparing: Boolean(this.battleStats.queuedAction),
      isAnnihilated: this.battleStats.isAnnihilated,
      isSquadron: this.template.isSquadron,

      portraitSrc: this.portrait.imageSrc,
      iconSrc: this.template.icon,

      attributeChanges: this.getAttributesWithEffectsDifference().serialize(),
      passiveEffects: this.getPassiveEffectsForScene(scene),
    });
  }
  public serialize(): UnitSaveData
  {
    const battleStatsSavedData: UnitBattleStatsSaveData =
    {
      moveDelay: this.battleStats.moveDelay,
      side: this.battleStats.side,
      position: this.battleStats.position,
      currentActionPoints: this.battleStats.currentActionPoints,
      guardAmount: this.battleStats.guardAmount,
      guardCoverage: this.battleStats.guardCoverage,
      captureChance: this.battleStats.captureChance,
      statusEffects: this.battleStats.statusEffects.map(statusEffect => statusEffect.serialize()),
      queuedAction: !this.battleStats.queuedAction ? null :
      {
        abilityTemplateKey: this.battleStats.queuedAction.ability.type,
        targetId: this.battleStats.queuedAction.targetId,
        turnsPrepared: this.battleStats.queuedAction.turnsPrepared,
        timesInterrupted: this.battleStats.queuedAction.timesInterrupted,
      },
      isAnnihilated: this.battleStats.isAnnihilated,
    };

    const data: UnitSaveData =
    {
      templateType: this.template.type,
      id: this.id,
      name: this.name,

      maxHealth: this.maxHealth,
      currentHealth: this.currentHealth,

      currentMovePoints: this.currentMovePoints,
      maxMovePoints: this.maxMovePoints,

      offensiveBattlesFoughtThisTurn: this.offensiveBattlesFoughtThisTurn,

      baseAttributes: this.baseAttributes.serialize(),
      abilityTemplateTypes: this.abilities.map(abilityTemplate => abilityTemplate.type),
      passiveSkillTemplateTypes: this.passiveSkills.map(passiveSkillTemplate => passiveSkillTemplate.type),

      experienceForCurrentLevel: this.experienceForCurrentLevel,
      level: this.level,

      items: this.items.serialize(),
      battleStats: battleStatsSavedData,

      portraitKey: this.portrait.key,
      raceKey: this.race.type,
    };

    if (this.fleet)
    {
      data.fleetId = this.fleet.id;
    }

    return data;
  }
  public makeVirtualClone(): Unit
  {
    const clone = new Unit(
    {
      template: this.template,
      id: this.id,
      name: this.name,
      maxHealth: this.maxHealth,
      currentHealth: this.currentHealth,
      attributes: this.baseAttributes.clone(),
      currentMovePoints: this.currentMovePoints,
      maxMovePoints: this.maxMovePoints,
      offensiveBattlesFoughtThisTurn: this.offensiveBattlesFoughtThisTurn,
      abilities: this.abilities,
      passiveSkills: this.passiveSkills,
      level: this.level,
      experienceForCurrentLevel: this.experienceForCurrentLevel,

      battleStats: this.battleStats,

      maxItemSlots: this.items.itemSlots,
      items: this.items.items,

      portrait: this.portrait,
      race: this.race,
    });

    return clone;
  }
}
