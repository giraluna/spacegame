import {localize} from "../../localization/localize";

import {NotificationTemplate} from "core/src/templateinterfaces/NotificationTemplate";

import {GameLoader} from "core/src/saves/GameLoader";
import {Player} from "core/src/player/Player";
import {NotificationFilterState} from "core/src/notifications/NotificationFilterState";
import {NotificationWitnessCriterion} from "core/src/notifications/NotificationWitnessCriterion";
import {activeNotificationStore} from "core/src/app/activeNotificationStore";

import {PlayerDiedNotification as UIComponent} from "./uicomponents/PlayerDiedNotification";
import {getIconSrc} from "../../assets/assets";


export interface PropTypes
{
  player: Player;
}

export interface SerializedPropTypes
{
  playerId: number;
}

export const playerDiedNotification: NotificationTemplate<PropTypes, SerializedPropTypes> =
{
  key: "playerDiedNotification",
  // TODO 2019.09.05 | missing localization
  displayName: "Player died",
  category: "game",
  defaultFilterState: [NotificationFilterState.AlwaysShow],
  witnessCriteria: [[NotificationWitnessCriterion.MetOneInvolvedPlayer]],
  getIconSrc: getIconSrc.bind(null, "test3"),
  contentConstructor: UIComponent,
  messageConstructor: (props: PropTypes) =>
  {
    return localize("playerDiedMessage").format(
    {
      playerName: props.player.name,
    });
  },
  getTitle: (props: PropTypes) => localize("playerDiedTitle").toString(),
  serializeProps: (props: PropTypes) =>
  {
    return(
    {
      playerId: props.player.id,
    });
  },
  deserializeProps: (props: SerializedPropTypes, gameLoader: GameLoader) =>
  {
    return(
    {
      player: gameLoader.playersById[props.playerId],
    });
  },
};

export const playerDiedNotificationCreationScripts =
{
  player:
  {
    onDeath:
    [
      {
        key: "playerDiedNotification",
        triggerPriority: 0,
        script: (player: Player) =>
        {
          activeNotificationStore.makeNotification<PropTypes, SerializedPropTypes>(
          {
            template: playerDiedNotification,
            props:
            {
              player: player,
            },
            involvedPlayers: [player],
            location: null,
          });
        },
      },
    ],
  },
};