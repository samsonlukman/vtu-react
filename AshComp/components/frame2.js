import * as React from "react";
import { View, StyleSheet, Text, Pressable, TouchableOpacity } from "react-native";
import { Image } from "expo-image";
import { Color, FontFamily, FontSize, Border } from "../GlobalStyles";
import { Linking } from 'react-native';

const Frame2 = () => {
  const [visible, setVisible] = React.useState(true);

  const handleWhatsApp = () => {
    Linking.openURL(`whatsapp://send?text=Hello&phone=+2347015779491`);
  };

  const handleEmail = () => {
    Linking.openURL('mailto:worknorm99@gmail.com?subject=Complaint&body=Hi%20there');
  };

  const handleClose = () => {
    setVisible(false);
  };

  if (!visible) {
    return null;
  }

  return (
    <View style={styles.slideParent}>
      <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
        <Text style={styles.closeButtonText}>X</Text>
      </TouchableOpacity>
        <View style={styles.slide}>
        <Pressable onPress={handleEmail} style={[styles.pressable, styles.slidePosition1]}>
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
          </Pressable>
        </View>
      

      
        <View style={styles.slide1}>
        <Pressable onPress={handleWhatsApp} style={[styles.pressable, styles.slidePosition1]}>
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
          </Pressable>
        </View>
      
    </View>
  );
};

const styles = StyleSheet.create({
  slidePosition1: {
    height: 39,
    width: 115,
    left: "100%",
    marginLeft: -57.5,
    position: "absolute",
  },
  slidePosition: {
    left: 0,
    bottom: 0,
    right: 0,
    top: 0,
    width: "100%",
    height: "100%",
    position: "absolute",
  },
  emailTypo: {
    textAlign: "left",
    color: "#FFFFFF",
    fontFamily: "Roboto-Bold",
    fontWeight: "700",
    fontSize: 14,
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
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
    backgroundColor: "#FFA500",
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
    borderRadius: 12,
    height: 39,
    width: 115,
  },
  slideInner: {
    borderBottomRightRadius: 6,
    borderBottomLeftRadius: 6,
    backgroundColor: "#008B8B",
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
    top: 120,
    borderRadius: 6,
    height: 39,
    width: 115,
  },
  slideParent: {
    width: 297,
    height: 312,
    maxHeight: "100%",
    maxWidth: "100%",
    overflow: "hidden",
    
  },
  closeButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  closeButton: {
    position: 'absolute',
    top: 80,
    right: 90,
    backgroundColor: 'red',
    borderRadius: 10,
    padding: 5,
    zIndex: 1,
  },
  pressable: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  }
});

export default Frame2;
