import * as React from "react";
import { View, StyleSheet, Text } from "react-native";
import { Image } from "expo-image";
import { Color, Padding, Border, FontFamily, FontSize } from "../GlobalStyles";

const Frame = ({ onClose }) => {
  return (
    <View style={styles.slideParent}>
      <View style={styles.slide}>
        <View style={styles.slideUp}>
          <View style={styles.slideUpChild} />
        </View>
        <Image
          style={styles.subtractIcon}
          contentFit="cover"
          source={require("../assets/subtract1.png")}
        />
        <Image
          style={styles.raphaelarrowupIcon}
          contentFit="cover"
          source={require("../assets/raphaelarrowup1.png")}
        />
        <Text style={[styles.history, styles.drFlexBox]}>History</Text>
      </View>
      <View style={styles.frameParent}>
        <View style={styles.frameFlexBox}>
          <View style={styles.wrapperFlexBox1}>
            <View style={[styles.drWrapper, styles.wrapperFlexBox]}>
              <Text style={[styles.dr, styles.drTypo]}>Dr</Text>
            </View>
            <View
              style={[
                styles.nibssTrfTopUpWed1402Wrapper,
                styles.wrapperFlexBox1,
              ]}
            >
              <Text style={styles.drFlexBox}>
                <Text style={styles.drTypo}>{`NIBSS Trf Top Up...
`}</Text>
                <Text style={styles.wed14022024}>Wed, 14/02/2024</Text>
              </Text>
            </View>
          </View>
          <View style={[styles.n5000000Wrapper, styles.wrapperFlexBox1]}>
            <Text style={[styles.dr, styles.drTypo]}>N50,000.00</Text>
          </View>
        </View>
        <View style={[styles.frameView, styles.frameFlexBox]}>
          <View style={styles.wrapperFlexBox1}>
            <View style={[styles.crWrapper, styles.wrapperFlexBox]}>
              <Text style={[styles.dr, styles.drTypo]}>Cr</Text>
            </View>
            <View
              style={[
                styles.nibssTrfTopUpWed1402Wrapper,
                styles.wrapperFlexBox1,
              ]}
            >
              <Text style={styles.drFlexBox}>
                <Text style={styles.drTypo}>{`NIBSS Trf Top Up...
`}</Text>
                <Text style={styles.wed14022024}>Wed, 14/02/2024</Text>
              </Text>
            </View>
          </View>
          <View style={[styles.n5000000Wrapper, styles.wrapperFlexBox1]}>
            <Text style={[styles.dr, styles.drTypo]}>N50,000.00</Text>
          </View>
        </View>
        <View style={[styles.frameView, styles.frameFlexBox]}>
          <View style={styles.wrapperFlexBox1}>
            <View style={[styles.crWrapper, styles.wrapperFlexBox]}>
              <Text style={[styles.dr, styles.drTypo]}>Cr</Text>
            </View>
            <View
              style={[
                styles.nibssTrfTopUpWed1402Wrapper,
                styles.wrapperFlexBox1,
              ]}
            >
              <Text style={styles.drFlexBox}>
                <Text style={styles.drTypo}>{`NIBSS Trf Top Up...
`}</Text>
                <Text style={styles.wed14022024}>Wed, 14/02/2024</Text>
              </Text>
            </View>
          </View>
          <View style={[styles.n5000000Wrapper, styles.wrapperFlexBox1]}>
            <Text style={[styles.dr, styles.drTypo]}>N50,000.00</Text>
          </View>
        </View>
        <View style={[styles.frameView, styles.frameFlexBox]}>
          <View style={styles.wrapperFlexBox1}>
            <View style={[styles.crWrapper, styles.wrapperFlexBox]}>
              <Text style={[styles.dr, styles.drTypo]}>Cr</Text>
            </View>
            <View
              style={[
                styles.nibssTrfTopUpWed1402Wrapper,
                styles.wrapperFlexBox1,
              ]}
            >
              <Text style={styles.drFlexBox}>
                <Text style={styles.drTypo}>{`NIBSS Trf Top Up...
`}</Text>
                <Text style={styles.wed14022024}>Wed, 14/02/2024</Text>
              </Text>
            </View>
          </View>
          <View style={[styles.n5000000Wrapper, styles.wrapperFlexBox1]}>
            <Text style={[styles.dr, styles.drTypo]}>N50,000.00</Text>
          </View>
        </View>
        <View style={[styles.frameView, styles.frameFlexBox]}>
          <View style={styles.wrapperFlexBox1}>
            <View style={[styles.crWrapper, styles.wrapperFlexBox]}>
              <Text style={[styles.dr, styles.drTypo]}>Cr</Text>
            </View>
            <View
              style={[
                styles.nibssTrfTopUpWed1402Wrapper,
                styles.wrapperFlexBox1,
              ]}
            >
              <Text style={styles.drFlexBox}>
                <Text style={styles.drTypo}>{`NIBSS Trf Top Up...
`}</Text>
                <Text style={styles.wed14022024}>Wed, 14/02/2024</Text>
              </Text>
            </View>
          </View>
          <View style={[styles.n5000000Wrapper, styles.wrapperFlexBox1]}>
            <Text style={[styles.dr, styles.drTypo]}>N50,000.00</Text>
          </View>
        </View>
        <View style={[styles.frameView, styles.frameFlexBox]}>
          <View style={styles.wrapperFlexBox1}>
            <View style={[styles.crWrapper, styles.wrapperFlexBox]}>
              <Text style={[styles.dr, styles.drTypo]}>Cr</Text>
            </View>
            <View
              style={[
                styles.nibssTrfTopUpWed1402Wrapper,
                styles.wrapperFlexBox1,
              ]}
            >
              <Text style={styles.drFlexBox}>
                <Text style={styles.drTypo}>{`NIBSS Trf Top Up...
`}</Text>
                <Text style={styles.wed14022024}>Wed, 14/02/2024</Text>
              </Text>
            </View>
          </View>
          <View style={[styles.n5000000Wrapper, styles.wrapperFlexBox1]}>
            <Text style={[styles.dr, styles.drTypo]}>N50,000.00</Text>
          </View>
        </View>
        <View style={[styles.frameView, styles.frameFlexBox]}>
          <View style={styles.wrapperFlexBox1}>
            <View style={[styles.crWrapper, styles.wrapperFlexBox]}>
              <Text style={[styles.dr, styles.drTypo]}>Cr</Text>
            </View>
            <View
              style={[
                styles.nibssTrfTopUpWed1402Wrapper,
                styles.wrapperFlexBox1,
              ]}
            >
              <Text style={styles.drFlexBox}>
                <Text style={styles.drTypo}>{`NIBSS Trf Top Up...
`}</Text>
                <Text style={styles.wed14022024}>Wed, 14/02/2024</Text>
              </Text>
            </View>
          </View>
          <View style={[styles.n5000000Wrapper, styles.wrapperFlexBox1]}>
            <Text style={[styles.dr, styles.drTypo]}>N50,000.00</Text>
          </View>
        </View>
        <View style={[styles.frameView, styles.frameFlexBox]}>
          <View style={styles.wrapperFlexBox1}>
            <View style={[styles.crWrapper, styles.wrapperFlexBox]}>
              <Text style={[styles.dr, styles.drTypo]}>Cr</Text>
            </View>
            <View
              style={[
                styles.nibssTrfTopUpWed1402Wrapper,
                styles.wrapperFlexBox1,
              ]}
            >
              <Text style={styles.drFlexBox}>
                <Text style={styles.drTypo}>{`NIBSS Trf Top Up...
`}</Text>
                <Text style={styles.wed14022024}>Wed, 14/02/2024</Text>
              </Text>
            </View>
          </View>
          <View style={[styles.n5000000Wrapper, styles.wrapperFlexBox1]}>
            <Text style={[styles.dr, styles.drTypo]}>N50,000.00</Text>
          </View>
        </View>
        <View style={[styles.frameView, styles.frameFlexBox]}>
          <View style={styles.wrapperFlexBox1}>
            <View style={[styles.crWrapper, styles.wrapperFlexBox]}>
              <Text style={[styles.dr, styles.drTypo]}>Cr</Text>
            </View>
            <View
              style={[
                styles.nibssTrfTopUpWed1402Wrapper,
                styles.wrapperFlexBox1,
              ]}
            >
              <Text style={styles.drFlexBox}>
                <Text style={styles.drTypo}>{`NIBSS Trf Top Up...
`}</Text>
                <Text style={styles.wed14022024}>Wed, 14/02/2024</Text>
              </Text>
            </View>
          </View>
          <View style={[styles.n5000000Wrapper, styles.wrapperFlexBox1]}>
            <Text style={[styles.dr, styles.drTypo]}>N50,000.00</Text>
          </View>
        </View>
        <View style={[styles.frameView, styles.frameFlexBox]}>
          <View style={styles.wrapperFlexBox1}>
            <View style={[styles.crWrapper, styles.wrapperFlexBox]}>
              <Text style={[styles.dr, styles.drTypo]}>Cr</Text>
            </View>
            <View
              style={[
                styles.nibssTrfTopUpWed1402Wrapper,
                styles.wrapperFlexBox1,
              ]}
            >
              <Text style={styles.drFlexBox}>
                <Text style={styles.drTypo}>{`NIBSS Trf Top Up...
`}</Text>
                <Text style={styles.wed14022024}>Wed, 14/02/2024</Text>
              </Text>
            </View>
          </View>
          <View style={[styles.n5000000Wrapper, styles.wrapperFlexBox1]}>
            <Text style={[styles.dr, styles.drTypo]}>N50,000.00</Text>
          </View>
        </View>
        <View style={[styles.frameView, styles.frameFlexBox]}>
          <View style={styles.wrapperFlexBox1}>
            <View style={[styles.crWrapper, styles.wrapperFlexBox]}>
              <Text style={[styles.dr, styles.drTypo]}>Cr</Text>
            </View>
            <View
              style={[
                styles.nibssTrfTopUpWed1402Wrapper,
                styles.wrapperFlexBox1,
              ]}
            >
              <Text style={styles.drFlexBox}>
                <Text style={styles.drTypo}>{`NIBSS Trf Top Up...
`}</Text>
                <Text style={styles.wed14022024}>Wed, 14/02/2024</Text>
              </Text>
            </View>
          </View>
          <View style={[styles.n5000000Wrapper, styles.wrapperFlexBox1]}>
            <Text style={[styles.dr, styles.drTypo]}>N50,000.00</Text>
          </View>
        </View>
        <View style={[styles.frameView, styles.frameFlexBox]}>
          <View style={styles.wrapperFlexBox1}>
            <View style={[styles.crWrapper, styles.wrapperFlexBox]}>
              <Text style={[styles.dr, styles.drTypo]}>Cr</Text>
            </View>
            <View
              style={[
                styles.nibssTrfTopUpWed1402Wrapper,
                styles.wrapperFlexBox1,
              ]}
            >
              <Text style={styles.drFlexBox}>
                <Text style={styles.drTypo}>{`NIBSS Trf Top Up...
`}</Text>
                <Text style={styles.wed14022024}>Wed, 14/02/2024</Text>
              </Text>
            </View>
          </View>
          <View style={[styles.n5000000Wrapper, styles.wrapperFlexBox1]}>
            <Text style={[styles.dr, styles.drTypo]}>N50,000.00</Text>
          </View>
        </View>
        <View style={[styles.frameView, styles.frameFlexBox]}>
          <View style={styles.wrapperFlexBox1}>
            <View style={[styles.crWrapper, styles.wrapperFlexBox]}>
              <Text style={[styles.dr, styles.drTypo]}>Cr</Text>
            </View>
            <View
              style={[
                styles.nibssTrfTopUpWed1402Wrapper,
                styles.wrapperFlexBox1,
              ]}
            >
              <Text style={styles.drFlexBox}>
                <Text style={styles.drTypo}>{`NIBSS Trf Top Up...
`}</Text>
                <Text style={styles.wed14022024}>Wed, 14/02/2024</Text>
              </Text>
            </View>
          </View>
          <View style={[styles.n5000000Wrapper, styles.wrapperFlexBox1]}>
            <Text style={[styles.dr, styles.drTypo]}>N50,000.00</Text>
          </View>
        </View>
        <View style={[styles.frameView, styles.frameFlexBox]}>
          <View style={styles.wrapperFlexBox1}>
            <View style={[styles.crWrapper, styles.wrapperFlexBox]}>
              <Text style={[styles.dr, styles.drTypo]}>Cr</Text>
            </View>
            <View
              style={[
                styles.nibssTrfTopUpWed1402Wrapper,
                styles.wrapperFlexBox1,
              ]}
            >
              <Text style={styles.drFlexBox}>
                <Text style={styles.drTypo}>{`NIBSS Trf Top Up...
`}</Text>
                <Text style={styles.wed14022024}>Wed, 14/02/2024</Text>
              </Text>
            </View>
          </View>
          <View style={[styles.n5000000Wrapper, styles.wrapperFlexBox1]}>
            <Text style={[styles.dr, styles.drTypo]}>N50,000.00</Text>
          </View>
        </View>
        <View style={[styles.frameView, styles.frameFlexBox]}>
          <View style={styles.wrapperFlexBox1}>
            <View style={[styles.crWrapper, styles.wrapperFlexBox]}>
              <Text style={[styles.dr, styles.drTypo]}>Cr</Text>
            </View>
            <View
              style={[
                styles.nibssTrfTopUpWed1402Wrapper,
                styles.wrapperFlexBox1,
              ]}
            >
              <Text style={styles.drFlexBox}>
                <Text style={styles.drTypo}>{`NIBSS Trf Top Up...
`}</Text>
                <Text style={styles.wed14022024}>Wed, 14/02/2024</Text>
              </Text>
            </View>
          </View>
          <View style={[styles.n5000000Wrapper, styles.wrapperFlexBox1]}>
            <Text style={[styles.dr, styles.drTypo]}>N50,000.00</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  drFlexBox: {
    textAlign: "left",
    color: Color.colorWhite,
  },
  wrapperFlexBox: {
    padding: Padding.p_5xl,
    borderRadius: Border.br_281xl,
    alignItems: "center",
    justifyContent: "center",
  },
  drTypo: {
    fontFamily: FontFamily.robotoBold,
    fontWeight: "700",
    fontSize: FontSize.size_xl,
  },
  wrapperFlexBox1: {
    flexDirection: "row",
    alignItems: "center",
  },
  frameFlexBox: {
    justifyContent: "space-between",
    alignSelf: "stretch",
    flexDirection: "row",
    alignItems: "center",
  },
  slideUpChild: {
    shadowColor: "rgba(0, 0, 0, 0.25)",
    backgroundColor: Color.colorDarkcyan_100,
    borderTopRightRadius: Border.br_3xs,
    borderTopLeftRadius: Border.br_3xs,
    height: 58,
    shadowOpacity: 1,
    elevation: 4,
    shadowRadius: 4,
    shadowOffset: {
      width: 5,
      height: -5,
    },
    left: 0,
    bottom: 0,
    position: "absolute",
    width: 430,
  },
  slideUp: {
    shadowColor: "rgba(0, 0, 0, 0.2)",
    height: 58,
    shadowOpacity: 1,
    elevation: 4,
    shadowRadius: 4,
    shadowOffset: {
      width: 5,
      height: -5,
    },
    left: 0,
    bottom: 0,
    position: "absolute",
    width: 430,
  },
  subtractIcon: {
    borderRadius: 6,
    width: 155,
    height: 75,
  },
  raphaelarrowupIcon: {
    bottom: 13,
    left: 89,
    width: 32,
    height: 32,
    borderTopRightRadius: Border.br_3xs,
    borderTopLeftRadius: Border.br_3xs,
    position: "absolute",
    overflow: "hidden",
  },
  history: {
    top: 50,
    left: 35,
    fontSize: FontSize.size_mini,
    fontFamily: FontFamily.robotoRegular,
    position: "absolute",
    color: Color.colorWhite,
  },
  slide: {
    height: 89,
    width: 430,
  },
  dr: {
    textAlign: "left",
    color: Color.colorWhite,
  },
  drWrapper: {
    backgroundColor: Color.colorDarkgray,
  },
  wed14022024: {
    fontSize: FontSize.size_sm,
    fontWeight: "100",
    fontFamily: FontFamily.robotoThin,
  },
  nibssTrfTopUpWed1402Wrapper: {
    marginLeft: 8,
    justifyContent: "center",
  },
  n5000000Wrapper: {
    justifyContent: "center",
  },
  crWrapper: {
    backgroundColor: Color.colorSandybrown_100,
  },
  frameView: {
    marginTop: 8,
  },
  frameParent: {
    height: 518,
    padding: 12,
    alignItems: "center",
    backgroundColor: Color.colorDarkcyan_100,
    width: 430,
  },
  slideParent: {
    maxWidth: "100%",
    maxHeight: "100%",
    justifyContent: "center",
    overflow: "hidden",
  },
});

export default Frame;
