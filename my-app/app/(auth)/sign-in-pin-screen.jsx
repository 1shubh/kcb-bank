import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import Fontisto from "@expo/vector-icons/Fontisto";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";

import { useRouter, router, useGlobalSearchParams } from "expo-router";
import { useGlobalContext } from "../../context/GlobalProvider";

const SigninPinScreen = () => {
  const [pin, setOtp] = useState("");
  const maskedOtp = pin.replace(/./g, "*");
  const { mobileNumber, error } = useGlobalSearchParams();
  const { login, loading, user, isLogged } = useGlobalContext();

  // Function to handle numpad presses
  const handleNumpadPress = (value) => {
    if (value === "delete") {
      // Remove the last digit
      setOtp(pin.slice(0, -1));
    } else {
      // Append the pressed number, limit to 6 digits
      if (pin.length < 6) {
        setOtp(pin + value);
      }
    }
  };

  // login here
  const handleOkPress = async () => {
    // console.log(mobileNumber, pin);
    await login(mobileNumber, pin);
    // Check if the user is logged in and redirect to the main screen
    if (user || isLogged) {
      router.push("/(tabs)"); // Navigate after successful login
    }
  };

  // Render a button for the numpad
  const renderNumpadButton = (value, isRightBorder) => (
    <TouchableOpacity
      key={value}
      style={[
        styles.numpadButton,
        isRightBorder ? styles.rightBorder : null, // Apply right border style if applicable
      ]}
      onPress={() => handleNumpadPress(value)}
    >
      {value === "delete" ? (
        <Ionicons
          name="backspace-outline"
          size={35}
          color="#63bc46"
          maxFontSizeMultiplier={1}
        />
      ) : (
        <Text maxFontSizeMultiplier={1} className="font-mnregular text-gray-500 text-2xl">
          {value}
        </Text>
      )}
    </TouchableOpacity>
  );
  return (
    <SafeAreaView className="h-full w-full bg-white flex-1 justify-between pb-5">
      <View>
        <View className="border-[5px] mt-2 border-[#f4f4f4] h-[120px] w-[120px] rounded-full p-5 ml-auto mr-auto items-center justify-center">
          <Fontisto name="locked" size={40} color={"#1f2c4c"} />
        </View>
        <Text
          className="text-center mt-2 text-xl font-dBold text-secondary"
          maxFontSizeMultiplier={1}
        >
          Enter PIN
        </Text>

        {/* Display the masked OTP */}
        <View className="px-5 mt-2">
          <Text style={styles.pinDisplay} maxFontSizeMultiplier={1}>
            {maskedOtp}
          </Text>
        </View>
      </View>

      {/* Numpad layout */}
      <View className="mt-1 px-2">
        <View style={styles.row} className="border-b">
          <View className="border-r p-3">{renderNumpadButton(1, true)}</View>
          <View className="border-r p-3">{renderNumpadButton(2, true)}</View>
          <View className="p-3">{renderNumpadButton(3, false)}</View>
        </View>
        <View style={styles.row} className="border-b">
          <View className="border-r p-3">{renderNumpadButton(4, true)}</View>
          <View className="border-r p-3">{renderNumpadButton(5, true)}</View>
          <View className=" p-3">{renderNumpadButton(6, false)}</View>
        </View>
        <View style={styles.row} className="border-b">
          <View className="border-r p-3">{renderNumpadButton(7, true)}</View>
          <View className="border-r p-3">{renderNumpadButton(8, true)}</View>
          <View className="p-3">{renderNumpadButton(9, false)}</View>
        </View>
        <View style={styles.row}>
          <View className="border-r p-3">{renderNumpadButton("delete")}</View>
          <View className="border-r p-3">{renderNumpadButton(0)}</View>

          {/* OK button with checkmark */}
          <View className="p-3">
            <TouchableOpacity style={styles.okButton} onPress={handleOkPress}>
              <Text
                className="text-primary font-bold text-[24px]"
                maxFontSizeMultiplier={1}
              >
                OK
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Loading overlay */}
      {(loading || error) && (
        <View style={styles.overlay}>
          <View
            style={styles.spinnerContainer}
            className="flex-row gap-5 items-center"
          >
            <ActivityIndicator size="large" color="#00ff00" />
            <Text style={styles.loadingText} maxFontSizeMultiplier={1}>
              {loading ? "Validating...." : error}
            </Text>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

export default SigninPinScreen;
const styles = StyleSheet.create({
  pinDisplay: {
    fontSize: 32,
    textAlign: "center",
    letterSpacing: 12,
    fontWeight: "bold",
    color: "#333",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 0,
  },
  numpadButton: {
    width: 90,
    height: 90,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 10,
  },
  numpadButtonText: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
  },
  okButton: {
    width: 90,
    height: 90,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 10,
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
    backgroundColor: "rgba(255, 255, 255, 0.9)",
  },
  spinnerContainer: {
    backgroundColor: "#fff",
    padding: 10,
    width: "80%",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    alignItems: "center",
  },
  loadingText: {
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 10,
    color: "#333",
  },
});
