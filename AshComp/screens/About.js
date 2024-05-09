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
      >{`Does the sea of sales tools and countless tabs have you worried about missing opportunities? Stop spinning your wheels trying to hit your ever-growing quotas with tools that are too scrappy or too complex. With Crunchbase’s new HubSpot integration, you can easily build and track your pipeline with a single, easy-to-use solution.
Now, HubSpot users can quickly discover new prospects, push them directly to HubSpot, and own them instantly. You’ll also see HubSpot details within Crunchbase so you can track prospects already in your CRM and identify those that need your attention. By leveraging Crunchbase’s best-in-class data, you’ll discover growing companies you can’t find anywhere else, and pinpoint the ones that are in a position to buy.
Here’s how to use Crunchbase’s HubSpot integration to prospect smarter and faster.
Operation`}</Text>
      <Text style={[styles.operation, styles.payvilleTypo]}>Operation</Text>
      <Text
        style={[styles.doesTheSea1, styles.doesTypo]}
      >{`Does the sea of sales tools and countless tabs have you worried about missing opportunities? Stop spinning your wheels trying to hit your ever-growing quotas with tools that are too scrappy or too complex. With Crunchbase’s new HubSpot integration, you can easily build and track your pipeline with a single, easy-to-use solution.
Now, HubSpot users can quickly discover new prospects, push them directly to HubSpot, and own them instantly. You’ll also see HubSpot details within Crunchbase so you can track prospects already in your CRM and identify those that need your attention. By leveraging Crunchbase’s best-in-class data, you’ll discover growing companies you can’t find anywhere else, and pinpoint the ones that are in a position to buy.
Here’s how to use Crunchbase’s HubSpot integration to prospect smarter and faster.
`}</Text>
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
    left: 372,
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
    left: 49,
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
