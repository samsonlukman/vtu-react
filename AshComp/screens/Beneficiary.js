import * as React from "react";
import { useState, useEffect } from "react";
import { Image } from "expo-image";
import { StyleSheet, Pressable, Text, View, ActivityIndicator, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Color, FontSize, FontFamily } from "../GlobalStyles";
import { useUser } from "../contexts/UserContext";

const Beneficiary = () => {
  const navigation = useNavigation();
  const { userData, loading, wallet } = useUser();
  const [transactionLog, setTransactionLog] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!userData || !userData.account_reference) {
      setError("Account reference not found");
      return;
    }

    const fetchTransactions = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`https://api.flutterwave.com/v3/payout-subaccounts/${userData.account_reference}/transactions`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer FLWSECK-fab12578d0fa352253f89fd6a7b7b713-18f55ce05d4vt-X` // Replace with your actual secret key
          },
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        setTransactionLog(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTransactions();
  }, [userData]);

  if (isLoading || loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <ScrollView>
    <View style={[styles.beneficiary, styles.iconLayout]}>
     
      <Image
        style={[styles.icoutlineGasMeterIcon, styles.icoutlineIconLayout]}
        contentFit="cover"
        source={require("../assets/icoutlinegasmeter.png")}
      />
      
      <Pressable
        style={[styles.mingcutebackFill, styles.fillIconPosition]}
        onPress={() => navigation.goBack()}
      >
        <Image
          style={[styles.icon, styles.iconLayout]}
          contentFit="cover"
          source={require("../assets/mingcutebackfill.png")}
        />
      </Pressable>
      <Text style={[styles.beneficiaries, styles.filterTypo]}>
        Transactions
      </Text>
     
      <Text style={[styles.cityGateStoreContainer, styles.mumContainerTypo]}>
        <Text style={styles.cityGateStore}>{JSON.stringify(transactionLog)}</Text>
        <Text style={styles.text}>2761562772188</Text>
      </Text>
      
     
      <Image
        style={[styles.mingcutedelete2FillIcon, styles.fillIconPosition]}
        contentFit="cover"
        source={require("../assets/mingcutedelete2fill.png")}
      />
      <Image
        style={[styles.mingcutedelete2FillIcon1, styles.fillIconPosition]}
        contentFit="cover"
        source={require("../assets/mingcutedelete2fill1.png")}
      />
      <Image
        style={[styles.mingcutedelete2FillIcon2, styles.fillIconPosition]}
        contentFit="cover"
        source={require("../assets/mingcutedelete2fill.png")}
      />
      <Image
        style={[styles.mingcutedelete2FillIcon3, styles.fillIconPosition]}
        contentFit="cover"
        source={require("../assets/mingcutedelete2fill.png")}
      />
      <Image
        style={[styles.mingcutedelete2FillIcon4, styles.fillIconPosition]}
        contentFit="cover"
        source={require("../assets/mingcutedelete2fill1.png")}
      />
      <Image
        style={[styles.mingcutedelete2FillIcon5, styles.fillIconPosition]}
        contentFit="cover"
        source={require("../assets/mingcutedelete2fill.png")}
      />
    </View>
    
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  iconLayout: {
    width: "100%",
    overflow: "hidden",
  },
  bytesizetelephoneIconLayout: {
    height: 32,
    width: 32,
    position: "absolute",
    overflow: "hidden",
  },
  icoutlineIconLayout: {
    height: 24,
    width: 24,
    position: "absolute",
    overflow: "hidden",
  },
  fillIconPosition: {
    left: 372,
    height: 24,
    width: 24,
    position: "absolute",
  },
  filterTypo: {
    textAlign: "left",
    color: Color.colorBlack,
    fontSize: FontSize.size_xl,
    top: 113,
    position: "absolute",
  },
  mumContainerTypo: {
    left: 50,
    textAlign: "left",
    fontFamily: FontFamily.robotoBold,
    fontWeight: "700",
    position: "absolute",
  },
  titilayo08174231616Typo: {
    left: 53,
    textAlign: "left",
    fontFamily: FontFamily.robotoBold,
    fontWeight: "700",
    position: "absolute",
  },
  bytesizetelephoneIcon: {
    left: 13,
    height: 32,
    width: 32,
    position: "absolute",
    top: 231,
  },
  bytesizetelephoneIcon1: {
    top: 370,
    left: 13,
    height: 32,
    width: 32,
    position: "absolute",
  },
  bytesizetelephoneIcon2: {
    left: 16,
    top: 510,
    height: 32,
    width: 32,
    position: "absolute",
  },
  icoutlineGasMeterIcon: {
    top: 168,
    left: 17,
    height: 24,
    width: 24,
  },
  icoutlineGasMeterIcon1: {
    top: 307,
    left: 17,
    height: 24,
    width: 24,
  },
  icoutlineGasMeterIcon2: {
    top: 447,
    left: 20,
  },
  icroundSearchIcon: {
    left: 290,
    top: 113,
    height: 24,
    width: 24,
    position: "absolute",
    overflow: "hidden",
  },
  icon: {
    height: "100%",
    overflow: "hidden",
  },
  mingcutebackFill: {
    top: 43,
  },
  beneficiaries: {
    left: 33,
    fontFamily: FontFamily.robotoBold,
    fontWeight: "700",
    textAlign: "left",
  },
  filter: {
    left: 351,
    fontFamily: FontFamily.robotoRegular,
  },
  cityGateStore: {
    color: Color.colorBlack,
    fontSize: FontSize.size_xl,
  },
  text: {
    fontSize: FontSize.size_xs,
    color: Color.colorDimgray,
  },
  cityGateStoreContainer: {
    top: 165,
  },
  homeStore2761562772188Container: {
    top: 304,
  },
  cityGateStoreContainer1: {
    top: 444,
  },
  mum08174231616: {
    top: 231,
  },
  mum081742316161: {
    top: 370,
  },
  titilayo08174231616: {
    top: 510,
  },
  mingcutedelete2FillIcon: {
    top: 170,
    overflow: "hidden",
  },
  mingcutedelete2FillIcon1: {
    top: 305,
    overflow: "hidden",
  },
  mingcutedelete2FillIcon2: {
    top: 448,
    overflow: "hidden",
  },
  mingcutedelete2FillIcon3: {
    top: 240,
    overflow: "hidden",
  },
  mingcutedelete2FillIcon4: {
    top: 379,
    overflow: "hidden",
  },
  mingcutedelete2FillIcon5: {
    top: 519,
    overflow: "hidden",
  },
  beneficiary: {
    backgroundColor: Color.colorWhite,
    flex: 1,
    height: 932,
    overflow: "hidden",
  },
});

export default Beneficiary;
