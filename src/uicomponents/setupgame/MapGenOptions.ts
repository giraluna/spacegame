/// <reference path="../../../lib/react-global.d.ts" />


import MapGenOptions from "../../templateinterfaces/MapGenOptions";
import MapGenOptionValues from "../../templateinterfaces/MapGenOptionValues";
import Options from "../../Options";
import MapGenTemplate from "../../templateinterfaces/MapGenTemplate";
import OptionsGroup from "../galaxymap/OptionsGroup";
import MapGenOption from "./MapGenOption";
import Range from "../../Range";
import
{
  clamp,
  getRelativeValue,
  roundToNearestMultiple,
  extendObject,
  randInt
} from "../../utility";


interface PropTypes extends React.Props<any>
{
  mapGenTemplate: MapGenTemplate;
}

interface StateType
{
  // has property for every option value in this.props.mapGenTemplate
  // TODO refactor | move outside state object (?)
}

export class MapGenOptionsComponent extends React.Component<PropTypes, StateType>
{
  displayName: string = "MapGenOptions";

  state: StateType;

  constructor(props: PropTypes)
  {
    super(props);
    
    this.state = this.getInitialStateTODO();
    
    this.bindMethods();
  }
  private bindMethods()
  {
    this.resetValuesToDefault = this.resetValuesToDefault.bind(this);
    this.handleOptionChange = this.handleOptionChange.bind(this);
    this.getDefaultValues = this.getDefaultValues.bind(this);
    this.getOptionValue = this.getOptionValue.bind(this);
    this.randomizeOptions = this.randomizeOptions.bind(this);
    this.getOptionValuesForTemplate = this.getOptionValuesForTemplate.bind(this);    
  }
  
  private getInitialStateTODO(): StateType
  {
    return this.getDefaultValues(this.props.mapGenTemplate);
  }

  componentWillReceiveProps(newProps: PropTypes)
  {
    if (newProps.mapGenTemplate.key !== this.props.mapGenTemplate.key)
    {
      this.setState(this.getDefaultValues(newProps.mapGenTemplate));
    }
  }

  getDefaultValues(mapGenTemplate: MapGenTemplate, unsetOnly: boolean = true)
  {
    var defaultValues = {};

    ["defaultOptions", "basicOptions", "advancedOptions"].forEach(function(optionGroup: string)
    {
      var options: MapGenOptions = mapGenTemplate.options[optionGroup];
      if (!options) return;

      for (let optionName in options)
      {
        var option: Range = options[optionName].range;
        var value: number;

        if (unsetOnly && this.state && isFinite(this.getOptionValue(optionName)))
        {
          if (!this.props.mapGenTemplate.options[optionGroup]) continue;

          var oldOption = this.props.mapGenTemplate.options[optionGroup][optionName];

          if (!oldOption) continue;

          var oldValuePercentage = getRelativeValue(
            this.getOptionValue(optionName), oldOption.range.min, oldOption.range.max);
          value = option.min + (option.max - option.min) * oldValuePercentage;
        }
        else
        {
          value = isFinite(option.defaultValue) ? option.defaultValue : (option.min + option.max) / 2;
        }

        value = clamp(roundToNearestMultiple(value, option.step), option.min, option.max);
        defaultValues["optionValue_" + optionName] = value; 
      }
    }.bind(this));

    return defaultValues;
  }

  resetValuesToDefault()
  {
    this.setState(this.getDefaultValues(this.props.mapGenTemplate, false));
  }

  handleOptionChange(optionName: string, newValue: number)
  {
    var changedState: StateType = {};
    changedState["optionValue_" + optionName] = newValue;

    this.setState(changedState);
  }

  getOptionValue(optionName: string): number
  {
    return this.state["optionValue_" + optionName];
  }

  randomizeOptions()
  {
    var newValues: StateType = {};

    var optionGroups: MapGenOptions = this.props.mapGenTemplate.options;
    for (let optionGroupName in optionGroups)
    {
      var optionGroup = optionGroups[optionGroupName];
      for (let optionName in optionGroup)
      {
        var option = optionGroup[optionName].range;
        var optionValue = clamp(roundToNearestMultiple(randInt(option.min, option.max), option.step), option.min, option.max);
        newValues["optionValue_" + optionName] = optionValue;
      }
    }

    this.setState(newValues);
  }

  getOptionValuesForTemplate(): MapGenOptionValues
  {
    var optionValues: MapGenOptionValues =
      extendObject(this.props.mapGenTemplate.options);

    for (let groupName in optionValues)
    {
      var optionsGroup = optionValues[groupName];

      for (let optionName in optionsGroup)
      {
        var optionValue = this.getOptionValue(optionName);
        if (!isFinite(optionValue))
        {
          throw new Error("Value " + optionValue + " for option " + optionName + " is invalid.");
        }

        optionValues[groupName][optionName] = optionValue;
      }
    }

    return optionValues;
  }

  render()
  {
    var optionGroups: React.ReactElement<any>[] = [];

    var optionGroupsInfo =
    {
      defaultOptions:
      {
        title: "Default Options",
        isCollapsedInitially: false
      },
      basicOptions:
      {
        title: "Basic Options",
        isCollapsedInitially: false
      },
      advancedOptions:
      {
        title: "Advanced Options",
        isCollapsedInitially: true
      }
    };

    for (let groupName in optionGroupsInfo)
    {
      if (!this.props.mapGenTemplate.options[groupName]) continue;


      var options: {key: string; content: React.ReactElement<any>;}[] = [];

      for (let optionName in this.props.mapGenTemplate.options[groupName])
      {
        var option = this.props.mapGenTemplate.options[groupName][optionName];

        options.push(
        {
          key: optionName,
          content: MapGenOption(
          {
            key: optionName,
            id: optionName,
            option: option,
            value: this.getOptionValue(optionName),
            onChange: this.handleOptionChange
          })
        });
      }
      
      optionGroups.push(OptionsGroup(
      {
        key: groupName,
        header: optionGroupsInfo[groupName].title,
        options: options,
        isCollapsedInitially: optionGroupsInfo[groupName].isCollapsedInitially
      }));
    }

    return(
      React.DOM.div(
      {
        className: "map-gen-options"
      },
        React.DOM.div(
        {
          className: "map-gen-options-option-groups"
        },
          optionGroups
        ),
        React.DOM.div(
        {
          className: "map-gen-options-buttons"
        },
          React.DOM.button(
          {
            className: "map-gen-options-button",
            onClick: this.randomizeOptions
          },
            "randomize"
          ),
          React.DOM.button(
          {
            className: "map-gen-options-button",
            onClick: this.resetValuesToDefault
          },
            "reset"
          )
        )
      )
    );
  }
}

const Factory: React.Factory<PropTypes> = React.createFactory(MapGenOptionsComponent);
export default Factory;
