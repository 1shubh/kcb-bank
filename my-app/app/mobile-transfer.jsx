import { View, Text, Image } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { router, useLocalSearchParams } from "expo-router";
import Feather from "@expo/vector-icons/Feather";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import {
  StyleSheet,
  TextInput,
  ActivityIndicator,
  Alert,
  TouchableOpacity,
} from "react-native";
import { useState, useEffect } from "react";
import { Dropdown } from "react-native-element-dropdown";
import Warning from "../components/Warning";
import Otp from "../components/Otp";
import { useGlobalSearchParams } from "expo-router"; // Get the router params here
import CustomButton from "../components/CutomeButton";
import { useGlobalContext } from "../context/GlobalProvider";
import { RadioButton } from "react-native-paper";
import { icons } from "../constants/icons";

const mobiles = [
  {
    title: "MPESA",
  },
  {
    title: "Airtel",
  },
  {
    title: "T-KASH",
  },
  {
    title: "VOOMA",
  },
];
const MobileTransfer = () => {
  const [selectedTransferType, setSelectedTransferType] = useState("self");
  const { user } = useGlobalContext();
  const [selectedMobile, setselectedMobile] = useState("MPESA");
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
        throw new Error(error);
      }
      const data = await response.json();
      if (data.message) {
        router.push({
          pathname: "success",
          params: {
            amountTranfered: amount,
            recipientAccountNumber: recipientAccount,
            mobileBank: selectedMobile,
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
          onPress={() => router.push("(tabs)")}
        />
        <Text
          className="font-mnlight text-[20px] text-secondary uppercase"
          maxFontSizeMultiplier={1.2}
        >
          Mobile Transfer
        </Text>
      </View>
      <View className="mt-20 relative justify-center">
        <View className="border-2 border-primary w-full bg-primary" />
        <View className="rounded-full ml-10 absolute bg-[#e9f9fd] border-2 border-white w-[80px] h-[80px] items-center justify-center">
          <Image
            source={icons.mobileTranferIcon}
            className="w-full h-full"
            resizeMode="contain"
          />
        </View>
      </View>
      <View className="w-[70%] ml-auto mr-auto mt-20">
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
        <View className="flex-row items-center mt-10 h-10 rounded-[20px] border border-gray-300">
          {mobiles.map((ele, i) => (
            <TouchableOpacity
              key={i}
              className={`w-[25%] border-r-black border-r-[0.5px] h-full items-center justify-center ${
                selectedMobile === ele.title ? "bg-secondary" : ""
              } ${
                selectedMobile === "MPESA" && i === 0 ? "rounded-l-[20px]" : ""
              } ${
                selectedMobile === "VOOMA" && i === mobiles.length - 1
                  ? "rounded-r-[20px] "
                  : "border-r-0"
              } ${i !== mobiles.length - 1 ? "border-r" : ""}`} // Conditional check for border-r
              onPress={() => setselectedMobile(ele.title)}
            >
              <Text
                className={`text-center font-mnsemibold uppercase text-[13px] object-cover ${
                  selectedMobile === ele.title ? "text-white" : "text-secondary"
                }`}
              >
                {ele.title}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        <View className="flex-row gap-1 mt-5">
          <View className="items-center flex-row w-[33.33%]">
            <RadioButton.Android
              value="mobile"
              status={selectedTransferType === "self" ? "checked" : "unchecked"}
              onPress={() => setSelectedTransferType("self")}
              color="#63bc46"
            />
            <Text
              className="text-[14px] text-secondary font-mnmedium uppercase"
              maxFontSizeMultiplier={1.2}
            >
              Self
            </Text>
          </View>
          <View className="items-center flex-row w-[33.33%]">
            <RadioButton.Android
              value="mobile"
              status={
                selectedTransferType === "other" ? "checked" : "unchecked"
              }
              onPress={() => setSelectedTransferType("other")}
              color="#63bc46"
            />
            <Text
              className="text-[14px] text-secondary font-mnmedium uppercase"
              maxFontSizeMultiplier={1.2}
            >
              other
            </Text>
          </View>
        </View>
        <View className="mt-5 h-10 px-1 border-b border-black-200 focus:border-secondary flex flex-row items-center">
          <TextInput
            className="flex-1 text-secondary font-mnmedium text-[18px]"
            placeholder="MOBILE NUMBER"
            value={recipientAccount}
            onChangeText={setRecipientAccount}
            placeholderTextColor="black"
          />
        </View>
        <View className="mt-5 h-10 px-1 border-b border-black-200 focus:border-secondary flex flex-row items-center">
          <TextInput
            className="flex-1 text-secondary font-mnmedium text-[18px]"
            placeholder="AMOUNT"
            value={amount}
            onChangeText={setAmount}
            keyboardType="numeric"
            placeholderTextColor="black"
          />
        </View>
        <View className="mt-5">
          <CustomButton
            title="SUBMIT"
            containerStyles="bg-secondary w-[50%] h-[40px]"
            textStyles="text-white text-[15px] font-mnmedium"
            handlePress={handleProceed}
          />
        </View>
        {/* form */}
      </View>
      {loading && (
        <View style={styles.overlay}>
          <View
            style={styles.spinnerContainer}
            className="flex-row items-center"
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
            // recipientAccount={recipientAccount}
            // otherBank={otherBank}
            mobile={selectedMobile}
            mobileNumber={recipientAccount}
            step={step}
            setStep={setStep}
          />
        ))}
    </SafeAreaView>
  );
};

export default MobileTransfer;
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
