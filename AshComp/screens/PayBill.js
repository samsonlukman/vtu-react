import * as React from "react";
import { StyleSheet, View, Text, Pressable, TextInput, ActivityIndicator, Alert } from "react-native";
import { useState } from "react";
import { Image } from "expo-image";
import { useNavigation } from "@react-navigation/native";
import { Color, FontFamily, FontSize, Border } from "../GlobalStyles";
import { Picker } from "@react-native-picker/picker";
import * as Clipboard from 'expo-clipboard';
import axios from "axios";
import { useUser } from "../contexts/UserContext";

const PayBill = () => {
  const navigation = useNavigation();
  const [distributionCompanies, setDistributionCompanies] = React.useState([]);
  const [selectedProductCode, setSelectedProductCode] = React.useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [Number, setNumber] = useState("");
  const [amount, setAmount] = useState(""); // State for selected amount
  const { userData, loading, wallet } = useUser();


  React.useEffect(() => {
    fetchData();
  }, []);

  const handleCopyToClipboard = async () => {
    await Clipboard.setStringAsync(Number);
    alert('Copied to clipboard!');
  };

  const fetchData = async () => {
    try {
      const response = await fetch("http://192.168.43.179:8000/api/phcn-plans/");
      const data = await response.json();
      setDistributionCompanies(data);
    } catch (error) {
      console.error("Error fetching data:", error);
      Alert.alert(response.data.message)
    }
  };

  const handleAmountSelection = (amount) => {
    setAmount(amount); // Update selected network
    console.log(amount)
    
  };

  const handleServiceNameChange = (productCode) => {
    setSelectedProductCode(productCode);
    console.log(productCode)
  };

  const handlePayBill = async () => {

    if (!selectedProductCode || !amount || !Number) {
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
        narration: `${amount} electricity purchase for ${Number}`,
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
          amount: amount
        };
  
        console.log('Data sent to backend:', requestBody);
  
        axios.post('http://192.168.43.179:8000/api/buy-phcn/', requestBody, {
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
          })
          .catch(error => {
            console.error('Error:', error);
            // Handle error
            Alert.alert("Failed to purchase electricity. Please try again later.");
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
  


  return (
    
    <View style={styles.cable}>
      <View style={styles.cableChild} />
    
      
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


      
      <View>
      <Pressable onLongPress={handleCopyToClipboard} style={styles.smartcardNumber}>
        <TextInput
          style={styles.textInput}
          placeholder="Enter Meter Number"
          keyboardType="numeric"
          onChangeText={(text) => setNumber(text)}
          value={Number}
        />
      </Pressable>
      </View>
      
      
      <View style={styles.slide}>
       {isLoading ? (
    <ActivityIndicator size="large" color="#0000ff" />
) : (
  <Pressable onPress={handlePayBill}>
  <Text style={[ styles.buyTypo, styles.buyButton]}>Buy</Text>
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
        <Text style={[styles.atm, styles.atmTypo]}>ATM</Text>
        <Text style={[styles.wallet, styles.atmTypo]}>WALLET</Text>
      </View>
      <Image
        style={[styles.rectangleIcon, styles.slidePosition]}
        contentFit="cover"
        source={require("../assets/rectangle-12.png")}
      />
      <Text style={[styles.payForCable, styles.buyTypo]}>Electricity</Text>
      <Text style={styles.walletBalance5000}>Wallet Balance: ₦{wallet} </Text>
      
          
      <View style={styles.pickerContainer}>
  <Picker
    style={styles.picker}
    selectedValue={selectedProductCode}
    onValueChange={(itemValue, itemIndex) => handleServiceNameChange(itemValue)}
  >
    <Picker.Item label="Select a company" value="" />
    {distributionCompanies.map((company, index) => (
      <Picker.Item key={index} label={company.service_name} value={company.product_code} />
    ))}
  </Picker>
</View>

       
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
  );
};

const styles = StyleSheet.create({
  cableLayout: {
    height: 37,
    width: 279,
  },
  pickerContainer: {
   
    alignItems: "center",
    justifyContent: "center",
  },
  picker: {
    width: "80%", // Adjust the width as needed
    top: 300,
    elevation: 80,
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
  buyButton: {
    backgroundColor: Color.colorDarkcyan_100,
    borderRadius: 20,
    padding: 10,
    width: 100,
    textAlign: 'center',
    color: 'white',
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
    top: 420,
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
    top: 410,
    height: 37,
    width: 279,
    backgroundColor: Color.colorGainsboro_100,
    borderRadius: Border.br_6xs,
    left: 40,
    elevation: 60
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
    left: 25,
  },
  wallet: {
    left: 234,
  },
  rectangleParent: {
    top: 260,
    left: 33,
    height: 65,
    width: 200,
    position: "absolute",
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
    height: '50%',
    overflow: "hidden",
    width: "100%",
    backgroundColor: Color.colorWhite,
  },
});

export default PayBill;
