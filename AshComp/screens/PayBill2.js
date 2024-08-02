import * as React from "react";
import { StyleSheet, View, Text, Pressable, TextInput, Alert, ScrollView, ActivityIndicator } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { Image } from "expo-image";
import { useNavigation } from "@react-navigation/native";
import { Color, FontFamily, FontSize, Border } from "../GlobalStyles";
import { useUser } from "../contexts/UserContext";
import axios from "axios";
import { Video } from 'expo-av';
import { useNotification } from "../contexts/NotificationContext";// Import the sendPushNotification function
import { sendPushNotification } from "../components/NotificationHandler";
import { useAuth } from "../contexts/AuthContext";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';



const PayBill2 = () => {
  const navigation = useNavigation();
  const { userData, loading, wallet } = useUser();
  const referer = 'https://www.payvillesub.com'
  const [accountBank, setAccountBank] = React.useState(""); // State for selected bank code
  const [accountNumber, setAccountNumber] = React.useState(""); // State for account number
  const [amount, setAmount] = React.useState(""); // State for amount
  const [narration, setNarration] = React.useState(""); // State for narration
  const [banks, setBanks] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [accountName, setAccountName] = React.useState("");
  const { user } = useAuth();
  const toTitleCase = (str) => {
    return str.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };
  const expoPushToken = useNotification();

  React.useEffect(() => {
    // Fetch bank data from API
    const fetchBanks = async () => {
      try {
        const response = await axios.get("https://api.flutterwave.com/v3/banks/NG", {
          headers: {
            Authorization: "FLWSECK-fab12578d0fa352253f89fd6a7b7b713-18f55ce05d4vt-X",
          },
        });
    
        // Sort banks alphabetically by name
        const sortedBanks = response.data.data.sort((a, b) => {
          if (a.name < b.name) {
            return -1;
          }
          if (a.name > b.name) {
            return 1;
          }
          return 0;
        });
    
        console.log(sortedBanks); // Check if the banks are sorted correctly
        setBanks(sortedBanks);
      } catch (error) {
        console.error("Error fetching banks:", error);
        Alert.alert("Error fetching banks. Please try again later.");
      }
    };
    

    fetchBanks();
  }, []);

  const handleCopyToClipboard = async () => {
    await Clipboard.setStringAsync(Number);
    alert('Copied to clipboard!');
  };


  
  const handleBankSelection = async (selectedBank) => {
    setAccountBank(selectedBank); // Set the selected bank code

    // Check if account number length is 10 and perform verification
    if (accountNumber.length === 10) {
      await handleVerifyBank(selectedBank, accountNumber);
    }
  };

  const handleAccountNumberChange = async (text) => {
    setAccountNumber(text);

    // Check if account number length is 10 and perform verification
    if (text.length === 10) {
      await handleVerifyBank(accountBank, text);
    }
    else{
      setAccountName("")
    }
  };

  const handleVerifyBank = async (bankCode, accountNumber) => {
    setIsLoading(true);
    try {
      // Prepare data for Flutterwave account verification request
      const verifyBankUrl = 'https://api.flutterwave.com/v3/accounts/resolve';
      const secret_key = 'FLWSECK-fab12578d0fa352253f89fd6a7b7b713-18f55ce05d4vt-X';

      const verifyParams = {
        account_bank: bankCode,
        account_number: accountNumber
      };

      const flutterwaveHeaders = {
        'Authorization': `Bearer ${secret_key}`,
        'Content-Type': 'application/json',
        
      };

      // Make API request to Flutterwave using Axios
      const verifyResponse = await axios.post(verifyBankUrl, verifyParams, {
        headers: flutterwaveHeaders
      });

      if (verifyResponse.data.status === 'success') {
        setAccountName(verifyResponse.data.data.account_name);
      } else {
        setAccountName("");
      }
    } catch (error) {
      console.error('Error:', error);
      Alert.alert("Invalid Details");
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleTransfer = async () => {
    if (!accountBank || !accountNumber || !amount) {
      Alert.alert("Please fill in all fields");
      return;
    }
    
    if(amount > wallet){
      Alert.alert("Error", "Login or fund your wallet")
      return;
    }
  
    setIsLoading(true);
  
    try {
      // Prepare data for Flutterwave API request
      const flutterwaveUrl = 'https://api.flutterwave.com/v3/transfers';
      const secret_key = 'FLWSECK-fab12578d0fa352253f89fd6a7b7b713-18f55ce05d4vt-X';
  
      const flutterwaveParams = {
        account_bank: accountBank,
        account_number: accountNumber,
        amount: amount,
        currency: 'NGN',
        narration: narration,
        debit_subaccount: `${userData.account_reference}`
      };
      
      const flutterwaveHeaders = {
        'Authorization': `Bearer ${secret_key}`,
        'Content-Type': 'application/json',
       
      };

      const historyParams = {
        user: userData.id,
        text:   `Bank Transfer: ${amount} to ${accountName}: ${accountNumber}`
      }
  
      // Make API request to Flutterwave using Axios
      const transferResponse = await axios.post(flutterwaveUrl, flutterwaveParams, {
        headers: flutterwaveHeaders
      });
  
      if (
        transferResponse.data.status === 'success' &&
        transferResponse.data.message === 'Transfer Queued Successfully'
      ) {

        const csrfResponse = await axios.get('https://www.payvillesub.com/api/get-csrf-token/');
        const csrfToken = csrfResponse.data.csrf_token;
        
        console.log("Feedback: ", transferResponse.data.message);
        Alert.alert(`Transfer Successful`)
        await sendPushNotification(
          expoPushToken, // Use the token obtained from the context
          'Transfer Successful',
          `You have sent NGN${amount} to ${accountNumber} ${accountName}`,
          { amount: amount, accountNumber: accountNumber }
        );

        await axios.post('https://www.payvillesub.com/api/history/', historyParams, {
              headers: {
                'X-CSRFToken': csrfToken,
                'Content-Type': 'application/json',
                'referer': referer // Ensure you set the correct content type
            }
          });

          navigation.navigate("Home")
      }

    } catch (error) {
      console.error('Error:', error);
      Alert.alert("Error: Something went wrong");
    } finally {
      setIsLoading(false); // Set isLoading back to false after API call completion
    }
  };
  

    

  return (
    <ScrollView>
    <View style={styles.payBill}>
      <View style={[styles.payBillChild, styles.slidePosition]} />
      
      <TextInput
        style={[styles.cardName, styles.selectTypo]}
        placeholder="Enter narration"
        value={narration}
        onChangeText={(text) => setNarration(text)}
      />
      {/* Text input for amount */}
      <TextInput
        style={[styles.quantity, styles.selectTypo]}
        placeholder="Enter amount"
        keyboardType="numeric"
        value={amount}
        onChangeText={(text) => setAmount(text)}
      />
       {/* Text input for account number */}
       <TextInput
        style={[styles.selectAmount, styles.selectTypo]}
        placeholder="Enter account number"
        keyboardType="numeric"
        value={accountNumber}
        onChangeText={handleAccountNumberChange}
      />

      {/* Display account name */}
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
          accountName !== "" && <Text style={[styles.nameDisplay, styles.selectTypo]}>{toTitleCase(accountName)}</Text>
        )}
       {/* Picker for selecting bank */}
       <View style={styles.pickerContainer}>
        
        <Picker
          style={styles.picker}
          selectedValue={accountBank}
          onValueChange={(itemValue, itemIndex) => handleBankSelection(itemValue)}
        >
          <Picker.Item label="Select Bank" value="" />
          {/* Populate picker items dynamically */}
          {banks.map((bank) => (
            <Picker.Item key={bank.code} label={bank.name} value={bank.code} />
          ))}
        </Picker>
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
  <Pressable onPress={handleTransfer}>
  <Text style={[ styles.buyTypo, styles.buyButton]}>Send</Text>
</Pressable>
)}

        <Image
          style={[styles.teenyiconsarrowSolid, styles.slideItemLayout]}
          contentFit="cover"
          source={require("../assets/teenyiconsarrowsolid.png")}
        />
      </View>
      
      <View style={styles.rectangleParent}>
        <View style={[styles.groupChild, styles.groupPosition]} />
        <View style={[styles.groupItem, styles.groupPosition]} />
        <Text style={[styles.atm, styles.atmTypo]}>P A Y V I L L E</Text>
        <Text style={[styles.wallet, styles.atmTypo]}>W I T H D R A W</Text>
      </View>
      <View style={[styles.network, styles.payPosition]}>
        <View style={[styles.selectNetworkParent, styles.payLayout]}>
          <Text style={[styles.selectNetwork, styles.selectTypo]}>
            Select Bank
          </Text>
          <Image
            style={styles.frameChild}
            contentFit="cover"
            source={require("../assets/vector-2.png")}
          />
        </View>
      </View>
      <Image
        style={styles.rectangleIcon}
        contentFit="cover"
        source={require("../assets/rectangle-16.png")}
      />
      <Text style={[styles.withdrawal, styles.buyTypo]}>Withdrawal</Text>
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
  slidePosition: {
    left: "50%",
    position: "absolute",
  },
 
  selectTypo: {
    color: Color.colorBlack,
    fontFamily: FontFamily.robotoRegular,
    textAlign: "left",
    fontSize: FontSize.size_xs,
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
  payPosition: {
    marginLeft: -139,
    left: "50%",
    position: "absolute",
  },
  payBillChild: {
    marginLeft: -181,
    top: 149,
    shadowColor: "rgba(0, 0, 0, 0.25)",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 4,
    elevation: 4,
    shadowOpacity: 1,
    borderRadius: Border.br_19xl,
    width: 363,
    height: 621,
    backgroundColor: Color.colorWhite,
  },
  walletBalance5000: {
    top: 230,
    left: 130,
    color: Color.colorBlack,
    textAlign: "left",
    fontFamily: FontFamily.robotoBold,
    fontWeight: "700",
    fontSize: FontSize.size_xs,
    position: "absolute",
  },
  payBillItem: {
    top: 517,
    backgroundColor: Color.colorGainsboro_100,
    borderRadius: Border.br_6xs,
    width: 279,
    marginLeft: -139,
    left: "50%",
    position: "absolute",
  },
  payBillInner: {
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
  cardName: {
    top: 529,
    left: 91,
    color: Color.colorDarkgray,
    fontFamily: FontFamily.robotoRegular,
    backgroundColor: Color.colorGainsboro_100,
    borderRadius: Border.br_6xs,
    elevation: 60,
    width: '50%',
    paddingLeft: 15
  },
  quantity: {
    top: 471,
    left: 91,
    color: Color.colorDarkgray,
    backgroundColor: Color.colorGainsboro_100,
    borderRadius: Border.br_6xs,
    elevation: 60,
    width: '50%',
    paddingLeft: 15
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
  selectAmount: {
    top: 413,
    left: 91,
    color: Color.colorBlack,
    fontFamily: FontFamily.robotoRegular,
    backgroundColor: Color.colorGainsboro_100,
    borderRadius: Border.br_6xs,
    elevation: 60,
    width: '50%',
    paddingLeft: 15
  },
  nameDisplay:
  {
    top: 440,
    left: 91,
    color: Color.colorBlack,
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
  slide: {
    marginLeft: -57,
    top: 590,
    width: 115,
    height: 39,
    left: "50%",
    position: "absolute",
  },
  buyButton: {
    backgroundColor: Color.colorDarkcyan_100,
    borderRadius: 20,
    padding: 10,
    width: 100,
    textAlign: 'center',
    color: 'white',
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
    backgroundColor: Color.colorSandybrown_200,
    width: 150,
  },
  atm: {
    left: 25,
  },
  wallet: {
    left: 180,
  },
  rectangleParent: {
    top: 260,
    left: 30,
    height: 65,
    width: 300,
    position: "absolute",
  },
  selectNetwork: {
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
  selectNetworkParent: {
    backgroundColor: Color.colorGainsboro_100,
    borderRadius: Border.br_6xs,
    width: 279,
    overflow: "hidden",
  },
  dstvWrapper: {
    borderTopLeftRadius: Border.br_6xs,
    borderTopRightRadius: Border.br_6xs,
    overflow: "hidden",
    backgroundColor: Color.colorWhite,
  },
  frameParent: {
    marginTop: 11,
    display: "none",
  },
  network: {
    top: 341,
    height: 44,
  },
  rectangleIcon: {
    top: 88,
    left: 120,
    borderRadius: Border.br_lgi,
    width: 112,
    height: 126,
    position: "absolute",
  },
  withdrawal: {
    top: 186,
    left: 150,
    fontSize: FontSize.size_xs,
    color: Color.colorWhite,
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
  pickerContainer: {
   
    alignItems: "center",
    justifyContent: "center",
  },
  picker: {
    width: "60%", // Adjust the width as needed
    top: 350,
    elevation: 80,
  },
  payBill: {
    flex: 1,
    height: 932,
    overflow: "hidden",
    width: "100%",
    backgroundColor: Color.colorWhite,
  },
});

export default PayBill2;
