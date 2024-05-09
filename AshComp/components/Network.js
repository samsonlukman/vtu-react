import * as React from "react";
import { Text, StyleSheet, View } from "react-native";
import { Image } from "expo-image";
import { Border, FontSize, FontFamily, Color } from "../GlobalStyles";

const Network = () => {
  return (
    <View style={styles.network}>
      <View style={[styles.property1default, styles.property1variantLayout]}>
        <View style={[styles.selectNetworkParent, styles.gloLayout]}>
          <Text style={styles.selectNetwork}>Select Network</Text>
          <Image
            style={[styles.frameChild, styles.framePosition]}
            contentFit="cover"
            source={require("../assets/vector-2.png")}
          />
        </View>
        <View style={styles.frameParent}>
          <View style={[styles.dstvWrapper, styles.dstvWrapperLayout]}>
            <Text style={styles.selectNetwork}>DSTV</Text>
          </View>
          <View style={[styles.dstvWrapper, styles.dstvWrapperLayout]}>
            <Text style={styles.selectNetwork}>GoTV</Text>
          </View>
          <View style={[styles.dstvWrapper, styles.dstvWrapperLayout]}>
            <Text style={styles.selectNetwork}>StarTimes</Text>
          </View>
        </View>
      </View>
      <View style={[styles.property1variant2, styles.property1variantLayout]}>
        <View style={[styles.selectNetworkGroup, styles.gloLayout]}>
          <Text style={styles.selectNetwork}>Select Network</Text>
          <Image
            style={[styles.frameItem, styles.framePosition]}
            contentFit="cover"
            source={require("../assets/vector-22.png")}
          />
        </View>
        <View style={styles.frameGroup}>
          <View style={[styles.dstvWrapper, styles.dstvWrapperLayout]}>
            <Text style={styles.selectNetwork}>MTN</Text>
          </View>
          <View style={[styles.gloWrapper, styles.gloLayout]}>
            <Text style={styles.selectNetwork}>Glo</Text>
          </View>
          <View style={[styles.gloWrapper, styles.gloLayout]}>
            <Text style={styles.selectNetwork}>Airtel</Text>
          </View>
          <View style={[styles.mobileWrapper, styles.mobileWrapperLayout]}>
            <Text style={styles.selectNetwork}>9mobile</Text>
          </View>
        </View>
      </View>
      <View style={[styles.property1variant3, styles.property1variantLayout]}>
        <View style={[styles.selectNetworkGroup, styles.gloLayout]}>
          <Text style={styles.selectNetwork}>Select Network</Text>
          <Image
            style={[styles.frameItem, styles.framePosition]}
            contentFit="cover"
            source={require("../assets/vector-22.png")}
          />
        </View>
        <View style={styles.frameGroup}>
          <View style={[styles.mtnContainer, styles.dstvWrapperLayout]}>
            <Text style={styles.selectNetwork}>{`MTN `}</Text>
          </View>
          <View style={[styles.gloWrapper, styles.gloLayout]}>
            <Text style={styles.selectNetwork}>Glo</Text>
          </View>
          <View style={[styles.gloWrapper, styles.gloLayout]}>
            <Text style={styles.selectNetwork}>Airtel</Text>
          </View>
          <View style={[styles.mobileWrapper, styles.mobileWrapperLayout]}>
            <Text style={styles.selectNetwork}>9mobile</Text>
          </View>
        </View>
      </View>
      <View style={[styles.property1variant4, styles.property1variantLayout]}>
        <View style={[styles.selectNetworkGroup, styles.gloLayout]}>
          <Text style={styles.selectNetwork}>Select Network</Text>
          <Image
            style={[styles.frameItem, styles.framePosition]}
            contentFit="cover"
            source={require("../assets/vector-22.png")}
          />
        </View>
        <View style={styles.frameGroup}>
          <View style={[styles.dstvWrapper, styles.dstvWrapperLayout]}>
            <Text style={styles.selectNetwork}>MTN</Text>
          </View>
          <View style={[styles.gloFrame, styles.gloLayout]}>
            <Text style={styles.selectNetwork}>Glo</Text>
          </View>
          <View style={[styles.gloWrapper, styles.gloLayout]}>
            <Text style={styles.selectNetwork}>Airtel</Text>
          </View>
          <View style={[styles.mobileWrapper, styles.mobileWrapperLayout]}>
            <Text style={styles.selectNetwork}>9mobile</Text>
          </View>
        </View>
      </View>
      <View style={[styles.property1variant5, styles.property1variantPosition]}>
        <View style={[styles.selectNetworkGroup, styles.gloLayout]}>
          <Text style={styles.selectNetwork}>{`Select Network `}</Text>
          <Image
            style={[styles.frameItem, styles.framePosition]}
            contentFit="cover"
            source={require("../assets/vector-22.png")}
          />
        </View>
        <View style={styles.frameGroup}>
          <View style={[styles.dstvWrapper, styles.dstvWrapperLayout]}>
            <Text style={styles.selectNetwork}>MTN</Text>
          </View>
          <View style={[styles.gloWrapper, styles.gloLayout]}>
            <Text style={styles.selectNetwork}>Glo</Text>
          </View>
          <View style={[styles.gloFrame, styles.gloLayout]}>
            <Text style={styles.selectNetwork}>Airtel</Text>
          </View>
          <View style={[styles.mobileWrapper, styles.mobileWrapperLayout]}>
            <Text style={styles.selectNetwork}>9mobile</Text>
          </View>
        </View>
      </View>
      <View style={[styles.property1variant6, styles.property1variantPosition]}>
        <View style={[styles.selectNetworkGroup, styles.gloLayout]}>
          <Text style={styles.selectNetwork}>{`Select Network `}</Text>
          <Image
            style={[styles.frameItem, styles.framePosition]}
            contentFit="cover"
            source={require("../assets/vector-22.png")}
          />
        </View>
        <View style={styles.frameGroup}>
          <View style={[styles.dstvWrapper, styles.dstvWrapperLayout]}>
            <Text style={styles.selectNetwork}>MTN</Text>
          </View>
          <View style={[styles.gloWrapper, styles.gloLayout]}>
            <Text style={styles.selectNetwork}>Glo</Text>
          </View>
          <View style={[styles.gloWrapper, styles.gloLayout]}>
            <Text style={styles.selectNetwork}>Airtel</Text>
          </View>
          <View style={[styles.mobileWrapper2, styles.mobileWrapperLayout]}>
            <Text style={styles.selectNetwork}>9mobile</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  property1variantLayout: {
    height: 192,
    position: "absolute",
  },
  gloLayout: {
    height: 37,
    width: 279,
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
    borderTopRightRadius: Border.br_6xs,
    borderTopLeftRadius: Border.br_6xs,
    height: 37,
    width: 279,
    overflow: "hidden",
  },
  mobileWrapperLayout: {
    borderBottomLeftRadius: Border.br_6xs,
    borderBottomRightRadius: Border.br_6xs,
    height: 37,
    width: 279,
    overflow: "hidden",
  },
  property1variantPosition: {
    left: 15,
    height: 192,
    position: "absolute",
  },
  selectNetwork: {
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
  selectNetworkParent: {
    backgroundColor: Color.colorGainsboro_100,
    borderRadius: Border.br_6xs,
    width: 279,
  },
  dstvWrapper: {
    backgroundColor: Color.colorWhite,
  },
  frameParent: {
    display: "none",
    marginTop: 11,
  },
  property1default: {
    top: 20,
    left: 20,
    height: 192,
  },
  frameItem: {
    marginTop: 4,
  },
  selectNetworkGroup: {
    backgroundColor: Color.colorWhite,
    borderRadius: Border.br_6xs,
    width: 279,
  },
  gloWrapper: {
    backgroundColor: Color.colorWhite,
  },
  mobileWrapper: {
    backgroundColor: Color.colorWhite,
  },
  frameGroup: {
    marginTop: 11,
  },
  property1variant2: {
    top: 99,
    left: 20,
    height: 192,
  },
  mtnContainer: {
    backgroundColor: Color.colorGainsboro_100,
  },
  property1variant3: {
    top: 310,
    left: 20,
    height: 192,
  },
  gloFrame: {
    backgroundColor: Color.colorGainsboro_100,
  },
  property1variant4: {
    top: 347,
    left: 299,
  },
  property1variant5: {
    top: 781,
  },
  mobileWrapper2: {
    backgroundColor: Color.colorGainsboro_100,
  },
  property1variant6: {
    top: 993,
  },
  network: {
    borderRadius: Border.br_8xs,
    borderStyle: "dashed",
    borderColor: Color.colorBlueviolet,
    borderWidth: 1,
    width: 319,
    height: 1239,
    overflow: "hidden",
  },
});

export default Network;
