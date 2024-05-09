import React, { useState, useCallback } from "react";
import { View, StyleSheet, Text, Pressable, Modal } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../contexts/AuthContext";
import Frame1 from "./Frame1";
import { Color, FontFamily, FontSize, Border } from "../GlobalStyles";

const SideBar = ({ onClose }) => {
  const [logComplainTextVisible, setLogComplainTextVisible] = useState(false);
  const navigation = useNavigation();
  const { user, logout } = useAuth();

  const openLogComplainText = useCallback(() => {
    setLogComplainTextVisible(true);
  }, []);

  const closeLogComplainText = useCallback(() => {
    setLogComplainTextVisible(false);
  }, []);

  const handleLogout = () => {
    logout(); // Call logout function from useAuth hook
    onClose(); // Close the sidebar
  };

  return (
    <>
      {/* Your sidebar content */}
      <Pressable
        style={styles.sideBar}
        onPress={() => navigation.navigate("Home")}
      >
        <View style={[styles.underly, styles.underlyPosition]}>
          <View style={[styles.underlyChild, styles.underlyPosition]} />
        </View>
        <Pressable style={styles.closeSidebar} onPress={onClose}>
          <Text style={styles.closeSidebarText}>Close Sidebar</Text>
        </Pressable>
        <Pressable
          style={[styles.beneficiary, styles.logoutPosition]}
          onPress={() => navigation.navigate("Beneficiary")}
        >
          <Text style={styles.logoutTypo}>Beneficiary</Text>
        </Pressable>
        <Text style={[styles.register, styles.logoutTypo]}>Register</Text>
        <Text style={[styles.connectUs, styles.logoutTypo]}>Connect Us</Text>
        <Pressable
          style={[styles.aboutUs, styles.logoutPosition]}
          onPress={() => navigation.navigate("About")}
        >
          <Text style={styles.logoutTypo}>About Us</Text>
        </Pressable>
        <Pressable
          style={[styles.logComplain, styles.logoutPosition]}
          onPress={openLogComplainText}
        >
          <Text style={styles.logoutTypo}>Log Complain</Text>
        </Pressable>
        <Pressable
          style={[styles.settings, styles.logoutPosition]}
          onPress={() => navigation.navigate("Setting")}
        >
          <Text style={styles.logoutTypo}>Settings</Text>
        </Pressable>
        {/* Conditional rendering for Login/Logout */}
        {user.isAuthenticated ? (
          <Pressable style={[styles.logout, styles.logoutPosition]} onPress={handleLogout}>
            <Text style={styles.logoutTypo}>Logout</Text>
          </Pressable>
        ) : (
          <Pressable style={[styles.logout, styles.logoutPosition]} onPress={() => navigation.navigate("Login")}>
            <Text style={styles.logoutTypo}>Login</Text>
          </Pressable>
        )}
      </Pressable>

      {/* Modal for the Frame1 component */}
      <Modal animationType="fade" transparent visible={logComplainTextVisible}>
        {/* Your modal content */}
        <View style={styles.logComplainTextOverlay}>
          <Pressable style={styles.logComplainTextBg} onPress={closeLogComplainText} />
          <Frame1 onClose={closeLogComplainText} />
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  underlyPosition: {
    width: 303,
    left: 0,
    top: 0,
    position: "absolute",
    height: 932,
  },
  logoutPosition: {
    left: 46,
    position: "absolute",
  },
  logoutTypo: {
    textAlign: "left",
    color: Color.colorWhite,
    fontFamily: FontFamily.robotoBold,
    fontWeight: "700",
    fontSize: FontSize.size_xs,
  },
  underlyChild: {
    borderRadius: Border.br_3xs,
    backgroundColor: "rgba(1, 140, 132, 0.9)",
  },
  underly: {
    shadowColor: "rgba(0, 0, 0, 0.25)",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 4,
    elevation: 4,
    shadowOpacity: 1,
  },
  beneficiary: {
    top: 129,
  },
  closeSidebar: {
    position: "absolute",
    left: 46,
    top: 20,
    width: 100, // Adjust the width as needed
    height: 40, // Adjust the height as needed
    backgroundColor: Color.colorWhite, // Set background color to white
    justifyContent: "center", // Center text vertically
    paddingLeft: 10, // Add left padding to center text horizontally
    borderRadius: 5, // Add border radius for rounded corners
  },
  closeSidebarText: {
    color: Color.colorBlack, // Change text color to black
    fontFamily: FontFamily.robotoBold,
    fontWeight: "700",
    fontSize: FontSize.size_xs,
  },
  register: {
    top: 169,
    left: 46,
    position: "absolute",
  },
  connectUs: {
    top: 209,
    left: 46,
    position: "absolute",
  },
  aboutUs: {
    top: 89,
  },
  logComplainTextOverlay: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(113, 113, 113, 0.3)",
  },
  logComplainTextBg: {
    position: "absolute",
    width: "100%",
    height: "100%",
    left: 0,
    top: 0,
  },
  logComplain: {
    top: 254,
  },
  settings: {
    top: 299,
  },
  logout: {
    top: 344,
    left: 46,
    position: "absolute",
  },
  sideBar: {
    width: 430,
    overflow: "hidden",
    maxWidth: "100%",
    maxHeight: "100%",
    height: 932,
  },
});

export default SideBar;
