import React, { useEffect, useState } from "react";
import { StyleSheet, Pressable, Text, TextInput, View, Alert, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Image } from "expo-image";
import axios from "axios";
import { FontFamily, Color, Border, FontSize } from "../GlobalStyles";

const Setting = () => {
  const navigation = useNavigation();
  const [userData, setUserData] = useState({});
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [retypeNewPassword, setRetypeNewPassword] = useState("");
  const [csrfToken, setCsrfToken] = useState("");

  useEffect(() => {
    // Fetch user data
    axios.get("https://www.payvillesub.com/api/user/")
      .then(response => {
        const user = response.data;
        setUserData(user);
        setFirstName(user.first_name);
        setLastName(user.last_name);
        setPhoneNumber(user.phone_number);
        setEmail(user.email);
        setUserName(user.username)
      })
      .catch(error => {
        console.error("Error fetching user data:", error);
      });

    // Fetch CSRF token
    axios.get("https://www.payvillesub.com/api/get-csrf-token/")
      .then(response => {
        setCsrfToken(response.data.csrf_token);
      })
      .catch(error => {
        console.error("Error fetching CSRF token:", error);
      });
  }, []);

  const handleSaveProfile = async () => {
    // Update user data
    const updatedUserData = {
      first_name: firstName,
      last_name: lastName,
      phone_number: phoneNumber,
      email: email,
      username: userName
    };

    try {
      await axios.put(`https://www.payvillesub.com/api/edit-profile/${userData.id}/`, updatedUserData, {
        
        headers: {
          'X-CSRFToken': csrfToken,
          'Content-Type': 'application/json'
        }
      });
      Alert.alert("Success", "Profile updated successfully");
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  const handleChangePassword = async () => {
    if (newPassword !== retypeNewPassword) {
      Alert.alert("Error", "New passwords do not match");
      return;
    }

    const passwordData = {
      old_password: oldPassword,
      new_password: newPassword
    };

    try {
      await axios.put("https://www.payvillesub.com/api/user/change-password/", passwordData, {
        headers: {
          'X-CSRFToken': csrfToken,
          'Content-Type': 'application/json'
        }
      });
      Alert.alert("Success", "Password changed successfully");
    } catch (error) {
      console.error("Error changing password:", error);
    }
  };

  return (
    <ScrollView>
      <View style={styles.setting}>
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
        <Text style={[styles.setting1, styles.saveTypo]}>Settings</Text>

        <Text style={[styles.label, styles.emailTypo]}>LUsername</Text>
        <TextInput
          style={styles.input}
          value={userName}
          onChangeText={setUserName}
        />

        <Text style={[styles.label, styles.emailTypo]}>First Name</Text>
        <TextInput
          style={styles.input}
          value={firstName}
          onChangeText={setFirstName}
        />

        <Text style={[styles.label, styles.emailTypo]}>Last Name</Text>
        <TextInput
          style={styles.input}
          value={lastName}
          onChangeText={setLastName}
        />

        <Text style={[styles.label, styles.emailTypo]}>Phone Number</Text>
        <TextInput
          style={styles.input}
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          keyboardType="phone-pad"
        />

        <Text style={[styles.label, styles.emailTypo]}>Email</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />

        <Pressable style={[styles.saveButton, styles.button]} onPress={handleSaveProfile}>
          <Text style={styles.buttonText}>Save Profile</Text>
        </Pressable>

        <Text style={[styles.label, styles.passwordTypo]}>Old Password</Text>
        <TextInput
          style={styles.input}
          value={oldPassword}
          onChangeText={setOldPassword}
          secureTextEntry
        />

        <Text style={[styles.label, styles.passwordTypo]}>New Password</Text>
        <TextInput
          style={styles.input}
          value={newPassword}
          onChangeText={setNewPassword}
          secureTextEntry
        />

        <Text style={[styles.label, styles.passwordTypo]}>Retype New Password</Text>
        <TextInput
          style={styles.input}
          value={retypeNewPassword}
          onChangeText={setRetypeNewPassword}
          secureTextEntry
        />

        <Pressable style={[styles.saveButton, styles.button]} onPress={handleChangePassword}>
          <Text style={styles.buttonText}>Change Password</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  setting: {
    flex: 1,
    paddingTop: 120,
    padding: 50,
    backgroundColor: Color.colorWhite,
  },
  iconLayout: {
    height: "100%",
    width: "100%",
  },
  saveTypo: {
    textAlign: "left",
    fontFamily: FontFamily.robotoBold,
    fontWeight: "700",
    position: "absolute",
  },
  emailTypo: {
    color: Color.colorDarkgray,
    fontFamily: FontFamily.robotoRegular,
    fontSize: FontSize.size_xs,
    textAlign: "left",
  },
  passwordTypo: {
    color: Color.colorDarkgray,
    fontFamily: FontFamily.robotoRegular,
    fontSize: FontSize.size_xs,
    textAlign: "left",
  },
  label: {
    marginVertical: 10,
  },
  input: {
    height: 40,
    borderColor: Color.colorGainsboro_100,
    borderWidth: 1,
    borderRadius: Border.br_6xs,
    paddingLeft: 8,
    marginBottom: 20,
  },
  button: {
    marginVertical: 10,
    padding: 10,
    backgroundColor: Color.colorDarkcyan_100,
    borderRadius: Border.br_6xs,
    alignItems: "center",
  },
  buttonText: {
    color: Color.colorWhite,
    fontFamily: FontFamily.robotoBold,
    fontSize: FontSize.size_sm,
  },
  mingcutebackFill: {
    position: "absolute",
    left: 10,
    top: 40,
    width: 24,
    height: 24,
  },
  setting1: {
    fontSize: FontSize.size_21xl,
    color: Color.colorDarkcyan_100,
    top: 50,
    left: 100,
    textAlign: "center",
  },
  saveButton: {
    backgroundColor: Color.colorDarkcyan_100,
  },
});

export default Setting;
