import React, { useState, useCallback, useEffect } from "react";
import { Image } from "expo-image";
import { StyleSheet, Text, View, Pressable, Modal, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Frame1 from "../components/Frame1";
import Frame from "../components/Frame";
import SideBar from "../components/SideBar";
import { Color, FontSize, FontFamily, Border } from "../GlobalStyles";
import { useAuth } from "../contexts/AuthContext";
import axios from "axios";


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

  
  

  useEffect(() => {
    // Fetch user data if user is logged in
    if (user && user.isAuthenticated) {
      fetchUserData();
    } else {
      setLoading(false); // Set loading to false if user is not logged in
    }
  }, [user, fetchUserData]);


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
<Text style={[styles.bonus, styles.bonusTypo]}>Account Number(WEMA)</Text>
{user && user.isAuthenticated ? (
  <>
    <Text style={[styles.n2460000, styles.historyTypo]}>
      {userData && userData.account_number ? `N${userData.account_balance.toLocaleString()}` : '*** *** ***'}
    </Text>
    <Text style={[styles.n24600001, styles.historyTypo]}>
      {userData && userData.account_number ? `${userData.account_number}` : '*** *** ***'}
    </Text>
  </>
) : (
  <>
    <Text style={[styles.n2460000, styles.historyTypo]}>*** *** ***</Text>
    <Text style={[styles.n24600001, styles.historyTypo]}>*** *** ***</Text>
  </>
)}


        <View style={[styles.rectangleView, styles.slidePosition]} />
        <Text style={[styles.history, styles.historyTypo]}>History</Text>
        <View style={styles.fundWallet} />
        <Pressable
 
  onPress={() => alert('HI')}
>
  <Text style={[styles.fundWallet1, styles.fundWallet1Typo]}>
    Fund Wallet
  </Text>
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
                style={[styles.icon, styles.iconLayout1]}
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
            onPress={() => navigation.navigate("PayBill1")}
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
            <Text style={[styles.buyData1, styles.buyTypo]}>Buy Data</Text>
          </View>
          <Image
            style={[styles.serviceButtonsChild, styles.payBillPosition]}
            contentFit="cover"
            source={require("../assets/rectangle-12.png")}
          />
          <View style={[styles.payBill, styles.payBillPosition]}>
            <Pressable
              style={[styles.wrapper, styles.cableLayout]}
              onPress={() => navigation.navigate("PayBill")}
            >
              <Image
                style={[styles.icon, styles.iconLayout1]}
                contentFit="cover"
                source={require("../assets/rectangle-12.png")}
              />
            </Pressable>
            <Text style={[styles.payBill1, styles.buyTypo]}>Pay Bill</Text>
          </View>
          <Text style={[styles.rechargePin, styles.fundWallet1Typo]}>
            Recharge Pin
          </Text>
          <View style={[styles.contactUs, styles.sharePosition]}>
            <Pressable
              style={[styles.contactUsChild, styles.childShadowBox]}
              onPress={openRectangle1}
            />
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
            <Text style={[styles.withdrawal, styles.shareAppTypo]}>
              Contact Us
            </Text>
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
        <Pressable
          style={[styles.slide, styles.slidePosition]}
          onPress={openSLIDEContainer}
        >
          <View style={[styles.slideUp, styles.slideShadowBox]}>
            <View style={[styles.slideUpChild, styles.slideShadowBox]} />
          </View>
          <Image
            style={styles.subtractIcon}
            contentFit="cover"
            source={require("../assets/subtract.png")}
          />
          <Image
            style={[styles.raphaelarrowupIcon, styles.iconPosition]}
            contentFit="cover"
            source={require("../assets/raphaelarrowup.png")}
          />
          <Text style={[styles.history1, styles.history1FlexBox]}>History</Text>
        </Pressable>
        <Pressable style={styles.vector} onPress={openVectorIcon}>
          <Image
            style={[styles.icon6, styles.iconLayout]}
            contentFit="cover"
            source={require("../assets/vector1.png")}
          />
        </Pressable>
        <Image
          style={[styles.claritynotificationSolidIcon, styles.iconPosition]}
          contentFit="cover"
          source={require("../assets/claritynotificationsolid.png")}
        />
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
          <Frame1 onClose={closeRectangle2} />
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

      <View height={100}></View>
      </ScrollView>
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
    height: 126,
    width: 112,
    left: 0,
    
    position: "absolute",
  },
  iconLayout1: {
    height: "100%",
    width: "100%",
  },
  payBillPosition: {
    left: 240,
    height: 126,
    width: 112,
    position: "absolute",
    marginRight: 20
  },
  shareAppTypo: {
    top: 101,
    fontSize: FontSize.size_xs,
    color: Color.colorWhite,
    textAlign: "left",
    fontFamily: FontFamily.robotoBold,
    fontWeight: "700",
    position: "absolute",
  },
  framePosition: {
    left: 120,
    height: 126,
    width: 112,
    position: "absolute",
  },
  buyTypo: {
    top: 95,
    fontSize: FontSize.size_xs,
    textAlign: "left",
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
    height: 126,
    width: 112,
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
    top: 186,
    left: 30, // Adjusted left position
    borderRadius: 29,
    width: 300, // Reduced width by 20 units
    height: 237,
    position: "absolute",
  },
  
  phoneBill1Icon: {
    top: 140,
    width: 150,
    height: 200,
    left: 190,
    position: "absolute",
  },
  homeInner: {
    top: 326,
    left: 207,
    width: 108,
    height: 14,
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
    left: 35,
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
    top: 98,
    left: 19,
    color: Color.colorWhite,
  },
  cable: {
    top: 158,
  },
  withdrawal: {
    left: 27,
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
    left: 31,
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
    top: 256,
    left: 150,
    color: Color.colorWhite,
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
    width: 79,
    height: 92,
    left: 0,
    position: "absolute",
  },
  materialSymbolscontactPageIcon: {
    top: 28,
    width: 64,
    height: 64,
    left: 27,
  },
  contactUs: {
    width: 113,
    left: 128,
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
    top: 36,
    width: 76,
    height: 90,
    left: 0,
    position: "absolute",
  },
  vectorIcon: {
    height: "43.25%",
    width: "40.18%",
    top: "24.05%",
    right: "30.36%",
    bottom: "32.7%",
    left: "29.46%",
    position: "absolute",
  },
  shareApp: {
    left: 29,
  },
  share: {
    left: 1,
    width: 112,
    top: 316,
  },
  serviceButtons: {
    top: 518,
    width: 370,
    height: 442,
   
    position: "absolute",
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
    top: 26,
    left: 300,
    width: 36,
    height: 36,
  },
  home: {
    backgroundColor: Color.colorWhite,
    flex: 1,
    height: 932,
    width: "100%",
  },
});

export default Home;
