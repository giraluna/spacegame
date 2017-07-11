/// <reference path="../../../lib/react-global.d.ts" />

import {default as Spinner} from "./Spinner";

import
{
  clamp,
  mergeReactAttributes,
} from "../../utility";


interface PropTypes extends React.Props<any>
{
  value: number;
  onChange: (value: number) => void;

  min?: number;
  max?: number;
  step?: number;

  attributes?: React.HTMLAttributes;
}

interface StateType
{
  displayedValue?: string;
}

export class NumberInputComponent extends React.Component<PropTypes, StateType>
{
  public displayName = "NumberInput";
  public state: StateType;

  constructor(props: PropTypes)
  {
    super(props);

    this.state =
    {
      displayedValue: "" + this.props.value,
    };

    this.handleValueChange = this.handleValueChange.bind(this);
    this.changeValue = this.changeValue.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
  }

  public componentWillReceiveProps(newProps: PropTypes): void
  {
    if ("" + newProps.value !== this.state.displayedValue)
    {
      this.setState(
      {
        displayedValue: "" + newProps.value,
      });
    }
  }
  public componentWillUnmount(): void
  {
    this.handleBlur();
  }
  public render()
  {
    const defaultAttributes: React.HTMLAttributes =
    {
      className: "number-input",
      type: "text",
      value: this.state.displayedValue,
      onChange: this.handleValueChange,
      onBlur: this.handleBlur,
    };
    const customAttributes = this.props.attributes || {};
    const attributes = mergeReactAttributes(defaultAttributes, customAttributes);

    return(
      React.DOM.div(
      {
        className: "number-input-container",
      },
        React.DOM.input(attributes),
        Spinner(
        {
          value: this.props.value,
          step: this.getStep(),
          onChange: this.changeValue,

          min: this.props.min,
          max: this.props.max,
        }),
      )
    );
  }

  private getStep(): number
  {
    return this.props.step || 1;
  }
  private getDecimalPlacesInStep(): number
  {
    // step is specified in code, so assume no precision issues
    const split = ("" + this.getStep()).split(".");

    return split[1] ? split[1].length : 0;
  }
  private handleBlur(): void
  {
    if (this.valueStringIsValid(this.state.displayedValue))
    {
      this.changeValue(parseFloat(this.state.displayedValue));
    }
    else
    {
      this.setState({displayedValue: "" + this.props.value});
    }
  }
  private handleValueChange(e: React.FormEvent | ClipboardEvent): void
  {
    e.stopPropagation();
    e.preventDefault();

    const target = <HTMLInputElement> e.target;
    const valueString = target.value;

    const isValid = this.valueStringIsValid(valueString);
    const isWithinBounds = this.valueIsWithinBounds(parseFloat(valueString));

    if (isValid && isWithinBounds)
    {
      this.changeValue(parseFloat(valueString));
    }
    else
    {
      this.setState(
      {
        displayedValue: valueString,
      });
    }
  }
  private changeValue(value: number): void
  {
    if (value === this.props.value)
    {
      this.setState({displayedValue: "" + value});

      return;
    }

    const precision = this.getDecimalPlacesInStep();
    const roundedValue = parseFloat(value.toFixed(precision));

    const min = isFinite(this.props.min) ? this.props.min : -Infinity;
    const max = isFinite(this.props.max) ? this.props.max : Infinity;
    const clampedValue = clamp(roundedValue, min, max);

    this.props.onChange(clampedValue);
  }
  private valueStringIsValid(valueString: string): boolean
  {
    // TODO 2017.07.11 | VVV not true anymore
    // valueString comes from a number input, so assume it's always a valid number
    const value = parseFloat(valueString);

    if (!isFinite(value))
    {
      return false;
    }

    return true;
  }
  private valueIsWithinBounds(value: number): boolean
  {
    const min = isFinite(this.props.min) ? this.props.min : -Infinity;
    const max = isFinite(this.props.max) ? this.props.max : Infinity;

    return value >= min && value <= max;
  }
}

const Factory: React.Factory<PropTypes> = React.createFactory(NumberInputComponent);
export default Factory;
