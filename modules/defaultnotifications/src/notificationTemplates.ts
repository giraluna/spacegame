import {NotificationTemplate} from "core/src/templateinterfaces/NotificationTemplate";
import {TemplateCollection} from "core/src/templateinterfaces/TemplateCollection";

import
{
  battleFinishNotification,
  battleFinishNotificationCreationScripts,
} from "./notifications/battleFinishNotification";
import
{
  playerDiedNotification,
  playerDiedNotificationCreationScripts,
} from "./notifications/playerDiedNotification";
import
{
  warDeclarationNotification,
  warDeclarationNotificationCreationScripts,
} from "./notifications/warDeclarationNotification";


// tslint:disable-next-line:no-any
export const notificationTemplates: TemplateCollection<NotificationTemplate<any, any>> =
{
  [battleFinishNotification.key]: battleFinishNotification,
  [playerDiedNotification.key]: playerDiedNotification,
  [warDeclarationNotification.key]: warDeclarationNotification,
};

export const notificationCreationScripts =
{
  ...battleFinishNotificationCreationScripts,
  ...playerDiedNotificationCreationScripts,
  ...warDeclarationNotificationCreationScripts,
};
