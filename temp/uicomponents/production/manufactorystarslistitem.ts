/// <reference path="../../star.ts" />

export interface PropTypes
{
  star: Star;
  isHighlighted: boolean;
  usedCapacity: number;
  totalCapacity: number;
  onClick: reactTypeTODO_func;
}

export default class ManufactoryStarsListItem extends React.Component<PropTypes, {}>
{
  displayName: "ManufactoryStarsListItem",


  handleClick: function()
  {
    var star: Star = this.props.star;
    this.props.onClick(star);
  },

  render: function()
  {
    var star: Star = this.props.star;
    var isHighlighted: boolean = this.props.isHighlighted;
    var usedCapacity: number = this.props.usedCapacity;
    var totalCapacity: number = this.props.totalCapacity;

    var hasManufcatory = Boolean(totalCapacity);
    var hasCapacity = hasManufcatory && usedCapacity < totalCapacity;

    return(
      React.DOM.div(
      {
        className: "manufactory-stars-list-item" +
          (!hasManufcatory ? " no-manufactory" : "") +
          (isHighlighted ? " highlighted" : ""),
        onClick: this.handleClick
      },
        React.DOM.div(
        {
          className: "manufactory-stars-list-item-star-name"
        },
          star.name
        ),
        !hasManufcatory ? null : React.DOM.div(
        {
          className: "manufactory-stars-list-item-capacity" + (!hasCapacity ? " no-capacity" : "")
        },
          "" + usedCapacity + "/" + totalCapacity
        )
      )
    );
  }
}
