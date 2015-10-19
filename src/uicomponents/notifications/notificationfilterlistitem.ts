module Rance
{
  export module UIComponents
  {
    export var NotificationFilterListItem = React.createClass(
    {
      displayName: "NotificationFilterListItem",
      propTypes:
      {
        displayName: React.PropTypes.string.isRequired,
        filterState: React.PropTypes.arrayOf(React.PropTypes.number).isRequired,
        key: React.PropTypes.string.isRequired,
        filter: React.PropTypes.instanceOf(Rance.NotificationFilter).isRequired
      },

      getInitialState: function()
      {
        return(
        {
          filterState: this.props.filterState
        });
      },
      
      componentWillReceiveProps: function(newProps: any)
      {
        this.setState(
        {
          filterState: newProps.filterState
        });
      },

      handleChangeState: function(state: NotificationFilterState)
      {
        var filter: Rance.NotificationFilter = this.props.filter;
        filter.handleFilterStateChange(this.props.key, state);
        this.setState(
        {
          filterState: filter.filters[this.props.key]
        });
      },
      
      render: function()
      {
        var inputElements: ReactDOMPlaceHolder[] = [];
        var filterState: NotificationFilterState[] = this.state.filterState;

        for (var state in NotificationFilterState)
        {
          if (!isFinite(state)) continue;
          var numericState = parseInt(state);

          var stateIsActive = filterState.indexOf(numericState) !== -1;
          inputElements.push(React.DOM.input(
          {
            className: "notification-filter-list-item-filter",
            type: "checkbox",
            id: this.props.key,
            key: state,
            checked: stateIsActive,
            onChange: this.handleChangeState.bind(this, numericState),
            title: NotificationFilterState[numericState]
          }));
        }

        return(
          React.DOM.div(
          {
            className: "notification-filter-list-item"
          },
            React.DOM.label(
            {
              className: "notification-filter-list-item-label",
              htmlFor: this.props.key
            },
              this.props.displayName
            ),
            React.DOM.div(
            {
              className: "notification-filter-list-item-filters"
            },
              inputElements
            )
          )
        );
      }
    })
  }
}
