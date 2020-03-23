import './NotificationContainer.scss';
import React from 'react';
import { useTypeSelector } from './../../redux/helper/selector.helper';
import Notification from './Notification';

const NotificationContainer = () => {
  const { notifications } = useTypeSelector(s => s.appState);

  return (
    <div className="notification-container">
      {notifications.map(n => (
        <Notification key={n.id} notification={n} />
      ))}
    </div>
  );
};

export default NotificationContainer;
