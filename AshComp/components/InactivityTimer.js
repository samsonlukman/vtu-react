import React, { useEffect, useRef } from 'react';
import { AppState, Alert, TouchableWithoutFeedback, View } from 'react-native';
import { useAuth } from '../contexts/AuthContext';

const InactivityTimer = ({ children }) => {
  const { logout } = useAuth();
  const timerRef = useRef(null);
  const appState = useRef(AppState.currentState);

  const resetTimer = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    timerRef.current = setTimeout(() => {
      Alert.alert('Session Expired', 'You have been logged out due to inactivity.');
      logout();
      
    }, 2 * 60 * 1000); // 2 minutes
  };

  const handleAppStateChange = (nextAppState) => {
    if (appState.current.match(/inactive|background/) && nextAppState === 'active') {
      resetTimer();
    }
    appState.current = nextAppState;
  };

  useEffect(() => {
    resetTimer();

    AppState.addEventListener('change', handleAppStateChange);

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
      AppState.removeEventListener('change', handleAppStateChange);
    };
  }, []);

  return (
    <TouchableWithoutFeedback onPress={resetTimer} onLayout={resetTimer}>
      <View style={{ flex: 1 }}>
        {children}
      </View>
    </TouchableWithoutFeedback>
  );
};

export default InactivityTimer;
