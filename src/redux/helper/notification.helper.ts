import { NotificationType } from '../app/type';
import { Observable, concat, of } from 'rxjs';
import { AppActions, AppAction } from '../app/action';
import { AuthAction } from '../auth/action';

export type Action = AppAction | AuthAction;

export const getActionWithNotification = ({
  action,
  notification,
}: {
  action: Action;
  notification: { type: NotificationType; message: string; title?: string; duration?: number };
}): Observable<Action> => {
  return concat(
    of(action),
    of(AppActions.showNotification(notification.type, notification.message, notification.title, notification.duration)),
  );
};
