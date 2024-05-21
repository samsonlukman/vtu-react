import * as React from "react";
import { useState, useEffect } from "react";
import { StyleSheet, Button, View, Text, Pressable, ScrollView, TextInput, Alert, ActivityIndicator } from "react-native";
import { Image } from "expo-image";
import { useNavigation } from "@react-navigation/native";
import { Color, FontFamily, FontSize, Border } from "../GlobalStyles";
import axios from "axios";
import * as Clipboard from 'expo-clipboard';
import { useUser } from "../contexts/UserContext";
import { useNotification } from "../contexts/NotificationContext";
import { sendPushNotification } from "../components/NotificationHandler";
import { useAuth } from "../contexts/AuthContext";
import { Linking } from 'react-native';

const BuyAirtime = () => {
  const navigation = useNavigation();
  const [network, setNetwork] = React.useState(""); 
  const [amount, setAmount] = useState(""); 
  const [phoneNumber, setPhoneNumber] = useState(""); 
  const [selectedProductCode, setSelectedProductCode] = useState("");
  const [copiedText, setCopiedText] = React.useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('');
  const [paymentChoice, setPaymentChoice] = useState("");
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

  const openPaymentLink = async (url) => {
    try {
      const supported = await Linking.canOpenURL(url);
      if (supported) {
        await Linking.openURL(url);
      } else {
        Alert.alert("Error", "Cannot open the payment link");
      }
    } catch (error) {
      console.error("Failed to open URL:", error);
      Alert.alert("Error", "Failed to open the payment link. Please try again.");
    }
  };

  const handleCopyToClipboard = async (text) => {
    try {
      await Clipboard.setString(text);
      Alert.alert('Payment Link copied to clipboard');
    } catch (error) {
      console.error('Error copying to clipboard:', error);
      Alert.alert('Error', 'Failed to copy to clipboard.');
    }
  };

  const handlePaymentChoice = (choice) => {
    setPaymentChoice(choice);
    console.log(choice);
  };

  const fetchCopiedText = async () => {
    const text = await Clipboard.getStringAsync();
    setCopiedText(text);
  };

  const handleNetworkSelection = (network) => {
    setSelectedProductCode(network);
    console.log(network);
  };

  const handleAmountSelection = (amount) => {
    setAmount(amount);
    console.log(amount);
  };

  const handleWalletBuyAirtime = async () => {
    console.log("Selected Network:", selectedProductCode);
    console.log("Amount:", amount);
    console.log("Phone Number:", phoneNumber);

    if (!selectedProductCode) {
      Alert.alert('Select a network provider');
      return;
    }

    if (!paymentChoice) {
      Alert.alert("Choose Payment Option");
      return;
    }

    if (phoneNumber.length !== 11) {
      Alert.alert('Invalid Phone Number', 'Please enter a valid 11-digit phone number.');
      return;
    }

    setIsLoading(true);

    try {
      const flutterwaveUrl = 'https://api.flutterwave.com/v3/transfers';
      const secret_key = 'FLWSECK-fab12578d0fa352253f89fd6a7b7b713-18f55ce05d4vt-X';

      const flutterwaveParams = {
        account_bank: '035',
        account_number: '8548105217',
        amount: amount,
        currency: 'NGN',
        narration: `${amount} recharge for ${selectedProductCode} ${phoneNumber}`,
        debit_subaccount: `${userData.account_reference}`
      };

      const flutterwaveHeaders = {
        'Authorization': `Bearer ${secret_key}`,
        'Content-Type': 'application/json'
      };

      const transferResponse = await axios.post(flutterwaveUrl, flutterwaveParams, {
        headers: flutterwaveHeaders
      });

      if (transferResponse.data.status === 'success' && transferResponse.data.message === 'Transfer Queued Successfully') {
        const vtuParams = {
          amount: amount,
          product_code: selectedProductCode,
          number: phoneNumber,
        };

        const historyParams = {
          user: userData.id,
          text: `Airtime purchase: ${amount} to ${phoneNumber} ${selectedProductCode}`
        };

        const vtuHeaders = {
          'Content-Type': 'application/json',
          'X-CSRFToken': csrfToken,
        };

        const response = await axios.post('http://192.168.43.179:8000/api/vtu-api/', vtuParams, {
          headers: vtuHeaders,
        });

        if (response.data.success === true) {
          Alert.alert('Feedback: ', response.data.message);

          await sendPushNotification(
            expoPushToken,
            'Airtime Purchase Successful',
            `You have successfully purchased ${amount} worth of airtime for ${phoneNumber}`,
            { product_code: selectedProductCode, amount, phoneNumber }
          );

          await axios.post('http://192.168.43.179:8000/api/history/', historyParams, {
            headers: vtuHeaders,
          });

          navigation.navigate("Home");
        } else {
          Alert.alert('Error', response.data.message);
        }
      } else {
        Alert.alert('Error', transferResponse.data.message);
      }
    } catch (error) {
      console.error('Error:', error.message);
      Alert.alert('Error', error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCardUssdBuyAirtime = async () => {
    console.log("Selected Network:", selectedProductCode);
    console.log("Amount:", amount);
    console.log("Phone Number:", phoneNumber);

    function generateRandomString(length) {
        let result = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const charactersLength = characters.length;
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }

    if (!selectedProductCode) {
        Alert.alert('Select a network provider');
        return;
    }

    if (!paymentChoice) {
        Alert.alert("Choose Payment Option");
        return;
    }

    if (phoneNumber.length !== 11) {
        Alert.alert('Invalid Phone Number', 'Please enter a valid 11-digit phone number.');
        return;
    }

    setIsLoading(true);
    setLoadingMessage('Processing payment...');

    try {
        const flutterwaveUrl = 'https://api.flutterwave.com/v3/payments';
        const secret_key = 'FLWSECK-fab12578d0fa352253f89fd6a7b7b713-18f55ce05d4vt-X';

        const tx_ref = `payville-airtime-${generateRandomString(25)}`;

        const flutterwaveParams = {
            tx_ref: tx_ref,
            amount: amount,
            currency: 'NGN',
            redirect_url: 'https://9b60-105-113-18-64.ngrok-free.app/api/index/',
            customer: {
                email: userData.email || 'anonymous@gmail.com',
                phonenumber: phoneNumber,
                name: userData.username || 'anonymous user',
            },
            customizations: {
                title: 'Airtime Purchase',
                description: `Airtime purchase of ${amount} NGN for ${phoneNumber}`,
            },
        };

        const flutterwaveHeaders = {
            'Authorization': `Bearer ${secret_key}`,
            'Content-Type': 'application/json'
        };

        const paymentResponse = await axios.post(flutterwaveUrl, flutterwaveParams, {
            headers: flutterwaveHeaders
        });

        if (paymentResponse.data.status === 'success') {
            const paymentLink = paymentResponse.data.data.link;
            Clipboard.setString(paymentLink);
            Alert.alert('Payment Link copied to your clipboard.', 'Timeout in 180 seconds. We will keep checking for the payment every 45 seconds. Do not leave the page until transaction is succesfful or timeout',
             '', [
                {
                    text: 'OK', onPress: async () => {
                        setLoadingMessage('Verifying payment...');

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

                                    const vtuParams = {
                                        amount: amount,
                                        product_code: selectedProductCode,
                                        number: phoneNumber,
                                    };

                                    const historyParams = {
                                        user: userData.id,
                                        text: `Airtime purchase: ${amount} to ${phoneNumber} ${selectedProductCode}`
                                    };

                                    const vtuHeaders = {
                                        'Content-Type': 'application/json',
                                        'X-CSRFToken': csrfToken,
                                    };

                                    const vtuResponse = await axios.post('http://192.168.43.179:8000/api/vtu-api/', vtuParams, {
                                        headers: vtuHeaders,
                                    });

                                    if (vtuResponse.data.success === true) {
                                        Alert.alert('Feedback: ', vtuResponse.data.message);

                                        await sendPushNotification(
                                            expoPushToken,
                                            'Airtime Purchase Successful',
                                            `You have successfully purchased ${amount} worth of airtime for ${phoneNumber}`,
                                            { product_code: selectedProductCode, amount, phoneNumber }
                                        );

                                        await axios.post('http://192.168.43.179:8000/api/history/', historyParams, {
                                            headers: vtuHeaders,
                                        });

                                        navigation.navigate("Home");
                                    } else {
                                        Alert.alert('Error', vtuResponse.data.message);
                                    }
                                    setIsLoading(false); // Stop loading after successful verification
                                } else if (retryCount >= maxRetries) {
                                    clearInterval(intervalId);
                                    Alert.alert('Error', 'Payment verification failed after multiple attempts.');
                                    setIsLoading(false); // Stop loading after max retries
                                }
                            } catch (error) {
                                console.error('Verification Error:', error.response ? error.response.data : error.message);
                                if (retryCount >= maxRetries) {
                                    clearInterval(intervalId);
                                    Alert.alert('Verification Error', error.response ? error.response.data.message : error.message);
                                    setIsLoading(false); // Stop loading after max retries
                                }
                            }
                        }, interval);
                    }
                }
            ]);
        } else {
            Alert.alert('Error', paymentResponse.data.message);
            setIsLoading(false); // Stop loading if initial payment fails
        }
    } catch (error) {
        console.error('Error:', error.response ? error.response.data : error.message);
        Alert.alert('Error', error.response ? error.response.data.message : error.message);
        setIsLoading(false); // Stop loading on catch block error
    }
};


  

  return (
    <ScrollView>
    <View style={styles.buyAirtime}>
      <View style={styles.buyAirtimeChild} />
     
      <Image
        style={styles.buyAirtimeItem}
        contentFit="cover"
        source={require("../assets/rectangle-10.png")}
      />
      <Text style={[styles.buyAirtime1, styles.buyTypo]}>Buy Airtime</Text>
      {user && user.isAuthenticated ? (
  <Text style={styles.walletBalance5000}>
    {userData && userData.account_number ? `Wallet Balance: ₦${wallet}` : '***'}
  </Text>
) : (
  <Text style={styles.walletBalance5000}>Wallet Balance: Login to see balance</Text>
)}

      <View style={styles.amountInputWrapper}>
      <Pressable onLongPress={handleCopyToClipboard}>
      <TextInput
 style={styles.textInput}
  placeholder="Enter Custom Amount"
  keyboardType="numeric"
  onChangeText={(text) => setAmount(text)}
  value={amount.replace("₦", "")}
/>
</Pressable>
</View>



      <View style={styles.ellipseParent}>
      <Pressable onPress={() => handleAmountSelection("100")}
          >
        <Image
          style={[styles.groupChild, styles.groupChildLayout4]}
          contentFit="cover"
          source={require("../assets/ellipse-14.png")}
        />
        </Pressable>
        <Pressable onPress={() => handleAmountSelection("200")}
          >
        <Image
          style={[styles.groupItem, styles.groupChildLayout4]}
          contentFit="cover"
          source={require("../assets/ellipse-14.png")}
        />
        </Pressable>
        <Pressable onPress={() => handleAmountSelection("500")}
          >
        <Image
          style={[styles.groupInner, styles.groupChildLayout4]}
          contentFit="cover"
          source={require("../assets/ellipse-14.png")}
        />
        </Pressable>
        <Pressable onPress={() => handleAmountSelection("1000")}
          >
        <Image
          style={[styles.groupChild1, styles.groupChildLayout4]}
          contentFit="cover"
          source={require("../assets/ellipse-14.png")}
        />
        </Pressable>
        <Pressable onPress={() => handleAmountSelection("100")}
          >
        <Text style={[styles.me, styles.meTypo]}>₦100</Text>
        </Pressable>
        <Pressable onPress={() => handleAmountSelection("200")}
          >
        <Text style={[styles.wife, styles.meTypo]}>₦200</Text>
        </Pressable>
        <Pressable onPress={() => handleAmountSelection("500")}
          >
        <Text style={[styles.dad, styles.meTypo]}>₦500</Text>
        </Pressable>
        <Pressable onPress={() => handleAmountSelection("1000")}
          >
        <Text style={[styles.mum, styles.meTypo]}>₦1000</Text>
        </Pressable>
      </View>
      <View>
      <Pressable onLongPress={handleCopyToClipboard} style={styles.textInputWrapper}>
        <TextInput
          style={styles.textInput}
          placeholder="Enter Phone Number"
          keyboardType="numeric"
          onChangeText={(text) => setPhoneNumber(text)}
          value={phoneNumber}
        />
      </Pressable>
      </View>
      
      <View style={[styles.rectangleContainer, styles.groupChildLayout3]}>
  <View style={[styles.groupChild3, styles.groupChildPosition1]} />
  <View style={[styles.groupChild4, styles.groupChildPosition]} />
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

      <View style={[styles.groupView, styles.groupChildLayout2]}>
        <View style={[styles.groupChild5, styles.groupChildLayout2]} />
        <View style={[styles.groupChild6, styles.groupChildLayout2]} />
        <Pressable onPress={() => handleNetworkSelection("glo_custom")}>
          <Text style={[styles.glo, styles.buyTypo]}>GLO</Text>
        </Pressable>
        <View style={[styles.groupChild7, styles.groupChildLayout1]} />
        <Pressable onPress={() => handleNetworkSelection("airtel_custom")}>
          <Image
            style={styles.rectangleIcon}
            contentFit="cover"
            source={require("../assets/rectangle-55.png")}
          />
        </Pressable>
        <View style={[styles.groupChild8, styles.groupChildLayout1]} />
        <Pressable onPress={() => handleNetworkSelection("mtn_custom")}>
          <Image
            style={[styles.groupChild9, styles.groupChildLayout]}
            contentFit="cover"
            source={require("../assets/rectangle-56.png")}
          />
        </Pressable>
        <Pressable onPress={() => handleNetworkSelection("9mobile_custom")}>
          <Image
            style={[styles.groupChild10, styles.groupChildLayout]}
            contentFit="cover"
            source={require("../assets/rectangle-57.png")}
          />
        </Pressable>
      </View>
   
      
      <View style={styles.slide}>
  {isLoading ? (
    <ActivityIndicator size="large" color="#0000ff" />
  ) : (
    <Pressable onPress={paymentChoice === 'atm' ? handleCardUssdBuyAirtime : handleWalletBuyAirtime}>
      <Text style={[styles.buyTypo, styles.buyButton]}>Buy</Text>
    </Pressable>
  )}
  <Image
    style={[styles.teenyiconsarrowSolid, styles.slideItemLayout]}
    contentFit="cover"
    source={require("../assets/teenyiconsarrowsolid.png")}
  />
</View>

      <Pressable
        style={[styles.mingcutebackFill, styles.bxscontactIconLayout]}
        onPress={() => navigation.goBack()}
      >
        <Image
          style={[styles.icon, styles.iconLayout]}
          contentFit="cover"
          source={require("../assets/mingcutebackfill.png")}
        />
      </Pressable>
    </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  buyFlexBox: {
    textAlign: "left",
    position: "absolute",
  },
  buyTypo: {
    color: Color.colorBlack,
    fontFamily: FontFamily.robotoBold,
    fontWeight: "700",
  },
  buyAirtimeInnerLayout: {
    height: 37,
    width: 279,
    position: "absolute",
  },
  amountClr: {
    color: Color.colorDarkgray,
    fontFamily: FontFamily.robotoRegular,
  },
  groupChildLayout4: {
    width: 60,
    top: 0,
    height: 60,
    position: "absolute",
  },
  meTypo: {
    top: 23,
    textAlign: "left",
    color: Color.colorBlack,
    fontFamily: FontFamily.robotoBold,
    fontWeight: "700",
    fontSize: FontSize.size_xs,
    position: "absolute",
  },
  atmPosition: {
    top: 11,
    textAlign: "left",
    fontSize: FontSize.size_xs,
    position: "absolute",
  },
  textInputWrapper: {
    top: 400,
    height: 37,
    width: 279,
    backgroundColor: Color.colorGainsboro_100,
    borderRadius: Border.br_6xs,
    left: 40,
    elevation: 60
  },
  buyButton: {
    backgroundColor: Color.colorDarkcyan_100,
    borderRadius: 20,
    padding: 10,
    textAlign: 'center',
    color: 'white',
  },
  amountInputWrapper: {
    top: 500,
    height: 37,
    width: 279,
    backgroundColor: Color.colorGainsboro_100,
    borderRadius: Border.br_6xs,
    left: 40,
    elevation: 60
  },
  groupLayout1: {
    width: 44,
    top: 0,
    height: 37,
    position: "absolute",
  },
  bxscontactIconLayout: {
    height: 24,
    width: 24,
    position: "absolute",
  },
  groupChildLayout3: {
    height: 65,
    position: "absolute",
  },
  groupChildPosition1: {
    borderRadius: Border.br_xs,
    left: 0,
    top: 0,
  },
  groupChildPosition: {
    borderBottomLeftRadius: Border.br_xs,
    borderTopLeftRadius: Border.br_xs,
    left: 0,
    top: 0,
  },
  groupChildLayout2: {
    height: 40,
    position: "absolute",
  },
  groupChildLayout1: {
    width: 71,
    borderTopLeftRadius: Border.br_12xs,
    height: 40,
    top: 0,
    position: "absolute",
  },
  groupChildLayout: {
    width: 48,
    height: 28,
    top: 6,
    borderTopLeftRadius: Border.br_12xs,
    position: "absolute",
  },
  iconLayout: {
    height: "100%",
    width: "100%",
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
  slideItemLayout: {
    maxHeight: "100%",
    maxWidth: "100%",
    position: "absolute",
    overflow: "hidden",
  },
  buyAirtimeChild: {
    top: 100,
    left: 30,
    shadowColor: "rgba(0, 0, 0, 1)",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 8, // Increase the shadow radius
    elevation: 20,
    shadowOpacity: 1, // Increase the shadow opacity
    borderRadius: Border.br_19xl,
    width: 300,
    height: 621,
    position: "absolute",
    backgroundColor: Color.colorWhite,
  },
  
  walletBalance5000: {
    top: 170,
    left: 120,
    color: Color.colorBlack,
    fontFamily: FontFamily.robotoBold,
    fontWeight: "700",
    textAlign: "left",
    fontSize: FontSize.size_xs,
  },
  buyAirtimeItem: {
    borderRadius: Border.br_lgi,
    width: 112,
    height: 126,
    position: "absolute",
    left: "50%", // Horizontally center the element
    top: 93, // Vertically center the element
    marginLeft: -56, // Adjust left margin to center horizontally
    marginTop: -63, // Adjust top margin to center vertically
  },
  
  buyAirtime1: {
    top: 125,
    left: 150,
    textAlign: "left",
    position: "absolute",
    fontSize: FontSize.size_xs,
  },
  buyAirtimeInner: {
    marginLeft: -139,
    top: 540,
    backgroundColor: Color.colorGainsboro_100,
    borderRadius: Border.br_6xs,
    height: 37,
    width: 279,
    left: "50%",
  },
  ellipseIcon: {
    top: 500,
    width: 22,
    height: 22,
    left: 77,
    position: "absolute",
  },
  saveNumber: {
    top: 500,
    left: 112,
    color: Color.colorBlack,
    fontFamily: FontFamily.robotoBold,
    fontWeight: "700",
    textAlign: "left",
    fontSize: FontSize.size_xs,
  },
  amount: {
    top: 550,
    left: 60,
    textAlign: "left",
    position: "absolute",
    fontSize: FontSize.size_xs,
  },
  groupChild: {
    left: 0,
  },
  groupItem: {
    left: 72,
  },
  groupInner: {
    left: 138,
  },
  groupChild1: {
    left: 210,
  },
  me: {
    left: 10,
  },
  wife: {
    left: 80,
  },
  dad: {
    left: 150,
  },
  mum: {
    left: 220,
  },
  ellipseParent: {
    top: 350,
    left: 50,
    width: 270,
    height: 60,
    position: "absolute",
  },
  rectangleView: {
    left: 0,
    top: 0,
    height: 37,
    width: 279,
    backgroundColor: Color.colorGainsboro_100,
    borderRadius: Border.br_6xs,
    position: "absolute",
  },
  number: {
    left: 19,
    color: Color.colorDarkgray,
    fontFamily: FontFamily.robotoRegular,
  },
  groupChild2: {
    borderTopRightRadius: Border.br_6xs,
    borderBottomRightRadius: Border.br_6xs,
    backgroundColor: Color.colorDarkcyan_100,
    left: 0,
  },
  bxscontactIcon: {
    top: 7,
    left: 9,
    overflow: "hidden",
  },
  rectangleGroup: {
    left: 235,
  },
  rectangleParent: {
    top: 450,
    left: 40,
  },
  groupChild3: {
    height: 65,
    position: "absolute",
    width: 280,
    backgroundColor: Color.colorDarkcyan_100,
  },
  groupChild4: {
    backgroundColor: Color.colorSandybrown_200,
    width: 150,
    height: 65,
    position: "absolute",
  },
  atm: {
    left: 5,
    bottom: 10,
    color: Color.colorWhite,
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
  rectangleContainer: {
    top: 200,
    left: 40,
    width: 300,
    height: 65,
  },
  groupChild5: {
    backgroundColor: Color.colorGray_200,
    width: 276,
    height: 40,
    borderRadius: Border.br_xs,
    left: 0,
    top: 0,
  },
  groupChild6: {
    width: 73,
    borderBottomLeftRadius: Border.br_xs,
    borderTopLeftRadius: Border.br_xs,
    left: 0,
    top: 0,
    backgroundColor: Color.colorDarkcyan_100,
  },
  glo: {
    top: 14,
    left: 27,
    width: 33,
    height: 15,
    textAlign: "left",
    position: "absolute",
    fontSize: FontSize.size_xs,
  },
  groupChild7: {
    left: 73,
    backgroundColor: Color.colorCrimson,
  },
  rectangleIcon: {
    left: 85,
    width: 47,
    height: 28,
    top: 6,
    borderTopLeftRadius: Border.br_12xs,
    position: "absolute",
  },
  groupChild8: {
    left: 144,
    backgroundColor: Color.colorGold,
  },
  groupChild9: {
    left: 155,
  },
  groupChild10: {
    left: 220,
  },
  groupView: {
    top: 300,
    width: 276,
    height: 40,
    left: 40,
  },
  benficiaries: {
    top: 417,
    left: 84,
    color: Color.colorBlack,
    fontFamily: FontFamily.robotoBold,
    fontWeight: "700",
    textAlign: "left",
    fontSize: FontSize.size_xs,
  },
  slideChild: {
    top: -60,
    right: "0%",
    bottom: "0%",
    left: "0%",
    borderRadius: Border.br_18xl,
    backgroundColor: Color.colorDarkcyan_100,
    position: "absolute",
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
    top: -50,
    left: "24.35%",
    fontSize: FontSize.size_sm,
    textAlign: "left",
    position: "absolute",
  },
  teenyiconsarrowSolid: {
    height: "54.36%",
    width: "18.43%",
    top: 10,
    right: "19.91%",
    bottom: "20.26%",
    left: "61.65%",
  },
  slide: {
    marginLeft: -57,
    top: 580,
    width: 115,
    height: 39,
    left: "50%",
    position: "absolute",
  },
  icon: {
    overflow: "hidden",
  },
  mingcutebackFill: {
    left: 30,
    top: 43,
  },
  buyAirtime: {
    flex: 1,
    height: 932,
    overflow: "hidden",
    width: "100%",
    backgroundColor: Color.colorWhite,
  },
});

export default BuyAirtime;
