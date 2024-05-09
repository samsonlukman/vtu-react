import * as React from "react";
import { Text, StyleSheet, View } from "react-native";
import { Image } from "expo-image";
import { Color, Border, FontSize, FontFamily } from "../GlobalStyles";

const SelectorCable = () => {
  return (
    <View style={styles.selectorCable}>
      <View style={[styles.property1default, styles.property1variantPosition]}>
        <View style={[styles.selectCableParent, styles.dstvFrameLayout]}>
          <Text style={styles.selectCable}>Select Cable</Text>
          <Image
            style={[styles.frameChild, styles.framePosition]}
            contentFit="cover"
            source={require("../assets/vector-2.png")}
          />
        </View>
        <View style={styles.frameParent}>
          <View style={[styles.dstvWrapper, styles.dstvWrapperLayout]}>
            <Text style={styles.selectCable}>DSTV</Text>
          </View>
          <View style={[styles.dstvWrapper, styles.dstvWrapperLayout]}>
            <Text style={styles.selectCable}>GoTV</Text>
          </View>
          <View style={[styles.dstvWrapper, styles.dstvWrapperLayout]}>
            <Text style={styles.selectCable}>StarTimes</Text>
          </View>
        </View>
      </View>
      <View style={[styles.property1variant2, styles.property1variantPosition]}>
        <View style={[styles.selectCableGroup, styles.dstvWrapperLayout]}>
          <Text style={styles.selectCable}>Select Cable</Text>
          <Image
            style={[styles.frameItem, styles.framePosition]}
            contentFit="cover"
            source={require("../assets/vector-22.png")}
          />
        </View>
        <View style={styles.frameGroup}>
          <View style={[styles.dstvWrapper, styles.dstvWrapperLayout]}>
            <Text style={styles.selectCable}>DSTV</Text>
          </View>
          <View style={[styles.dstvWrapper, styles.dstvWrapperLayout]}>
            <Text style={styles.selectCable}>GoTV</Text>
          </View>
          <View style={[styles.dstvWrapper, styles.dstvWrapperLayout]}>
            <Text style={styles.selectCable}>StarTimes</Text>
          </View>
        </View>
      </View>
      <View style={[styles.property1variant3, styles.property1variantPosition]}>
        <View style={[styles.selectCableGroup, styles.dstvWrapperLayout]}>
          <Text style={styles.selectCable}>Select Cable</Text>
          <Image
            style={[styles.frameItem, styles.framePosition]}
            contentFit="cover"
            source={require("../assets/vector-22.png")}
          />
        </View>
        <View style={styles.frameGroup}>
          <View style={[styles.dstvFrame, styles.dstvPosition]}>
            <Text style={styles.selectCable}>DSTV</Text>
          </View>
          <View style={[styles.dstvWrapper, styles.dstvWrapperLayout]}>
            <Text style={styles.selectCable}>GoTV</Text>
          </View>
          <View style={[styles.dstvWrapper, styles.dstvWrapperLayout]}>
            <Text style={styles.selectCable}>StarTimes</Text>
          </View>
        </View>
      </View>
      <View style={[styles.property1variant4, styles.property1variantPosition]}>
        <View style={[styles.selectCableGroup, styles.dstvWrapperLayout]}>
          <Text style={styles.selectCable}>Select Cable</Text>
          <Image
            style={[styles.frameItem, styles.framePosition]}
            contentFit="cover"
            source={require("../assets/vector-22.png")}
          />
        </View>
        <View style={styles.frameGroup}>
          <View style={[styles.dstvWrapper, styles.dstvWrapperLayout]}>
            <Text style={styles.selectCable}>DSTV</Text>
          </View>
          <View style={[styles.dstvFrame, styles.dstvPosition]}>
            <Text style={styles.selectCable}>GoTV</Text>
          </View>
          <View style={[styles.dstvWrapper, styles.dstvWrapperLayout]}>
            <Text style={styles.selectCable}>StarTimes</Text>
          </View>
        </View>
      </View>
      <View style={[styles.property1variant5, styles.property1variantPosition]}>
        <View style={[styles.selectCableGroup, styles.dstvWrapperLayout]}>
          <Text style={styles.selectCable}>Select Cable</Text>
          <Image
            style={[styles.frameItem, styles.framePosition]}
            contentFit="cover"
            source={require("../assets/vector-22.png")}
          />
        </View>
        <View style={styles.frameGroup}>
          <View style={[styles.dstvWrapper, styles.dstvWrapperLayout]}>
            <Text style={styles.selectCable}>DSTV</Text>
          </View>
          <View style={[styles.dstvWrapper, styles.dstvWrapperLayout]}>
            <Text style={styles.selectCable}>GoTV</Text>
          </View>
          <View style={[styles.dstvFrame, styles.dstvPosition]}>
            <Text style={styles.selectCable}>StarTimes</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  property1variantPosition: {
    height: 192,
    left: 20,
    position: "absolute",
  },
  dstvFrameLayout: {
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
  dstvWrapperLayout: {
    backgroundColor: Color.colorWhite,
    height: 37,
    width: 279,
    overflow: "hidden",
  },
  dstvPosition: {
    borderTopRightRadius: Border.br_6xs,
    borderTopLeftRadius: Border.br_6xs,
  },
  selectCable: {
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
  selectCableParent: {
    borderRadius: Border.br_6xs,
  },
  dstvWrapper: {
    borderTopRightRadius: Border.br_6xs,
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
    marginTop: 4,
  },
  selectCableGroup: {
    borderRadius: Border.br_6xs,
  },
  frameGroup: {
    marginTop: 11,
  },
  property1variant2: {
    top: 187,
  },
  dstvFrame: {
    height: 37,
    width: 279,
    backgroundColor: Color.colorGainsboro_100,
    overflow: "hidden",
  },
  property1variant3: {
    top: 362,
  },
  property1variant4: {
    top: 532,
  },
  property1variant5: {
    top: 704,
  },
  selectorCable: {
    borderRadius: Border.br_8xs,
    borderStyle: "dashed",
    borderColor: Color.colorBlueviolet,
    borderWidth: 1,
    width: 319,
    height: 929,
    overflow: "hidden",
  },
});

export default SelectorCable;
