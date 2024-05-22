import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, Pressable, ScrollView, TextInput, ActivityIndicator, Alert } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useNavigation } from "@react-navigation/native";
import { Image } from "expo-image";
import { Color, FontFamily, FontSize, Border } from "../GlobalStyles";
import axios from "axios";
import * as Clipboard from 'expo-clipboard';
import { useUser } from "../contexts/UserContext";
import { useNotification } from "../contexts/NotificationContext";// Import the sendPushNotification function
import { sendPushNotification } from "../components/NotificationHandler";
import { useAuth } from "../contexts/AuthContext";

const Cable = () => {
  const navigation = useNavigation();
  const [selectedProvider, setSelectedProvider] = useState("");
  const [distributionCompanies, setDistributionCompanies] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedPackage, setSelectedPackage] = useState("");
  const [amount, setAmount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [Number, setNumber] = useState("");
  const [loadingMessage, setLoadingMessage] = useState('');
  const [paymentChoice, setPaymentChoice] = useState("");
  const [selectedProductCode, setSelectedProductCode] = useState("");
  const { userData, loading, wallet } = useUser();
  const expoPushToken = useNotification();
  const { user } = useAuth();
  const [csrfToken, setCsrfToken] = useState("");

   // Fetch CSRF token when component mounts
   useEffect(() => {
    const fetchCsrfToken = async () => {
      try {
        const csrfResponse = await axios.get('http://192.168.43.179:8000/api/get-csrf-token/');
        setCsrfToken(csrfResponse.data.csrf_token);
      } catch (error) {
        console.error('Error fetching CSRF token:', error.message);
      }
    };

    fetchCsrfToken();
  }, []);

  useEffect(() => {
    fetchDistributionCompanies();
  }, []);

  const fetchDistributionCompanies = async () => {
    try {
      const response = await axios.get(
        "http://192.168.43.179:8000/api/tv-plans/"
      );
      setDistributionCompanies(response.data);
    } catch (error) {
      console.error("Error fetching distribution companies:", error);
    }
  };

  const handlePackageChange = (pkg) => {
    setSelectedPackage(pkg);
    const selectedPackageData = filteredData.find(item => item.service_name === pkg);
    if (selectedPackageData) {
      setSelectedProductCode(selectedPackageData.product_code);
      setAmount(selectedPackageData.price); // Update the amount here
    }
  };

  const handlePaymentChoice = (choice) => {
    setPaymentChoice(choice);
    console.log(choice);
  };

  const handleCopyToClipboard = async () => {
    await Clipboard.setStringAsync(Number);
    alert('Copied to clipboard!');
  };

  const handleProviderChange = (provider) => {
    setSelectedProvider(provider);
    const filtered = distributionCompanies.filter(
      (item) =>
        item.service_name.toUpperCase().includes(provider.toUpperCase())
    );
    setFilteredData(filtered);
  };

  const handlePayBill = async () => {
    if (!selectedProductCode || !Number) {
      Alert.alert("Input all fields");
      return;
  }

    setIsLoading(true);
  
    try {
      const flutterwaveParams = {
        account_bank: '035',
        account_number: '8548105217',
        amount: amount,
        currency: 'NGN',
        narration: `Subscription for ${selectedProductCode}, Smart Card Number: ${Number}`,
        debit_subaccount: `${userData.account_reference}`
      };
      console.log(flutterwaveParams);
  
      const flutterwaveHeaders = {
        'Authorization': `Bearer FLWSECK-fab12578d0fa352253f89fd6a7b7b713-18f55ce05d4vt-X`, // Corrected line
        'Content-Type': 'application/json'
      };
  
      const transferResponse = await axios.post('https://api.flutterwave.com/v3/transfers', flutterwaveParams, {
        headers: flutterwaveHeaders
      });
  
      if (transferResponse.data.status === 'success' && transferResponse.data.message === 'Transfer Queued Successfully') {
        console.log("Feedback: ", transferResponse.data.message);
  
        const csrfResponse = await axios.get('http://192.168.43.179:8000/api/get-csrf-token/');
        const csrfToken = csrfResponse.data.csrf_token;
  
        
      const requestBody = {
        product_code: selectedProductCode,
        number: Number,
        
      };

      const historyParams = {
        user: userData.id,
        text:   `TV Subscription: ${selectedProductCode} for ${Number}`
      }
  
        console.log('Data sent to backend:', requestBody);
  
        axios.post('http://192.168.43.179:8000/api/buy-tv/', requestBody, {
          headers: {
            'X-CSRFToken': csrfToken,
            'Content-Type': 'application/json' // Ensure you set the correct content type
          }
        })
          .then(response => {
            console.log('Data sent to backend:', requestBody);
            console.log('Response from backend:', response.data);
            // Handle response from backend if needed
            Alert.alert("Success");
            sendPushNotification(
              expoPushToken, // Use the token obtained from the context
              'Successful Subscription',
              `You have successfully purchased ${selectedProductCode} subscription for ${Number}`,
              { product_code: selectedProductCode,  number: Number }
            );

            axios.post('http://192.168.43.179:8000/api/history/', historyParams, {
              headers: {
                'X-CSRFToken': csrfToken,
                'Content-Type': 'application/json' // Ensure you set the correct content type
            }
          });
            navigation.navigate("Home")
          })
          .catch(error => {
            console.error('Error:', error);
            // Handle error
            Alert.alert("Subscription Failed. Try again.");
          })
          .finally(() => {
            setIsLoading(false);
          });
      }
    } catch (error) {
      console.error('Error:', error);
      // Handle error
    }
  };

  const handleCardUssdPayBill = async () => {
    if (!selectedProductCode || !Number) {
        Alert.alert("Input all fields");
        return;
    }

    setIsLoading(true);

    try {
        // Prepare data for Flutterwave payment request
        const flutterwaveUrl = 'https://api.flutterwave.com/v3/payments';
        const secret_key = 'FLWSECK-fab12578d0fa352253f89fd6a7b7b713-18f55ce05d4vt-X';

        function generateRandomString(length) {
            let result = '';
            const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            const charactersLength = characters.length;
            for (let i = 0; i < length; i++) {
                result += characters.charAt(Math.floor(Math.random() * charactersLength));
            }
            return result;
        }

        const tx_ref = `payville-bill-${generateRandomString(25)}`;
        const flutterwaveParams = {
            tx_ref: tx_ref,
            amount: amount,
            currency: 'NGN',
            redirect_url: 'https://9b60-105-113-18-64.ngrok-free.app/api/index/',
            customer: {
                email: userData.email || 'anonymous@gmail.com',
                phonenumber: '08080808080',
                name: userData.username || 'anonymous user',
            },
            customizations: {
                title: 'Bill Payment',
                description: `Subscription for ${selectedProductCode}, Smart Card Number: ${Number}`,
            },
        };

        const flutterwaveHeaders = {
            'Authorization': `Bearer ${secret_key}`,
            'Content-Type': 'application/json'
        };

        // Make API request to Flutterwave using Axios
        const paymentResponse = await axios.post(flutterwaveUrl, flutterwaveParams, {
            headers: flutterwaveHeaders
        });

        if (paymentResponse.data.status === 'success') {
            const paymentLink = paymentResponse.data.data.link;
            Clipboard.setString(paymentLink);
            Alert.alert('Payment Link copied to your clipboard.',
             'Timeout in 180 seconds. We will keep checking for the payment every 45 seconds. Do not leave the page until transaction is succesfful or timeout');

            let retryCount = 0;
            const maxRetries = 4; // Total of 2 minutes (4 retries with 30 seconds interval)
            const interval = 45000; // 30 seconds interval

            const intervalId = setInterval(async () => {
                retryCount++;
                try {
                    // Fetch transaction details from your backend
                    const transactionResponse = await axios.get('http://192.168.43.179:8000/api/transactions/', {
                        headers: {
                            'X-CSRFToken': csrfToken,
                        }
                    });

                    const transaction = transactionResponse.data.find(tx => tx.tx_ref === tx_ref);
                    if (!transaction) {
                        throw new Error('Transaction not found');
                    }

                    // Verify the payment using Flutterwave API
                    const verifyUrl = `https://api.flutterwave.com/v3/transactions/${transaction.transaction_id}/verify`;
                    const verifyResponse = await axios.get(verifyUrl, {
                        headers: {
                            'Authorization': `Bearer ${secret_key}`,
                            'Content-Type': 'application/json'
                        }
                    });

                    if (verifyResponse.data.status === 'success' && verifyResponse.data.data.status === 'successful') {
                        clearInterval(intervalId);

                        // Fetch CSRF token
                        const csrfResponse = await axios.get('http://192.168.43.179:8000/api/get-csrf-token/');
                        const csrfToken = csrfResponse.data.csrf_token;

                        // Prepare data for VTU API request
                        const requestBody = {
                            product_code: selectedProductCode,
                            number: Number,
                        };

                        const historyParams = {
                            user: userData.id,
                            text: `TV Subscription: ${selectedProductCode} for ${Number}`
                        }

                        // Send POST request to backend API with CSRF token included in headers
                        const vtuResponse = await axios.post('http://192.168.43.179:8000/api/buy-tv/', requestBody, {
                            headers: {
                                'X-CSRFToken': csrfToken,
                                'Content-Type': 'application/json' // Ensure you set the correct content type
                            }
                        });

                        if (vtuResponse.data.success === true) {
                            console.log('Data sent to backend:', requestBody);
                            console.log('Response from backend:', vtuResponse.data);
                            Alert.alert(vtuResponse.data.message);
                            await sendPushNotification(
                                expoPushToken, // Use the token obtained from the context
                                'Successful Subscription',
                                `You have successfully purchased ${selectedProductCode} subscription for ${Number}`,
                                { product_code: selectedProductCode, number: Number }
                            );

                            await axios.post('http://192.168.43.179:8000/api/history/', historyParams, {
                                headers: {
                                    'X-CSRFToken': csrfToken,
                                    'Content-Type': 'application/json' // Ensure you set the correct content type
                                }
                            });
                            setIsLoading(false); // Stop the loading indicator
                            navigation.navigate("Home");
                        }
                    } else if (retryCount >= maxRetries) {
                        clearInterval(intervalId);
                        Alert.alert('Error', 'Payment verification failed after multiple attempts.');
                        setIsLoading(false); // Stop the loading indicator
                    }
                } catch (error) {
                    console.error('Verification Error:', error.response ? error.response.data : error.message);
                    if (retryCount >= maxRetries) {
                        clearInterval(intervalId);
                        Alert.alert('Verification Error', error.response ? error.response.data.message : error.message);
                        setIsLoading(false); // Stop the loading indicator
                    }
                }
            }, interval);
        } else {
            Alert.alert("Error", paymentResponse.data.message);
            setIsLoading(false); // Stop the loading indicator
        }
    } catch (error) {
        console.error('Error:', error);
        // Handle error
        Alert.alert("Network Error or Try Another Plan");
        setIsLoading(false); // Stop the loading indicator
    }
};


  return (
    <ScrollView>
      <View style={styles.cable}>
        <View style={styles.cableChild} />
        <View>
          <Pressable onLongPress={handleCopyToClipboard} style={styles.smartcardNumber}>
            <TextInput
              style={styles.textInput}
              placeholder="Enter Smartcard Number"
              keyboardType="numeric"
              onChangeText={(text) => setNumber(text)}
              value={Number}
            />
          </Pressable>
        </View>
        <View style={styles.frameParent}>
          <Picker
            style={styles.providerPicker}
            selectedValue={selectedProvider}
            onValueChange={(itemValue) => handleProviderChange(itemValue)}
          >
            <Picker.Item label="Select a provider" value="" />
            <Picker.Item label="DSTV" value="DSTV" />
            <Picker.Item label="GOTV" value="GOTV" />
            <Picker.Item label="StarTimes" value="StarTimes" />
          </Picker>
          <Picker
            style={styles.packagePicker}
            selectedValue={selectedPackage}
            onValueChange={(itemValue) => handlePackageChange(itemValue)}
          >
            <Picker.Item label="Select package" value="" />
            {filteredData.map((item, index) => (
              <Picker.Item
                key={index}
                label={`${item.service_name} - ${item.price}`}
                value={item.service_name}
              />
            ))}
          </Picker>
        </View>
        <View style={styles.slide}>
  {isLoading ? (
    <ActivityIndicator size="large" color="#0000ff" />
  ) : (
    <Pressable onPress={paymentChoice === 'atm' ? handleCardUssdPayBill : handlePayBill}>
      <Text style={[styles.buyTypo, styles.buyButton]}>Buy</Text>
    </Pressable>
  )}
  <Image
    style={[styles.teenyiconsarrowSolid, styles.slideItemLayout]}
    contentFit="cover"
    source={require("../assets/teenyiconsarrowsolid.png")}
  />
</View>
<View style={[styles.rectangleParent]}>
<View style={[styles.groupChild, styles.groupPosition]} />
          <View style={[styles.groupItem, styles.groupPosition]} />
  <Pressable onPress={() => handlePaymentChoice("atm")} style={[styles.atmPressable, styles.atmPosition]}>
    <Text style={styles.atm}>Card, USSD</Text>
  </Pressable>
  <Pressable 
  onPress={() => user && user.isAuthenticated ? handlePaymentChoice("wallet") : Alert.alert("Login to use wallet")} 
  style={[styles.walletPressable, styles.atmPosition]}
>
  <Text style={styles.wallet}>WALLET</Text>
</Pressable>

</View>
        <Image
          style={[styles.rectangleIcon, styles.slidePosition]}
          contentFit="cover"
          source={require("../assets/rectangle-9.png")}
        />
        <Text style={[styles.payForCable, styles.buyTypo]}>Pay for Cable</Text>
        {user && user.isAuthenticated ? (
  <Text style={styles.walletBalance5000}>
    {userData && userData.account_number ? `Wallet Balance: ₦${wallet}` : '***'}
  </Text>
) : (
  <Text style={styles.walletBalance5000}>Wallet Balance: Login to see balance</Text>
)}
        <Pressable
          style={styles.mingcutebackFill}
          onPress={() => navigation.goBack()}
        >
          <Image
            style={styles.icon}
            contentFit="cover"
            source={require("../assets/mingcutebackfill.png")}
          />
        </Pressable>
      </View>
    </ScrollView>
  );
};


const styles = StyleSheet.create({
  cableLayout: {
    height: 37,
    width: 279,
  },
  packagePicker: {
    position: 'absolute',
    top: 400,
    left: 35,
    right: 20,
    elevation: 40,
    width: '80%'
  },
  selectTypo: {
    color: Color.colorDarkgray,
    fontFamily: FontFamily.robotoRegular,
    textAlign: "left",
    fontSize: FontSize.size_xs,
    position: "absolute",
  },
  slidePosition: {
    left: "50%",
    position: "absolute",
  },
  slideItemLayout: {
    maxHeight: "100%",
    maxWidth: "100%",
    position: "absolute",
    overflow: "hidden",
  },
  buyTypo: {
    color: Color.colorWhite,
    textAlign: "left",
    fontFamily: FontFamily.robotoBold,
    fontWeight: "700",
    position: "absolute",
  },
  groupPosition: {
    left: 0,
    top: 0,
    height: 65,
    position: "absolute",
  },
  atmTypo: {
    top: 25,
    color: Color.colorWhite,
    textAlign: "left",
    fontFamily: FontFamily.robotoBold,
    fontWeight: "700",
    fontSize: FontSize.size_xs,
    position: "absolute",
  },
  cablePosition: {
    marginLeft: -139,
    left: "50%",
    position: "absolute",
  },
  cableChild: {
    top: 149,
    left: 33,
    shadowColor: "rgba(0, 0, 0, 0.25)",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 4,
    elevation: 4,
    shadowOpacity: 1,
    borderRadius: Border.br_19xl,
    width: 300,
    height: '70%',
    position: "absolute",
    backgroundColor: Color.colorWhite,
  },
  walletBalance5000: {
    top: 230,
    color: Color.colorBlack,
    textAlign: "left",
    fontFamily: FontFamily.robotoBold,
    fontWeight: "700",
    fontSize: FontSize.size_xs,
    left: "50%",
    marginLeft: -57,
    position: "absolute",
  },
  cableItem: {
    top: 517,
    backgroundColor: Color.colorGainsboro_100,
    borderRadius: Border.br_6xs,
    width: 279,
    marginLeft: -139,
    left: "50%",
    position: "absolute",
  },
  cableInner: {
    top: 459,
    backgroundColor: Color.colorGainsboro_100,
    borderRadius: Border.br_6xs,
    width: 279,
    marginLeft: -139,
    left: "50%",
    position: "absolute",
  },
  rectangleView: {
    top: 401,
    backgroundColor: Color.colorGainsboro_100,
    borderRadius: Border.br_6xs,
    width: 279,
    marginLeft: -139,
    left: "50%",
    position: "absolute",
  },
  smartcardNumber: {
    top: 500,
    height: 37,
    width: '70%',
    backgroundColor: Color.colorGainsboro_100,
    borderRadius: Border.br_6xs,
    left: '15%',
    elevation: 60
  },
  textInput: {
    left: '10%'
  },
  amount: {
    top: 471,
    left: 91,
    fontFamily: FontFamily.robotoRegular,
  },
  selectPlan: {
    top: 413,
    left: 91,
    fontFamily: FontFamily.robotoRegular,
  },
  slideChild: {
    top: "0%",
    right: "0%",
    bottom: "0%",
    left: "0%",
    borderRadius: Border.br_18xl,
    backgroundColor: Color.colorDarkcyan_100,
    height: "100%",
    position: "absolute",
    width: "100%",
  },
  slideItem: {
    height: "85.38%",
    width: "27.13%",
    top: "7.44%",
    right: "68.61%",
    bottom: "7.18%",
    left: "4.26%",
    display: "none",
  },
  buy: {
    top: "30.77%",
    left: "24.35%",
    fontSize: FontSize.size_sm,
  },
  teenyiconsarrowSolid: {
    height: "54.36%",
    width: "18.43%",
    top: "25.38%",
    right: "19.91%",
    bottom: "20.26%",
    left: "61.65%",
  },
  buyButton: {
    backgroundColor: Color.colorDarkcyan_100,
    borderRadius: 20,
    padding: 10,
    width: 100,
    textAlign: 'center',
    color: 'white',
  },
  slide: {
    marginLeft: -57,
    top: 550,
    width: 115,
    height: 39,
    left: "50%",
    position: "absolute",
  },
  groupChild: {
    borderRadius: Border.br_xs,
    width: 300,
    top: 0,
    backgroundColor: Color.colorDarkcyan_100,
  },
  groupItem: {
    borderTopLeftRadius: Border.br_xs,
    borderBottomLeftRadius: Border.br_xs,
    backgroundColor: "#edf0b1",
    width: 150,
  },
  atm: {
    left: 5,
    bottom: 10,
    color: Color.colorBlack,
    fontFamily: FontFamily.robotoBold,
    fontWeight: "700",
  },
  wallet: {
    left: 35,
    bottom: 10,
    color: Color.colorWhite,
    fontFamily: FontFamily.robotoBold,
    fontWeight: "700",
  },
  rectangleParent: {
    top: 260,
    left: 33,
    height: 65,
    width: 200,
    position: "absolute",
  },
  atmPressable: {
    position: "absolute",
    left: 20, // Adjust spacing between ATM and WALLET
    top: 0,
    width: 100,
    height: 65,
    justifyContent: 'center',
    alignItems: 'center',
  },
  walletPressable: {
    position: "absolute",
    left: 140, // Adjust spacing between ATM and WALLET
    top: 0,
    width: 100,
    height: 65,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rectangleIcon: {
    marginLeft: -56,
    top: 86,
    borderRadius: Border.br_lgi,
    width: 112,
    height: 126,
  },
  payForCable: {
    marginLeft: -36,
    top: 185,
    fontSize: FontSize.size_xs,
    color: Color.colorWhite,
    left: "50%",
  },
  selectCable: {
    top: 11,
    left: 14,
  },
  frameChild: {
    marginTop: -3.5,
    top: "50%",
    left: 246,
    width: 16,
    height: 8,
    position: "absolute",
  },
  selectCableParent: {
    backgroundColor: Color.colorGainsboro_100,
    borderRadius: Border.br_6xs,
    width: 279,
    overflow: "hidden",
  },
  rectangleContainer: {
    top: 200,
    left: 40,
    width: 300,
    height: 65,
  },
  dstvWrapper: {
    borderTopLeftRadius: Border.br_6xs,
    borderTopRightRadius: Border.br_6xs,
    overflow: "hidden",
    backgroundColor: Color.colorWhite,
  },
  frameParent: {
    alignItems: "center",
    justifyContent: "center",
   
  },
  providerPicker: {
    width: "80%", // Adjust the width as needed
    top: 350,
    elevation: 80,
  },
  selectorCable: {
    top: 351,
    height: 41,
  },
  icon: {
    height: "100%",
    overflow: "hidden",
    width: "100%",
  },
  mingcutebackFill: {
    left: 30,
    top: 43,
    width: 24,
    height: 24,
    position: "absolute",
  },
  cable: {
    flex: 1,
    height: 932,
    overflow: "hidden",
    width: "100%",
    backgroundColor: Color.colorWhite,
  },
});

export default Cable;
