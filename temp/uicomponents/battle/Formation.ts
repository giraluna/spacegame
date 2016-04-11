/// <reference path="../../../lib/react-0.13.3.d.ts" />
import * as React from "react";

/// <reference path="../../unit.ts" />
/// <reference path="../../battle.ts" />

/// <reference path="formationrow.ts"/>


import Unit from "../unit/Unit.ts";
import FormationRow from "./FormationRow.ts";
import Battle from "./Battle.ts";
import AbilityTemplate from "../../../src/templateinterfaces/AbilityTemplate.d.ts";


export interface PropTypes extends React.Props<any>
{
  formation: Unit[][];
  battle?: Battle;
  facesLeft: boolean;
  activeUnit?: Unit;
  activeTargets?: reactTypeTODO_object; // {[id: number]: AbilityTemplate[];}

  hoveredUnit?: Unit;
  hoveredAbility?: reactTypeTODO_object; // AbilityTemplate

  handleMouseLeaveUnit?: reactTypeTODO_func;
  handleMouseEnterUnit?: reactTypeTODO_func;
  targetsInPotentialArea?: Unit[];
  activeEffectUnits?: Unit[];
  onMouseUp?: reactTypeTODO_func;
  onUnitClick?: reactTypeTODO_func;
  isDraggable?: boolean;
  onDragStart?: reactTypeTODO_func;
  onDragEnd?: reactTypeTODO_func;
}

interface StateType
{
}

class Formation_COMPONENT_TODO extends React.Component<PropTypes, StateType>
{
  displayName: string = "Formation";


  state: StateType;

  constructor(props: PropTypes)
  {
    super(props);
    
    this.bindMethods();
  }
  private bindMethods()
  {
    
  }
  
  render()
  {
    var formation = this.props.formation;

    var formationRows: React.ReactElement<any>[] = [];

    for (var i = 0; i < formation.length; i++)
    {
      formationRows.push(FormationRow(
      {
        key: i,
        row: formation[i],
        rowIndexInOwnFormation: i,
        battle: this.props.battle,
        facesLeft: this.props.facesLeft,
        activeUnit: this.props.activeUnit,
        hoveredUnit: this.props.hoveredUnit,
        hoveredAbility: this.props.hoveredAbility,
        handleMouseEnterUnit: this.props.handleMouseEnterUnit,
        handleMouseLeaveUnit: this.props.handleMouseLeaveUnit,
        targetsInPotentialArea: this.props.targetsInPotentialArea,
        activeEffectUnits: this.props.activeEffectUnits,

        onMouseUp: this.props.onMouseUp,
        onUnitClick: this.props.onUnitClick,

        isDraggable: this.props.isDraggable,
        onDragStart: this.props.onDragStart,
        onDragEnd: this.props.onDragEnd
      }));
    }

    return(
      React.DOM.div({className: "battle-formation"},
        formationRows
      )
    );
  }
}

const Factory: React.Factory<PropTypes> = React.createFactory(Formation_COMPONENT_TODO);
export default Factory;
