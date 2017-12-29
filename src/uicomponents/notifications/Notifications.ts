import * as React from "react";

import NotificationLog from "../../NotificationLog";

import NotificationLogComponentFactory from "./NotificationLog";


export interface PropTypes extends React.Props<any>
{
  log: NotificationLog;
  currentTurn: number;
}

interface StateType
{
}

export class NotificationsComponent extends React.Component<PropTypes, StateType>
{
  public displayName = "Notifications";

  state: StateType;

  constructor(props: PropTypes)
  {
    super(props);
  }

  render()
  {
    return(
      React.DOM.div(
      {
        className: "notifications-container",
      },
        NotificationLogComponentFactory(
        {
          log: this.props.log,
          currentTurn: this.props.currentTurn,
          key: "log",
        }),
      )
    );
  }
}

const Factory: React.Factory<PropTypes> = React.createFactory(NotificationsComponent);
export default Factory;
