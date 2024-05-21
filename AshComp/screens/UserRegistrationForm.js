import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  Button, 
  StyleSheet, 
  Alert, 
  ScrollView, 
} from 'react-native';
import axios from 'axios';
import { useForm, Controller } from 'react-hook-form';

const csrfUrl = 'http://192.168.43.179:8000/api/get-csrf-token/';
const registerUrl = 'http://192.168.43.179:8000/api/register/';
const flutterwaveUrl = 'https://api.flutterwave.com/v3/payout-subaccounts';


const UserRegistrationForm = ({ navigation }) => {
  const {
    control, 
    handleSubmit, 
    formState: { errors }, 
  } = useForm();
  
  const onSubmit = async (data) => {
    try {
      const csrfResponse = await axios.get(`${csrfUrl}`);
      const csrfToken = csrfResponse.data.csrf_token;
  
      // Send POST request to Flutterwave API to create virtual account number
      const flutterwaveResponse = await axios.post(
        flutterwaveUrl,
        {
          account_name: `${data.first_name} ${data.last_name}`,
          email: data.email,
          mobilenumber: data.phone_number,
          country: 'NG',
          
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer FLWSECK-fab12578d0fa352253f89fd6a7b7b713-18f55ce05d4vt-X',
          } 
        }
      );
  
      // Log the response from Flutterwave
      console.log('Flutterwave Response:', flutterwaveResponse.data);

   
  
     
      const account_reference = flutterwaveResponse.data.data.account_reference;
      console.log(`account referebce: ${account_reference}`)
      const accountNumber = flutterwaveResponse.data.data.nuban;
      const flutterwaveBalance = `https://api.flutterwave.com/v3/payout-subaccounts/${account_reference}/balances`;

      const flutterwaveBalanceResponse = await axios.get(flutterwaveBalance, {
        "currency": "NGN",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer FLWSECK-fab12578d0fa352253f89fd6a7b7b713-18f55ce05d4vt-X',
        }
      });

      
      console.log(`Account Info: ${flutterwaveBalanceResponse.data}`)
      const accountBalance = flutterwaveBalanceResponse.data.data.available_balance;
  
    

  
      // Prepare form data for user registration
      const formData = new FormData();
      formData.append('username', data.username);
      formData.append('first_name', data.first_name);
      formData.append('last_name', data.last_name);
      formData.append('email', data.email);
      formData.append('phone_number', data.phone_number);
      formData.append('password', data.password);
      formData.append('account_reference', account_reference);
      formData.append('account_number', accountNumber);
      formData.append('account_balance', accountBalance)
  
      // Send POST request to register the user
      const response = await axios.post(`${registerUrl}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'X-CSRFToken': csrfToken,
        },
      });
  
      // Log the response from user registration
      console.log('User Registration Response:', response.data);
  
      Alert.alert('Registration Successful', 'User registered successfully');
      navigation.navigate('Login');
    } catch (error) {
      if (error.response && error.response.data) {
        // Display error from Flutterwave API
        Alert.alert('Flutterwave API Error', error.response.data.message);
      } else {
        // Handle other errors
        console.error('Registration error:', error.message);
      }
    }
  };
  
  
  return (
    <ScrollView style={styles.container}>
      <View style={styles.inputContainer}>
        <Controller
          control={control}
          render={({ field }) => (
            <TextInput 
              style={styles.inputField} 
              placeholder="Username" 
              onChangeText={(text) => field.onChange(text)} 
            />
          )}
          name="username"
          rules={{ required: 'Username is required' }}
        />
        {errors.username && <Text style={styles.errorText}>{errors.username.message}</Text>}

        <Controller
          control={control}
          render={({ field }) => (
            <TextInput
              style={styles.inputField}
              placeholder="Password"
              secureTextEntry
              onChangeText={(text) => field.onChange(text)}
            />
          )}
          name="password"
          rules={{ required: 'Password is required' }}
        />
        {errors.password && <Text style={styles.errorText}>{errors.password.message}</Text>}

        <Controller
          control={control}
          render={({ field }) => (
            <TextInput
              style={styles.inputField}
              placeholder="First Name"
              onChangeText={(text) => field.onChange(text)}
            />
          )}
          name="first_name"
          rules={{ required: 'First Name is required' }}
        />
        {errors.first_name && <Text style={styles.errorText}>{errors.first_name.message}</Text>}

        <Controller
          control={control}
          render={({ field }) => (
            <TextInput
              style={styles.inputField}
              placeholder="Last Name"
              onChangeText={(text) => field.onChange(text)}
            />
          )}
          name="last_name"
          rules={{ required: 'Last Name is required' }}
        />
        {errors.last_name && <Text style={styles.errorText}>{errors.last_name.message}</Text>}

        <Controller
          control={control}
          render={({ field }) => (
            <TextInput
              style={styles.inputField}
              placeholder="Email"
              onChangeText={(text) => field.onChange(text)}
              keyboardType="email-address"
            />
          )}
          name="email"
          rules={{ required: 'Email is required' }}
        />
        {errors.email && <Text style={styles.errorText}>{errors.email.message}</Text>}

        <Controller
          control={control}
          render={({ field }) => (
            <TextInput
              style={styles.inputField}
              placeholder="Phone Number"
              onChangeText={(text) => field.onChange(text)}
              keyboardType="numeric"
            />
          )}
          name="phone_number"
          rules={{ required: 'Phone Number is required' }}
        />
        {errors.phone_number && <Text style={styles.errorText}>{errors.phone_number.message}</Text>}


      </View>

      <Button title="Register" onPress={handleSubmit(onSubmit)} />
    </ScrollView>
  );
};




const styles = StyleSheet.create({
 container: {
    flex: 1, 
    paddingLeft: 10,
    paddingRight: 10
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20 
  },
  inputContainer: { 
    marginBottom: 15,
  },
  inputField: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
   padding: 2,
    marginTop: 5
  },
  errorText: { 
    color: 'red',
    marginTop: 5,
  },
  previewContainer: {
    marginTop: 10,
    alignItems: 'center',
  },
  previewImage: {
    width: 50,
    height: 50,
    marginTop: 5,
  },
});

export default UserRegistrationForm;
