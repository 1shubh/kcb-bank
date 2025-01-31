import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator } from "react-native";
import React, { useState } from "react";
import Fontisto from "@expo/vector-icons/Fontisto";
import { SafeAreaView } from "react-native-safe-area-context";
import OtpTextInput from "react-native-text-input-otp";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useGlobalContext } from "../context/GlobalProvider";
import { router } from "expo-router";


const Pin = () => {
  const [pin, setOtp] = useState("");
  const [loading, setLoading] = useState(false); // Loading state
  const maskedOtp = pin.replace(/./g, "*");
  const { user } = useGlobalContext();
  console.log(user.user.mobileNumber);

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
  const handleOkPress = async () => {
    setLoading(true); // Show loading spinner
    // Mock API call (Replace with your actual API call)
    try {
      const response = await fetch("https://bank-backend-a00q.onrender.com/api/users/checkPassword", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          mobileNumber: user.user.mobileNumber, // Use the logged-in user's mobile number
          password: pin,
        }),
      });
      const result = await response.json();
      if (response.ok) {
        console.log("Password is correct:", result);
        router.push("bank-transfer")
      } else {
        console.log("Incorrect password:", result);
      }
    } catch (error) {
      console.error("Error during password validation:", error);
    } finally {
      setLoading(false); // Hide loading spinner
    }
  };

  // Render a button for the numpad
  const renderNumpadButton = (value) => (
    <TouchableOpacity
      key={value}
      style={styles.numpadButton}
      onPress={() => handleNumpadPress(value)}
    >
      {value === "delete" ? (
        <Ionicons name="backspace-outline" size={30} color="black" />
      ) : (
        <Text style={styles.numpadButtonText}>{value}</Text>
      )}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView className="h-full w-full bg-white">
      <View className="border-[5px] mt-20 border-gray-100 h-[120px] w-[120px] rounded-full p-5 ml-auto mr-auto items-center justify-center">
        <Fontisto name="locked" size={50} color={"black"} />
      </View>
      <Text className="text-center mt-2 text-xl font-dBold uppercase text-secondary">
        Enter Pin
      </Text>
      <View className="px-5 mt-5">
        <OtpTextInput
          otp={maskedOtp} // Show the masked version of OTP
          setOtp={setOtp}
          digits={6}
          style={{
            borderRadius: 0,
            borderTopWidth: 0,
            borderRightWidth: 0,
            borderLeftWidth: 0,
            height: 45,
          }}
          fontStyle={{ fontSize: 20, fontWeight: "bold" }}
          focusedStyle={{ borderColor: "#5cb85c", borderBottomWidth: 2 }}
        />
      </View>

      {/* Numpad layout */}
      <View className="mt-10 px-5">
        <View style={styles.row}>
          {[1, 2, 3].map((value) => renderNumpadButton(value))}
        </View>
        <View style={styles.row}>
          {[4, 5, 6].map((value) => renderNumpadButton(value))}
        </View>
        <View style={styles.row}>
          {[7, 8, 9].map((value) => renderNumpadButton(value))}
        </View>
        <View style={styles.row}>
          {["delete", 0].map((value) => renderNumpadButton(value))}
          {/* OK button with checkmark */}
          <TouchableOpacity style={styles.okButton} onPress={handleOkPress}>
            <Text className="text-white font-bold text-xl">OK</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Loading overlay */}
      {loading && (
        <View style={styles.overlay}>
          <View
            style={styles.spinnerContainer}
            className="flex-row gap-5 items-center"
          >
            <ActivityIndicator size="large" color="#00ff00" />
            <Text style={styles.loadingText}>Validating...</Text>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
  },
  numpadButton: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#f0f0f0",
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
    backgroundColor: "#5cb85c",
    borderRadius: 50,
    width: 100,
    height: 100,
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

export default Pin;
