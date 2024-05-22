import React, { useState, useCallback, useEffect, useRef } from "react";
import { Image } from "expo-image";
import { Animated, StyleSheet, Text, View, Pressable, Modal, ScrollView, Button, Alert, SafeAreaView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Frame1 from "../components/Frame1";
import Frame2 from "../components/frame2";
import Frame from "../components/Frame";
import SideBar from "../components/SideBar";
import { Color, FontSize, FontFamily, Border } from "../GlobalStyles";
import { useAuth } from "../contexts/AuthContext";
import axios from "axios";
import { Dimensions } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';


const Home = () => {
  const navigation = useNavigation();
  const [rectangle1Visible, setRectangle1Visible] = useState(false);
  const [rectangle2Visible, setRectangle2Visible] = useState(false);
  const [sLIDEContainerVisible, setSLIDEContainerVisible] = useState(false);
  const [vectorIconVisible, setVectorIconVisible] = useState(false);
  const [wallet, setWallet] = useState("***");

  const openRectangle1 = useCallback(() => {
    setRectangle1Visible(true);
  }, []);

  const { width, height } = Dimensions.get('window');

  const closeRectangle1 = useCallback(() => {
    setRectangle1Visible(false);
  }, []);

  const openRectangle2 = useCallback(() => {
    setRectangle2Visible(true);
  }, []);

  const closeRectangle2 = useCallback(() => {
    setRectangle2Visible(false);
  }, []);

  const openSLIDEContainer = useCallback(() => {
    setSLIDEContainerVisible(true);
  }, []);

  const closeSLIDEContainer = useCallback(() => {
    setSLIDEContainerVisible(false);
  }, []);

  const openVectorIcon = useCallback(() => {
    setVectorIconVisible(true);
  }, []);

  const scrollAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const scrollWidth = 500; // Adjust this width based on your design
    Animated.loop(
      Animated.timing(scrollAnim, {
        toValue: -scrollWidth,
        duration: 10000,
        useNativeDriver: true,
      })
    ).start();
  }, [scrollAnim]);

  const closeVectorIcon = useCallback(() => {
    setVectorIconVisible(false);
  }, []);

  const { user } = useAuth();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true); // Loading state

  const fetchUserData = useCallback(async () => {
    try {
      const response = await fetch('http://192.168.43.179:8000/api/user/');
      const data = await response.json();
      setUserData(data);
      setLoading(false); // Set loading to false after fetching user data
    } catch (error) {
      console.error('Error fetching user data:', error);
      setLoading(false); // Set loading to false in case of an error
    }
  }, []);

  useEffect(() => {
    // Fetch user data if user is logged in
    if (user && user.isAuthenticated) {
      fetchUserData();
    } else {
      setLoading(false); // Set loading to false if user is not logged in
    }
  }, [user, fetchUserData]);

  
  const fetchAccountInfo = useCallback(async () => {
    try {
      const accountReference = userData?.account_reference; // Assuming order_ref is available in userData
      const accessToken = 'FLWSECK-fab12578d0fa352253f89fd6a7b7b713-18f55ce05d4vt-X'; // Your Flutterwave access token
      const flutterwaveUrl = `https://api.flutterwave.com/v3/payout-subaccounts/${accountReference}/balances`;
  
      const response = await axios.get(flutterwaveUrl, {
        "currency": "NGN",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        }
      });
      setWallet(response.data.data.available_balance); // Set wallet amount from response
      console.log(response.data)
    } catch (error) {
      console.error('Error fetching account info:', error);
    }
  }, [userData])

  useEffect(() => {
    // Fetch user data if user is logged in
    if (user && user.isAuthenticated) {
      fetchUserData();
    } else {
      setLoading(false); // Set loading to false if user is not logged in
    }
  }, [user, fetchUserData]);

  useEffect(() => {
    // Fetch account info once userData is available
    if (userData) {
      fetchAccountInfo();
    }
  }, [userData, fetchAccountInfo]);

  const csrfUrl = 'http://192.168.43.179:8000/api/get-csrf-token/';

  const incrementAccountBalance = async (amount) => {
    try {
      const csrfResponse = await axios.get(`${csrfUrl}`);
      const csrfToken = csrfResponse.data.csrf_token;
      const url = 'http://192.168.43.179:8000/api/increment-account-balance/';
      
      const headers = {
        'Content-Type': 'multipart/form-data',
        'X-CSRFToken': csrfToken,
      };
  
      const data = new FormData();
      data.append('amount', wallet);
  
      const response = await axios.post(url, data, { headers });
  
      if (response.status === 200) {
        console.log('Account balance updated successfully');
      } else {
        console.error('Failed to update account balance:', response.data.detail);
      }
    } catch (error) {
      console.error('Error updating account balance:', error.message);
    }
  };

  if (loading) {
    // Render loading indicator or skeleton screen while fetching user data
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }


  return (
    <>
    <SafeAreaView style={{ flex: 1 }}>
    <ScrollView>
      <View style={styles.home}>
      

        <Image
          style={styles.homeChild}
          contentFit="cover"
          source={require("../assets/ellipse-1.png")}
        />
        <Text style={[styles.welcomeJinn, styles.history1FlexBox]}>
  Welcome {user && user.isAuthenticated ? (userData && userData.username ? `to Payville, ${userData.username}` : 'to Payville') : 'to Payville'}
</Text>
<Image
  style={styles.homeItem}
  contentFit="cover"
  source={require("../assets/rectangle-2.png")}
/>
<Image
  style={styles.phoneBill1Icon}
  contentFit="cover"
  source={require("../assets/phonebill-1.png")}
/>
<Image
  style={styles.homeInner}
  contentFit="cover"
  source={require("../assets/ellipse-2.png")}
/>
<Text style={[styles.wallet, styles.bonusTypo]}>Wallet</Text>
<Text style={[styles.bonus, styles.bonusTypo]}>Account Number</Text>
{user && user.isAuthenticated ? (
  <>
    <Text style={[styles.n2460000, styles.historyTypo]}>
      {userData && userData.account_number ? `₦${wallet.toLocaleString()}` : '*** *** ***'}
    </Text>
    <Text style={[styles.n24600001, styles.historyTypo]}>
      {userData && userData.account_number ? `${userData.account_number} (WEMA)` : '*** *** ***'}
    </Text>
  </>
) : (
  <>
    <Text style={[styles.n2460000, styles.historyTypo]}>*** *** ***</Text>
    <Text style={[styles.n24600001, styles.historyTypo]}>*** *** ***</Text>
  </>
)}


        <View style={[styles.rectangleView, styles.slidePosition]} />
        <Pressable style={[styles.historyPressable, styles.slidePosition]} onPress={openSLIDEContainer}>
            <View style={styles.animatedContainer}>
              <Animated.Text style={[styles.history, styles.historyTypo, {
                transform: [{ translateX: scrollAnim }]
              }]}>
                Choose SME data for cheap data plans
              </Animated.Text>
            </View>
          </Pressable>
        
        
        

        <View style={styles.serviceButtons}>
          <View style={[styles.cable, styles.cableLayout]}>
            <Pressable
              style={[styles.wrapper, styles.cableLayout]}
              onPress={() => navigation.navigate("Cable")}
            >
              <Image
                style={[styles.icon, styles.iconLayout1]}
                contentFit="cover"
                source={require("../assets/rectangle-9.png")}
              />
            </Pressable>
            <Text style={[styles.payForCable, styles.fundWallet1Typo]}>
              Pay for Cable
            </Text>
          </View>
          <View style={[styles.withdraw, styles.payBillPosition]}>
            <Pressable
              style={[styles.wrapper, styles.cableLayout]}
              onPress={() => navigation.navigate("PayBill2")}
            >
              <Image
                style={[styles.icon, styles.iconLayout1, {right: wp('6%') }]}
                contentFit="cover"
                source={require("../assets/rectangle-16.png")}
              />
            </Pressable>
            <Text style={[styles.withdrawal, styles.shareAppTypo]}>
              Withdrawal
            </Text>
          </View>
          <Pressable
            style={[styles.frame, styles.framePosition]}
            onPress={() => navigation.navigate("BuySmeData")}
          >
            <Image
              style={[styles.icon, styles.iconLayout1]}
              contentFit="cover"
              source={require("../assets/rectangle-15.png")}
            />
          </Pressable>
          <View style={[styles.wrapper, styles.cableLayout]}>
            <Pressable
              style={[styles.wrapper, styles.cableLayout]}
              onPress={() => navigation.navigate("BuyAirtime")}
            >
              <Image
                style={[styles.icon, styles.iconLayout1]}
                contentFit="cover"
                source={require("../assets/rectangle-10.png")}
              />
            </Pressable>
            <Text
              style={[styles.buyAirtime1, styles.buyTypo]}
            >{`Buy Airtime  `}</Text>
          </View>
          <View style={[styles.buyData, styles.framePosition]}>
            <Pressable
              style={[styles.wrapper, styles.cableLayout]}
              onPress={() => navigation.navigate("BuyData")}
            >
              <Image
                style={[styles.icon, styles.iconLayout1]}
                contentFit="cover"
                source={require("../assets/rectangle-11.png")}
              />
            </Pressable>
            <Text style={[styles.buyData1, styles.buyTypo]}>Corporate Data</Text>
          </View>
          <Image
            style={[styles.serviceButtonsChild, styles.payBillPhcn]}
            contentFit="cover"
            source={require("../assets/rectangle-12.png")}
          />
          <View style={[styles.payBill, styles.payBillPosition]}>
            <Pressable
              style={[styles.wrapper, styles.cableLayout]}
              onPress={() => navigation.navigate("PayBill")}
            >
             
            </Pressable>
            <Text style={[styles.payBill1, styles.buyTypo]}>Pay Bill</Text>
          </View>
          <Text style={[styles.rechargePin, styles.fundWallet1Typo]}>
            SME Data
          </Text>
         

  <View style={[styles.contactUs, styles.sharePosition]}>
  <Pressable onPress={openRectangle1} style={{ flex: 1 }}>
    <View style={[styles.contactUsChild, styles.childShadowBox]} />

    <Image
      style={styles.contactUsItem}
      contentFit="cover"
      source={require("../assets/rectangle-26.png")}
    />

    <Image
      style={[
        styles.materialSymbolscontactPageIcon,
        styles.iconPosition,
      ]}
      contentFit="cover"
      source={require("../assets/materialsymbolscontactpage.png")}
    />

    <Text style={[styles.contactPosition, styles.shareAppTypo]}>
      Contact Us
    </Text>
    </Pressable>
  </View>



          <View style={[styles.share, styles.sharePosition]}>
            <Pressable
              style={[styles.shareChild, styles.childShadowBox]}
              onPress={openRectangle2}
            />
            <Image
              style={styles.shareItem}
              contentFit="cover"
              source={require("../assets/rectangle-25.png")}
            />
            <Image
              style={[styles.vectorIcon, styles.iconLayout]}
              contentFit="cover"
              source={require("../assets/vector.png")}
            />
            <Text style={[styles.shareApp, styles.shareAppTypo]}>
              Share App
            </Text>
          </View>
        </View>
        
        <Pressable style={styles.vector} onPress={openVectorIcon}>
          <Image
            style={[styles.icon6, styles.iconLayout]}
            contentFit="cover"
            source={require("../assets/vector1.png")}
          />
        </Pressable>
        
        {user && user.isAuthenticated ? (
  <Pressable 
    onPress={() => navigation.navigate("History")} 
    style={{ position: 'absolute', top: 0, left: 0, right: 0, padding: 20 }}
  >
    <Image
      style={[styles.claritynotificationSolidIcon, styles.iconPosition]}
      source={require("../assets/claritynotificationsolid.png")}
    />
  </Pressable>
) : (
  <Pressable 
    onPress={() => Alert.alert("Sign in to get history")} 
    style={{ position: 'absolute', top: 0, left: 0, right: 0, padding: 20 }}
  >
    <Image
      style={[styles.claritynotificationSolidIcon, styles.iconPosition]}
      source={require("../assets/claritynotificationsolid.png")}
    />
  </Pressable>
)}



      </View>

      <Modal animationType="fade" transparent visible={rectangle1Visible}>
        <View style={styles.rectangle1Overlay}>
          <Pressable style={styles.rectangle1Bg} onPress={closeRectangle1} />
          <Frame1 onClose={closeRectangle1} />
        </View>
      </Modal>

      <Modal animationType="fade" transparent visible={rectangle2Visible}>
        <View style={styles.rectangle2Overlay}>
          <Pressable style={styles.rectangle2Bg} onPress={closeRectangle2} />
          <Frame2 onClose={closeRectangle2} />
        </View>
      </Modal>

      <Modal animationType="fade" transparent visible={sLIDEContainerVisible}>
        <View style={styles.sLIDEContainerOverlay}>
          <Pressable
            style={styles.sLIDEContainerBg}
            onPress={closeSLIDEContainer}
          />
          <Frame onClose={closeSLIDEContainer} />
        </View>
      </Modal>

      <Modal animationType="fade" transparent visible={vectorIconVisible}>
        <View style={styles.vectorIconOverlay}>
          <Pressable style={styles.vectorIconBg} onPress={closeVectorIcon} />
          <SideBar onClose={closeVectorIcon} />
        </View>
      </Modal>

    
      </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20, // Add horizontal padding
  },
  
  history1FlexBox: {
    textAlign: "left",
    position: "absolute",
  },
  bonusTypo: {
    color: Color.colorDarkturquoise,
    fontSize: FontSize.size_xl,
    left: 63,
    textAlign: "left",
    fontFamily: FontFamily.robotoBold,
    fontWeight: "700",
    position: "absolute",
  },
  historyTypo: {
    fontSize: FontSize.size_xl,
    textAlign: "left",
    fontFamily: FontFamily.robotoBold,
    fontWeight: "700",
    position: "absolute",
  },
  slidePosition: {
    width: 430,
    left: 0,
    position: "absolute",
  },
  fundWallet1Typo: {
    fontSize: FontSize.size_xs,
    textAlign: "left",
    fontFamily: FontFamily.robotoBold,
    fontWeight: "700",
    position: "absolute",
  },
  cableLayout: {
    height: hp('15.75%'), // 126 pixels
    width: wp('28%'), // 112 pixels
    left: wp('0%'), // 0 pixels
    position: "absolute",
  },
  iconLayout1: {
    height: "100%",
    width: "100%",
  },
  contactPosition: {
    left: '20%',
  },
  payBillPosition: {
    
    left: 240,
    height: 100,
    width: 112,
    position: "absolute",
   
  },
  payBillPhcn: {
    height: hp('15.75%'), // 126 pixels
    width: wp('28%'), // 112 pixels
    left: wp('60%'), // 0 pixels
    position: "absolute",
  },
  shareAppTypo: {
    top: 85,
    fontSize: FontSize.size_xs,
    color: Color.colorWhite,
    textAlign: "left",
    fontFamily: FontFamily.robotoBold,
    fontWeight: "700",
    position: "absolute",
  },
  framePosition: {
    height: hp('15.75%'), // 126 pixels
    width: wp('28%'), // 112 pixels
    left: wp('30%'),
    position: "absolute",
  },
  buyTypo: {
    top: 85,
    left: '10%',
    fontSize: FontSize.size_xs,
    fontFamily: FontFamily.robotoBold,
    fontWeight: "700",
    position: "absolute",
  },
  sharePosition: {
    top: 316,
    height: 126,
    position: "absolute",
  },
  childShadowBox: {
    shadowOpacity: 1,
    elevation: 4,
    shadowRadius: 4,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowColor: "rgba(0, 0, 0, 0.25)",
    borderRadius: Border.br_lgi,
    top: 0,
    height: hp('15%'), // 126 pixels
    width: wp('28%'), // 112 pixels
    position: "absolute",
  },
  iconPosition: {
    overflow: "hidden",
    position: "absolute",
  },
  iconLayout: {
    maxHeight: "100%",
    maxWidth: "100%",
    overflow: "hidden",
  },
  slideShadowBox: {
    height: 58,
    shadowOpacity: 1,
    elevation: 4,
    shadowRadius: 4,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    width: 430,
    left: 0,
    position: "absolute",
  },
  homeChild: {
    top: 293,
    left: 70,
    width: 322,
    height: 70,
    position: "absolute",
  },
  welcomeJinn: {
    top: 94,
    left: 42,
    fontSize: 16,
    width: 224,
  
    color: Color.colorDarkcyan_100,
    fontFamily: FontFamily.robotoBold,
    fontWeight: "700",
    textAlign: "left",
  },
  homeItem: {
    top: '20%',
    left: '6%', // Adjusted left position
    borderRadius: 29,
    width: '90%', // Reduced width by 20 units
    height: '21%',
    position: "absolute",
  },
  
  phoneBill1Icon: {
    top: hp('21%'), // Converted top to percentage
    width: wp('50%'), // Converted width to percentage
    height: hp('25%'), // Converted height to percentage
    left: wp('50%'), // Converted left to percentage
    position: "absolute",
  },
  homeInner: {
    top: hp('40.75%'), // 326 pixels
    left: wp('51.75%'), // 207 pixels
    width: wp('27%'), // 108 pixels
    height: hp('1.75%'), // 14 pixels
    position: "absolute",
  },
  wallet: {
    top: 224,
  },
  bonus: {
    top: 305,
  },
  n2460000: {
    top: 253,
    color: Color.colorWhite,
    left: 63,
    fontSize: FontSize.size_xl,
  },
  n24600001: {
    top: 334,
    color: Color.colorWhite,
    left: 63,
    fontSize: FontSize.size_xl,
  },
  rectangleView: {
    top: 453,
    backgroundColor: Color.colorGainsboro_100,
    height: 36,
  },
  history: {
    top: 459,
    left: 400,
    color: Color.colorDarkcyan_100,
  },
  fundWallet: {
    top: 458,
    left: 250,
    borderRadius: Border.br_8xs,
    width: 78,
    height: 26,
    backgroundColor: Color.colorSandybrown_100,
    position: "absolute",
  },
  fundWallet1: {
    top: 465,
    left: 255,
    color: Color.colorBlack,
    
  },
  icon: {
    borderRadius: Border.br_lgi,
  },
  wrapper: {
    top: 0,
  },
  payForCable: {
    top: 85,
    left: 10,
    color: Color.colorWhite,
  },
  cable: {
    top: 158,
  },
  withdrawal: {
    left: '2%',
  
  },
  withdraw: {
    top: 158,
  },
  frame: {
    top: 158,
  },
  buyAirtime1: {
    left: 25,
    color: Color.colorWhite,
    
  },
  buyData1: {
    left: 20,
    color: Color.colorGray_100,
  },
  buyData: {
    top: 0,
  },
  serviceButtonsChild: {
    borderRadius: Border.br_lgi,
    top: 0,
  },
  payBill1: {
    left: 35,
    color: Color.colorWhite,
  },
  payBill: {
    top: 0,
  },
  rechargePin: {
    top: hp('35%'), // 245 pixels
    left: wp('36%'), // 120 pixels
    fontSize: FontSize.size_mini,
    textAlign: "left",
    fontFamily: FontFamily.robotoBold,
    fontWeight: "700",
    position: "absolute",
    color: Color.colorWhite
  },
  rectangle1Overlay: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(113, 113, 113, 0.3)",
  },
  rectangle1Bg: {
    position: "absolute",
    width: "100%",
    height: "100%",
    left: 0,
    top: 0,
  },
  contactUsChild: {
    left: 1,
    backgroundColor: Color.colorSandybrown_100,
  },
  contactUsItem: {
    top: 34,
    width: 70,
    height: 70,
    left: 0,
    position: "absolute",
  },
  materialSymbolscontactPageIcon: {
    height: "43.25%",
    width: "40.18%",
    top: "19%",
    right: "30.36%",
    bottom: "32.7%",
    left: "29.46%",
    position: "absolute",
  },
  contactUs: {
    width: 113,
    left: 115,
  },
  rectangle2Overlay: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(113, 113, 113, 0.3)",
  },
  rectangle2Bg: {
    position: "absolute",
    width: "100%",
    height: "100%",
    left: 0,
    top: 0,
  },
  shareChild: {
    backgroundColor: "#ffbdfc",
    left: 0,
  },
  shareItem: {
    top: 33,
    width: 68,
    height: 72,
    left: 0,
    position: "absolute",
  },
  vectorIcon: {
    height: "40.25%",
    width: "40.18%",
    top: "19%",
    right: "30.36%",
    bottom: "32.7%",
    left: "29.46%",
    position: "absolute",
  },
  shareApp: {
    left: 25,
  },
  share: {
    left: 1,
    width: 112,
    top: 316,
  },
  serviceButtons: {
    top: hp('75%'), // 518 pixels
    position: "absolute",
    left: wp('5%'),  // Centering the container
    width: wp('80%'), // Ensuring the container doesn't exceed screen width
  },
  sLIDEContainerOverlay: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(113, 113, 113, 0.3)",
  },
  sLIDEContainerBg: {
    position: "absolute",
    width: "100%",
    height: "100%",
    left: 0,
    top: 0,
  },
  slideUpChild: {
    bottom: 0,
    borderTopLeftRadius: Border.br_3xs,
    borderTopRightRadius: Border.br_3xs,
    backgroundColor: Color.colorDarkcyan_100,
    shadowColor: "rgba(0, 0, 0, 0.25)",
    height: 58,
    top: 100
  },
  slideUp: {
    bottom: 4,
    shadowColor: "rgba(0, 0, 0, 0.2)",
  },
  subtractIcon: {
    width: 156,
    height: 93,
    left: 250,
    top: 100
  },
  raphaelarrowupIcon: {
    top: 145,
    left: 89,
    width: 32,
    height: 32,
  },
  history1: {
    top: 150,
    fontSize: FontSize.size_mini,
    fontFamily: FontFamily.robotoRegular,
    left: 35,
    color: Color.colorWhite,
  },
  slide: {
    bottom: -5,
    height: 93,
  },
  vectorIconOverlay: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(113, 113, 113, 0.3)",
  },
  vectorIconBg: {
    position: "absolute",
    width: "100%",
    height: "100%",
    left: 0,
    top: 0,
  },
  icon6: {
    height: "100%",
    width: "100%",
  },
  vector: {
    left: "8.14%",
    top: "4.56%",
    right: "86.05%",
    bottom: "92.75%",
    width: "5.81%",
    height: "2.69%",
    position: "absolute",
  },
  claritynotificationSolidIcon: {
    top: 50,
    elevation: 100,
    zIndex: 500,
    left: 300,
    width: 36,
    height: 36,
  },
  home: {
    backgroundColor: Color.colorWhite,
    flex: 1,
    height: 1000,
    width: "100%",
  },
});

export default Home;
