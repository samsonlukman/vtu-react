import * as React from "react";
import { Image } from "expo-image";
import { StyleSheet, Pressable, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Color, FontFamily, FontSize } from "../GlobalStyles";

const About = () => {
  const navigation = useNavigation();

  return (
    <View style={[styles.about, styles.iconLayout]}>
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
      <Text style={[styles.payville, styles.payvilleTypo]}>PAYVILLE</Text>
      <Text
        style={[styles.doesTheSea, styles.doesTypo]}
      >  {`Welcome to our VTU app where users can purchase airtime, data, pay for electricity, and TV subscriptions.

      We offer cheap data rates to help you stay connected without breaking the bank.
      
      Experience seamless transactions and unbeatable prices with our app today!`}</Text>
      
    </View>
  );
};

const styles = StyleSheet.create({
  iconLayout: {
    overflow: "hidden",
    width: "100%",
  },
  payvilleTypo: {
    textAlign: "left",
    color: Color.colorDarkcyan_100,
    fontFamily: FontFamily.robotoBold,
    fontWeight: "700",
    position: "absolute",
  },
  doesTypo: {
    width: 345,
    color: Color.colorBlack,
    fontFamily: FontFamily.robotoRegular,
    fontSize: FontSize.size_xs,
    textAlign: "left",
    position: "absolute",
  },
  icon: {
    height: "100%",
  },
  mingcutebackFill: {
    left: 30,
    top: 43,
    width: 24,
    height: 24,
    position: "absolute",
  },
  payville: {
    top: 97,
    left: 39,
    fontSize: FontSize.size_21xl,
    width: 186,
    height: 72,
  },
  doesTheSea: {
    top: 205,
    left: 5,
    height: 224,
  },
  operation: {
    top: 499,
    left: 45,
    fontSize: FontSize.size_xl,
  },
  doesTheSea1: {
    top: 541,
    left: 46,
    height: 286,
  },
  about: {
    backgroundColor: Color.colorWhite,
    flex: 1,
    height: 932,
  },
});

export default About;
