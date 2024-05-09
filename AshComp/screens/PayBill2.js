import * as React from "react";
import { StyleSheet, View, Text, Pressable } from "react-native";
import { Image } from "expo-image";
import { useNavigation } from "@react-navigation/native";
import { Color, FontFamily, FontSize, Border } from "../GlobalStyles";

const PayBill2 = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.payBill}>
      <View style={[styles.payBillChild, styles.slidePosition]} />
      
      <View style={[styles.payBillItem, styles.payLayout]} />
      <View style={[styles.payBillInner, styles.payLayout]} />
      <View style={[styles.rectangleView, styles.payLayout]} />
      <Text style={[styles.cardName, styles.selectTypo]}>Card Name</Text>
      <Text style={[styles.quantity, styles.selectTypo]}>Quantity</Text>
      <Text style={[styles.selectAmount, styles.selectTypo]}>
        Select Amount
      </Text>
      <View style={[styles.slide, styles.slidePosition]}>
        <View style={styles.slideChild} />
        <Image
          style={[styles.slideItem, styles.slideItemLayout]}
          contentFit="cover"
          source={require("../assets/ellipse-12.png")}
        />
        <Text style={[styles.buy, styles.buyTypo]}>Buy</Text>
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
      <View style={[styles.network, styles.payPosition]}>
        <View style={[styles.selectNetworkParent, styles.payLayout]}>
          <Text style={[styles.selectNetwork, styles.selectTypo]}>
            Select Network
          </Text>
          <Image
            style={styles.frameChild}
            contentFit="cover"
            source={require("../assets/vector-2.png")}
          />
        </View>
        <View style={styles.frameParent}>
          <View style={[styles.dstvWrapper, styles.payLayout]}>
            <Text style={[styles.selectNetwork, styles.selectTypo]}>DSTV</Text>
          </View>
          <View style={[styles.dstvWrapper, styles.payLayout]}>
            <Text style={[styles.selectNetwork, styles.selectTypo]}>GoTV</Text>
          </View>
          <View style={[styles.dstvWrapper, styles.payLayout]}>
            <Text style={[styles.selectNetwork, styles.selectTypo]}>
              StarTimes
            </Text>
          </View>
        </View>
      </View>
      <Image
        style={styles.rectangleIcon}
        contentFit="cover"
        source={require("../assets/rectangle-16.png")}
      />
      <Text style={[styles.withdrawal, styles.buyTypo]}>Withdrawal</Text>
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
  slidePosition: {
    left: "50%",
    position: "absolute",
  },
  payLayout: {
    height: 37,
    width: 279,
  },
  selectTypo: {
    color: Color.colorDarkgray,
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
    left: 158,
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
  },
  quantity: {
    top: 471,
    left: 91,
    color: Color.colorDarkgray,
    fontFamily: FontFamily.robotoRegular,
  },
  selectAmount: {
    top: 413,
    left: 91,
    color: Color.colorDarkgray,
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
  slide: {
    marginLeft: -57,
    top: 592,
    width: 115,
    height: 39,
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
    left: 234,
  },
  rectangleParent: {
    top: 260,
    left: 65,
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
    left: 154,
    borderRadius: Border.br_lgi,
    width: 112,
    height: 126,
    position: "absolute",
  },
  withdrawal: {
    top: 186,
    left: 181,
    fontSize: FontSize.size_xs,
    color: Color.colorWhite,
  },
  icon: {
    height: "100%",
    overflow: "hidden",
    width: "100%",
  },
  mingcutebackFill: {
    left: 372,
    top: 43,
    width: 24,
    height: 24,
    position: "absolute",
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
