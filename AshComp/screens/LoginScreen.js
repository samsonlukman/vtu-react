import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { useAuth } from '../contexts/AuthContext';
import { Video } from 'expo-av';

const LoginScreen = ({ navigation }) => {
  const { login } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const goToRegistration = () => {
    navigation.navigate('UserRegistrationForm');
  };

  const handleLogin = async () => {
    setLoading(true);
    try {
      await login(username, password);
      Alert.alert('Login Successful');
      setLoading(false);
      navigation.navigate('Home'); // Navigate to your main screen
    } catch (error) {
      setLoading(false);
      Alert.alert('Error: Check your username or password');
      console.error('Login error:', error);
    }
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <View style={styles.loadingContainer}>
          <Video
            source={require('../assets/loading.mp4')}
            rate={1.0}
            volume={1.0}
            isMuted={false}
            resizeMode="contain"
            shouldPlay
            isLooping
            style={styles.video}
          />
        </View>
      ) : (
        <>
          <Text style={styles.title}>Welcome Back</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.inputField}
              placeholder="Username"
              value={username}
              onChangeText={setUsername}
            />
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.inputField}
              placeholder="Password"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />
          </View>
          <Button title="Login" onPress={handleLogin} />
          <View style={styles.registerLinkContainer}>
            <Text>Don't have an account? </Text>
            <TouchableOpacity onPress={goToRegistration}>
              <Text style={styles.registerLink}>Register here</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 15,
  },
  inputField: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
  },
  registerLinkContainer: {
    flexDirection: 'row',
    marginTop: 15,
  },
  registerLink: {
    color: 'blue',
    fontWeight: 'bold',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
  },
  video: {
    width: 300, // Set the desired width
    height: 300, // Set the desired height
  },
});

export default LoginScreen;
