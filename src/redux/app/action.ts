import { NotificationType, AppActionType, INotification } from './type';
import { action } from 'typesafe-actions';
import { ActionsUnion } from '../helper/type.helper';

export const AppActions = {
  showNotification: (type: NotificationType, message: string, title?: string, duration?: number) =>
    action(AppActionType.SHOW_NOTIFICATION, { type, message, title, duration }),

  showNotificationSuccess: (notification: INotification) =>
    action(AppActionType.SHOW_NOTIFICATION_SUCCESS, { notification }),

  deleteNotification: (notificationId: string) => action(AppActionType.DELETE_NOTIFICATION, { notificationId }),
};

export type AppAction = ActionsUnion<typeof AppActions>;
