import * as React from "react";
import { Text, StyleSheet, View } from "react-native";
import { Image } from "expo-image";
import { Color, Border, FontSize, FontFamily } from "../GlobalStyles";

const Selector = () => {
  return (
    <View style={styles.selector}>
      <View style={[styles.property1default, styles.property1variantPosition]}>
        <View style={[styles.meterTypeParent, styles.prepaidFrameLayout]}>
          <Text style={styles.meterType}>Meter Type</Text>
          <Image
            style={[styles.frameChild, styles.framePosition]}
            contentFit="cover"
            source={require("../assets/vector-2.png")}
          />
        </View>
        <View style={styles.frameParent}>
          <View style={[styles.prepaidWrapper, styles.wrapperLayout]}>
            <Text style={styles.meterType}>Prepaid</Text>
          </View>
          <View
            style={[styles.postpaidWrapper, styles.postpaidWrapperPosition]}
          >
            <Text style={styles.meterType}>Postpaid</Text>
          </View>
        </View>
      </View>
      <View style={[styles.property1variant2, styles.property1variantPosition]}>
        <View style={[styles.meterTypeParent, styles.prepaidFrameLayout]}>
          <Text style={styles.meterType}>Meter Type</Text>
          <Image
            style={[styles.frameItem, styles.framePosition]}
            contentFit="cover"
            source={require("../assets/vector-21.png")}
          />
        </View>
        <View style={styles.frameGroup}>
          <View style={[styles.prepaidContainer, styles.containerLayout]}>
            <Text style={styles.meterType}>Prepaid</Text>
          </View>
          <View style={[styles.postpaidContainer, styles.containerLayout]}>
            <Text style={styles.meterType}>Postpaid</Text>
          </View>
        </View>
      </View>
      <View style={[styles.property1variant3, styles.property1variantPosition]}>
        <View style={[styles.meterTypeContainer, styles.wrapperLayout]}>
          <Text style={styles.meterType}>Meter Type</Text>
          <Image
            style={[styles.frameItem, styles.framePosition]}
            contentFit="cover"
            source={require("../assets/vector-21.png")}
          />
        </View>
        <View style={styles.frameGroup}>
          <View style={[styles.prepaidFrame, styles.prepaidFrameLayout]}>
            <Text style={styles.meterType}>Prepaid</Text>
          </View>
          <View
            style={[styles.postpaidWrapper, styles.postpaidWrapperPosition]}
          >
            <Text style={styles.meterType}>Postpaid</Text>
          </View>
        </View>
      </View>
      <View style={[styles.property1variant4, styles.property1variantPosition]}>
        <View style={[styles.meterTypeContainer, styles.wrapperLayout]}>
          <Text style={styles.meterType}>Meter Type</Text>
          <Image
            style={[styles.vectorIcon, styles.framePosition]}
            contentFit="cover"
            source={require("../assets/vector-21.png")}
          />
        </View>
        <View style={styles.frameGroup}>
          <View style={[styles.prepaidWrapper, styles.wrapperLayout]}>
            <Text style={styles.meterType}>Prepaid</Text>
          </View>
          <View
            style={[styles.postpaidWrapper1, styles.postpaidWrapperPosition]}
          >
            <Text style={styles.meterType}>Postpaid</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  property1variantPosition: {
    left: 20,
    position: "absolute",
  },
  prepaidFrameLayout: {
    height: 37,
    width: 279,
    backgroundColor: Color.colorGainsboro_100,
    overflow: "hidden",
  },
  framePosition: {
    height: 8,
    width: 16,
    left: 246,
    top: "50%",
    position: "absolute",
  },
  wrapperLayout: {
    backgroundColor: Color.colorWhite,
    height: 37,
    width: 279,
    overflow: "hidden",
  },
  postpaidWrapperPosition: {
    borderBottomLeftRadius: Border.br_6xs,
    borderBottomRightRadius: Border.br_6xs,
  },
  containerLayout: {
    backgroundColor: Color.colorGray_300,
    borderTopLeftRadius: Border.br_6xs,
    height: 37,
    width: 279,
    overflow: "hidden",
  },
  meterType: {
    top: 11,
    left: 14,
    fontSize: FontSize.size_xs,
    fontFamily: FontFamily.robotoRegular,
    color: Color.colorDarkgray,
    textAlign: "left",
    position: "absolute",
  },
  frameChild: {
    marginTop: -3.5,
  },
  meterTypeParent: {
    borderRadius: Border.br_6xs,
  },
  prepaidWrapper: {
    borderTopRightRadius: Border.br_6xs,
    borderTopLeftRadius: Border.br_6xs,
  },
  postpaidWrapper: {
    backgroundColor: Color.colorWhite,
    height: 37,
    width: 279,
    overflow: "hidden",
    borderTopLeftRadius: Border.br_6xs,
  },
  frameParent: {
    display: "none",
    marginTop: 11,
  },
  property1default: {
    top: 20,
  },
  frameItem: {
    marginTop: 3.5,
  },
  prepaidContainer: {
    borderTopRightRadius: Border.br_6xs,
  },
  postpaidContainer: {
    borderBottomLeftRadius: Border.br_6xs,
    borderBottomRightRadius: Border.br_6xs,
  },
  frameGroup: {
    marginTop: 11,
  },
  property1variant2: {
    top: 162,
  },
  meterTypeContainer: {
    borderRadius: Border.br_6xs,
  },
  prepaidFrame: {
    borderTopRightRadius: Border.br_6xs,
    borderTopLeftRadius: Border.br_6xs,
  },
  property1variant3: {
    top: 304,
  },
  vectorIcon: {
    marginTop: 4.5,
  },
  postpaidWrapper1: {
    borderTopLeftRadius: Border.br_6xs,
    height: 37,
    width: 279,
    backgroundColor: Color.colorGainsboro_100,
    overflow: "hidden",
  },
  property1variant4: {
    top: 446,
  },
  selector: {
    borderRadius: Border.br_8xs,
    borderStyle: "dashed",
    borderColor: Color.colorBlueviolet,
    borderWidth: 1,
    width: 319,
    height: 588,
    overflow: "hidden",
  },
});

export default Selector;
