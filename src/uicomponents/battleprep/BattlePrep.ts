import * as React from "react";
import * as ReactDOM from "react-dom";

import app from "../../App"; // TODO global
import {activeModuleData} from "../../activeModuleData";

import BattlePrep from "../../BattlePrep";
import BattleSimulator from "../../BattleSimulator";
import Item from "../../Item";
import Options from "../../Options";
import Unit from "../../Unit";
import {BattleBackgroundComponent, default as BattleBackground} from "../battle/BattleBackground";
import Formation from "../battle/Formation";
import ListItem from "../list/ListItem";
import ItemList from "../unitlist/ItemList";
import {PropTypes as ItemListItemPropTypes} from "../unitlist/ItemListItem";
import MenuUnitInfo from "../unitlist/MenuUnitInfo";
import UnitList from "../unitlist/UnitList";
import {PropTypes as UnitListItemPropTypes} from "../unitlist/UnitListItem";
import BattleInfo from "./BattleInfo";

import {localize} from "../../../localization/localize";


export interface PropTypes extends React.Props<any>
{
  battlePrep: BattlePrep;
}

interface StateType
{
  hoveredUnit: Unit | null;
  currentDragUnit: Unit | null;
  leftLowerElement: "playerFormation" | "enemyFormation" | "itemEquip";
  currentDragItem: Item | null;
  selectedUnit: Unit | null;
}

export class BattlePrepComponent extends React.Component<PropTypes, StateType>
{
  public displayName = "BattlePrep";
  public state: StateType;

  private ref_TODO_background: BattleBackgroundComponent;
  private ref_TODO_upper: HTMLElement | null;

  constructor(props: PropTypes)
  {
    super(props);

    this.state =
    {
      currentDragUnit: null,
      hoveredUnit: null,
      selectedUnit: null,
      currentDragItem: null,

      leftLowerElement: "playerFormation",
    };

    this.handleMouseEnterUnit = this.handleMouseEnterUnit.bind(this);
    this.handleDragEnd = this.handleDragEnd.bind(this);
    this.handleItemDragStart = this.handleItemDragStart.bind(this);
    this.setLeftLowerElement = this.setLeftLowerElement.bind(this);
    this.handleItemDragEnd = this.handleItemDragEnd.bind(this);
    this.handleItemDrop = this.handleItemDrop.bind(this);
    this.setSelectedUnit = this.setSelectedUnit.bind(this);
    this.handleMouseLeaveUnit = this.handleMouseLeaveUnit.bind(this);
    this.clearSelectedUnit = this.clearSelectedUnit.bind(this);
    this.autoMakeFormation = this.autoMakeFormation.bind(this);
    this.handleSelectRow = this.handleSelectRow.bind(this);
    this.handleDragStart = this.handleDragStart.bind(this);
    this.handleDrop = this.handleDrop.bind(this);
    this.getBackgroundBlurArea = this.getBackgroundBlurArea.bind(this);
  }

  public componentDidMount()
  {
    this.ref_TODO_background.handleResize();
  }
  public render()
  {
    const battlePrep = this.props.battlePrep;
    const player = battlePrep.humanPlayer;

    // priority: hovered unit > selected unit > battle info
    let leftUpperElement: React.ReactElement<any>;

    const hoveredUnit = this.state.currentDragUnit || this.state.hoveredUnit;
    if (hoveredUnit)
    {
      leftUpperElement = MenuUnitInfo(
      {
        unit: hoveredUnit,
      });
    }
    else if (this.state.selectedUnit)
    {
      const selectedUnitIsFriendly = battlePrep.humanUnits.some(unit => unit === this.state.selectedUnit);

      leftUpperElement = MenuUnitInfo(
      {
        unit: this.state.selectedUnit,
        onMouseUp: this.handleItemDrop,

        isDraggable: selectedUnitIsFriendly,
        onDragStart: this.handleItemDragStart,
        onDragEnd: this.handleItemDragEnd,
        currentDragItem: this.state.currentDragItem,
      });
    }
    else
    {
      leftUpperElement = BattleInfo(
      {
        battlePrep: battlePrep,
      });
    }


    let leftLowerElement: React.ReactElement<any>;
    switch (this.state.leftLowerElement)
    {
      case "playerFormation":
      {
        leftLowerElement = Formation(
        {
          key: "playerFormation",
          formation: battlePrep.humanFormation.formation,
          facesLeft: false,
          unitDisplayDataById: battlePrep.humanFormation.getDisplayData(),

          isInBattlePrep: true,

          hoveredUnit: this.state.hoveredUnit,
          activeUnit: this.state.selectedUnit,
          abilityTargetDisplayDataById: {},

          onMouseUp: this.handleDrop,
          onUnitClick: this.setSelectedUnit,
          handleMouseEnterUnit: this.handleMouseEnterUnit,
          handleMouseLeaveUnit: this.handleMouseLeaveUnit,

          unitStrengthAnimateDuration: undefined,

          isDraggable: true,
          onDragStart: this.handleDragStart,
          onDragEnd: this.handleDragEnd,
        });
        break;
      }
      case "enemyFormation":
      {
        leftLowerElement = Formation(
        {
          key: "enemyFormation",
          formation: battlePrep.enemyFormation.formation,
          facesLeft: true,
          unitDisplayDataById: battlePrep.enemyFormation.getDisplayData(),

          isInBattlePrep: true,

          hoveredUnit: this.state.hoveredUnit,
          activeUnit: this.state.selectedUnit,
          abilityTargetDisplayDataById: {},

          onUnitClick: this.setSelectedUnit,
          handleMouseEnterUnit: this.handleMouseEnterUnit,
          handleMouseLeaveUnit: this.handleMouseLeaveUnit,

          unitStrengthAnimateDuration: undefined,

          isDraggable: false,
        });
        break;
      }
      case "itemEquip":
      {
        leftLowerElement = ItemList(
        {
          key: "itemEquip",
          items: player.items,
          isDraggable: true,
          onDragStart: this.handleItemDragStart,
          onDragEnd: this.handleItemDragEnd,
          onRowChange: this.handleSelectRow,
        });
        break;
      }
    };

    const playerIsDefending = player === battlePrep.defender;
    const humanFormationValidity = battlePrep.humanFormation.getFormationValidity();
    const canScout = player.starIsDetected(battlePrep.battleData.location);

    return(
      React.DOM.div({className: "battle-prep"},
        React.DOM.div({className: "battle-prep-left"},
          React.DOM.div({className: "battle-prep-left-upper-wrapper", ref: component =>
          {
            this.ref_TODO_upper = component;
          }},
            BattleBackground(
            {
              getBlurArea: this.getBackgroundBlurArea,
              backgroundSeed: battlePrep.battleData.location.getSeed(),
              backgroundDrawingFunction: activeModuleData.starBackgroundDrawingFunction,
              ref: (component: BattleBackgroundComponent) =>
              {
                this.ref_TODO_background = component;
              },
            },
              React.DOM.div({className: "battle-prep-left-upper-inner"},
                leftUpperElement,
              ),
            ),
          ),
          React.DOM.div({className: "battle-prep-left-controls"},
            React.DOM.button(
            {
              className: "battle-prep-controls-button",
              onClick: this.setLeftLowerElement.bind(this, "itemEquip"),
              disabled: this.state.leftLowerElement === "itemEquip",
            }, localize("equip")()),
            React.DOM.button(
            {
              className: "battle-prep-controls-button",
              onClick: this.setLeftLowerElement.bind(this, "playerFormation"),
              disabled: this.state.leftLowerElement === "playerFormation",
            }, localize("ownFormation")()),
            React.DOM.button(
            {
              className: "battle-prep-controls-button",
              onClick: this.setLeftLowerElement.bind(this, "enemyFormation"),
              disabled: this.state.leftLowerElement === "enemyFormation" || !canScout,
              title: canScout ?
                undefined :
                localize("cantInspectEnemyFormationAsStarIsNotInDetectionRadius")(),
            }, localize("enemy")()),
            React.DOM.button(
            {
              onClick: this.autoMakeFormation,
            }, localize("autoFormation")()),
            React.DOM.button(
            {
              onClick: function()
              {
                app.reactUI.switchScene("galaxyMap");
              },
              disabled: playerIsDefending,
            }, localize("cancel")()),
            React.DOM.button(
            {
              className: "battle-prep-controls-button",
              disabled: !humanFormationValidity.isValid,
              title: humanFormationValidity.description,
              onClick: function()
              {
                const battle = battlePrep.makeBattle();
                app.reactUI.battle = battle;
                app.reactUI.switchScene("battle");
              }.bind(this),
            }, localize("startBattle")()),
            !Options.debug.enabled ? null : React.DOM.button(
            {
              className: "battle-prep-controls-button",
              onClick: function()
              {
                const battle = battlePrep.makeBattle();
                const simulator = new BattleSimulator(battle);
                simulator.simulateBattle();
                battle.isSimulated = false;
                simulator.finishBattle();
              }.bind(this),
            }, localize("simulateBattle")()),
          ),
          React.DOM.div({className: "battle-prep-left-lower"}, leftLowerElement),
        ),
        UnitList(
        {
          units: battlePrep.humanFormation.units,
          selectedUnit: this.state.selectedUnit,
          reservedUnits: battlePrep.humanFormation.getPlacedUnits(),
          unavailableUnits: battlePrep.humanPlayer === battlePrep.attacker ?
            battlePrep.humanUnits.filter(unit => !unit.canFightOffensiveBattle()) :
            [],
          hoveredUnit: this.state.hoveredUnit,

          isDraggable: this.state.leftLowerElement === "playerFormation",
          onDragStart: this.handleDragStart,
          onDragEnd: this.handleDragEnd,

          onRowChange: this.handleSelectRow,

          onMouseEnterUnit: this.handleMouseEnterUnit,
          onMouseLeaveUnit: this.handleMouseLeaveUnit,
        }),
      )
    );
  }

  private autoMakeFormation()
  {
    this.props.battlePrep.humanFormation.clearFormation();
    this.props.battlePrep.humanFormation.setAutoFormation(
      this.props.battlePrep.enemyUnits, this.props.battlePrep.enemyFormation.formation);

    this.setLeftLowerElement("playerFormation");
    this.forceUpdate();
  }
  private handleSelectRow(row: ListItem<UnitListItemPropTypes | ItemListItemPropTypes>)
  {
    if (!row.content.props.unit)
    {
      return;
    }

    this.setSelectedUnit(row.content.props.unit);
  }
  private clearSelectedUnit()
  {
    this.setState(
    {
      selectedUnit: null,
    });
  }
  private setSelectedUnit(unit: Unit)
  {
    if (unit === this.state.selectedUnit)
    {
      this.clearSelectedUnit();
      return;
    }

    this.setState(
    {
      selectedUnit: unit,
      hoveredUnit: null,
    });
  }
  private handleMouseEnterUnit(unit: Unit)
  {
    this.setState(
    {
      hoveredUnit: unit,
    });
  }
  private handleMouseLeaveUnit()
  {
    this.setState(
    {
      hoveredUnit: null,
    });
  }
  private handleDragStart(unit: Unit)
  {
    this.setState(
    {
      currentDragUnit: unit,
    });
  }
  private handleDragEnd(dropSuccessful: boolean = false)
  {
    if (!dropSuccessful && this.state.currentDragUnit)
    {
      this.props.battlePrep.humanFormation.removeUnit(this.state.currentDragUnit);
    }

    this.setState(
    {
      currentDragUnit: null,
      hoveredUnit: null,
    });

    return dropSuccessful;
  }
  private handleDrop(position: number[])
  {
    const battlePrep = this.props.battlePrep;
    if (this.state.currentDragUnit)
    {
      battlePrep.humanFormation.setUnit(this.state.currentDragUnit, position);
    }

    this.handleDragEnd(true);
  }
  private handleItemDragStart(item: Item)
  {
    this.setState(
    {
      currentDragItem: item,
    });
  }
  private setLeftLowerElement(newElement: string)
  {
    const oldElement = this.state.leftLowerElement;
    const newState: any =
    {
      leftLowerElement: newElement,
    };

    if (oldElement === "enemyFormation" || newElement === "enemyFormation")
    {
      newState.selectedUnit = null;
    }

    this.setState(newState);
  }
  private handleItemDragEnd(dropSuccessful: boolean = false)
  {
    if (!dropSuccessful && this.state.currentDragItem && this.state.selectedUnit)
    {
      const item = this.state.currentDragItem;
      if (this.state.selectedUnit.items.hasItem(item))
      {
        this.state.selectedUnit.items.removeItem(item);
      }
    }

    this.setState(
    {
      currentDragItem: null,
    });
  }
  private handleItemDrop(index: number)
  {
    const item = this.state.currentDragItem;
    const unit = this.state.selectedUnit;
    if (unit && item)
    {
      unit.items.addItemAtPosition(item, index);
    }

    this.handleItemDragEnd(true);
  }
  private getBackgroundBlurArea()
  {
    const backgroundElement = this.ref_TODO_upper;
    if (!backgroundElement)
    {
      throw new Error("Battle prep background element hasn't mounted yet");
    }

    return ReactDOM.findDOMNode(backgroundElement).getBoundingClientRect();
  }
}

const Factory: React.Factory<PropTypes> = React.createFactory(BattlePrepComponent);
export default Factory;
