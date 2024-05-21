import React, { createContext, useState, useContext, useEffect } from 'react';
import { registerForPushNotificationsAsync } from '../components/NotificationHandler';

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [expoPushToken, setExpoPushToken] = useState('');

  useEffect(() => {
    registerForPushNotificationsAsync()
      .then(token => setExpoPushToken(token))
      .catch(error => console.error('Failed to get push token:', error));
  }, []);

  return (
    <NotificationContext.Provider value={expoPushToken}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => useContext(NotificationContext);
