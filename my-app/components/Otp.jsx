import { View, Text, StyleSheet, Alert, Image } from "react-native";
import React, { useEffect, useState } from "react";
import Fontisto from "@expo/vector-icons/Fontisto";
import OtpTextInput from "react-native-text-input-otp";
import { DotIndicator } from "react-native-indicators";
import { icons } from "../constants/icons";

const Otp = ({ confirmTransfer, amount, recipientAccount }) => {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [hasValidated, setHasValidated] = useState(false); // New state to track validation

  useEffect(() => {
    // Simulate OTP autofill after 5 seconds
    const timer = setTimeout(() => {
      const autoFilledOtp = "1234"; // Example OTP
      setOtp(autoFilledOtp);

      if (!hasValidated) {
        setLoading(true);
        validateOtp(autoFilledOtp);
      }
    }, 5000); // 5 seconds delay

    return () => clearTimeout(timer); // Cleanup timer on component unmount
  }, [hasValidated]);

  const validateOtp = (filledOtp) => {
    if (hasValidated) return; // Prevent further calls after validation
    if (filledOtp === "1234") {
      setHasValidated(true); // Mark as validated
      confirmTransfer(filledOtp, amount, recipientAccount); // Call transfer function
    } else {
      Alert.alert("Error", "Invalid OTP. Please try again.");
      setLoading(false);
    }
  };
  // Mask the OTP input with "*"
  const maskedOtp = otp.replace(/./g, "*");

  return (
    <View style={styles.overlay}>
      <View style={styles.confirmationContainer}>
        <View className="w-full mb-5">
          <View className="h-[150px] w-[150px] rounded-full p-5 ml-auto mr-auto items-center justify-center">
            {/* <Fontisto
              name="locked"
              size={50}
              color={otp ? "#63bc46" : "#19c1ef"}
            /> */}
            <Image
              source={otp ? icons.otpRecived : icons.otpwaiting}
              className="w-full h-full"
              resizeMethod="contain"
            />
          </View>
          <Text
            className={`text-center text-xl font-mnsemibold ${
              otp ? "text-primary" : "text-[#19c1ef]"
            }`}
          >
            {otp ? "OTP Received" : "Waiting for OTP"}
          </Text>
          <Text className="text-center mt-2 text-[#19c1ef] font-medium">
            We Will Auto capture the Otp
          </Text>
        </View>

        {/* Display the masked OTP */}
        <OtpTextInput
          otp={maskedOtp}
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
            <Text className="text-center text-secondary font-mnregular text-xl mt-5">
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
