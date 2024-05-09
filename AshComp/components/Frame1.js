import * as React from "react";
import { View, StyleSheet, Text } from "react-native";
import { Image } from "expo-image";
import { Color, FontFamily, FontSize, Border } from "../GlobalStyles";

const Frame1 = ({ onClose }) => {
  return (
    <View style={styles.slideParent}>
      <View style={[styles.slide, styles.slidePosition1]}>
        <View style={[styles.slideChild, styles.slidePosition]} />
        <Image
          style={styles.slideItem}
          contentFit="cover"
          source={require("../assets/ellipse-16.png")}
        />
        <Text style={[styles.email, styles.emailTypo]}>eMail</Text>
        <Image
          style={[styles.teenyiconsarrowSolid, styles.teenyiconsarrowLayout]}
          contentFit="cover"
          source={require("../assets/teenyiconsarrowsolid.png")}
        />
      </View>
      <View style={[styles.slide1, styles.slidePosition1]}>
        <View style={[styles.slideInner, styles.slidePosition]} />
        <Image
          style={styles.slideItem}
          contentFit="cover"
          source={require("../assets/ellipse-16.png")}
        />
        <Text style={[styles.whatsapp, styles.emailTypo]}>WhatsApp</Text>
        <Image
          style={[styles.teenyiconsarrowSolid1, styles.teenyiconsarrowLayout]}
          contentFit="cover"
          source={require("../assets/teenyiconsarrowsolid2.png")}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  slidePosition1: {
    height: 39,
    width: 115,
    left: "50%",
    marginLeft: -57.5,
    position: "absolute",
  },
  slidePosition: {
    left: "0%",
    bottom: "0%",
    right: "0%",
    top: "0%",
    width: "100%",
    height: "100%",
    position: "absolute",
  },
  emailTypo: {
    textAlign: "left",
    color: Color.colorWhite,
    fontFamily: FontFamily.robotoBold,
    fontWeight: "700",
    fontSize: FontSize.size_sm,
    position: "absolute",
  },
  teenyiconsarrowLayout: {
    width: "18.43%",
    height: "54.36%",
    position: "absolute",
    maxHeight: "100%",
    maxWidth: "100%",
    overflow: "hidden",
  },
  slideChild: {
    borderTopLeftRadius: Border.br_6xs,
    borderTopRightRadius: Border.br_6xs,
    backgroundColor: Color.colorOrange,
  },
  slideItem: {
    height: "85.38%",
    width: "27.13%",
    top: "7.44%",
    right: "68.61%",
    bottom: "7.18%",
    left: "4.26%",
    display: "none",
    position: "absolute",
    maxHeight: "100%",
    maxWidth: "100%",
    overflow: "hidden",
  },
  email: {
    top: "30.77%",
    left: "24.35%",
  },
  teenyiconsarrowSolid: {
    top: "25.38%",
    right: "19.91%",
    bottom: "20.26%",
    left: "61.65%",
  },
  slide: {
    top: 115,
    borderRadius: Border.br_12xs,
  },
  slideInner: {
    borderBottomRightRadius: Border.br_6xs,
    borderBottomLeftRadius: Border.br_6xs,
    backgroundColor: Color.colorDarkcyan_100,
  },
  whatsapp: {
    top: "28.21%",
    left: "13.91%",
  },
  teenyiconsarrowSolid1: {
    top: "23.08%",
    right: "11.13%",
    bottom: "22.56%",
    left: "70.43%",
  },
  slide1: {
    top: 154,
    borderRadius: Border.br_6xs,
  },
  slideParent: {
    width: 297,
    height: 312,
    maxHeight: "100%",
    maxWidth: "100%",
    overflow: "hidden",
  },
});

export default Frame1;
