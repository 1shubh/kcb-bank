import { View, Text, StyleSheet, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import Fontisto from "@expo/vector-icons/Fontisto";
import OtpTextInput from "react-native-text-input-otp";
import { router } from "expo-router";
import { DotIndicator } from "react-native-indicators";

const Otp = ({ confirmTransfer, amount, recipientAccount }) => { // Add props here
  const [otp, setOtp] = useState("");
  const [autoFilled, setAutoFilled] = useState(false);
  const [loading, setLoading] = useState(false); // Set initial loading to false

  useEffect(() => {
    // Simulate OTP autofill after 5 seconds
    const timer = setTimeout(() => {
      setOtp("1234"); // Example OTP
      setAutoFilled(true);
    }, 5000); // 5 seconds delay

    return () => clearTimeout(timer); // Cleanup timer on component unmount
  }, []);

  useEffect(() => {
    // Auto-validate OTP after autofill
    if (autoFilled) {
      setLoading(true); // Show loading indicator
      validateOtp(); // Validate OTP
    }
  }, [autoFilled]);

  const validateOtp = () => {
    if (otp === "1234") {
      // OTP is valid; call the transfer function
      confirmTransfer(otp, amount, recipientAccount); // Call the transfer function
    } else {
      Alert.alert("Error", "Invalid OTP. Please try again.");
      setLoading(false); // Stop loading on error
    }
  };

  // Mask the OTP input with "*"
  const maskedOtp = otp.replace(/./g, "*");

  return (
    <View style={styles.overlay}>
      <View style={styles.confirmationContainer}>
        <View className="w-full mb-5">
          <View className="border-[5px] border-gray-100 h-[120px] w-[120px] rounded-full p-5 ml-auto mr-auto items-center justify-center">
            <Fontisto
              name="locked"
              size={50}
              color={autoFilled ? "#63bc46" : "#19c1ef"}
            />
          </View>
          <Text
            className={`text-center text-xl font-dBold ${
              autoFilled ? "text-primary" : "text-[#19c1ef]"
            }`}
          >
            {autoFilled ? "OTP Received" : "Waiting for OTP"}
          </Text>
          <Text className="text-center mt-2 text-[#19c1ef]">
            We Will Auto capture the Otp
          </Text>
        </View>

        {/* Display the masked OTP */}
        <OtpTextInput
          otp={maskedOtp} // Show the masked version of OTP
          setOtp={setOtp}
          digits={4}
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

        <View className="w-full mt-5 h-[80px]">
          {loading ? (
            <DotIndicator color="#5cb85c" size={20} />
          ) : (
            <Text className="text-center text-secondary text-xl mt-5">
              Please Wait ....
            </Text>
          )}
        </View>
      </View>
    </View>
  );
};

export default Otp;

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
    backgroundColor: "rgba(255, 255, 255, 0.9)", // White background with slight transparency
  },
  confirmationContainer: {
    backgroundColor: "#fff",
    padding: 20,
    width: "80%",
    borderRadius: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
});
