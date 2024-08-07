import * as React from "react";
import { useState, useEffect } from "react";
import { StyleSheet, View, Text, Pressable, ScrollView, TextInput, Alert, ActivityIndicator } from "react-native";
import { Image } from "expo-image";
import { useNavigation } from "@react-navigation/native";
import { Color, FontFamily, FontSize, Border } from "../GlobalStyles";
import * as Clipboard from 'expo-clipboard';
import { Picker } from "@react-native-picker/picker";
import { Video } from 'expo-av';
import axios from "axios";
import { useUser } from "../contexts/UserContext";
import { useNotification } from "../contexts/NotificationContext";// Import the sendPushNotification function
import { sendPushNotification } from "../components/NotificationHandler";
import { useAuth } from "../contexts/AuthContext";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const BuySmeData = () => {
  const navigation = useNavigation();
  const referer = 'https://www.payvillesub.com'
  const [network, setNetwork] = useState("");
  const [productCode, setProductCode] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { userData, loading, wallet } = useUser();
  const expoPushToken = useNotification();
  const { user } = useAuth();
  const [loadingMessage, setLoadingMessage] = useState('');
  const [paymentChoice, setPaymentChoice] = useState("");
  const [csrfToken, setCsrfToken] = useState("");

   // Fetch CSRF token when component mounts
   useEffect(() => {
    const fetchCsrfToken = async () => {
      try {
        const csrfResponse = await axios.get('https://www.payvillesub.com/api/get-csrf-token/');
        setCsrfToken(csrfResponse.data.csrf_token);
      } catch (error) {
        console.error('Error fetching CSRF token:', error.message);
      }
    };

    fetchCsrfToken();
  }, []);
  
  const handleCopyToClipboard = async () => {
    await Clipboard.setStringAsync(phoneNumber);
    alert('Copied to clipboard!');
  };

  const handlePhoneNumberChange = (value) => {
    setPhoneNumber(value);
  };
  const [productCodeOptions, setProductCodeOptions] = useState({
    "mtn_sme": [
      { service_name: "500MB", service_default_price: 260/2 + 10 },
      { service_name: "1GB", service_default_price: 260 + 10 },
      { service_name: "2GB", service_default_price: 260 * 2 + 10 },
      { service_name: "5GB", service_default_price: 260 * 5 + 10 },
      { service_name: "10GB", service_default_price: 260 * 10 + 10 }
    ],
    "airtel_sme": [
      { service_name: "500MB", service_default_price: 275/2 + 10 },
      { service_name: "1GB", service_default_price: 275 + 10 },
      { service_name: "2GB", service_default_price: 275*2 + 10 },
      { service_name: "5GB", service_default_price: 275*5 + 10 },
      { service_name: "10GB", service_default_price: 275*10 + 10 }
    ],
    "glo_sme": [
      { service_name: "500MB", service_default_price: 237/2 * 10 },
      { service_name: "1GB", service_default_price: 237 + 10 },
      { service_name: "2GB", service_default_price: 237*2 + 10 },
      { service_name: "5GB", service_default_price: 237*5 + 10 },
      { service_name: "10GB", service_default_price: 237*10 + 10 }
    ],
    "nineMobile_sme": [
      { service_name: "500MB", service_default_price: 135/2 + 10 },
      { service_name: "1GB", service_default_price: 135 + 10 },
      { service_name: "2GB", service_default_price: 135*2 + 10 },
      { service_name: "5GB", service_default_price: 135*5 + 10},
      { service_name: "10GB", service_default_price: 135*10 + 10 },
      { service_name: "15GB", service_default_price: 135*15 + 10 },
      { service_name: "110GB", service_default_price: 135*110 + 10 }

    ]
  });

  const handleNetworkSelection = (selectedNetwork) => {
    setNetwork(selectedNetwork);
    // Reset product code when network changes
    setProductCode("");
  };

  const handleProductCodeSelection = (selectedProductCode) => {
    setProductCode(selectedProductCode);
  };


  const handlePaymentChoice = (choice) => {
    setPaymentChoice(choice);
    console.log(choice);
    Alert.alert(`${choice} selected`)
  };
  
  const handleBuySmeData = async () => {
    if (phoneNumber.length !== 11) {
      Alert.alert("Phone number must be 11 digits");
      return;
    }

    setIsLoading(true);

    try {
      const selectedProduct = productCodeOptions[network].find(option => option.service_name === productCode);

      const flutterwaveParams = {
        account_bank: '035',
        account_number: '8548105217',
        amount: parseInt(selectedProduct.service_default_price), 
        currency: 'NGN',
        narration: `data recharge for`,
        debit_subaccount: `${userData.account_reference}`
      };
      console.log(flutterwaveParams)
      const flutterwaveHeaders = {
        'Authorization': `Bearer FLWSECK-fab12578d0fa352253f89fd6a7b7b713-18f55ce05d4vt-X`,
        'Content-Type': 'application/json',
        
      };

      const transferResponse = await axios.post('https://api.flutterwave.com/v3/transfers', flutterwaveParams, {
        headers: flutterwaveHeaders
      });

      if (transferResponse.data.status === 'success' && transferResponse.data.message === 'Transfer Queued Successfully') {
        console.log("Feedback: ", transferResponse.data.message);

        const csrfResponse = await axios.get('https://www.payvillesub.com/api/get-csrf-token/');
        const csrfToken = csrfResponse.data.csrf_token;

        const requestBody = {
          network: `${network}`,
          phone_number: phoneNumber,
          product_code: productCode
        };

        console.log('Data sent to backend:', requestBody);

        const vtuResponse = await axios.post('https://www.payvillesub.com/api/data-api/', requestBody, {
                headers: {
                    'X-CSRFToken': csrfToken,
                    'Content-Type': 'application/json',
                    'referer': referer // Ensure you set the correct content type
                }
            });

        
        console.log('Response from backend:', vtuResponse.data);
        if (vtuResponse.data.response === "successful") {
          Alert.alert('Feedback: ', response.data.reasons);

          const historyParams = {
            user: userData.id,
            text:   `Data purchase: ${productCode} to ${phoneNumber}`
          }
          
          await sendPushNotification(
            expoPushToken, // Use the token obtained from the context
            'Data Purchase Successful',
            `You have successfully purchased ${productCode} worth of data for ${phoneNumber}`,
            { product_code: productCode, amount, phoneNumber }
          );

          await axios.post('https://www.payvillesub.com/api/history/', historyParams, {
              headers: {
                'X-CSRFToken': csrfToken,
                'Content-Type': 'application/json',
                'referer': referer // Ensure you set the correct content type
            }
          });
          navigation.navigate("Home")
        } else {
        Alert.alert("Network Error");
        }
      } else {
        Alert.alert("Error", transferResponse.data.message);
      }
    } catch (error) {
      console.error('Error:', error);
      Alert.alert("Error: Try another plan");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCardUssdBuySmeData = async () => {
    if (phoneNumber.length !== 11) {
        Alert.alert("Phone number must be 11 digits");
        return;
    }

    setIsLoading(true);

    try {
        const selectedProduct = productCodeOptions[network].find(option => option.service_name === productCode);

        function generateRandomString(length) {
            let result = '';
            const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            const charactersLength = characters.length;
            for (let i = 0; i < length; i++) {
                result += characters.charAt(Math.floor(Math.random() * charactersLength));
            }
            return result;
        }

        const tx_ref = `payville-sme-${generateRandomString(25)}`;
        const flutterwaveUrl = 'https://api.flutterwave.com/v3/payments';
        const secret_key = 'FLWSECK-fab12578d0fa352253f89fd6a7b7b713-18f55ce05d4vt-X';
        const flutterwaveParams = {
          tx_ref: tx_ref,
          amount: parseInt(selectedProduct.service_default_price),
          currency: 'NGN',
          redirect_url: 'https://www.payvillesub.com/api/index/',
          customer: {
            email: userData && userData.email ? userData.email : 'anonymous@gmail.com',
            phonenumber: '08080808080',
            name: userData && userData.username ? userData.username : 'anonymous user',
          },
          customizations: {
            title: 'Data Purchase',
            description: `Data recharge for ${phoneNumber}`,
          },
        };
        

        console.log(flutterwaveParams)
        const flutterwaveHeaders = {
            'Authorization': `Bearer ${secret_key}`,
            'Content-Type': 'application/json',
          
        };

        // Make API request to Flutterwave using Axios
        const paymentResponse = await axios.post(flutterwaveUrl, flutterwaveParams, {
            headers: flutterwaveHeaders
        });

        console.log(paymentResponse.data)

        if (paymentResponse.data.status === 'success') {
          console.log('hi')
            const paymentLink = paymentResponse.data.data.link;
            Clipboard.setString(paymentLink);
            Alert.alert('Payment Link copied to your clipboard.',
             'Timeout in 180 seconds. We will keep checking for the payment every 45 seconds. Do not leave the page until transaction is succesfful or timeout');

            let retryCount = 0;
            const maxRetries = 4; // Total of 3 minutes (4 retries with 30 seconds interval)
            const interval = 45000; // 45 seconds interval

            const intervalId = setInterval(async () => {
                retryCount++;
                try {
                    // Fetch transaction details from your backend
                    const transactionResponse = await axios.get('https://www.payvillesub.com/api/transactions/', {
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
                        const csrfResponse = await axios.get('https://www.payvillesub.com/api/get-csrf-token/');
                        const csrfToken = csrfResponse.data.csrf_token;

                        // Prepare data for VTU API request
                        const requestBody = {
                            network: network,
                            phone_number: phoneNumber,
                            product_code: productCode
                        };

                        console.log('Data sent to backend:', requestBody);

                        const vtuResponse = await axios.post('https://www.payvillesub.com/api/data-api/', requestBody, {
                            headers: {
                                'X-CSRFToken': csrfToken,
                                'Content-Type': 'application/json',
                                'referer': referer // Ensure you set the correct content type
                            }
                        });

                        if (vtuResponse.data.response === "successful") {
                            Alert.alert('Feedback: ', vtuResponse.data.reasons);

                            const historyParams = {
                                user: userData.id,
                                text: `Data purchase: ${productCode} to ${phoneNumber}`
                            }

                            await sendPushNotification(
                                expoPushToken, // Use the token obtained from the context
                                'Data Purchase Successful',
                                `You have successfully purchased ${productCode} worth of data for ${phoneNumber}`,
                                { product_code: productCode, amount, phoneNumber }
                            );

                            await axios.post('https://www.payvillesub.com/api/history/', historyParams, {
                                headers: {
                                    'X-CSRFToken': csrfToken,
                                    'Content-Type': 'application/json',
                                    'referer': referer // Ensure you set the correct content type
                                }
                            });
                            setIsLoading(false); // Stop the loading indicator
                            navigation.navigate("Home");
                        } else {
                            Alert.alert("Network Error");
                            setIsLoading(false); // Stop the loading indicator
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
    <View style={styles.buyAirtime}>
      <View style={styles.buyAirtimeChild} />
      
      <Image
        style={styles.buyAirtimeItem}
        contentFit="cover"
        source={require("../assets/rectangle-11.png")}
      />
      <Text style={[styles.buyAirtime1, styles.buyTypo]}>Buy Data</Text>
      {user && user.isAuthenticated ? (
  <Text style={styles.walletBalance5000}>
    {userData && userData.account_number ? `Wallet Balance: ₦${wallet}` : '***'}
  </Text>
) : (
  <Text style={styles.walletBalance5000}>Wallet Balance: Login to see balance</Text>
)}
     
      

  <View style={styles.pickerContainer}>   
    {/* Network Selection */}
      <Picker 
          style={styles.picker}
          selectedValue={network}
          onValueChange={(itemValue) => handleNetworkSelection(itemValue)}
        >
          <Picker.Item label="Select Network" value="" />
          <Picker.Item label="Glo" value="glo_sme" />
          <Picker.Item label="Airtel" value="airtel_sme" />
          <Picker.Item label="MTN" value="mtn_sme" />
          <Picker.Item label="9mobile" value="nineMobile_sme" />
        </Picker>
      
        {network && productCodeOptions[network] && (
  <Picker style={styles.picker}
    selectedValue={productCode}
    onValueChange={(itemValue) => handleProductCodeSelection(itemValue)}
  >
    <Picker.Item label="Select Package" value="" />
    {productCodeOptions[network].map((option, index) => (
        <Picker.Item key={index} label={`${option.service_name} ${parseInt(option.service_default_price)}`} value={option.service_name} />
    ))}
  </Picker>
)}

      </View>
     
      <View>
      <Pressable onLongPress={handleCopyToClipboard} style={styles.rectangleView}>
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
  <Pressable onPress={() => handlePaymentChoice("Card/USSD")} style={[styles.atmPressable, styles.atmPosition]}>
    <Text style={styles.atm}>Card, USSD</Text>
  </Pressable>
  <Pressable 
  onPress={() => user && user.isAuthenticated ? handlePaymentChoice("Wallet") : Alert.alert("Login to use wallet")} 
  style={[styles.walletPressable, styles.atmPosition]}
>
  <Text style={styles.wallet}>WALLET</Text>
</Pressable>

</View>
      <View style={[styles.groupView, styles.groupChildLayout2]}>
  <View style={[styles.groupChild5, styles.groupChildLayout2]} />
  <View style={[styles.groupChild6, styles.groupChildLayout2]} />
  
  <Pressable onPress={() => handleNetworkSelection("glo_sme")}>
    <Text style={[styles.glo, styles.buyTypo]}>glo</Text>
  </Pressable>
  
  <View style={[styles.groupChild7, styles.groupChildLayout1]} />
  
  <Pressable onPress={() => handleNetworkSelection("airtel_sme")}>
    <Image
      style={styles.rectangleIcon}
      contentFit="cover"
      source={require("../assets/rectangle-55.png")}
    />
  </Pressable>

  <View style={[styles.groupChild8, styles.groupChildLayout1]} />

  <Pressable onPress={() => handleNetworkSelection("mtn_sme")}>
    <Image
      style={[styles.groupChild9, styles.groupChildLayout]}
      contentFit="cover"
      source={require("../assets/rectangle-56.png")}
    />
  </Pressable>
  
  <Pressable onPress={() => handleNetworkSelection("nineMobile_sme")}>
    <Image
      style={[styles.groupChild10, styles.groupChildLayout]}
      contentFit="cover"
      source={require("../assets/rectangle-57.png")}
    />
  </Pressable>
</View>  
   
<View style={styles.slide}>
  {isLoading ? (
    <View style={styles.loadingContainer}>
    <Video
      source={require('../assets/loading.mp4')} // Replace with your video URL
      rate={1.0}
      volume={1.0}
      isMuted={false}
      resizeMode="cover"
      shouldPlay
      isLooping
      style={styles.loadingVideo}
    />
   
  </View>
  ) : (
    <Pressable onPress={paymentChoice === 'Card/USSD' ? handleCardUssdBuySmeData : handleBuySmeData}>
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
    color: Color.colorWhite,
    fontFamily: FontFamily.robotoBold,
    fontWeight: "700",
  },
  pickerContainer: {
   
    alignItems: "center",
    justifyContent: "center",
  },
  picker: {
    width: "60%", // Adjust the width as needed
    top: 350,
    elevation: 80,
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
  buyButton: {
    backgroundColor: Color.colorDarkcyan_100,
    borderRadius: 20,
    padding: 10,
    textAlign: 'center',
    color: 'white',
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
  selectPackage: {
    position: 'absolute',
    top: 350,
    left: 20,
    right: 20,
    elevation: 40
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
  slideItemLayout: {
    maxHeight: "100%",
    maxWidth: "100%",
    position: "absolute",
    overflow: "hidden",
  },
  buyAirtimeChild: {
    top: hp('11.76%'),
    left: wp('10%'),
    shadowColor: "rgba(0, 0, 0, 1)",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 8, // Increase the shadow radius
    elevation: 20,
    shadowOpacity: 1, // Increase the shadow opacity
    borderRadius: Border.br_19xl,
    width: wp('80%'),
    height: hp('80%'),
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 50,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // semi-transparent white background
  },
  loadingVideo: {
    width: wp('100%'),
    height: hp('20%'),
    opacity: 0.5, // Reduce opacity of the video
  },
  loadingText: {
    marginTop: 10,
    fontSize: 5,
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
    top: 350,
    height: 37,
    width: '70%',
    backgroundColor: Color.colorGainsboro_100,
    borderRadius: Border.br_6xs,
    left: '15%',
    elevation: 60
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
    width: 17,
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
    elevation: 90,
  },
  dataPlans: {
    position: 'absolute',
    top: 400,
    left: 20,
    right: 20,
    elevation: 40
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
    top: 550,
    width: 115,
    height: 39,
    left: "50%",
    position: "absolute",
  },
  icon: {
    overflow: "hidden",
  },
  textInput: {
  left: '10%'
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

export default BuySmeData;
