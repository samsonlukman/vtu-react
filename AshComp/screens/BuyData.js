import * as React from "react";
import { useState, useEffect } from "react";
import { StyleSheet, View, Text, Pressable, ScrollView, TextInput, Alert, ActivityIndicator } from "react-native";
import { Image } from "expo-image";
import { useNavigation } from "@react-navigation/native";
import { Color, FontFamily, FontSize, Border } from "../GlobalStyles";
import { Picker } from "@react-native-picker/picker";
import * as Clipboard from 'expo-clipboard';
import axios from "axios";
import { useUser } from "../contexts/UserContext";
import { useNotification } from "../contexts/NotificationContext";// Import the sendPushNotification function
import { sendPushNotification } from "../components/NotificationHandler";
import { useAuth } from "../contexts/AuthContext";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const BuyData = () => {
  const navigation = useNavigation();
  const [plansLoading, setPlansLoading] = useState(true);
  const [network, setNetwork] = useState("");
  const [productCode, setProductCode] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('');
  const [paymentChoice, setPaymentChoice] = useState("");
  const [productCodeOptions, setProductCodeOptions] = useState({});
  const [copiedText, setCopiedText] = React.useState('');
  const { userData, loading, wallet } = useUser();
  const expoPushToken = useNotification();
  const { user } = useAuth();
  const [csrfToken, setCsrfToken] = useState("");

   // Fetch CSRF token when component mounts
   useEffect(() => {
    const fetchCsrfToken = async () => {
      try {
        const csrfResponse = await axios.get('https://payville.pythonanywhere.com/api/get-csrf-token/');
        setCsrfToken(csrfResponse.data.csrf_token);
      } catch (error) {
        console.error('Error fetching CSRF token:', error.message);
      }
    };

    fetchCsrfToken();
  }, []);


  React.useEffect(() => {
    axios.get("https://payville.pythonanywhere.com/api/sme-plans/")
      .then(response => {
        const data = response.data;
        setProductCodeOptions({
          "mtn": data.mtn.mtn_data,
          "airtel": data.airtel.airtel_data,
          "glo": data.glo.glo_data,
          "nineMobile": data.nineMobile.nineMobile_data,
        });
        setPlansLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data plans:', error);
        setPlansLoading(false);
      });
  }, []);


  const handleCopyToClipboard = async () => {
    await Clipboard.setStringAsync(phoneNumber);
    alert('Copied to clipboard!');
  };

  const handleNetworkSelection = (selectedNetwork) => {
    setNetwork(selectedNetwork);
    // Reset product code when network changes
    setProductCode("");
  };

  const handleProductCodeSelection = (selectedProductCode) => {
    setProductCode(selectedProductCode);
  };

  const handlePhoneNumberChange = (value) => {
    setPhoneNumber(value);
  };

  const handlePaymentChoice = (choice) => {
    setPaymentChoice(choice);
    console.log(choice);
  };

  const handleBuySmeData = async () => {
    if (phoneNumber.length !== 11) {
        Alert.alert("Phone number must be 11 digits");
        return;
    }

    setIsLoading(true);

    try {
        // Prepare data for Flutterwave transfer request
        const flutterwaveUrl = 'https://api.flutterwave.com/v3/transfers';
        const secret_key = 'FLWSECK-fab12578d0fa352253f89fd6a7b7b713-18f55ce05d4vt-X';
        const selectedProduct = productCodeOptions[network].find(option => option.service_name === productCode);
        console.log(selectedProduct)

        const flutterwaveParams = {
            account_bank: '035',
            account_number: '8548105217',
            amount: parseInt(selectedProduct.service_default_price) + 50, 
            currency: 'NGN',
            narration: `data recharge for`,
            debit_subaccount: `${userData.account_reference}`
            
        };
        
        const flutterwaveHeaders = {
            'Authorization': `Bearer ${secret_key}`,
            'Content-Type': 'application/json'
        };

        // Make API request to Flutterwave using Axios
        const transferResponse = await axios.post(flutterwaveUrl, flutterwaveParams, {
            headers: flutterwaveHeaders
        });

        if (transferResponse.data.status === 'success' && transferResponse.data.message === 'Transfer Queued Successfully') {
            console.log("Feedback: ", transferResponse.data.message);

            // Fetch CSRF token
            const csrfResponse = await axios.get('https://payville.pythonanywhere.com/api/get-csrf-token/');
            const csrfToken = csrfResponse.data.csrf_token;

            // Prepare data for VTU API request
            const requestBody = {
                product_code: productCode,
                number: phoneNumber
            };

            const historyParams = {
              user: userData.id,
              text:   `Data purchase: ${productCode} to ${phoneNumber}`
            }

            // Send POST request to backend API with CSRF token included in headers
            const vtuResponse = await axios.post('https://payville.pythonanywhere.com/api/buy-sme-data/', requestBody, {
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
              'Data Purchase Successful',
              `You have successfully purchased ${productCode} worth of data for ${phoneNumber}`,
              { product_code: productCode,  phoneNumber }
            );

            await axios.post('https://payville.pythonanywhere.com/api/history/', historyParams, {
              headers: {
                'X-CSRFToken': csrfToken,
                'Content-Type': 'application/json' // Ensure you set the correct content type
            }
          });
            navigation.navigate("Home")
          }

        } else {
            Alert.alert("Error", transferResponse.data.message);
        }
    } catch (error) {
        console.error('Error:', error);
        // Handle error
        Alert.alert(
          "Network Error or Try Another Plan"
      );
      
      
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
      // Prepare data for Flutterwave payment request
      const flutterwaveUrl = 'https://api.flutterwave.com/v3/payments';
      const secret_key = 'FLWSECK-fab12578d0fa352253f89fd6a7b7b713-18f55ce05d4vt-X';
      const selectedProduct = productCodeOptions[network].find(option => option.service_name === productCode);
      console.log(selectedProduct);

      function generateRandomString(length) {
          let result = '';
          const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
          const charactersLength = characters.length;
          for (let i = 0; i < length; i++) {
              result += characters.charAt(Math.floor(Math.random() * charactersLength));
          }
          return result;
      }

      const tx_ref = `payville-data-${generateRandomString(25)}`;
      const flutterwaveParams = {
          tx_ref: tx_ref,
          amount: parseInt(selectedProduct.service_default_price) + 50,
          currency: 'NGN',
          redirect_url: 'https://payville.pythonanywhere.com/api/index/',
          customer: {
            email: userData && userData.email ? userData.email : 'anonymous@gmail.com',
            phonenumber: '08080808080',
            name: userData && userData.username ? userData.username : 'anonymous user',
          },
          customizations: {
              title: 'Data Purchase',
              description: `Data purchase of ${selectedProduct.service_default_price} NGN for ${phoneNumber}`,
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
          const maxRetries = 4; // Total of 3 minutes (4 retries with 30 seconds interval)
          const interval = 45000; // 45 seconds interval

          const intervalId = setInterval(async () => {
              retryCount++;
              try {
                  // Fetch transaction details from your backend
                  const transactionResponse = await axios.get('https://payville.pythonanywhere.com/api/transactions/', {
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
                      const csrfResponse = await axios.get('https://payville.pythonanywhere.com/api/get-csrf-token/');
                      const csrfToken = csrfResponse.data.csrf_token;

                      // Prepare data for VTU API request
                      const requestBody = {
                          product_code: productCode,
                          number: phoneNumber
                      };

                      const historyParams = {
                          user: userData.id,
                          text: `Data purchase: ${productCode} to ${phoneNumber}`
                      }

                      // Send POST request to backend API with CSRF token included in headers
                      const vtuResponse = await axios.post('https://payville.pythonanywhere.com/api/buy-sme-data/', requestBody, {
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
                              'Data Purchase Successful',
                              `You have successfully purchased ${productCode} worth of data for ${phoneNumber}`,
                              { product_code: productCode, phoneNumber }
                          );

                          await axios.post('https://payville.pythonanywhere.com/api/history/', historyParams, {
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
    {userData && userData.account_number ? `Wallet Balance: ₦${wallet}` : 'Login to see wallet balance'}
  </Text>
) : (
  <Text style={styles.walletBalance5000}>Login to see balance</Text>
)}
     
      

     <View style={styles.pickerContainer}> 
  {/* Network Selection */}
  {plansLoading ? (
    <Text style={styles.picker}>Fetching plans...</Text>
  ) : (
    <>
      <Picker
        style={styles.picker}
        selectedValue={network}
        onValueChange={(itemValue) => handleNetworkSelection(itemValue)}
      >
        <Picker.Item label="Select Network" value="" />
        <Picker.Item label="Glo" value="glo" />
        <Picker.Item label="Airtel" value="airtel" />
        <Picker.Item label="MTN" value="mtn" />
        <Picker.Item label="9mobile" value="nineMobile" />
      </Picker>

      {/* Product Code Selection */}
      {network && (
        <Picker
          style={styles.picker}
          selectedValue={productCode}
          onValueChange={(itemValue) => handleProductCodeSelection(itemValue)}
        >
          <Picker.Item label="Select Package" value="" />
          {productCodeOptions[network].map((option, index) => (
            <Picker.Item
              key={index}
              label={`${option.service_name} ${parseInt(option.service_default_price) + 50}`}
              value={option.service_name}
            />
          ))}
        </Picker>
      )}
    </>
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
  
  <Pressable onPress={() => handleNetworkSelection("glo")}>
    <Text style={[styles.glo, styles.buyTypo]}>glo</Text>
  </Pressable>
  
  <View style={[styles.groupChild7, styles.groupChildLayout1]} />
  
  <Pressable onPress={() => handleNetworkSelection("airtel")}>
    <Image
      style={styles.rectangleIcon}
      contentFit="cover"
      source={require("../assets/rectangle-55.png")}
    />
  </Pressable>

  <View style={[styles.groupChild8, styles.groupChildLayout1]} />

  <Pressable onPress={() => handleNetworkSelection("mtn")}>
    <Image
      style={[styles.groupChild9, styles.groupChildLayout]}
      contentFit="cover"
      source={require("../assets/rectangle-56.png")}
    />
  </Pressable>
  
  <Pressable onPress={() => handleNetworkSelection("nineMobile")}>
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
    <Pressable onPress={paymentChoice === 'atm' ? handleCardUssdBuySmeData : handleBuySmeData}>
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
  pickerContainer: {
   
    alignItems: "center",
    justifyContent: "center",
  },
  picker: {
    width: "60%", // Adjust the width as needed
    top: 350,
    elevation: 80,
  },
  groupChildLayout3: {
    height: 65,
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
  walletPressable: {
    position: "absolute",
    left: 140, // Adjust spacing between ATM and WALLET
    top: 0,
    width: 100,
    height: 65,
    justifyContent: 'center',
    alignItems: 'center',
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
  textInput: {
    left: '10%'
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

export default BuyData;
