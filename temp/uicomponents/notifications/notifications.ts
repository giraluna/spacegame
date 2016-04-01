/// <reference path="../../notificationlog.ts" />
/// <reference path="notificationlog.ts" />

export interface PropTypes
{
  log: NotificationLog;
  currentTurn: number;
}

export var Notifications = React.createFactory(React.createClass(
{
  displayName: "Notifications",

  propTypes:
  {
    log: React.PropTypes.instanceOf(Rance.NotificationLog).isRequired,
    currentTurn: React.PropTypes.number.isRequired
  },

  render: function()
  {
    return(
      React.DOM.div(
      {
        className: "notifications-container"
      },
        UIComponents.NotificationLog(
        {
          log: this.props.log,
          currentTurn: this.props.currentTurn,
          key: "log"
        })
      )
    );
  }
}));
