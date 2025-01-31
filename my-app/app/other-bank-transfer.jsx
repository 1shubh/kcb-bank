import { View, Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { router, useLocalSearchParams } from "expo-router";
import Feather from "@expo/vector-icons/Feather";
import Ionicons from "@expo/vector-icons/Ionicons";
import {
  StyleSheet,
  TextInput,
  ActivityIndicator,
  Alert,
  TouchableOpacity,
  Image,
} from "react-native";
import { useState, useEffect } from "react";
import { Dropdown } from "react-native-element-dropdown";
import Warning from "../components/Warning";
import Otp from "../components/Otp";
import { useGlobalSearchParams } from "expo-router"; // Get the router params here
import CustomButton from "../components/CutomeButton";
import { useGlobalContext } from "../context/GlobalProvider";
import { icons } from "../constants/icons";
const OtherBankTransfer = () => {
  const { user } = useGlobalContext();
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const [recipientName, setRecipientName] = useState("");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [step, setStep] = useState(1);
  const {
    currentStep,
    verified,
    amountTransfered,
    accountNumber,
  } = useGlobalSearchParams();
  const data = [{ label: "KCB Bank ******2924", value: "1" }];
  const { selectedBank, bankSelected } = useGlobalSearchParams();
  const [otherBank, setOtherBank] = useState(selectedBank || "Select Bank");
  const [recipientAccount, setRecipientAccount] = useState("");
  useEffect(() => {
    if (verified) {
      setStep(3);
      setShowConfirmation(true);
      setAmount(amountTransfered);
      setRecipientAccount(accountNumber);
    }
  }, [verified]);

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
        fromForm: true,
        TransferringAmount: amount,
        transferingTo: recipientName,
        recipientAccountNumber: recipientAccount,
        bankName: otherBank || "Select Bank",
      },
    });
  };

  const confirmTransfer = async (otp) => {
    setLoading(true); // Show loading indicator
    try {
      // Proceed with the transfer logic using OTP
      const response = await fetch(
        "https://bank-backend-1-4cqz.onrender.com/api/users/transfer",
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
    <SafeAreaView className="h-full bg-white">
      <View className="flex-row gap-10 items-center px-7">
        <Ionicons
          name="arrow-back"
          size={30}
          color="black"
          onPress={() => router.push("bank-transfer")}
        />
        <Text className="font-mnlight text-[20px] text-black uppercase">
          Bank Transfer
        </Text>
      </View>
      <View className="mt-20 relative justify-center">
        <View className="border-2 border-primary w-full bg-primary" />
        <View className="rounded-full ml-10 absolute bg-[#e9f9fd] border-2 border-white w-[80px] h-[80px] items-center justify-center">
          <Image
            source={icons.bankTransferIcon}
            className="w-full h-full object-contain"
          />
        </View>
      </View>
      <View className="w-[80%] ml-auto mr-auto m-auto">
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
          <Text className="flex-1 text-secondary font-mnmedium uppercase text-[18px]">
            {`${otherBank}`}
          </Text>
        </TouchableOpacity>
        <View className="ml-auto mr-auto mt-5 h-10 px-4 border-b border-black-200 focus:border-secondary flex flex-row items-center">
          <TextInput
            className="flex-1 text-secondary font-mnmedium text-[18px]"
            placeholder="RECIPIENT ACCOUNT"
            value={recipientAccount}
            onChangeText={setRecipientAccount}
            placeholderTextColor="black"
          />
        </View>

        <View className="ml-auto mr-auto mt-5 h-10 px-4 border-b border-black-200 focus:border-secondary flex flex-row items-center">
          <TextInput
            className="flex-1 text-secondary font-mnmedium text-[18px]"
            placeholder="RECIPIENT NAME"
            value={recipientName}
            onChangeText={setRecipientName}
            placeholderTextColor="black"
          />
        </View>

        <View className="ml-auto mr-auto mt-5 h-10 px-4 border-b border-black-200 focus:border-secondary flex flex-row items-center">
          <TextInput
            className="flex-1 text-secondary font-mnmedium text-[18px]"
            placeholder="AMOUNT"
            value={amount}
            onChangeText={setAmount}
            keyboardType="numeric"
            placeholderTextColor="black"
          />
        </View>

        <CustomButton
          title="SUBMIT"
          containerStyles="bg-secondary w-[50%] h-[40px] ml-auto mr-auto mt-6"
          textStyles="text-white font-mnmedium"
          handlePress={handleProceed}
        />
      </View>
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
            recipientName={recipientName}
            otherBank={otherBank}
            step={step}
            setStep={setStep}
          />
        ))}
    </SafeAreaView>
  );
};
export default OtherBankTransfer;
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
