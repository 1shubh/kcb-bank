import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ActivityIndicator,
  Alert,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { Dropdown } from "react-native-element-dropdown";
import Warning from "./Warning";
import Otp from "./Otp";
import { router } from "expo-router";
import CustomButton from "./CutomeButton";
import { useGlobalContext } from "../context/GlobalProvider";

const OtherBankForm = ({
  otherBank,
  setOtherBank,
  setRecipientAccount,
  recipientAccount,
}) => {
  const { user } = useGlobalContext();
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const [recipientName, setRecipientName] = useState("");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [step, setStep] = useState(1);
  const data = [{ label: "KCB Bank ******2924", value: "1" }];

  const validateForm = () => {
    let valid = true;
    if (
      !recipientAccount.trim() ||
      !recipientName.trim() ||
      !amount ||
      isNaN(amount) ||
      parseFloat(amount) <= 0
    ) {
      valid = false;
    }
    return valid;
  };

  const handleProceed = () => {
    setLoading(true); // Show the spinner
    const isValid = validateForm();

    if (isValid) {
      setShowConfirmation(true); // Show confirmation dialog
    } else {
      Alert.alert("Validation Error", "Please check your input.");
    }
    setLoading(false); // Hide the spinner after validation
  };

  const confirmTransfer = async (otp) => {
    setStep(3);
    setLoading(true); // Show loading indicator
    try {
      // Proceed with the transfer logic using OTP
      const response = await fetch(
        "https://bank-backend-a00q.onrender.com/api/users/transfer",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            amount: parseFloat(amount),
            recipientAccountNumber: recipientAccount,
            mobileNumber: user.user.mobileNumber, // Sender's mobile number
          }),
        }
      );
      // Handle the response
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      if (data.message) {
        router.push({
          pathname: "success",
          params: {
            amountTranfered: amount,
            recipientAccountNumber: recipientAccount,
          },
        });
      } else {
        Alert.alert("Error", "Transfer failed. Please try again.");
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "An error occurred while processing the transfer.");
    } finally {
      setLoading(false); // Hide loading indicator
      setShowConfirmation(false); // Hide confirmation
    }
  };

  return (
    <View>
      <Dropdown
        style={[styles.dropdown, isFocus && { borderColor: "blue" }]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={data}
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={!isFocus ? "Select KCB Account" : "..."}
        searchPlaceholder="Search..."
        value={"1"}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={(item) => {
          setValue(item.value);
          setIsFocus(false);
        }}
      />
      <TouchableOpacity
        className="mt-5 h-10 px-4 border-b-[0.5px] border-black-200 focus:border-secondary flex flex-row items-center"
        onPress={() => router.push("/select-bank")}
      >
        <Text className="flex-1 text-black font-psemibold uppercase text-[18px]">
          {`${otherBank}`}
        </Text>
      </TouchableOpacity>
      <View className="ml-auto mr-auto mt-5 h-10 px-4 border-b border-black-200 focus:border-secondary flex flex-row items-center">
        <TextInput
          className="flex-1 text-black font-psemibold text-[18px]"
          placeholder="RECIPIENT ACCOUNT"
          value={recipientAccount}
          onChangeText={setRecipientAccount}
          placeholderTextColor="black"
        />
      </View>

      <View className="ml-auto mr-auto mt-5 h-10 px-4 border-b border-black-200 focus:border-secondary flex flex-row items-center">
        <TextInput
          className="flex-1 text-black font-psemibold text-[18px]"
          placeholder="RECIPIENT NAME"
          value={recipientName}
          onChangeText={setRecipientName}
          placeholderTextColor="black"
        />
      </View>

      <View className="ml-auto mr-auto mt-5 h-10 px-4 border-b border-black-200 focus:border-secondary flex flex-row items-center">
        <TextInput
          className="flex-1 text-black font-psemibold text-[18px]"
          placeholder="AMOUNT"
          value={amount}
          onChangeText={setAmount}
          keyboardType="numeric"
          placeholderTextColor="black"
        />
      </View>

      <CustomButton
        title="SUBMIT"
        containerStyles="bg-secondary w-[50%] ml-auto mr-auto mt-5"
        textStyles="text-white"
        handlePress={handleProceed}
      />

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
      {/* Overlay Spinner */}
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
      {showConfirmation &&
        (step === 3 ? (
          <Otp
            confirmTransfer={confirmTransfer} // Pass the confirmTransfer function
            amount={amount} // Pass the amount
            recipientAccount={recipientAccount} // Pass the recipient account
          />
        ) : (
          <Warning
            setShowConfirmation={setShowConfirmation}
            confirmTransfer={confirmTransfer} // Pass confirmTransfer instead of completeTransfer
            amount={amount}
            data={data}
            recipientAccount={recipientAccount}
            otherBank={otherBank}
            step={step}
            setStep={setStep}
          />
        ))}
    </View>
  );
};

export default OtherBankForm;

const styles = StyleSheet.create({
  dropdown: {
    height: 60,
    borderColor: "gray",
    borderBottomWidth: 1,
    paddingHorizontal: 8,
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
});
