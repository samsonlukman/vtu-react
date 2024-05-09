import * as React from "react";
import { StyleSheet, View, Text } from "react-native";
import { Image } from "expo-image";
import { Border, Color, FontSize, FontFamily } from "../GlobalStyles";

const Confirm1 = () => {
  return (
    <View style={styles.confirm}>
      <View style={styles.confirmChild} />
      <View style={[styles.slideWrapper, styles.slideLayout]}>
        <View style={[styles.slide, styles.slidePosition]}>
          <View style={[styles.slideChild, styles.slidePosition]} />
          <Image
            style={styles.slideItem}
            contentFit="cover"
            source={require("../assets/ellipse-12.png")}
          />
        </View>
      </View>
      <Text style={styles.confirmed}>Confirmed</Text>
      <Image
        style={styles.confirmItem}
        contentFit="cover"
        source={require("../assets/ellipse-21.png")}
      />
      <Image
        style={styles.dashiconssaved}
        contentFit="cover"
        source={require("../assets/dashiconssaved.png")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  slideLayout: {
    height: 39,
    top: "50%",
  },
  slidePosition: {
    marginLeft: -57.5,
    width: 115,
    left: "50%",
    position: "absolute",
  },
  confirmChild: {
    top: 0,
    left: 0,
    backgroundColor: "rgba(217, 217, 217, 0.5)",
    width: 430,
    height: 945,
    opacity: 0.5,
    position: "absolute",
  },
  slideChild: {
    height: "202.56%",
    top: "0%",
    bottom: "-102.56%",
    borderRadius: Border.br_6xs,
    backgroundColor: Color.colorOrange,
  },
  slideItem: {
    height: "85.38%",
    width: "27.13%",
    top: "7.44%",
    right: "68.61%",
    bottom: "7.18%",
    left: "4.26%",
    maxWidth: "100%",
    maxHeight: "100%",
    display: "none",
    position: "absolute",
    overflow: "hidden",
  },
  slide: {
    marginTop: -19.5,
    borderRadius: Border.br_12xs,
    height: 39,
    top: "50%",
    marginLeft: -57.5,
  },
  slideWrapper: {
    marginTop: -65,
    marginLeft: -58,
    width: 115,
    height: 39,
    left: "50%",
    top: "50%",
    position: "absolute",
  },
  confirmed: {
    marginLeft: -33,
    bottom: 476,
    fontSize: FontSize.size_sm,
    fontWeight: "700",
    fontFamily: FontFamily.robotoBold,
    color: Color.colorWhite,
    textAlign: "left",
    left: "50%",
    position: "absolute",
  },
  confirmItem: {
    top: 379,
    left: 186,
    width: 50,
    height: 50,
    position: "absolute",
  },
  dashiconssaved: {
    top: 383,
    left: 189,
    width: 43,
    height: 43,
    position: "absolute",
    overflow: "hidden",
  },
  confirm: {
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    flex: 1,
    width: "100%",
    height: 932,
    overflow: "hidden",
  },
});

export default Confirm1;
