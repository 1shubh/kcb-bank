import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ActivityIndicator,
  Alert,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import { Dropdown } from "react-native-element-dropdown";
import Warning from "./Warning";
import Otp from "./Otp";
import { router, useGlobalSearchParams } from "expo-router"; // Get the router params here
import CustomButton from "./CutomeButton";
import { useGlobalContext } from "../context/GlobalProvider";
import Pin from "./EnterPin";


const KcbAccountForm = ({ recipientAccount, setRecipientAccount }) => {
  const { user } = useGlobalContext();
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const [recipientName, setRecipientName] = useState("");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [step, setStep] = useState(1);
  const { pinVerified, currentStep } = useGlobalSearchParams();
  const data = [{ label: "KCB Bank ******2924", value: "1" }];

  // Get the params from the pin screen

  // console.log(pinVerified,currentStep)
  // If pin was successfully verified, go to step 3
  useEffect(() => {
    if (pinVerified) {
      setStep(3);
    }
  }, [pinVerified]);

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

  const HandleProceed = () => {
    // When navigating to the pin screen, pass a callback param to redirect back
    router.push({
      pathname: "pin-screen",
      params: {
        // You can pass any necessary parameters here
        fromForm: true, // This can be a flag that you're coming from this screen
      },
    });
  };

  const confirmTransfer = async (otp) => {
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
            amount: amount,
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
    <>
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

      {/* Proceed Button */}
      <CustomButton
        title="SUBMIT"
        containerStyles="bg-secondary w-[50%] text-[15px] h-[40px] ml-auto mr-auto mt-5"
        textStyles="text-white"
        handlePress={handleProceed}
      />

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
            confirmTransfer={confirmTransfer}
            amount={amount}
            recipientAccount={recipientAccount}
          />
        ) : (
          <Warning
            setShowConfirmation={setShowConfirmation}
            confirmTransfer={HandleProceed}
            amount={amount}
            data={data}
            recipientAccount={recipientAccount}
            step={step}
            setStep={setStep}
          />
        ))}
    </>
  );
};

export default KcbAccountForm;


