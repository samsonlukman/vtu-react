import * as React from "react";
import { Image } from "expo-image";
import { StyleSheet, Pressable, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FontFamily, Color, Border, FontSize } from "../GlobalStyles";

const Setting = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.setting}>
      <Pressable
        style={styles.mingcutebackFill}
        onPress={() => navigation.goBack()}
      >
        <Image
          style={[styles.icon, styles.iconLayout]}
          contentFit="cover"
          source={require("../assets/mingcutebackfill.png")}
        />
      </Pressable>
      <Text style={[styles.setting1, styles.saveTypo]}>Setting</Text>
      <View style={[styles.settingChild, styles.settingChildLayout]} />
      <View style={[styles.settingItem, styles.settingChildLayout]} />
      <View style={[styles.settingInner, styles.settingChildLayout]} />
      <View style={[styles.rectangleView, styles.settingChildLayout]} />
      <Text style={[styles.username, styles.emailTypo]}>Username</Text>
      <Text style={[styles.editProfile, styles.editProfileTypo]}>
        Edit Profile
      </Text>
      <Text style={[styles.changePassword, styles.editProfileTypo]}>
        Change Password
      </Text>
      <View style={[styles.settingChild1, styles.settingChildLayout]} />
      <View style={[styles.settingChild2, styles.settingChildLayout]} />
      <View style={[styles.slide, styles.slidePosition]}>
        <View style={[styles.slideChild, styles.iconLayout]} />
        <Image
          style={[styles.slideItem, styles.slideItemLayout]}
          contentFit="cover"
          source={require("../assets/ellipse-13.png")}
        />
        <Text style={[styles.save, styles.saveTypo]}>Save</Text>
        <Image
          style={[styles.teenyiconsarrowSolid, styles.slideItemLayout]}
          contentFit="cover"
          source={require("../assets/teenyiconsarrowsolid1.png")}
        />
      </View>
      <View style={[styles.slide1, styles.slidePosition]}>
        <View style={[styles.slideChild, styles.iconLayout]} />
        <Image
          style={[styles.slideItem, styles.slideItemLayout]}
          contentFit="cover"
          source={require("../assets/ellipse-15.png")}
        />
        <Text style={[styles.save, styles.saveTypo]}>Save</Text>
        <Image
          style={[styles.teenyiconsarrowSolid, styles.slideItemLayout]}
          contentFit="cover"
          source={require("../assets/teenyiconsarrowsolid1.png")}
        />
      </View>
      <View style={[styles.selector, styles.settingChildPosition]}>
        <View style={[styles.meterTypeParent, styles.settingChildLayout]}>
          <Text style={[styles.meterType, styles.emailTypo]}>Full Name</Text>
          <Image
            style={styles.frameChild}
            contentFit="cover"
            source={require("../assets/vector-2.png")}
          />
        </View>
        <View style={styles.frameParent}>
          <View style={[styles.prepaidWrapper, styles.wrapperLayout]}>
            <Text style={[styles.meterType, styles.emailTypo]}>Prepaid</Text>
          </View>
          <View style={[styles.postpaidWrapper, styles.wrapperLayout]}>
            <Text style={[styles.meterType, styles.emailTypo]}>Postpaid</Text>
          </View>
        </View>
      </View>
      <Text style={[styles.phoneNo, styles.emailTypo]}>Phone No</Text>
      <Text style={[styles.email, styles.emailTypo]}>email</Text>
      <Text style={[styles.oldPassword, styles.passwordTypo]}>
        Old Password
      </Text>
      <Text style={[styles.newPassword, styles.passwordTypo]}>
        New Password
      </Text>
      <Text style={[styles.retypeNewPassword, styles.passwordTypo]}>
        Retype New Password
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  iconLayout: {
    height: "100%",
    width: "100%",
  },
  saveTypo: {
    textAlign: "left",
    fontFamily: FontFamily.robotoBold,
    fontWeight: "700",
    position: "absolute",
  },
  settingChildLayout: {
    height: 37,
    width: 279,
    backgroundColor: Color.colorGainsboro_100,
    borderRadius: Border.br_6xs,
  },
  emailTypo: {
    color: Color.colorDarkgray,
    fontFamily: FontFamily.robotoRegular,
    fontSize: FontSize.size_xs,
    textAlign: "left",
    position: "absolute",
  },
  editProfileTypo: {
    color: Color.colorBlack,
    fontSize: FontSize.size_xs,
    textAlign: "left",
    fontFamily: FontFamily.robotoBold,
    fontWeight: "700",
    position: "absolute",
  },
  slidePosition: {
    height: 28,
    width: 82,
    marginLeft: 58,
    left: "50%",
    position: "absolute",
  },
  slideItemLayout: {
    maxHeight: "100%",
    maxWidth: "100%",
    position: "absolute",
    overflow: "hidden",
  },
  settingChildPosition: {
    left: "50%",
    marginLeft: -139,
    position: "absolute",
  },
  wrapperLayout: {
    borderTopLeftRadius: Border.br_6xs,
    height: 37,
    width: 279,
    overflow: "hidden",
    backgroundColor: Color.colorWhite,
  },
  passwordTypo: {
    left: 97,
    color: Color.colorDarkgray,
    fontFamily: FontFamily.robotoRegular,
    fontSize: FontSize.size_xs,
    textAlign: "left",
    position: "absolute",
  },
  icon: {
    overflow: "hidden",
  },
  mingcutebackFill: {
    left: 372,
    top: 43,
    width: 24,
    height: 24,
    position: "absolute",
  },
  setting1: {
    top: 97,
    left: 39,
    fontSize: FontSize.size_21xl,
    color: Color.colorDarkcyan_100,
    width: 186,
    height: 42,
  },
  settingChild: {
    top: 457,
    left: "50%",
    marginLeft: -139,
    position: "absolute",
  },
  settingItem: {
    top: 506,
    left: "50%",
    marginLeft: -139,
    position: "absolute",
  },
  settingInner: {
    top: 555,
    left: "50%",
    marginLeft: -139,
    position: "absolute",
  },
  rectangleView: {
    top: 188,
    left: "50%",
    marginLeft: -139,
    position: "absolute",
  },
  username: {
    top: 202,
    left: 90,
    fontFamily: FontFamily.robotoRegular,
    fontSize: FontSize.size_xs,
  },
  editProfile: {
    top: 167,
    left: 76,
  },
  changePassword: {
    top: 435,
    left: 77,
  },
  settingChild1: {
    top: 335,
    left: "50%",
    marginLeft: -139,
    position: "absolute",
  },
  settingChild2: {
    top: 286,
    left: "50%",
    marginLeft: -139,
    position: "absolute",
  },
  slideChild: {
    top: "0%",
    right: "0%",
    bottom: "0%",
    left: "0%",
    borderRadius: Border.br_18xl,
    backgroundColor: Color.colorDarkcyan_100,
    position: "absolute",
  },
  slideItem: {
    height: "85.36%",
    width: "27.07%",
    top: "7.14%",
    right: "68.66%",
    bottom: "7.5%",
    left: "4.27%",
    display: "none",
  },
  save: {
    height: "39.29%",
    width: "37.8%",
    top: "25%",
    left: "24.39%",
    fontSize: FontSize.size_sm,
    color: Color.colorWhite,
  },
  teenyiconsarrowSolid: {
    height: "46.07%",
    width: "15.61%",
    top: "32.14%",
    right: "17.32%",
    bottom: "21.79%",
    left: "67.07%",
  },
  slide: {
    top: 615,
  },
  slide1: {
    top: 390,
  },
  meterType: {
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
  meterTypeParent: {
    overflow: "hidden",
  },
  prepaidWrapper: {
    borderTopRightRadius: Border.br_6xs,
  },
  postpaidWrapper: {
    borderBottomRightRadius: Border.br_6xs,
    borderBottomLeftRadius: Border.br_6xs,
  },
  frameParent: {
    marginTop: 11,
    display: "none",
  },
  selector: {
    top: 237,
  },
  phoneNo: {
    top: 298,
    left: 91,
  },
  email: {
    top: 344,
    left: 90,
    fontFamily: FontFamily.robotoRegular,
    fontSize: FontSize.size_xs,
  },
  oldPassword: {
    top: 468,
  },
  newPassword: {
    top: 517,
  },
  retypeNewPassword: {
    top: 566,
  },
  setting: {
    flex: 1,
    height: 932,
    overflow: "hidden",
    width: "100%",
    backgroundColor: Color.colorWhite,
  },
});

export default Setting;
